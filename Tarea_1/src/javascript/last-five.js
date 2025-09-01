import { avisos } from "./db/avisos.js";

const casillas = document.getElementById("get-last-pub");

// Ordenamos avisos de publicacion mas reciente a mas antigua y obtenemos los ultimos 5 mas recientes
avisos.sort((a, b) => new Date(b.publicacion) - new Date(a.publicacion));
const ultimos = avisos.slice(-5);

// Recorremos el arreglo de los ultimos 5 elementos y los vamos agregando al HTML
for (let i = 0; i < ultimos.length; i++) {
    // Variable auxiliar para el elemento actual
    const ultimoPublicado = ultimos[i];

    // Creamos elemento para la fecha
    const crearFecha = () => {
        const fecha = document.createElement("div");
        fecha.classList.add("item-adoption");
        fecha.textContent = ultimoPublicado.publicacion;
        casillas.appendChild(fecha);
    };

    // Creamos elemento para la comuna
    const crearComuna = () => {
        const comuna = document.createElement("div");
        comuna.classList.add("item-adoption");
        comuna.textContent = ultimoPublicado.comuna;
        casillas.appendChild(comuna);
    };

    // Creamos elemento para el sector
    const crearSector = () => {
        const sector = document.createElement("div");
        sector.classList.add("item-adoption");
        sector.textContent = ultimoPublicado.sector;
        casillas.appendChild(sector);
    };

    // Creamos elemento para la info (cantidad, tipo y año)
    const crearInfo = () => {
        const info = document.createElement("div");
        info.classList.add("item-adoption");
        info.textContent = ultimoPublicado.detalle;
        casillas.appendChild(info);
    };

    // Creamos elemento para la foto inicial
    const crearFoto = () => {
        const foto = document.createElement("div");
        foto.classList.add("item-adoption");
        const img = document.createElement("img");
        img.src = ultimoPublicado.fotos[0];
        img.width = 100;
        foto.appendChild(img);
        casillas.appendChild(foto);
    };

    // Llamamos a todas las funciones para este elemento
    crearFecha();
    crearComuna();
    crearSector();
    crearInfo();
    crearFoto();
}

