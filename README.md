# Desarrollo de Aplicaciones Web (CC5002)

## Cuerpo Docente

- Profesor de cátedra: José Urzúa
- Profesor Auxiliar: Francisco Márquez

## Autor del Repositorio

- Jorge Cummins

## Sobre el Repositorio 
El siguiente repositorio contiene los desarrollos realizados para la "Tarea 2" del ramo "Desarrollo de Aplicaciones Web" impartido en la "Facultad de Ciencias Físicas y Matemáticas" de la Universidad de Chile. El objetivo de esta tarea fue la implementacion o una primera aproximación al "backend" utilizando el lenguaje de programación `python` en conjunto con el "framework" `flask` y `MySql` con el fin de agregar funcionalidades y manejo de bases de datos a la página creada en la tarea 1.

La estructura en la que se desarrolló la tarea fue la siguiente (por directorio):

### database
Directorio el cual contiene los archivos relacionados a la base de datos. En este se incluyeron tres archivos, dos otorgados por el cuerpo docente para crear la base de datos y un tercer archivo creado en este caso por el desarrollador de la tarea (es decir, yo) llamado `db.py` el cual tenía como propósito contener funciones y clases para manipular los datos y tablas respectivamente.

### static
Directorio, el cual tuvo dos principales propósitos: 
1. Servir como directorio que contenderá los archivos creados para la tarea 1 relacionada con el front end y que pudieran ser de utilidad. En este se encuentran archivos de estilo (`css`) y archivos para agregar dinamismo (`js`).
2. Directorio `uploads` el cual contiene las imágenes que los usuarios vayan ingresando. Por consistencia con el desarrollo inicial, se decidió dejar este directorio en esta dirección antes de incluirla finalmente en `database/`.

Es importante destacar que no todos los archivos aquí están en utilización, más aún, algunos fueron eliminados. Particularmente, se tiene el caso de:
- `avisos.js`: que intentaba emular una base de datos temporal, eliminado, pues en esta entrega se implementó una base de datos.
- `adoption-list.js`: archivo no eliminado, pero sí en desuso. Este archivo, dado a su relación con el archivo `avisos.js` tuvo que ser reacondicionado, en este caso aprovechando el motor `jinja2` e incluyéndolo en el archivo `adoption-list.html` que será explicado más adelante.

### templates 
Directorio el cual contiene los "templates" o archivos `html` que dan estructura a la página creada. Estos hacen uso del motor `jinja2` por su relación con `flask` y son adaptaciones de los que originalmente fueron creados para la tarea 1 con sus análogos de igual nombre. La principal diferencia radica en que se incluyó el archivo `base.html` que contiene fragmentos de código repetidos y la adaptación del archivo `adoption-list.html` al cual se hizo referencia previamente.

### utils
Directorio que contiene y contendrá los archivos de utilidades. Particularmente, cuenta con el archivo incluido para realizar las verificaciones respectivas.

### Archivos "sueltos"
Dado a la naturaleza del trabajo realizado, al utilizarse el framework `flask`, este desarrollo requirió un archivo `app.py` escrito en lenguaje `python` que permitiera ejecutar la tarea y manejar las direcciones de cada página. 
Además, se incluyó un archivo `requirements.txt` que contiene las librerías que son utilizadas/necesarias para la ejecución de la tarea.

## Arbol de archivos
```
desarrollo-aplicaciones-web
├── README.md
└── Tarea_2
    ├── __pycache__
    │   └── app.cpython-311.pyc
    ├── app.py
    ├── database
    │   ├── __pycache__
    │   │   └── db.cpython-311.pyc
    │   ├── db.py
    │   ├── region-comuna.sql
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
    │   │       ├── db
    │   │       │   └── region_comuna.js
    │   │       ├── form
    │   │       │   ├── adoption-form.js
    │   │       │   └── validation.js
    │   │       └── last-five.js
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
La tarea fue desarrollada siguiendo las soluciones de auxiliares (específicamente 4, 5 y 6). Esta tarea no es ajena a errores y cualquier detalle que se encuentre es totalmente bienvenido para poder realizar mejoras. Es importante aclarar que, dado los problemas con respecto a los tiempos, una cierta cantidad de errores arrastrados de la tarea 1 no pudieron ser arreglados y por ende prevalecen en el desarrollo, además de archivos no eliminados (uno mencionado previamente) no fue eliminado lo que puede llevar a confusión, todo lo relacionado a la funcionalidad de este fue traspasada al archivo también mencionado con anterioridad (`adoption-list.js` y `adoption-list.html` respectivamente)

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

[^1]: Mismas referencias de la tarea 1.

