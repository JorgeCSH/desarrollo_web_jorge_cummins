package com.tarea4.Tarea_4.controllers;

import com.tarea4.Tarea_4.services.ApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final ApiService apiService;
    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    @PostMapping("/avisos/{id}/notas")
    public ResponseEntity<Map<String, Object>> agregarNota(@PathVariable Long id, @RequestParam Integer valor) {
        Map<String, Object> response = apiService.agregarNota(id, valor);
        if ((Boolean) response.get("success")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}