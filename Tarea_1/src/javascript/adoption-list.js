import { avisos } from "./db/avisos.js";

// Elementos mostrados en la preview
const listadoBody = document.getElementsByClassName("listado-body")[0];
const casillaDetalles = document.getElementById("detalle-container");
const listadoContainer = document.getElementById("listado-casilla");
const detalleInfo = document.getElementById("detalle-info");
const detalleFotos = document.getElementById("detalle-fotos");
const modoFoto = document.getElementById("foto-clickeada");
const fotoGrande = document.getElementById("foto-grande");
const cerrarFoto = document.getElementById("cerrar-foto");
const volverListadoBtn = document.getElementById("volver-listado");
const volverPortadaBtn = document.getElementById("volver-portada");

// Mostramos la informacion detallada de cada aviso al hacer click en algun elemento del listado
const mostrarDetalle = (avisoCasilla) => {
    const ultimosDetalles = avisos[avisoCasilla];
    listadoContainer.style.display = "none";
    casillaDetalles.style.display = "block";

    detalleInfo.innerHTML = `
        <p><b>Fecha Publicación:</b> ${ultimosDetalles.publicacion}</p>
        <p><b>Fecha Entrega:</b> ${ultimosDetalles.entrega}</p>
        <p><b>Comuna:</b> ${ultimosDetalles.comuna}</p>
        <p><b>Sector:</b> ${ultimosDetalles.sector}</p>
        <p><b>Cantidad / Tipo / Edad:</b> ${ultimosDetalles.detalle}</p>
        <p><b>Contacto:</b> ${ultimosDetalles.contacto}</p>
    `;

    // Borra las fotos que fueron agregadas cuando se mostraba mas informacion
    while (detalleFotos.firstChild) {
        detalleFotos.removeChild(detalleFotos.firstChild);
    }

    // Agregar fotos del aviso que ahora se esta viendo
    for (let i = 0; i < ultimosDetalles.fotos.length; i++) {
        const foto = ultimosDetalles.fotos[i];
        const imagen = document.createElement("img");
        imagen.src = foto;

        imagen.addEventListener("click", () => {
            fotoGrande.src = foto;
            modoFoto.style.display = "flex";
        });

        detalleFotos.appendChild(imagen);
    }
};

// Rellenamos/actualizamos el preview del listado en adopcion
for (let i = 0; i < avisos.length; i++) {
    const ultimosPreview = avisos[i];

    const row = document.createElement("div");
    row.classList.add("listado-row");

    row.innerHTML = `
        <div class="listado-cabeza">${ultimosPreview.publicacion}</div>
        <div class="listado-cabeza">${ultimosPreview.entrega}</div>
        <div class="listado-cabeza">${ultimosPreview.comuna}</div>
        <div class="listado-cabeza">${ultimosPreview.sector}</div>
        <div class="listado-cabeza">${ultimosPreview.detalle}</div>
        <div class="listado-cabeza">${ultimosPreview.contacto}</div>
        <div class="listado-cabeza">${Number(ultimosPreview.fotos.length)}</div>
    `;

    row.addEventListener("click", () => mostrarDetalle(i));
    listadoBody.appendChild(row);
}

// Boton para cerrar la vista ampliada de la imagen clickeada
cerrarFoto.addEventListener("click", () => {
    modoFoto.style.display = "none";
    fotoGrande.src = "";
});

// Botones para salir de los detalles
// Caso 1: Volver al listado
volverListadoBtn.addEventListener("click", () => {
    casillaDetalles.style.display = "none";
    listadoContainer.style.display = "block";
});

// Caso 2: Volver a la portada (index.html)
volverPortadaBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});

