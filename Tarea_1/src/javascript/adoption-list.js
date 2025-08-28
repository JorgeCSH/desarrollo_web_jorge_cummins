// Listado de avisos de ejemplo
import { avisos } from "./db/avisos.js";

document.addEventListener("DOMContentLoaded", () => {
    const listadoBody = document.querySelector(".listado-body");
    const detalleContainer = document.getElementById("detalle-container");
    const listadoContainer = document.getElementById("listado-container");
    const detalleInfo = document.getElementById("detalle-info");
    const detalleFotos = document.getElementById("detalle-fotos");
    const modalFoto = document.getElementById("modal-foto");
    const fotoGrande = document.getElementById("foto-grande");
    const cerrarModal = document.getElementById("cerrar-modal");

    const volverListadoBtn = document.getElementById("volver-listado");
    const volverPortadaBtn = document.getElementById("volver-portada");

    // Llenar listado
    avisos.forEach((aviso, index) => {
        const row = document.createElement("div");
        row.classList.add("listado-row");

        row.innerHTML = `
            <div class="listado-col">${aviso.publicacion}</div>
            <div class="listado-col">${aviso.entrega}</div>
            <div class="listado-col">${aviso.comuna}</div>
            <div class="listado-col">${aviso.sector}</div>
            <div class="listado-col">${aviso.detalle}</div>
            <div class="listado-col">${aviso.contacto}</div>
            <div class="listado-col">${aviso.fotos.length}</div>
        `;

        row.addEventListener("click", () => mostrarDetalle(index));
        listadoBody.appendChild(row);
    });

    function mostrarDetalle(index) {
        const aviso = avisos[index];
        listadoContainer.style.display = "none";
        detalleContainer.style.display = "block";

        detalleInfo.innerHTML = `
            <p><b>Fecha Publicación:</b> ${aviso.publicacion}</p>
            <p><b>Fecha Entrega:</b> ${aviso.entrega}</p>
            <p><b>Comuna:</b> ${aviso.comuna}</p>
            <p><b>Sector:</b> ${aviso.sector}</p>
            <p><b>Cantidad:</b> ${aviso.cantidad}</p>
            <p><b>Tipo / Edad:</b> ${aviso.tipoEdad}</p>
            <p><b>Contacto:</b> ${aviso.contacto}</p>
        `;

        detalleFotos.innerHTML = "";
        aviso.fotos.forEach(foto => {
            const img = document.createElement("img");
            img.src = foto;
            img.addEventListener("click", () => {
                fotoGrande.src = foto;
                modalFoto.style.display = "flex";
            });
            detalleFotos.appendChild(img);
        });
    }

    cerrarModal.addEventListener("click", () => {
        modalFoto.style.display = "none";
        fotoGrande.src = "";
    });

    volverListadoBtn.addEventListener("click", () => {
        detalleContainer.style.display = "none";
        listadoContainer.style.display = "block";
    });

    volverPortadaBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
