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
    let myForm = document.forms["adoption-form"];
    let nombre = myForm["nombre"].value;
    let email = myForm["email"].value.trim();
    let telefono = myForm["telefono"].value.trim();
    //let red = myForm["red"].value.trim();
    //let redId = myForm["redId"].value.trim();
    let fotos = myForm["foto"].files;
    let fechaIngresada = myForm["fecha"].value;

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
        setInvalidInput("Telefono");
    }
    /*if (!validarRed(red, redId)) {
        setInvalidInput("Red Social o ID");
    }*/
    if (!validarFotos(fotos)) {
        setInvalidInput("fotos");
    }
    const fechaMinima = new Date();
    fechaMinima.setDate(fechaMinima.getDate() + 7);
    /*
    if (!validarFecha(fechaIngresada, fechaMinima.toISOString().split('T')[0])) {
        setInvalidInput("Fecha");
    }
    */

    let validationBox = document.getElementById('val-box');
    let validationMessageElem = document.getElementById('val-msg');
    let validationListElem = document.getElementById('val-list');
    let formContainer = document.querySelector(".main-container-form");

    if (!isValid) {
        validationListElem.textContent = "";
        for (let input of invalidInputs) {
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        }

        validationMessageElem.innerText = "Los siguientes campos son invalidos: ";

        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";

        validationBox.hidden = false;
    } else {
        myForm.style.display = "none";
        const mensajeExito = document.getElementById("mensaje-exito");
        confirmacion.style.display = "block";

        const confirmarSi = document.getElementById("confirmar-si");
        const confirmarNo = document.getElementById("confirmar-no");
        const volverPortada = document.getElementById("volver-portada");
        confirmarSi.addEventListener("click", () => {
            confirmacion.style.display = "none";
            mensajeExito.style.display = "block";
        });

        confirmarNo.addEventListener("click", () => {
            confirmacion.style.display = "none";
            myForm.style.display = "block";
        });

        volverPortada.addEventListener("click", () => {
            window.location.href = "index.html"; // ajustar según tu portada real
        });
    }
}

const confirmacion = document.getElementById("confirmacion");
document.forms["adoption-form"].addEventListener("submit", evento => {
    evento.preventDefault();
    validarForm();

})
