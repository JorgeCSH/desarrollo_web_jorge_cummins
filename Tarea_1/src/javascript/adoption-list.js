// Listado de avisos de ejemplo
const avisos = [
    {
        publicacion: "2025-08-26 10:00",
        entrega: "2025-08-28 14:00",
        comuna: "Iquique",
        sector: "Centro",
        cantidad: 1,
        tipoEdad: "Perro / 1 año",
        contacto: "Jorge Cummins",
        fotos: ["src/img/le_meme.jpg"]
    },
    {
        publicacion: "2025-08-25 09:30",
        entrega: "2025-08-27 12:00",
        comuna: "Calama",
        sector: "Norte",
        cantidad: 1,
        tipoEdad: "Gato / 6 meses",
        contacto: "María López",
        fotos: ["src/img/le_meme.jpg"]
    },
    {
        publicacion: "2025-08-24 11:00",
        entrega: "2025-08-29 10:00",
        comuna: "Antofagasta",
        sector: "Sur",
        cantidad: 3,
        tipoEdad: "Perro / 2 años",
        contacto: "Pedro Martinez",
        fotos: ["src/img/le_meme.jpg"]
    },
    {
        publicacion: "2025-08-23 08:15",
        entrega: "2025-08-27 16:00",
        comuna: "Valparaíso",
        sector: "Centro",
        cantidad: 1,
        tipoEdad: "Gato / 1 año",
        contacto: "Ana Torres",
        fotos: ["src/img/le_meme.jpg"]
    },
    {
        publicacion: "2025-08-22 15:00",
        entrega: "2025-08-26 09:00",
        comuna: "Santiago",
        sector: "Norte",
        cantidad: 2,
        tipoEdad: "Perro / 3 años",
        contacto: "Luis Rojas",
        fotos: ["src/img/le_meme.jpg"]
    }
];

// Verificacion
document.addEventListener("DOMContentLoaded", () => {
    const listadoBody = document.querySelector("#listado tbody");
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
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${aviso.publicacion}</td>
            <td>${aviso.entrega}</td>
            <td>${aviso.comuna}</td>
            <td>${aviso.sector}</td>
            <td>${aviso.cantidad}</td>
            <td>${aviso.tipoEdad}</td>
            <td>${aviso.contacto}</td>
            <td>${aviso.fotos.length}</td>
        `;
        tr.style.cursor = "pointer";
        tr.addEventListener("click", () => {
            mostrarDetalle(index);
        });
        listadoBody.appendChild(tr);
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
            img.width = 320;
            img.height = 240;
            img.style.margin = "5px";
            img.style.cursor = "pointer";
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
