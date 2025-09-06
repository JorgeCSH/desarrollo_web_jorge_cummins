# Desarrollo de Aplicaciones Web (CC5002)

## Cuerpo Docente

- Profesor de cátedra: José Urzúa
- Profesor Auxiliar: Francisco Márquez

## Autor del Repositorio

- Jorge Cummins

## Sobre el Repositorio 
El siguiente repositorio contiene los desarrollos realizados para la "Tarea 1" del ramo "Desarrollo de Aplicaciones Web" impartido en la "Facultad de Ciencias Físicas y Matemáticas" de la Universidad de Chile. El objetivo de esta primera entrega (es decir, de la tarea 1) fue la realización del "front-end" de una página web haciendo uso de solamente de las herramientas `HTML` para darle estructura a la página, `CSS` para darle estilo y el uso del lenguaje de programación `JavaScript` para otorgarle dinamismo, interactividad y un medio de validación a los datos ingresados.
La estructura en la que se desarrolló la tarea fue la siguiente:

### Estructura usando `HTML`
La página se dividió (siguiendo las instrucciones de enunciado) en 4 secciones, una página de inicio, una página de listado de datos, una página de estadísticas y una página de formulario. Para esto, se crearon cuatro archivos `HTML` en los cuales se desarrolló cada página de la aplicación web que fueron denominadas: `index.html`, `adoption-list.html`, `adoption-stats.html` y `add-adoption.html` respectivamente.

El conjunto de todas estas páginas estiladas y dinamizadas usando `CSS` y `JavaScript` fue el principal soporte que le dio estructura a la página, donde en cada una se implementó lo solicitado por enunciado.

Para el caso de las cuatro páginas, cada una se seccionó en tres con el fin de tener una "estructura" de página en la cual siguiera la siguiente "filosofía": barra de navegación - contenido - barra inferior (o footer) inspirado en el diseño de diversas páginas como las de "U-Campus", "Microsoft", "Busca Libre" entre otras, donde en la barra de navegación se pueden acceder a las distintas partes de la página, en el contenido se encuentra el contenido de esta y en el "footer" palabras finales o información, donde en este caso se incluyo un enlace al repositorio mismo. Lo cual finalmente significó tener una estructura divida por tres `tags`: `nav` - `main` - `footer`, para el orden previo, respectivamente, donde su obtención y funcionamiento se basaron en la información obtenible en la página de la `w3school`[^1].

Finalmente, para el formulario implementado en la sección de dar en adopción, este se dividió en tres usando un formulario principal (puesto a que se interpretó que el enunciado pedía "Desplegar un formulario", el cual usando "headers" entre secciones.

### Estilo usando `CSS`
Para el caso del estilado de la página, se incluyo un directorio `src` el que contiene las utilidades de la página. Específicamente, se crearon seis archivos `css` para estilar y poder ordenar lo que se estaba creando. Estos fueron:

1. `body.css`: archivo el cual tiene estilos globales[^2], esto es, estilos que serán usados en toda la página a menos que se decida crear uno para el caso específico. Ejemplo, los botones.
2. `top-footer`: para evitar tener que reescribir la barra de navegación y el "footer" de la página, además de simplificar la posibilidad de modificar cómo estaban estilados estos últimos, se creó un archivo `css` para poder contener sus clases.
3. `recent-five`: archivo el que contiene los estilos de la tabla de últimos 5 valores subidos a la plataforma.
4. `adoption-list`: para estilar la lista de archivos.
5. `stats`: para poder estilar la pestaña de estadísticas.
6. `adoption-form`: para poder estilar el formulario.

Cabe destacar que, pese a los intentos, igual se llegó a realizar elementos repetidos, los cuales se intentaron remover. Si bien se estima que estos fueron eliminados, existe una posibilidad de que alguno siga en los archivos.

También es interesante resaltar la división de los archivos, pues se buscó "separar" los casos generales de los específicos. Es por esto que se crearon los archivos 1 y 2 para contener los estilos globales y específicos de las barras, mientras que los 3, 4, 5 y 6 para estilar cada página respectivamente según su nombre.

### Dinamismo usando `JavaScript`:
El dinamismo de la página se logro/implemento utilizando el lenguaje de programación `JavaScript`. Al igual que en el caso del estilo haciendo uso de `CSS`, los códigos se implementaron en diversos archivos en un directorio llamado `javascript` dentro de `src.`. Debido a las diferentes opciones que, utilidades y herramientas que provee `JavaScript` (el cual puede que sea abreviado como `js` en este documento), se dividió el directorio en otros subdirectorios además de archivos generales. Esto es:

#### db
Si bien no se pensó en implementar bases de datos, pues corresponde al "back-end" de la página (y además se explicitó que no era necesario), se creyó este directorio con el fin de contener archivos `js` que tuvieran datos con el fin de acceder de manera más simple y mantener el orden en el resto de archivos. Estos tienen la única finalidad de tener arreglos con los datos que son usados y después exportados-importados, mecánica la cual se obtuvo desde la página de "mozilla developer", de esta forma se pueden tener en documentos apartes la lista de región-comuna dada por el cuerpo docente y una lista extra creada específicamente para el desarrollo de esta tarea que contenga datos inventados sobre posibles publicaciones. Esto fue consultado al profesor auxiliar, el cual no tuvo problemas con esta implementación.

#### form
Para la realización del `form`, se tomó inspiración en las clases auxiliares donde se usaban dos archivos, uno para realizar las validaciones y otro para la selección de valores. Esta mecánica fue adaptada e implementada para el desarrollo de esta tarea y los archivos incluidos en el directorio respectivo, en este caso, el archivo `validation.js` contiene las funciones para validar (además de la función de validación) y el archivo `adoption-form.js` para interactuar con los inputs.

#### Archivos generales
Además de los directorios nombrados, se incluyeron dos archivos `js` para complementar el dinamismo y la interacción con los datos inventados, esto no solo tuvo la intención de acceder a los datos, más bien con el fin de evitar implementar todo usando valores estáticos en la estructura `HTML` y poder practicar y familiarizarse con el lenguaje, por ende, para los valores desplegados como últimos 5 en la página de inicio (también llamada "home" o `index`) se realizaron implementaciones dinámicas con `js` que seleccionan los últimos 5 valores de la lista con respecto a la fecha de publicada, el cómo trabajar con `Date()` fue siguiendo la documentación de "mozilla developer". Esto también se incluyó para el listado general, con lo cual se puede agregar una cantidad x de datos y de igual manera se mostrarán en el inicio las últimas 5 publicaciones.



## Arbol de archivos
```
desarrollo-aplicaciones-web
│   README.md
│
├───.idea
│       .gitignore
│       desarrollo_web_jorge_cummins.iml
│       modules.xml
│       vcs.xml
│       workspace.xml
│
└───Tarea_1
    │   add-adoption.html
    │   adoption-list.html
    │   adoption-stats.html
    │   index.html
    │
    └───src
        ├───css
        │       adoption-form.css
        │       adoption-list.css
        │       body.css
        │       recent-five.css
        │       stats.css
        │       top-footer.css
        │
        ├───img
        │   ├───adopcion
        │   │       gato11.jpg
        │   │       gato41.jpeg
        │   │       gato42.jpg
        │   │       gato43.jpeg
        │   │       gato51.jpg
        │   │       perro21.jpg
        │   │       perro22.jpg
        │   │       perro31.jpg
        │   │       perro32.jpeg
        │   │
        │   └───stats
        │           avisos-dia.png
        │           avisos-torta.png
        │           mascota-mes.png
        │
        └───javascript
            │   adoption-list.js
            │   last-five.js
            │
            ├───db
            │       avisos.js
            │       region_comuna.js
            │
            └───form
                    adoption-form.js
                    validation.js
```

## Referencias:
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


[^1]: Se incluira el enlace a la pagina en cada uno de los tags, aunque se siguio el flujo de la pagina de la "w3school" para obtener mas informacion de cada tag (desde la pagina del tag incluida).

[^2]: No se si el termino esta bien acuñado, pero es con el fin de referirme a aquellos que no estan en una clase especifica.