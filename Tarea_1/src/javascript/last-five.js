import { avisos } from "./db/avisos.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".last-pub-container");

    const ultimos = avisos.slice(0, 5);

    container.querySelectorAll(".item-adoption:not(.header)").forEach(e => e.remove());

    ultimos.forEach(aviso => {
        const fecha = document.createElement("div");
        fecha.classList.add("item-adoption");
        fecha.textContent = aviso.publicacion;
        container.appendChild(fecha);

        const comuna = document.createElement("div");
        comuna.classList.add("item-adoption");
        comuna.textContent = aviso.comuna;
        container.appendChild(comuna);

        const sector = document.createElement("div");
        sector.classList.add("item-adoption");
        sector.textContent = aviso.sector;
        container.appendChild(sector);

        const info = document.createElement("div");
        info.classList.add("item-adoption");
        info.textContent = `${aviso.cantidad} / ${aviso.tipoEdad}`;
        container.appendChild(info);

        const foto = document.createElement("div");
        foto.classList.add("item-adoption");
        const img = document.createElement("img");
        img.src = aviso.fotos[0];
        img.width = 100;
        foto.appendChild(img);
        container.appendChild(foto);
    });
});

