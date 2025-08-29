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
