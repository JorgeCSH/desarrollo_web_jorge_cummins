/* Listener para el formulario de adopcion.
 *
 * Obtiene los datos del html de la pagina y actualiza con la informacion que se
 * va recibiendo. Esto para validar que la informacion este en formatos correctos.
 *
 * Autor: Jorge Cummins
 */
document.addEventListener("DOMContentLoaded", () => {
    /* Asignamos cada elemento a cada variable.*/
    // Obtenemos el formulario de manera general, esto para poder verificar la informacion.
    const formulario = document.getElementById("adoption-form");
    // Elementos de region y comuna.
    const seleccionarRegion = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    // Elemento del calendario.
    const fecha = document.getElementById("fecha");
    // Elementos fotos, para guardar y el boton.
    const guardarFotos = document.getElementById("fotos-container");
    const botonFoto = document.getElementById("agregar-foto");
    // Mensajes de confirmacion y exito.
    const confirmar = document.getElementById("confirmacion");
    const mensajeExito = document.getElementById("mensaje-exito");
    // Redes sociales y URL.
    const redSocial = document.getElementById("red");
    const redSocialSel = document.getElementById("red-id-container");
    const redSocialElegida = document.getElementById("red-id");

    // Cargar y agregar region seleccionada.
    region_comuna.regiones.forEach(regiones_i => {
        const auxRegiones = document.createElement("option");
        auxRegiones.value = regiones_i.numero;
        auxRegiones.textContent = regiones_i.nombre;
        seleccionarRegion.appendChild(auxRegiones);
    });

    // Cargar y agregar comuna seleccionada.
    seleccionarRegion.addEventListener("change", () => {
        const regionSeleccionada = region_comuna.regiones.find(region_i => region_i.numero === Number(seleccionarRegion.value));
        comuna.innerHTML = "";
        const valorDefaultRegion = document.createElement("option");
        valorDefaultRegion.value = "";
        valorDefaultRegion.textContent = regionSeleccionada? "Seleccione una comuna" : "Seleccione primero la región";
        comuna.appendChild(valorDefaultRegion);
        if (regionSeleccionada) {
            regionSeleccionada.comunas.forEach(comuna_i => {
                const auxComuna = document.createElement("option");
                auxComuna.value = comuna_i.id;
                auxComuna.textContent = comuna_i.nombre;
                comuna.appendChild(auxComuna);
            });
        }
    });

    // Tipo de red social.
    redSocial.addEventListener("change", () => {
        // Caso donde aun no se ha seleccionado un ared social , url no aparece.
        if (redSocial.value !== "") {
            redSocialSel.style.display = "block";
            redSocialElegida.required = true;
        // En caso de que si se haya seleccionado la red social, se puede agregar link.
        } else {
            redSocialSel.style.display = "none";
            redSocialElegida.required = false;
            redSocialElegida.value = "";
        }
    });

    // Fecha seleccionar.
    const now = new Date();
    now.setHours(now.getHours() + 3);
    fecha.value = now.toISOString().slice(0,16);

    // Agregar fotos
    botonFoto.addEventListener("click", () => {
        const fotos = guardarFotos.querySelectorAll('input[type="file"]');
        if (fotos.length < 5) {
            const input = document.createElement("input");
            input.type = "file";
            input.name = "foto";
            input.accept = "image/*";
            guardarFotos.appendChild(input);
        } else {
            alert("Solo puede agregar hasta 5 fotos.");
        }
    });

    // Validar y mostrar confirmación
    formulario.addEventListener("submit", e => {
        e.preventDefault();
        confirmar.style.display = "block";
    });

    // Confirmar envio.
    document.getElementById("confirmar-si").addEventListener("click", () => {
        confirmar.style.display = "none";
        formulario.style.display = "none";
        mensajeExito.style.display = "block";
    });

    // Confirmar no envio
    document.getElementById("confirmar-no").addEventListener("click", () => {
        confirmar.style.display = "none";
    });

    // Volver a la portada.
    document.getElementById("volver-portada").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
