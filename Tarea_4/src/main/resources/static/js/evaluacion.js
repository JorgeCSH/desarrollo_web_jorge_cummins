const evaluarAviso = (button) => {
    const avisoId = button.getAttribute('data-aviso-id');

    const nota = prompt('Ingrese una nota entre 1 y 7 para evaluar este aviso:');

    if (nota === null || nota.trim() === '') return;

    const notaNum = parseInt(nota);

    if (isNaN(notaNum) || notaNum < 1 || notaNum > 7 || nota.includes('.')) {
        alert('Error: La nota debe ser un número entero entre 1 y 7');
        return;
    }

    button.disabled = true;

    fetch(`/api/avisos/${avisoId}/notas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `valor=${notaNum}`
    }).then(response =>
            !response.ok ? response.json().then(data => {
                throw new Error(data.message || 'Error al agregar la nota');
            }) : response.json()
        ).then(data => {
            if (data.success) {
                const notaCell = document.querySelector(`.nota-cell[data-aviso-id="${avisoId}"]`);
                if (notaCell) {
                    const promedio = data.promedio;
                    notaCell.innerHTML = `<span>${promedio.toFixed(1)}</span>`;
                }
            } else {
                alert('Error: ' + data.message);
            }
            button.disabled = false;
            button.textContent = 'evaluar';
        }).catch(error => {
            console.error('Error:', error);
            alert('Error al agregar la nota: ' + error.message);
            button.disabled = false;
            button.textContent = 'evaluar';
        });
};
