from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from utils.validations import *
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os


app = Flask(__name__)
app.secret_key = 'tu_clave_secreta_aqui'  # Cambiar por una clave segura

app = Flask(__name__)
app.secret_key = 'tu_clave_secreta_aqui'  # Cambiar por una clave segura

# Configuración de archivos
UPLOAD_FOLDER = 'static/uploads/fotos'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

# Crear carpeta de uploads si no existe
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/')
def index():
    """Página de inicio con los últimos 5 avisos"""
    avisos = db.get_ultimos_avisos()
    mensaje = request.args.get('mensaje')

    return render_template('index.html',
                           active_page='index',
                           avisos=avisos,
                           mensaje=mensaje)


@app.route('/adoption-list')
def adoption_list():
    """Listado de avisos de adopción con paginación"""
    page = request.args.get('page', 1, type=int)

    avisos, total_pages = db.get_avisos_paginados(page=page, per_page=5)

    return render_template('adoption-list.html',
                           active_page='adoption_list',
                           avisos=avisos,
                           page=page,
                           total_pages=total_pages)


@app.route('/api/aviso/<int:aviso_id>')
def get_aviso_api(aviso_id):
    """API para obtener el detalle de un aviso (para AJAX)"""
    aviso = db.get_aviso_detalle(aviso_id)

    if not aviso:
        return jsonify({'error': 'Aviso no encontrado'}), 404

    # Formatear fechas
    if aviso['fecha_ingreso']:
        aviso['fecha_ingreso'] = aviso['fecha_ingreso'].strftime('%Y-%m-%d %H:%M:%S')
    if aviso['fecha_entrega']:
        aviso['fecha_entrega'] = aviso['fecha_entrega'].strftime('%Y-%m-%d %H:%M:%S')

    return jsonify(aviso)


@app.route('/add-adoption', methods=['GET', 'POST'])
def add_adoption():
    """Formulario para agregar aviso de adopción"""
    if request.method == 'GET':
        return render_template('add-adoption.html', active_page='add_adoption')

    # POST - Procesar formulario
    # Validar datos
    errores = validar_formulario_adopcion(request.form, request.files, ALLOWED_EXTENSIONS)

    if errores:
        return render_template('add-adoption.html',
                               active_page='add_adoption',
                               errores=errores,
                               form_data=request.form)

    # Preparar datos del aviso
    fecha_entrega = datetime.strptime(request.form['fecha'], '%Y-%m-%dT%H:%M')

    datos_aviso = {
        'comuna': request.form['comuna'],
        'sector': request.form.get('sector', ''),
        'nombre': request.form['nombre'],
        'email': request.form['email'],
        'celular': request.form.get('telefono', ''),
        'tipo': request.form['tipo'],
        'cantidad': request.form['cantidad'],
        'edad': request.form['edad'],
        'unidad': request.form['unidad'],
        'fecha_entrega': fecha_entrega,
        'descripcion': request.form.get('descripcion', '')
    }

    # Insertar aviso
    aviso_id = db.crear_aviso(datos_aviso)

    if not aviso_id:
        return render_template('add-adoption.html',
                               active_page='add_adoption',
                               errores=['Error: Comuna no encontrada'],
                               form_data=request.form)

    # Insertar red social si existe
    if request.form.get('red') and request.form.get('red-id'):
        db.crear_red_social(aviso_id, request.form['red'], request.form['red-id'])

    # Guardar fotos
    fotos = request.files.getlist('foto')
    for foto in fotos:
        if foto and foto.filename:
            filename = secure_filename(foto.filename)
            # Agregar timestamp para evitar duplicados
            timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
            nombre_unico = f"{timestamp}_{filename}"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], nombre_unico)
            foto.save(filepath)

            # Insertar en base de datos
            ruta_relativa = f"uploads/fotos/{nombre_unico}"
            db.crear_foto(aviso_id, ruta_relativa, filename)

    # Redirigir a inicio con mensaje de éxito
    return redirect(url_for('/', mensaje='Aviso de adopción agregado exitosamente'))


@app.route('/adoption-stats')
def adoption_stats():
    """Página de estadísticas"""
    return render_template('adoption-stats.html', active_page='adoption_stats')




if __name__ == "__main__":
    app.run(debug=True)