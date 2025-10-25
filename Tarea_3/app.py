from flask import Flask, request, render_template, redirect, url_for, jsonify
from utils.validations import *
from flask_cors import cross_origin
import database.db as db
from werkzeug.utils import secure_filename

import hashlib
import filetype
import os


app = Flask(__name__)
app.secret_key = 'pa55w0rd'

UPLOAD_FOLDER = 'static/uploads/fotos'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET'])
def index():
    avisos = db.get_ultimos_avisos()
    mensaje = request.args.get('mensaje')

    return render_template('index.html', active_page='index', avisos=avisos)


@app.route('/adoption-list')
@app.route('/adoption-list/<int:aviso_id>')
def adoption_list(aviso_id=None):
    page = request.args.get('page', 1, type=int)

    # Si hay un aviso_id, mostrar el aviso
    if aviso_id:
        aviso = db.get_aviso_detalle(aviso_id)
        return render_template('adoption-list.html', active_page='adoption_list', avisos=[], page=page, total_pages=1, detalle=aviso, mostrar_detalle=True)

    # Sino, mostrar el listado
    avisos, total_pages = db.get_avisos_paginados(page=page, per_page=5)

    return render_template('adoption-list.html', active_page='adoption_list', avisos=avisos, page=page, total_pages=total_pages, mostrar_detalle=False)

@app.route('/add-adoption', methods=['GET', 'POST'])
def add_adoption():
    if request.method == 'GET':
        return render_template('add-adoption.html', active_page='add_adoption')

    errores = validar_formulario_adopcion(request.form, request.files, ALLOWED_EXTENSIONS)

    if errores:
        return render_template('add-adoption.html', active_page='add_adoption', errores=errores, form_data=request.form)

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
        return render_template('add-adoption.html', active_page='add_adoption', errores=['Error: Comuna no encontrada'], form_data=request.form)

    if request.form.get('red') and request.form.get('red-id'):
        db.crear_red_social(aviso_id, request.form['red'], request.form['red-id'])

    fotos = request.files.getlist('foto')
    for foto in fotos:
        if foto and foto.filename:
            filename = secure_filename(foto.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            foto.save(filepath)

            ruta_relativa = f"uploads/fotos/{filename}"
            db.crear_foto(aviso_id, ruta_relativa, filename)

    return redirect(url_for('index', mensaje='Aviso de adopción agregado exitosamente'))


@app.route('/adoption-stats')
def adoption_stats():
    return render_template('adoption-stats.html', active_page='adoption_stats')

# Aca es para los graficos
@app.route("/stats", methods=["GET"])
def stats():
    return render_template("adoption-stats.html")


@app.route("/api/stats/avisos-por-dia", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def avisos_por_dia():
    datos = db.get_avisos_por_dia()
    return jsonify(datos)


@app.route("/api/stats/avisos-por-tipo", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def avisos_por_tipo():
    datos = db.get_avisos_por_tipo()
    return jsonify(datos)


@app.route("/api/stats/avisos-por-mes", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def avisos_por_mes():
    datos = db.get_avisos_por_mes()
    return jsonify(datos)


@app.route('/api/avisos/<int:aviso_id>/comentarios', methods=['POST'])
@cross_origin(origin="*", supports_credentials=True)
def agregar_comentario(aviso_id):
    aviso = db.get_aviso_detalle(aviso_id)
    if not aviso:
        return jsonify({'success': False, 'errores': ['El aviso no existe']}), 404
    errores = validar_comentario(request.form)
    if errores:
        return jsonify({'success': False, 'errores': errores}), 400
    comentario_id = db.crear_comentario(
        aviso_id=aviso_id,
        nombre=request.form['nombre'].strip(),
        texto=request.form['texto'].strip()
    )
    if not comentario_id:
        return jsonify({'success': False, 'errores': ['Error al guardar el comentario']}), 500
    return jsonify({'success': True, 'mensaje': 'Comentario agregado exitosamente'}), 201


@app.route('/api/avisos/<int:aviso_id>/comentarios', methods=['GET'])
@cross_origin(origin="*", supports_credentials=True)
def obtener_comentarios(aviso_id):
    comentarios = db.get_comentarios_por_aviso(aviso_id)
    return jsonify({'success': True, 'comentarios': comentarios}), 200


if __name__ == "__main__":
    app.run(debug=True)