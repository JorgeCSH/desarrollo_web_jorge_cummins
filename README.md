# Desarrollo de Aplicaciones Web (CC5002)

## Cuerpo Docente

- Profesor de cátedra: José Urzúa
- Profesor Auxiliar: Francisco Márquez

## Autor del Repositorio

- Jorge Cummins

## Sobre el Repositorio 
El siguiente repositorio contiene los desarrollos realizados para la "Tarea 4" del ramo "Desarrollo de Aplicaciones Web" impartido en la "Facultad de Ciencias Físicas y Matemáticas" de la Universidad de Chile. El objetivo de esta tarea era implementar una aplicación web haciendo uso del framework Spring Boot junto al lenguaje de programación `java` como backend, donde se pudieran calificar diferentes posts de adopción de mascotas.

Esta implementación difirió de otras realizadas en tareas pasadas principalmente en el hecho de que no se desarrolló por sobre el proyecto original; sin embargo, sí se usó la que debería ser la base de datos análoga del respectivo proyecto.

## Composición del proyecto

### Controllers y Services
Se incluyeron dos `controllers` y dos `services` análogos a los desarrollados en clase auxiliar.

### Models
Dado que se trataba de un proyecto que funcionaba bajo la lógica de un patrón de diseño vista-modelo-controlador, este contó con modelos para poder implementar diversas funcionalidades. Cada uno de estos modelos contó con una interfaz que, siguiendo lo visto en clase auxiliar, se denominó `Repository`, siendo todo archivo terminado bajo este sufijo las interfaces. Es importante destacar que cada modelo es notoriamente diferente a los otros; la razón es que algunos son más extensos y contienen más funcionalidades que no fueron necesariamente utilizadas, pero que se incorporaron dado que, en un inicio, la tarea se empezó a desarrollar bajo el supuesto de que debía continuarse con los desarrollos de las tareas anteriores, esto es, migrar todo el proyecto realizado en `Flask` a `Spring Boot` y después desarrollar lo solicitado. En última instancia me percaté de que no era así[^1] y hubo algunos archivos que, para evitar problemas, se dejaron sin mayores modificaciones (particularmente `Aviso.java`).

### Static
En este directorio se incluyeron archivos relacionados al aspecto estático de la página. Son importantes destacar:
- `index.html`: archivo HTML implementado, el cual hace uso de `thymeleaf` en vez de `jinja2` (eso sí, no usa `fragments/`).
- `style.css`: archivo de diseño de la página. Comparado con otras versiones de la tarea (y en vigor del tiempo), se optó por mantener un diseño minimalista y funcional.
- `evaluacion.js`: archivo `JavaScript` que dio dinamismo y permitió realizar llamadas asíncronas.

## Arbol de archivos
```
desarrollo-aplicaciones-web
│   README.md
└───Tarea_4
    │   HELP.md
    │   mvnw
    │   mvnw.cmd
    │   pom.xml
    │
    ├───.mvn
    │   └───wrapper
    │           maven-wrapper.properties
    │
    ├───src
    │   ├───main
    │   │   ├───java
    │   │   │   └───com
    │   │   │       └───tarea4
    │   │   │           └───Tarea_4
    │   │   │               │   Tarea4Application.java
    │   │   │               │
    │   │   │               ├───controllers
    │   │   │               │       ApiController.java
    │   │   │               │       AppController.java
    │   │   │               │       
    │   │   │               ├───models
    │   │   │               │       Aviso.java
    │   │   │               │       AvisoRepository.java
    │   │   │               │       Comuna.java
    │   │   │               │       ComunaRepository.java
    │   │   │               │       Nota.java
    │   │   │               │       NotaRepository.java
    │   │   │               │
    │   │   │               └───services
    │   │   │                       ApiService.java
    │   │   │                       AppService.java
    │   │   │
    │   │   └───resources
    │   │       │   application.properties
    │   │       │
    │   │       ├───static
    │   │       │   ├───css
    │   │       │   │       styles.css
    │   │       │   │
    │   │       │   ├───db
    │   │       │   │       region-comuna.sql
    │   │       │   │       tabla-comentario.sql
    │   │       │   │       tabla-nota.sql
    │   │       │   │       tarea2.sql
    │   │       │   │
    │   │       │   └───js
    │   │       │           evaluacion.js
    │   │       │
    │   │       └───templates
    │   │           │   index.html
    │   │           │
    │   │           └───fragments
    │   └───test
    │       └───java
    │           └───com
    │               └───tarea4
    │                   └───Tarea_4
    │                           Tarea4ApplicationTests.java
    │
    └───target
        ├───classes
        │   │   application.properties
        │   │
        │   ├───com
        │   │   └───tarea4
        │   │       └───Tarea_4
        │   │           │   Tarea4Application.class
        │   │           │   
        │   │           ├───controllers
        │   │           │       ApiController.class
        │   │           │       AppController.class
        │   │           │
        │   │           ├───models
        │   │           │       Aviso$TipoMascota.class
        │   │           │       Aviso$UnidadMedida.class
        │   │           │       Aviso.class
        │   │           │       AvisoRepository.class
        │   │           │       Comuna.class
        │   │           │       ComunaRepository.class
        │   │           │       Nota.class
        │   │           │       NotaRepository.class
        │   │           │
        │   │           └───services
        │   │                   ApiService.class
        │   │                   AppService.class
        │   │
        │   ├───static
        │   │   ├───css
        │   │   │       styles.css
        │   │   │
        │   │   ├───db
        │   │   │       region-comuna.sql
        │   │   │       tabla-comentario.sql
        │   │   │       tabla-nota.sql
        │   │   │       tarea2.sql
        │   │   │
        │   │   └───js
        │   │           evaluacion.js
        │   │
        │   └───templates
        │           index.html
        │
        ├───generated-sources
        │   └───annotations
        ├───generated-test-sources
        │   └───test-annotations
        └───test-classes
            └───com
                └───tarea4
                    └───Tarea_4
                            Tarea4ApplicationTests.class

```

## Palabras Finales
La tarea tomó gran inspiración de los desarrollos del auxiliar 10, como puede verse en su estructura. Es importante mencionar que, dadas las condiciones en que se desarrolló esta tarea, donde inicialmente se migró todo el proyecto, cuando se realizó la versión final esta fue realizada de manera menos precavida y, por ende, no está exenta de errores. Otro caso particular se puede ver en la inconsistencia de algunos archivos, donde pueden encontrarse métodos o funcionalidades que no son usadas, las cuales eran usadas (o esperaban a ser usadas) en el proyecto final usando `Spring Boot`.

De esta forma, cualquier llamado de atención, error, sugerencia, etc., es totalmente bienvenido y será recibido con la mejor de las intenciones para mejorar el desarrollo de tareas futuras o desarrollos futuros.

## Referencias[^2]:
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
- https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event 


[^1]: Si se explora en los commits anteriores, puede percatarse de que se habia logrado migrar todo el proyecto de `Flask` a `Spring Boot`, me di cuenta....2 horas antes de la entrega.
[^2]: Se dejaron las mismas referencias de las tareas 1, 2 y 3 en caso de que fueran necesarias pues todo medio que podria haber sido usado, tambien fue obtenido de estas bibliografias.

