import { region_comuna } from "../db/region_comuna.js";

// Funcion que agrega las regiones al clickear el boton para poder seleccionar una.
const seleccionarRegion = document.getElementById("region");
const poblarRegion = () => {
    for (const region of region_comuna.regiones) {
        const option = document.createElement("option");
        option.value = region.numero;
        option.textContent = region.nombre;
        seleccionarRegion.appendChild(option);
    }
};

// Funcion para agregar las comunas al clickear y tener una region seleccionada para poder asi seleccionar una comuna.
const seleccionarComuna = document.getElementById("comuna");
const poblarComuna = () => {
    seleccionarRegion.addEventListener("change", () => {
        seleccionarComuna.innerHTML = "";
        let regionSeleccionada;
        for (let i = 0; i < region_comuna.regiones.length; i++) {
            if (region_comuna.regiones[i].numero === Number(seleccionarRegion.value)) {
                regionSeleccionada = region_comuna.regiones[i];
                break;
            }
        }
        // Si deseleccionamos una region, volvemos al mensaje original.
        if (!regionSeleccionada) {
            seleccionarComuna.innerHTML = '<option value="">Seleccione primero la región</option>';
            return;
        }
        // Si seleccionamos una region, el texto cambia para decir que seleccione una comuna.
        const noComunaSeleccionada = document.createElement("option");
        noComunaSeleccionada.value = "";
        noComunaSeleccionada.textContent = "Seleccione una comuna";
        seleccionarComuna.appendChild(noComunaSeleccionada);

        for (const comuna of regionSeleccionada.comunas) {
            const option = document.createElement("option");
            option.value =  comuna.nombre;
            option.textContent = comuna.nombre;
            seleccionarComuna.appendChild(option);
        }
    });
};

// Funcion para agregar la hora actual + 3.
const fechaDejar = document.getElementById("fecha");
const poblarHora = () => {
    const ahora = new Date();
    ahora.setHours(ahora.getHours() + 3);

    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, "0");
    const day = String(ahora.getDate()).padStart(2, "0");
    const hours = String(ahora.getHours()).padStart(2, "0");
    const minutes = String(ahora.getMinutes()).padStart(2, "0");

    // Formato final: YYYY-MM-DD HH:MM
    fechaDejar.value = `${year}-${month}-${day} ${hours}:${minutes}`;

};

// Funcion para mostrar las opciones de redes sociales.
const redes = document.getElementById("red");
const redesSeleccionar = document.getElementById("red-id-container");
const poblarRedes = () => {
    redes.addEventListener("change", () => {
        if (redes.value) {
            redesSeleccionar.style.display = "block";
        } else {
            redesSeleccionar.style.display = "none";
        }
    });
};




// Ejecutamos las funciones.
poblarHora();
poblarRegion();
poblarComuna();
poblarRedes();

