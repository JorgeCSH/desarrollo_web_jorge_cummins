package com.tarea4.tarea4.controllers;

import com.tarea4.tarea4.services.ApiService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final ApiService apiService;
    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    // Estadisitas de avisos por dia
    @GetMapping("/stats/avisos-por-dia")
    public ResponseEntity<Map<String, Object>> avisosPorDia() {
        try {
            Map<String, Object> datos = apiService.getAvisosPorDia();
            return ResponseEntity.ok(datos);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener estadísticas");
            error.put("mensaje", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Estadisticas de aviso por tipo
    @GetMapping("/stats/avisos-por-tipo")
    public ResponseEntity<Map<String, Object>> avisosPorTipo() {
        try {
            Map<String, Object> datos = apiService.getAvisosPorTipo();
            return ResponseEntity.ok(datos);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener estadísticas");
            error.put("mensaje", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Estadisticas de avbisos por mes.
    @GetMapping("/stats/avisos-por-mes")
    public ResponseEntity<Map<String, Object>> avisosPorMes() {
        try {
            Map<String, Object> datos = apiService.getAvisosPorMes();
            return ResponseEntity.ok(datos);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener estadísticas");
            error.put("mensaje", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Agregar comentarios
    @PostMapping("/avisos/{avisoId}/comentarios")
    public ResponseEntity<Map<String, Object>> agregarComentario(
            @PathVariable Integer avisoId,
            @RequestParam String nombre,
            @RequestParam String texto) {

        Map<String, Object> response = new HashMap<>();

        // Verificar que el aviso existe
        if (!apiService.existeAviso(avisoId)) {
            response.put("success", false);
            List<String> errores = new ArrayList<>();
            errores.add("El aviso no existe");
            response.put("errores", errores);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // Validar datos
        List<String> errores = validarComentario(nombre, texto);
        if (!errores.isEmpty()) {
            response.put("success", false);
            response.put("errores", errores);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            Integer comentarioId = apiService.crearComentario(avisoId, nombre, texto);

            if (comentarioId == null) {
                response.put("success", false);
                errores.add("Error al guardar el comentario");
                response.put("errores", errores);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }

            response.put("success", true);
            response.put("mensaje", "Comentario agregado exitosamente");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            response.put("success", false);
            errores.add("Error al guardar el comentario: " + e.getMessage());
            response.put("errores", errores);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Obtener comentarios.
    @GetMapping("/avisos/{avisoId}/comentarios")
    public ResponseEntity<Map<String, Object>> obtenerComentarios(@PathVariable Integer avisoId) {
        Map<String, Object> response = new HashMap<>();

        try {
            List<Map<String, Object>> comentarios = apiService.getComentariosPorAviso(avisoId);
            response.put("success", true);
            response.put("comentarios", comentarios);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Error al obtener comentarios: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    private List<String> validarComentario(String nombre, String texto) {
        List<String> errores = new ArrayList<>();

        // Validar nombre
        if (nombre == null || nombre.trim().isEmpty()) {
            errores.add("El nombre es obligatorio");
        } else if (nombre.trim().length() < 3) {
            errores.add("El nombre debe tener al menos 3 caracteres");
        } else if (nombre.trim().length() > 80) {
            errores.add("El nombre no puede tener más de 80 caracteres");
        }

        // Validar texto
        if (texto == null || texto.trim().isEmpty()) {
            errores.add("El texto del comentario es obligatorio");
        } else if (texto.trim().length() < 5) {
            errores.add("El comentario debe tener al menos 5 caracteres");
        } else if (texto.trim().length() > 300) {
            errores.add("El comentario no puede tener más de 300 caracteres");
        }

        return errores;
    }
}
