export const validarNombre = nombre =>
    nombre.length >= 3 && nombre.length <= 200;

export const validarEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) && email.length <= 100;
};

export const validarTelefono = telefono => {
    if (!telefono) return true; // opcional
    const regex = /^\+\d{3}\.\d{8}$/;
    return regex.test(telefono);
};

export const validarRed = (red, redId) => {
    if (!red) return true; // opcional
    return redId.length >= 4 && redId.length <= 50;
};

export const validarFotos = fotos => {
    return fotos.length >= 1 && fotos.length <= 5;
};

export const validarFecha = (fechaIngresada, fechaMinima) => {
    if (!fechaIngresada) return false;
    return new Date(fechaIngresada) >= new Date(fechaMinima);
};

export const validarForm = () => {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const red = document.getElementById('red').value.trim();
    const redId = document.getElementById('redId').value.trim();
    const fotos = document.getElementById('fotos').files;
    const fechaIngresada = document.getElementById('fecha').value;

    let invalidInputs = [];
    let isValid = true;

    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid &&= false;
    }

    if (!validarNombre(nombre)) {
        setInvalidInput("Nombre");
    }
    if (!validarEmail(email)) {
        setInvalidInput("Email");
    }
    if (!validarTelefono(telefono)) {
        setInvalidInput("Teléfono");
    }
    if (!validarRed(red, redId)) {
        setInvalidInput("Red Social o ID");
    }
    if (!validarFotos(fotos)) {
        setInvalidInput("Fotos");
    }
    const fechaMinima = new Date();
    fechaMinima.setDate(fechaMinima.getDate() + 7);
    if (!validarFecha(fechaIngresada, fechaMinima.toISOString().split('T')[0])) {
        setInvalidInput("Fecha");
    }

    let validationBox = document.getElementById('val-box');
    let validationMessageElem = document.getElementById('val-msg');
    let validationListElem = document.getElementById('val-list');
    let formContainer = document.querySelector(".main-container");

    if (!isValid) {
        validationListElem.textContent = "";
        for (input of invalidInputs) {
            validationListElem.document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        }

        validationMessageElem.innerText = "Los siguientes campos son invalidos: ";

        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";

        validationBox.hidden = false;
    }
}