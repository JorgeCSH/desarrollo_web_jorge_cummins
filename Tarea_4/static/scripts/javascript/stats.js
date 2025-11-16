// Grafico 1, Avisos por dia
let chart1 = Highcharts.chart("grafico-avisos-dia", {
    chart: {
        type: "line",
    },
    title: {
        text: "Avisos de adopcion agregados por dia" },
    xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
            day: "%e %b",
        },
        title: {
            text: "Días",
        },
    },
    yAxis: {
        title: {
            text: "Cantidad de avisos",
        },
    },
    tooltip: {
        shared: true,
        crosshairs: true,
    },
    series: [
        {
            name: "Cantidad de avisos",
            data: [],
            lineWidth: 1,
        },
    ],
});

// Traer los datos del servidor
fetch("/api/stats/avisos-por-dia")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error en response`);
        }
        return response.json();
    })
    .then((data) => {
        if (!data.fechas || !data.cantidades) {
            console.error("Datos no validos", data);
            return;
        }
        const parsedData = data.fechas.map((fecha, i) => {
            const [year, month, day] = fecha.split("-").map((p) => parseInt(p, 10));
            return [
                Date.UTC(year, month - 1, day),
                data.cantidades[i]
            ];
        });
        if (chart1 && chart1.series && chart1.series[0]) {
            chart1.series[0].setData(parsedData);
        }
    })
    .catch((error) => {
        console.error("Error catcheado, avisos por dia: ", error);
    });


// Grafico 2: Avisos por tipo de mascota
let chart2 = Highcharts.chart("grafico-avisos-tipo", {
    chart: {
        type: "pie",
        height: 400
    },
    title: {
        text: "Total de avisos de adopción por tipo de mascota",
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
                enabled: true,
                format: "{point.name}: {point.y}"
            },
        },
    },
    series: [{
        name: "Cantidad",
        data: []
    }],
});
console.log("Gráfico 2 creado:", chart2);

fetch("/api/stats/avisos-por-tipo")
    .then((response) => {
        console.log("Response avisos-por-tipo:", response.status);
        if (!response.ok) {
            throw new Error(`Error en response`);
        }
        return response.json();
    })
    .then((data) => {
        if (!data.tipos || !data.cantidades) {
            console.error("Error de validacion: ", data);
            return;
        }
        const parsedData = data.tipos.map((tipo, i) => ({
            name: tipo.charAt(0).toUpperCase() + tipo.slice(1),
            y: data.cantidades[i],
        }));

        if (chart2 && chart2.series && chart2.series[0]) {
            chart2.series[0].setData(parsedData);
        }
    })
    .catch((error) => {
        console.error("Error catcheado ", error);
    });

let chart3 = Highcharts.chart("grafico-avisos-mes", {
    chart: {
        type: "column",
        height: 400
    },
    title: {
        text: "Avisos de adopción por mes según tipo de mascota",
    },
    xAxis: {
        categories: [],
        title: {
            text: "Meses",
        }
    },
    yAxis: {
        title: {
            text: "Cantidad",
        },
    },
    plotOptions: {
        column: {
            stacking: "normal",
        }
    },
    series: [
        {
            name: "Gatos",
            data: [],
        },
        {
            name: "Perros",
            data: [],
        },
    ],
});

fetch("/api/stats/avisos-por-mes")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error en response`);
        }
        return response.json();
    })
    .then((data) => {

        if (!data.meses || !data.gatos || !data.perros) {
            console.error("Datos no valido", data);
            return;
        }
        if (chart3 && chart3.xAxis && chart3.xAxis[0]) {
            chart3.xAxis[0].setCategories(data.meses);
        }
        if (chart3 && chart3.series) {
            if (chart3.series[0]) {
                chart3.series[0].setData(data.gatos);  // Serie de Gatos
            }
            if (chart3.series[1]) {
                chart3.series[1].setData(data.perros); // Serie de Perros
            }
        }
    })
    .catch((error) => {
        console.error("Error catcheado ", error);
    });