package com.tarea4.Tarea_4.services;

import com.tarea4.Tarea_4.models.Nota;
import com.tarea4.Tarea_4.models.NotaRepository;
import com.tarea4.Tarea_4.models.AvisoRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApiService {

    private final NotaRepository notaRepository;
    private final AvisoRepository avisoRepository;

    public ApiService(NotaRepository notaRepository, AvisoRepository avisoRepository) {
        this.notaRepository = notaRepository;
        this.avisoRepository = avisoRepository;
    }

    public Map<String, Object> agregarNota(Long avisoId, Integer valor) {
        Map<String, Object> response = new HashMap<>();

        // Validar que el aviso existe
        if (!avisoRepository.existsById(avisoId)) {
            response.put("success", false);
            response.put("message", "El aviso no existe");
            return response;
        }

        // Validar que la nota este entre 1 y 7
        if (valor < 1 || valor > 7) {
            response.put("success", false);
            response.put("message", "La nota debe estar entre 1 y 7");
            return response;
        }

        // Crear y guardar la nota
        Nota nota = new Nota();
        nota.setAvisoId(avisoId);
        nota.setNota(valor);
        notaRepository.save(nota);

        // Calcular el nuevo promedio usando el repositorio
        List<Nota> notas = notaRepository.findByAvisoId(avisoId);
        double suma = 0;
        for (Nota n : notas) {
            suma += n.getNota();
        }
        double promedio = suma / notas.size();

        response.put("success", true);
        response.put("message", "Nota agregada correctamente");
        response.put("promedio", promedio);

        return response;
    }
}