const validarRegion = region => {
    return region !== "";
};

const validarComuna = comuna => {
    return comuna !== "";
};

const validarSector = sector => {
    if (!sector) {
        return true;
    } else {
        return sector.length > 0 && sector.length <= 100;
    }
};

const validarNombre = nombre => {
    return nombre.length >= 3 && nombre.length <= 200;
};

const validarEmail = email => {
    const expRegMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expRegMail.test(email) && email.length <= 100;
};

const validarTelefono = telefono => {
    if (!telefono) {
        return true;
    } else {
        const expRegTel = /^\+\d{3}\.\d{8}$/;
        return expRegTel.test(telefono);
    }
};

const validarRed = (red, redId) => {
    if (!red) {
       return true
    } else {
        return redId.length >= 4 && redId.length <= 50;
    }
};

const validarTipo = tipo => {
    return tipo !== "";
};

const validarCantidad = (cantidad) => {
    const num = parseInt(cantidad, 10); // convierte a entero en base 10
    return Number.isInteger(num) && num >= 1;
};

const validarEdad = (edad) => {
    const num = parseInt(edad, 10);
    return Number.isInteger(num) && num >= 0;
};

const validarMedida = medida => {
    return medida !== "";
};

const validarFecha = (fechaIngresada) => {
    if (!fechaIngresada) {
        return false;
    } else {
        const fechaMinimaPermitida = new Date();
        fechaMinimaPermitida.setHours(fechaMinimaPermitida.getHours() + 3);
        const fecha = new Date(fechaIngresada);
        return fecha >= fechaMinimaPermitida;
    }
};

const validarFotos = fotos => {
    return fotos.length >= 1 && fotos.length <= 5;
};


const validarForm = () => {
    // Validaciones obligatorias.
    let myForm = document.forms["form-adopcon"];
    let region = myForm["region"].value;
    let comuna = myForm["comuna"].value;
    let nombre = myForm["nombre"].value;
    let email = myForm["email"].value.trim();
    let tipo = myForm["tipo"].value;
    let cantidad = myForm["cantidad"].value;
    let edad = myForm["edad"].value;
    let medida = myForm["unidad"].value;
    let fechaIngresada = myForm["fecha"].value;
    let fotos = myForm["foto"].files;

    // Validaciones opcionales.
    let sector = myForm["sector"].value.trim();
    let telefono = myForm["telefono"].value.trim();
    let red = myForm["red"].value.trim();
    let redId = myForm["red-id"].value.trim();

    let invalidInputs = [];
    let isValid = true;

    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid &&= false;
    }

    if (!validarRegion(region)) {
        setInvalidInput("Region");
    }
    if (!validarComuna(comuna)) {
        setInvalidInput("Comuna");
    }

    if (!validarSector(sector)) {
        setInvalidInput("Sector");
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
    if (!validarRed(red, redId)) {
        setInvalidInput("Red Social o ID");
    }
    if (!validarTipo(tipo)) {
        setInvalidInput("Tipo");
    }
    if (!validarCantidad(cantidad)) {
       setInvalidInput("Cantidad");
    }
    if (!validarMedida(medida)) {
        setInvalidInput("Medida");
    }
    if (!validarEdad(edad)) {
        setInvalidInput("Edad");
    }
    if (!validarFotos(fotos)) {
        setInvalidInput("fotos");
    }

    if (!validarFecha(fechaIngresada)) {
        setInvalidInput("Fecha");
    }


    let validationBox = document.getElementById('val-box');
    let validationMessageElem = document.getElementById('val-msg');
    let validationListElem = document.getElementById('val-list');

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
        validationBox.hidden = true;
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
document.forms["form-adopcon"].addEventListener("submit", evento => {
    evento.preventDefault();
    validarForm();

})
