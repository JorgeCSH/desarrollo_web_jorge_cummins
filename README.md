# Desarrollo de Aplicaciones Web (CC5002)

## Cuerpo Docente

- Profesor de cátedra: José Urzúa
- Profesor Auxiliar: Francisco Márquez

## Autor del Repositorio

- Jorge Cummins

## Sobre el Repositorio 
El siguiente repositorio contiene los desarrollos realizados para la "Tarea 3" del ramo "Desarrollo de Aplicaciones Web" impartido en la "Facultad de Ciencias Físicas y Matemáticas" de la Universidad de Chile. El objetivo de esta tarea era seguir el desarrollo del "backend" de la aplicación web, esta vez haciendo uso de llamadas asincrónicas al servidor.

Comparado con otras ocasiones, esta vez se mantuvo la misma estructura, pero con las siguientes peculiaridades:

### Cambios sobre Archivos
Se agregaron nuevos códigos a archivos ya existentes para poder realizar las llamadas al servidor. Entre estas se destacan modificaciones a las vistas, modificaciones a los `templates` de `adption-list.html` y sus respectivos estilos `css` y su análogo para las estadísticas (`stats.html`), que en un inicio había sido omitido. Además de incluir nuevas validaciones y funciones asociadas (`utils/`).

### Nuevos archivos
Se incluyeron nuevos archivos para poder realizar la implementación.
- `stats.js`: archivo para poder implementar los gráfico haciendo uso de `highcharts`.
- `comments.js`: archivo para poder incluir los comentarios (funciones asincrónicas).

## Arbol de archivos
```
desarrollo-aplicaciones-web
├── README.md
└── Tarea_3
    ├── __pycache__
    │   └── app.cpython-311.pyc
    ├── app.py
    ├── database
    │   ├── __pycache__
    │   │   └── db.cpython-311.pyc
    │   ├── db.py
    │   ├── region-comuna.sql
    │   ├── tabla-comentario.sql
    │   └── tarea2.sql
    ├── requirements.txt
    ├── static
    │   ├── css
    │   │   ├── adoption-form.css
    │   │   ├── adoption-list.css
    │   │   ├── body.css
    │   │   ├── recent-five.css
    │   │   ├── stats.css
    │   │   └── top-footer.css
    │   ├── img
    │   │   ├── adopcion
    │   │   │   ├── gato11.jpg
    │   │   │   ├── gato41.jpeg
    │   │   │   ├── gato42.jpg
    │   │   │   ├── gato43.jpeg
    │   │   │   ├── gato51.jpg
    │   │   │   ├── perro21.jpg
    │   │   │   ├── perro22.jpg
    │   │   │   ├── perro31.jpg
    │   │   │   └── perro32.jpeg
    │   │   └── stats
    │   │       ├── avisos-dia.png
    │   │       ├── avisos-torta.png
    │   │       └── mascota-mes.png
    │   ├── scripts
    │   │   └── javascript
    │   │       ├── adoption-list.js
    │   │       ├── comentarios.js
    │   │       ├── db
    │   │       │   └── region_comuna.js
    │   │       ├── form
    │   │       │   ├── adoption-form.js
    │   │       │   └── validation.js
    │   │       ├── last-five.js
    │   │       └── stats.js
    │   └── uploads
    │       └── fotos
    │           ├── 20251008194510_gato51.jpg
    │           ├── 20251008194704_perro22.jpg
    │           ├── 20251008195052_gato11.jpg
    │           ├── 20251008195052_gato41.jpeg
    │           ├── 20251008195052_gato42.jpg
    │           ├── 20251008195218_perro21.jpg
    │           ├── 20251008195218_perro31.jpg
    │           └── 20251008195501_gato43.jpeg
    ├── templates
    │   ├── add-adoption.html
    │   ├── adoption-list.html
    │   ├── adoption-stats.html
    │   ├── base.html
    │   └── index.html
    └── utils
        ├── __pycache__
        │   └── validations.cpython-311.pyc
        └── validations.py
```

## Palabras Finales
La tarea fue desarrollada siguiendo las soluciones de auxiliares (específicamente 7 y 8). Esta tarea no es ajena a errores y cualquier detalle que se encuentre es totalmente bienvenido para poder realizar mejoras. Es importante aclarar que, dado los problemas con respecto a los tiempos, una cierta cantidad de errores arrastrados de la tarea 1 y tarea 2 no pudieron ser arreglados y por ende prevalecen en el desarrollo, además de archivos no eliminados (uno mencionado previamente) no fue eliminado lo que puede llevar a confusión, todo lo relacionado a la funcionalidad de este fue traspasada al archivo también mencionado con anterioridad (`adoption-list.js` y `adoption-list.html` respectivamente). También se hace mención a posibles errores posibles heredados de la tarea 2 que, dado al tiempo, no se pudo corregir.

De esta forma, cualquier llamado de atención, error, sugerencia, etc. Es totalmente bienvenido y será recibido con la mejor de las intenciones para mejorar el desarrollo de tareas futuras o desarrollos futuros.

## Referencias[^1]:
### Imagenes: 
- https://commons.wikimedia.org/wiki/File:1_Year_old_male_Siberian_cat.jpg
- https://itoldya420.getarchive.net/amp/media/dogs-beach-wet-travel-vacation-1ec6b6
- https://worldanimalfoundation.org/dogs/how-to-socialize-dog/
- https://picryl.com/media/labrador-retriever-dog-animals-1e4c17
- https://www.pexels.com/photo/dogs-fighting-on-the-street-12483019/
- https://commons.wikimedia.org/wiki/File:One_Year_Old_Siamese_Tabby_Cat_1_2015-04-03.JPG
- https://commons.wikimedia.org/wiki/File:1_year_old_siberian_tabby_cat.jpg
- https://commons.wikimedia.org/wiki/File:One_Year_Old_Siamese-Tabby_Cat_19_2015-05-09.JPG
- https://commons.wikimedia.org/wiki/File:A-Cat.jpg
### Estructura `HTML`:
- https://www.buscalibre.cl/
- https://www.microsoft.com/en-us/windows?r=1
- https://ucampus.uchile.cl/m/fcfm_bia/
- https://www.w3schools.com/tags/tag_nav.asp
- https://www.w3schools.com/tags/tag_main.asp
- https://www.w3schools.com/tags/tag_footer.asp
### Estilo `CSS`:
(Se siguieron las instrucciones de la `w3school` e implementaron segun visto en catedras).
### Dinamismo `JavaScript`:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
### Estilo
- https://www.w3schools.com/howto/howto_js_topnav.asp
- https://www.google.com/search?q=hex+color&oq=hex+color&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIMCAEQABhDGIAEGIoFMgwIAhAAGEMYgAQYigUyBwgDEAAYgAQyBwgEEAAYgAQyDAgFEAAYQxiABBiKBTIMCAYQABhDGIAEGIoFMgwIBxAAGEMYgAQYigUyDAgIEAAYQxiABBiKBTIMCAkQABhDGIAEGIoF0gEIMTEzNGowajeoAgCwAgA&sourceid=chrome&ie=UTF-8
### Misc.
- https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event[^2]


[^1]: Mismas referencias de la tarea 1.
[^2]: incluido, pues no se había trabajado antes con esto y fue lo único que me permitió solucionar errores con tiempo.

