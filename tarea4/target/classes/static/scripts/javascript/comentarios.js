// Función para obtener parámetros de la URL
const obtenerParametroURL = (nombre) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
};

// Funcion para cargar los comentarios del servidor.
const cargarComentarios = (avisoId) => {
    const lista = document.getElementById('lista-comentarios');

    fetch(`/api/avisos/${avisoId}/comentarios`)
        .then(res => res.json())
        .then(data => {
            if (data.success && data.comentarios.length > 0) {
                mostrarComentarios(data.comentarios);
            } else {
                lista.innerHTML = '<p class="sin-comentarios">No hay comentarios.</p>';
            }
        })
        .catch(err => {
            console.error('Error:', err);
            lista.innerHTML = '<p class="error">Error al cargar comentarios</p>';
        });
};

// Funcion para mostrar los comentarios
const mostrarComentarios = (comentarios) => {
    const lista = document.getElementById('lista-comentarios');
    lista.innerHTML = '';

    if (!comentarios || comentarios.length === 0) {
        lista.innerHTML = '<p class="sin-comentarios">No hay comentarios.</p>';
        return;
    }

    for (const c of comentarios) {
        const fecha = new Date(c.fecha).toLocaleString('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const comentarioDiv = document.createElement('div');
        comentarioDiv.classList.add('comentario-item');

        comentarioDiv.innerHTML = `
            <div class="comentario-header">
                <strong class="comentario-autor">${c.nombre}</strong>
                <span class="comentario-fecha">${fecha}</span>
            </div>
            <p class="comentario-texto">${c.texto}</p>
        `;

        lista.appendChild(comentarioDiv);
    }
};

// Validacion del comentario APARTE a la del backend.
const validarComentario = (nombre, texto) => {
    const errores = [];

    if (!nombre || nombre.length < 3) {
        errores.push('El nombre debe tener al menos 3 caracteres');
    }
    if (nombre.length > 80) {
        errores.push('El nombre no puede tener más de 80 caracteres');
    }
    if (!texto || texto.length < 5) {
        errores.push('El comentario debe tener al menos 5 caracteres');
    }
    if (texto.length > 300) {
        errores.push('El comentario no puede tener más de 300 caracteres');
    }

    return errores;
};

// Mostrar mensaje en caso de errores de validaciones o en el backend.
const mostrarMensaje = (mensaje, tipo) => {
    const erroresDiv = document.getElementById('comentario-errores');
    erroresDiv.innerHTML = '';

    if (Array.isArray(mensaje)) {
        const ul = document.createElement('ul');
        ul.classList.add('lista-errores');
        for (const m of mensaje) {
            const li = document.createElement('li');
            li.textContent = m;
            ul.appendChild(li);
        }
        erroresDiv.appendChild(ul);
    } else {
        erroresDiv.textContent = mensaje;
    }

    erroresDiv.style.display = 'block';
    erroresDiv.className = `errores-comentario ${tipo}`;

    if (tipo === 'success') {
        erroresDiv.classList.add('success');
    }
};

// Funcion para poder inicializar el formulario de comentarios.
const inicializarFormulario = (avisoId) => {
    const form = document.getElementById('form-comentario');

    if (!form) {
        console.log('No se encontró el formulario de comentarios');
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const nombre = formData.get('nombre').trim();
        const texto = formData.get('texto').trim();

        const errores = validarComentario(nombre, texto);

        if (errores.length > 0) {
            mostrarMensaje(errores, 'error');
            return;
        }

        fetch(`/api/avisos/${avisoId}/comentarios`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    form.reset();
                    mostrarMensaje('Comentario agregado', 'success');
                    cargarComentarios(avisoId);
                } else {
                    mostrarMensaje(data.errores || ['Error al subir comentario'], 'error');
                }
            })
            .catch(err => {
                console.error('Error:', err);
                mostrarMensaje(['Error en conexion'], 'error');
            });
    });
};

// ✅ CAMBIAR ESTA PARTE - Obtener avisoId de la URL
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 Script de comentarios cargado');

    // Obtener avisoId desde la URL
    const avisoId = obtenerParametroURL('avisoId');

    console.log('📝 Aviso ID desde URL:', avisoId);

    if (avisoId && !isNaN(avisoId)) {
        console.log('✅ Cargando comentarios para aviso:', avisoId);
        cargarComentarios(avisoId);
        inicializarFormulario(avisoId);
    } else {
        console.log('ℹ️ No hay avisoId en la URL (no estamos viendo un detalle)');
    }
});