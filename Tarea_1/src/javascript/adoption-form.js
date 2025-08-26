document.addEventListener("DOMContentLoaded", () => {
    const seleccionarRegion = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const fecha = document.getElementById("fecha");
    const guardarFotos = document.getElementById("fotos-container");
    const botonFoto = document.getElementById("agregar-foto");
    const formulario = document.getElementById("adoption-form");
    const confirmar = document.getElementById("confirmacion");
    const mensajeExito = document.getElementById("mensaje-exito");

    // Cargar regiones
    region_comuna.regiones.forEach(r => {
        const option = document.createElement("option");
        option.value = r.numero;
        option.textContent = r.nombre;
        seleccionarRegion.appendChild(option);
    });

    // Actualizar comunas
    seleccionarRegion.addEventListener("change", () => {
        const selected = region_comuna.regiones.find(r => r.numero === seleccionarRegion.value);
        comuna.innerHTML = "";
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = selected ? "Seleccione una comuna" : "Seleccione primero la región";
        comuna.appendChild(defaultOption);

        if (selected) {
            selected.comunas.forEach(c => {
                const option = document.createElement("option");
                option.value = c.id;
                option.textContent = c.nombre;
                comuna.appendChild(option);
            });
        }
    });

    // Fecha prellenada
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

    document.getElementById("confirmar-si").addEventListener("click", () => {
        confirmar.style.display = "none";
        formulario.style.display = "none";
        mensajeExito.style.display = "block";
    });

    document.getElementById("confirmar-no").addEventListener("click", () => {
        confirmar.style.display = "none";
    });

    document.getElementById("volver-portada").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
