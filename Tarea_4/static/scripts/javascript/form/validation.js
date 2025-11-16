// Validacion para la region. Falla si esta vacio.
const validarRegion = region => {
    return region !== "";
};

// Validacion para la comuna. Falla si esta vacio.
const validarComuna = comuna => {
    return comuna !== "";
};

// Validacion para el sector, si esta vacio no falla pero si no es asi, falla dependiendo del largo.
const validarSector = sector => {
    if (!sector) {
        return true;
    } else {
        return sector.length > 0 && sector.length <= 100;
    }
};

// Validadion para el nombre, falla si es menor a 3 o mayor a 200 caracteres.
const validarNombre = nombre => {
    return nombre.length >= 3 && nombre.length <= 200;
};

// Validacion para el email, falla si no tiene formato de email o es mayor a 100 caracteres.
const validarEmail = email => {
    const expRegMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expRegMail.test(email) && email.length <= 100;
};

// Validacion para el telefono, si esta vacio no falla pero si no es asi, falla dependiendo del formato.
const validarTelefono = telefono => {
    if (!telefono) {
        return true;
    } else {
        const expRegTel = /^\+\d{3}\.\d{8}$/;
        return expRegTel.test(telefono);
    }
};

// Validacion para la red social, si esta vacio no falla pero si no es asi, falla dependiendo del largo del ID.
const validarRed = (red, redId) => {
    if (!red) {
       return true
    } else {
        return redId.length >= 4 && redId.length <= 50;
    }
};

// Validacion para el tipo de mascota, falla si esta vacio.
const validarTipo = tipo => {
    return tipo !== "";
};

// Validacion para la cantidad, falla si no es un entero positivo mayor a 0.
const validarCantidad = (cantidad) => {
    const num = parseInt(cantidad, 10); // convierte a entero en base 10
    return Number.isInteger(num) && num >= 1;
};

// Validacion para la edad, falla si no es un entero positivo o 0.
const validarEdad = (edad) => {
    const num = parseInt(edad, 10);
    return Number.isInteger(num) && num >= 0;
};

// Validacion para la medida, falla si esta vacio.
const validarMedida = medida => {
    return medida !== "";
};

// Validacion para la fecha, falla si es menor a 3 horas desde el momento actual.
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

// Validacion para las fotos, falla si no hay al menos 1 foto o si hay mas de 5 fotos.
const validarFotos = fotos => {
    return fotos.length >= 1 && fotos.length <= 5;
};

// Funcion prinicpal usada para validar.
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

    // Lista de validados.
    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid &&= false;
    }

    // Aca empezamos a validar cada caso, esto en el orden que esta en el enunciado y formulario.
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


    // Caso de error, aca se crean elementos necesarios para mostrar el error.
    let validationBox = document.getElementById('val-box');
    let validationMessageElem = document.getElementById('val-msg');
    let validationListElem = document.getElementById('val-list');

    // Caso dodne falla la validacion.
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
    // La validacion fu3e exitosa.
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
            myForm.submit()
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

// "evento" para el formulario.
const confirmacion = document.getElementById("confirmacion");
document.forms["form-adopcon"].addEventListener("submit", evento => {
    evento.preventDefault();
    validarForm();

})
