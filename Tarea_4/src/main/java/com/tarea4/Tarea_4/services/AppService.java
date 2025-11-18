package com.tarea4.Tarea_4.services;

import com.tarea4.Tarea_4.models.Aviso;
import com.tarea4.Tarea_4.models.AvisoRepository;
import com.tarea4.Tarea_4.models.Comuna;
import com.tarea4.Tarea_4.models.ComunaRepository;
import com.tarea4.Tarea_4.models.Nota;
import com.tarea4.Tarea_4.models.NotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppService {

    private final AvisoRepository avisoRepository;
    private final ComunaRepository comunaRepository;
    private final NotaRepository notaRepository;

    public AppService(AvisoRepository avisoRepository,
                      ComunaRepository comunaRepository,
                      NotaRepository notaRepository) {
        this.avisoRepository = avisoRepository;
        this.comunaRepository = comunaRepository;
        this.notaRepository = notaRepository;
    }

    public List<Aviso> obtenerAvisosConPromedio() {
        List<Aviso> avisos = avisoRepository.findAll();

        for (Aviso aviso : avisos) {
            // Obtener nombre de la comuna usando el repositorio
            Comuna comuna = comunaRepository.findById(aviso.getComunaId()).orElse(null);
            if (comuna != null) {
                aviso.setNombreComuna(comuna.getNombre());
            }

            // Calcular promedio de notas
            List<Nota> notas = notaRepository.findByAvisoId(aviso.getId());
            if (!notas.isEmpty()) {
                double suma = 0;
                for (Nota nota : notas) {
                    suma += nota.getNota();
                }
                aviso.setPromedio(suma / notas.size());
            } else {
                aviso.setPromedio(null);
            }
        }

        return avisos;
    }
}