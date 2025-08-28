# Desarrollo de Aplicaciones Web (CC5002)

## Cuerpo Docente

- Profesor de cátedra: José Urzúa
- Profesor Auxiliar: Francisco Márquez

## Autor del Repositorio

- Jorge Cummins

## Tarea 1
Actualmente, el desarrollo de la tarea se basa en 4 archivos `HTML` que interactúan entre sí mediante links utilizando la barra superior.

Se utilizan tags para seleccionar la estructura básica. Entre estas se divide (usando el tag `<div>`) la barra superior, se tiene un cuerpo principal usando el tag `<main>` y una barra inferior o tope inferior usando `<footer>`.

En este estado aún falta agregar dinamismo y la posibilidad de interactuar según los requisitos para interactuar con la página.

## Arbol de archivos
```
desarrollo-aplicaciones-web
├── README.md
└── Tarea_1
    ├── add-adoption.html
    ├── adoption-list.html
    ├── adoption-stats.html
    ├── index.html
    └── src
        ├── css
        │   ├── adoption-form.css
        │   ├── adoption-list.css
        │   ├── body.css
        │   ├── footer.css
        │   ├── recent-five.css
        │   └── top-bar.css
        ├── img
        │   └── le_meme.jpg
        └── javascript
            ├── adoption-form.js
            ├── adoption-list.js
            ├── navigation-bar.js
            └── region_comuna.js
```

## To-do List
- [x] Crear la estructura/diseño basico de la pagina web.
- [x] Agregar ultimas 5 publicaciones.
- [ ] Agregar opcion para estadisticas.
- [x] Agregar el listado de avisos de adopcion.
- [x] Agregar opcion para agregar publicaciones.
- [ ] Corregir el tag style de `adoption-list.html`.
- [ ] Comentar.
- [ ] Cambiar el spanglish.