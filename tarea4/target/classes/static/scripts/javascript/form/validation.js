// Validacion para la region. Falla si esta vacio.
const validarRegion = region => region !== "";

// Validacion para la comuna. Falla si esta vacio.
const validarComuna = comuna => comuna !== "";

// Validación para el sector opcional
const validarSector = sector => !sector || (sector.length > 0 && sector.length <= 100);

// Validación nombre (3–200)
const validarNombre = nombre => nombre.length >= 3 && nombre.length <= 200;

// Validación email
const validarEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 100;

// Validación teléfono opcional
const validarTelefono = telefono => !telefono || /^\+\d{3}\.\d{8}$/.test(telefono);

// Validación redes sociales, opcional
const validarRed = (red, redId) => !red || (redId.length >= 4 && redId.length <= 50);

// Validación tipo
const validarTipo = tipo => tipo !== "";

// Cantidad > 0
const validarCantidad = cantidad => {
    const num = parseInt(cantidad, 10);
    return Number.isInteger(num) && num >= 1;
};

// Edad >= 0
const validarEdad = edad => {
    const num = parseInt(edad, 10);
    return Number.isInteger(num) && num >= 0;
};

// Unidad
const validarMedida = medida => medida !== "";

// Validar fecha con datetime-local ("2025-11-17T14:32")
const validarFecha = fechaIngresada => {
    if (!fechaIngresada) return false;

    const fechaMinima = new Date();
    fechaMinima.setHours(fechaMinima.getHours() + 3);

    const fecha = new Date(fechaIngresada);

    return fecha >= fechaMinima;
};

// Validación fotos (1 a 5 archivos)
const validarFotos = fotos => fotos.length >= 1 && fotos.length <= 5;


// ==========================
// FUNCIÓN PRINCIPAL
// ==========================
const validarForm = () => {
    const myForm = document.forms["form-adopcon"];

    // Obligatorios
    let region = myForm["region"].value;
    let comuna = myForm["comuna"].value;
    let nombre = myForm["nombre"].value;
    let email = myForm["email"].value.trim();
    let tipo = myForm["tipo"].value;
    let cantidad = myForm["cantidad"].value;
    let edad = myForm["edad"].value;
    let medida = myForm["unidad"].value;
    let fechaIngresada = myForm["fecha"].value;

    // Importante: Spring Boot requiere name="foto[]"
    let fotos = myForm["foto[]"] ? myForm["foto[]"].files : myForm["foto"].files;

    // Opcionales
    let sector = myForm["sector"].value.trim();
    let telefono = myForm["telefono"].value.trim();
    let red = myForm["red"].value.trim();
    let redId = myForm["red-id"].value.trim();

    let invalidInputs = [];
    let isValid = true;

    const addError = campo => {
        invalidInputs.push(campo);
        isValid = false;
    };

    // Validaciones
    if (!validarRegion(region)) addError("Región");
    if (!validarComuna(comuna)) addError("Comuna");
    if (!validarSector(sector)) addError("Sector");
    if (!validarNombre(nombre)) addError("Nombre");
    if (!validarEmail(email)) addError("Email");
    if (!validarTelefono(telefono)) addError("Teléfono");
    if (!validarRed(red, redId)) addError("Red social / ID");
    if (!validarTipo(tipo)) addError("Tipo");
    if (!validarCantidad(cantidad)) addError("Cantidad");
    if (!validarMedida(medida)) addError("Unidad de medida");
    if (!validarEdad(edad)) addError("Edad");
    if (!validarFotos(fotos)) addError("Fotos (entre 1 y 5)");
    if (!validarFecha(fechaIngresada)) addError("Fecha disponible");

    // UI elementos
    const validationBox = document.getElementById("val-box");
    const validationMessageElem = document.getElementById("val-msg");
    const validationListElem = document.getElementById("val-list");

    if (!isValid) {
        validationListElem.textContent = "";
        invalidInputs.forEach(campo => {
            const li = document.createElement("li");
            li.innerText = campo;
            validationListElem.appendChild(li);
        });

        validationMessageElem.innerText = "Los siguientes campos son inválidos:";
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";
        validationBox.hidden = false;

        return;
    }

    // Validación OK
    validationBox.hidden = true;
    myForm.style.display = "none";

    const mensajeExito = document.getElementById("mensaje-exito");
    const confirmacion = document.getElementById("confirmacion");

    confirmacion.style.display = "block";

    const confirmarSi = document.getElementById("confirmar-si");
    const confirmarNo = document.getElementById("confirmar-no");
    const volverPortada = document.getElementById("volver-portada");

    confirmarSi.onclick = () => {
        confirmacion.style.display = "none";
        mensajeExito.style.display = "block";
        myForm.submit();
    };

    confirmarNo.onclick = () => {
        confirmacion.style.display = "none";
        myForm.style.display = "block";
    };

    if (volverPortada) {
        volverPortada.onclick = () => {
            window.location.href = "/";
        };
    }
};


// ==========================
// ASIGNAR EVENTO SUBMIT
// ==========================
const confirmacion = document.getElementById("confirmacion");

document.forms["form-adopcon"].addEventListener("submit", e => {
    e.preventDefault();
    validarForm();
});
