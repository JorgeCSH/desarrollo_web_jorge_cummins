import { region_comuna } from "../db/region_comuna.js";

// Función que agrega las regiones
const seleccionarRegion = document.getElementById("region");
const poblarRegion = () => {
    for (const region of region_comuna.regiones) {
        const option = document.createElement("option");
        option.value = region.numero;
        option.textContent = region.nombre;
        seleccionarRegion.appendChild(option);
    }
};

// Función que agrega las comunas al seleccionar región
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

        if (!regionSeleccionada) {
            seleccionarComuna.innerHTML = '<option value="">Seleccione primero la región</option>';
            return;
        }

        const noComunaSeleccionada = document.createElement("option");
        noComunaSeleccionada.value = "";
        noComunaSeleccionada.textContent = "Seleccione una comuna";
        seleccionarComuna.appendChild(noComunaSeleccionada);

        for (const comuna of regionSeleccionada.comunas) {
            const option = document.createElement("option");
            option.value = comuna.nombre;
            option.textContent = comuna.nombre;
            seleccionarComuna.appendChild(option);
        }
    });
};

// Función para agregar la hora actual + 3 (CORREGIDO PARA datetime-local)
const fechaDejar = document.getElementById("fecha");
const poblarHora = () => {
    const ahora = new Date();
    ahora.setHours(ahora.getHours() + 3);

    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, "0");
    const day = String(ahora.getDate()).padStart(2, "0");
    const hours = String(ahora.getHours()).padStart(2, "0");
    const minutes = String(ahora.getMinutes()).padStart(2, "0");

    // Formato CORRECTO para datetime-local → YYYY-MM-DDTHH:MM
    fechaDejar.value = `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Mostrar opciones de redes sociales
const redes = document.getElementById("red");
const redesSeleccionar = document.getElementById("red-id-container");
const poblarRedes = () => {
    redes.addEventListener("change", () => {
        redesSeleccionar.style.display = redes.value ? "block" : "none";
    });
};

// Ejecutamos las funciones
poblarHora();
poblarRegion();
poblarComuna();
poblarRedes();

