import re
from datetime import datetime


def validar_email(email):
    """Valida formato de email"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validar_telefono(telefono):
    """Valida formato de teléfono (opcional)"""
    if not telefono:
        return True
    pattern = r'^\+?[0-9]{8,15}$'
    return re.match(pattern, telefono.replace(' ', '').replace('.', '')) is not None


def allowed_file(filename, allowed_extensions):
    """Verifica si el archivo tiene una extensión permitida"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions


def validar_formulario_adopcion(form_data, files, allowed_extensions):
    """
    Valida los datos del formulario de adopción en el servidor

    Args:
        form_data: Datos del formulario (request.form)
        files: Archivos subidos (request.files)
        allowed_extensions: Set de extensiones permitidas

    Returns:
        Lista de errores (vacía si no hay errores)
    """
    errores = []

    # Validar comuna
    if not form_data.get('comuna'):
        errores.append("Debe seleccionar una comuna")

    # Validar nombre
    nombre = form_data.get('nombre', '').strip()
    if not nombre or len(nombre) < 3 or len(nombre) > 200:
        errores.append("El nombre debe tener entre 3 y 200 caracteres")

    # Validar email
    email = form_data.get('email', '').strip()
    if not email or not validar_email(email):
        errores.append("Debe ingresar un email válido")

    # Validar teléfono (opcional)
    telefono = form_data.get('telefono', '').strip()
    if telefono and not validar_telefono(telefono):
        errores.append("El formato del teléfono no es válido")

    # Validar red social si se seleccionó
    red = form_data.get('red', '')
    red_id = form_data.get('red-id', '').strip()
    if red and not red_id:
        errores.append("Debe ingresar el ID o URL de contacto para la red social seleccionada")
    if red_id and len(red_id) < 4:
        errores.append("El ID de red social debe tener al menos 4 caracteres")

    # Validar tipo de mascota
    if not form_data.get('tipo'):
        errores.append("Debe seleccionar el tipo de mascota")
    elif form_data.get('tipo') not in ['perro', 'gato']:
        errores.append("El tipo de mascota debe ser 'perro' o 'gato'")

    # Validar cantidad
    cantidad = form_data.get('cantidad', 0)
    if not str(cantidad).isdigit() or int(cantidad) < 1:
        errores.append("La cantidad debe ser un número válido mayor a 0")

    # Validar edad
    edad = form_data.get('edad', 0)
    if not str(edad).isdigit() or int(edad) < 1:
        errores.append("La edad debe ser un número válido mayor a 0")

    # Validar unidad
    if not form_data.get('unidad') or form_data.get('unidad') not in ['meses', 'años']:
        errores.append("Debe seleccionar la unidad de medida de edad")

    # Validar fecha
    fecha = form_data.get('fecha')
    if not fecha:
        errores.append("Debe ingresar la fecha disponible")
    else:
        fecha_obj = datetime.strptime(fecha, '%Y-%m-%dT%H:%M')
        if fecha_obj < datetime.now():
            errores.append("La fecha disponible debe ser futura")

    # Validar fotos
    if 'foto' not in files or not files.getlist('foto')[0].filename:
        errores.append("Debe subir al menos una foto")
    else:
        fotos = files.getlist('foto')
        for foto in fotos:
            if foto.filename and not allowed_file(foto.filename, allowed_extensions):
                errores.append(f"El archivo {foto.filename} no tiene una extensión válida")

    return errores