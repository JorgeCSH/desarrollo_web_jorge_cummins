document.addEventListener("DOMContentLoaded", () => {
    const bar = document.getElementById("navigation-bar");

    // HTML que se agregara
    bar.innerHTML = `
    <ul id="nav-bar">
      <li><a href="index.html">Inicio</a></li>
      <li><a href="adoption-list.html">Listado</a></li>
      <li><a href="adoption-stats.html">Estadísticas</a></li>
      <li><a href="add-adoption.html">Publicar Aviso</a></li>
    </ul>
  `;

    // Resaltar la pagina actual
    const curPage = window.location.pathname.split("/").pop();
    const links = bar.querySelectorAll("a");

    links.forEach(link => {
        if (link.getAttribute("href") === curPage) {
            link.classList.add("current");
        }
    });
});