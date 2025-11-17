package com.tarea4.tarea4.controllers;

import com.tarea4.tarea4.services.AppService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
public class AppController {
    private final AppService appService;
    public AppController(AppService appService) {
        this.appService = appService;
    }

    // Ruta principal (root).
    @GetMapping("/")
    public String index(Model model, @RequestParam(required = false) String mensaje) {
        List<Map<String, Object>> avisos = appService.getUltimosAvisos();
        model.addAttribute("avisos", avisos);
        model.addAttribute("activePage", "index");
        if (mensaje != null) {
            model.addAttribute("mensaje", mensaje);
        }
        return "index";
    }

    // Ruta de listado de mascotas en adopcion
    @GetMapping("/adoption-list")
    public String adoptionList(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) Integer avisoId, Model model) {

        // En caso de que haya un id en la ruta, entonces mostramos el aviso con ese id en detalle.
        if (avisoId != null) {
            Map<String, Object> detalle = appService.getAvisoDetalle(avisoId);

            if (detalle == null) {
                return "redirect:/adoption-list?page=" + page;
            }

            model.addAttribute("detalle", detalle);
            model.addAttribute("page", page);
            model.addAttribute("mostrarDetalle", true);
            model.addAttribute("activePage", "adoption_list");
            return "adoption-list";
        }

        // En cualquier otro caso, listamos los avisos.
        Map<String, Object> resultado = appService.getAvisosPaginados(page, 5);

        model.addAttribute("avisos", resultado.get("avisos"));
        model.addAttribute("page", page);
        model.addAttribute("totalPages", resultado.get("totalPages"));
        model.addAttribute("mostrarDetalle", false);
        model.addAttribute("activePage", "adoption_list");

        return "adoption-list";
    }


    // Formulario para agregar un aviso. En este caso get porque es para obtener el formulario.
    @GetMapping("/add-adoption")
    public String formAddAdoption(Model model) {
        model.addAttribute("activePage", "add_adoption");
        return "add-adoption";
    }

    // Formulario para agregar aviso, en este caso es post porque se usa para envia rel formulario.
    @PostMapping("/add-adoption")
    public String addAdoption(
            @RequestParam String region,
            @RequestParam String comuna,
            @RequestParam(required = false) String sector,
            @RequestParam String nombre,
            @RequestParam String email,
            @RequestParam(required = false) String telefono,
            @RequestParam(required = false) String red,
            @RequestParam(name = "red-id", required = false) String redId,
            @RequestParam String tipo,
            @RequestParam String cantidad,
            @RequestParam String edad,
            @RequestParam String unidad,
            @RequestParam String fecha,
            @RequestParam(required = false) String descripcion,
            @RequestParam("foto") List<MultipartFile> fotos, Model model, RedirectAttributes redirectAttributes) {

        List<String> errores = validarFormulario(comuna, nombre, email, tipo, cantidad, edad, unidad, fecha, fotos);

        if (!errores.isEmpty()) {
            model.addAttribute("errores", errores);
            model.addAttribute("activePage", "add_adoption");

            Map<String, String> formData = new HashMap<>();
            formData.put("region", region);
            formData.put("comuna", comuna);
            formData.put("sector", sector);
            formData.put("nombre", nombre);
            formData.put("email", email);
            formData.put("telefono", telefono);
            model.addAttribute("formData", formData);

            return "add-adoption";
        }

        try { //TODO: buscar una forma de hacerlo sin el try catch abominable que hice
            // Parseo flexible de fecha
            LocalDateTime fechaEntrega;
            DateTimeFormatter fmtT = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
            DateTimeFormatter fmtSpace = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

            if (fecha.contains("T")) {
                fechaEntrega = LocalDateTime.parse(fecha, fmtT);
            } else {
                fechaEntrega = LocalDateTime.parse(fecha, fmtSpace);
            }

            // Map con los datos a enviar al servicio
            Map<String, Object> datos = new HashMap<>();
            datos.put("region", region);
            datos.put("comuna", comuna);
            datos.put("sector", sector != null ? sector : "");
            datos.put("nombre", nombre);
            datos.put("email", email);
            datos.put("celular", telefono != null ? telefono : "");
            datos.put("tipo", tipo);
            datos.put("cantidad", cantidad);
            datos.put("edad", edad);
            datos.put("unidad", unidad);
            datos.put("descripcion", descripcion != null ? descripcion : "");
            datos.put("fechaEntrega", fechaEntrega);

            if (red != null && !red.isEmpty() && redId != null && !redId.isEmpty()) {
                datos.put("red", red);
                datos.put("redId", redId);
            }

            Integer id = appService.crearAviso(datos, fotos);

            if (id == null) {
                errores.add("Error: Comuna no encontrada");
                model.addAttribute("errores", errores);
                model.addAttribute("activePage", "add_adoption");
                return "add-adoption";
            }

            redirectAttributes.addAttribute("mensaje", "Aviso de adopción agregado exitosamente");
            return "redirect:/";

        } catch (IOException e) {
            model.addAttribute("errores", Collections.singletonList("Error al guardar fotos: " + e.getMessage()));
            model.addAttribute("activePage", "add_adoption");
            return "add-adoption";

        } catch (Exception e) {
            model.addAttribute("errores", Collections.singletonList("Error al procesar: " + e.getMessage()));
            model.addAttribute("activePage", "add_adoption");
            return "add-adoption";
        }
    }

    // Pagina para mostrar las estadisticas.
    @GetMapping("/adoption-stats")
    public String adoptionStats(Model model) {
        model.addAttribute("activePage", "adoption_stats");
        return "adoption-stats";
    }

    // Validaciones.
    private List<String> validarFormulario(String comuna, String nombre, String email, String tipo, String cantidad, String edad, String unidad, String fecha, List<MultipartFile> fotos) {

        List<String> errores = new ArrayList<>();

        if (comuna == null || comuna.isEmpty())
            errores.add("Debe seleccionar una comuna");

        if (nombre == null || nombre.trim().length() < 3 || nombre.length() > 200)
            errores.add("El nombre debe tener entre 3 y 200 caracteres");

        if (email == null || !email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"))
            errores.add("Debe ingresar un email válido");

        if (!"perro".equals(tipo) && !"gato".equals(tipo))
            errores.add("Debe seleccionar el tipo");

        try {
            int c = Integer.parseInt(cantidad);
            if (c < 1) errores.add("La cantidad debe ser mayor a 0");
        } catch (Exception e) {
            errores.add("Cantidad inválida");
        }

        try {
            int e = Integer.parseInt(edad);
            if (e < 1) errores.add("La edad debe ser mayor a 0");
        } catch (Exception e) {
            errores.add("Edad inválida");
        }

        if (unidad == null || (!unidad.equals("Meses") && !unidad.equals("Años")))
            errores.add("Unidad inválida (use m/a)");

        // Validar fecha flexible
        if (fecha == null || fecha.isEmpty()) {
            errores.add("Debe ingresar una fecha");
        } else {
            try {
                DateTimeFormatter fmtT = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
                DateTimeFormatter fmtSpace = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

                LocalDateTime f = fecha.contains("T")
                        ? LocalDateTime.parse(fecha, fmtT)
                        : LocalDateTime.parse(fecha, fmtSpace);

                if (f.isBefore(LocalDateTime.now()))
                    errores.add("La fecha debe ser futura");

            } catch (Exception e) {
                errores.add("Formato de fecha inválido");
            }
        }

        // Validar fotos
        if (fotos == null || fotos.isEmpty() || fotos.getFirst().isEmpty()) {
            errores.add("Debe subir al menos una foto");
        } else {
            for (MultipartFile f : fotos) {
                if (!f.isEmpty() && !appService.isAllowedFile(f.getOriginalFilename())) {
                    errores.add("Archivo no permitido: " + f.getOriginalFilename());
                }
            }
        }

        return errores;
    }
}