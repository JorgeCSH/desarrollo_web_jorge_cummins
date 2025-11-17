package com.tarea4.tarea4.services;

import com.tarea4.tarea4.models.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ApiService {

    private final AvisoAdopcionRepository avisoRepository;
    private final ComentarioRepository comentarioRepository;

    public ApiService (
            AvisoAdopcionRepository avisoRepository,
            ComentarioRepository comentarioRepository) {
        this.avisoRepository = avisoRepository;
        this.comentarioRepository = comentarioRepository;
    }

    /**
     * Obtiene estadísticas de avisos por día
     */
    public Map<String, Object> getAvisosPorDia() {
        List<Object[]> resultados = avisoRepository.countAvisosPorDia();

        List<String> fechas = new ArrayList<>();
        List<Long> cantidades = new ArrayList<>();

        for (Object[] row : resultados) {
            LocalDate fecha = (LocalDate) row[0];
            Long cantidad = (Long) row[1];

            fechas.add(fecha.toString());
            cantidades.add(cantidad);
        }

        Map<String, Object> datos = new HashMap<>();
        datos.put("fechas", fechas);
        datos.put("cantidades", cantidades);

        return datos;
    }

    /**
     * Obtiene estadísticas de avisos por tipo
     */
    public Map<String, Object> getAvisosPorTipo() {
        List<Object[]> resultados = avisoRepository.countAvisosPorTipo();

        List<String> tipos = new ArrayList<>();
        List<Long> cantidades = new ArrayList<>();

        for (Object[] row : resultados) {
            AvisoAdopcion.TipoMascota tipo = (AvisoAdopcion.TipoMascota) row[0];
            Long cantidad = (Long) row[1];

            tipos.add(tipo.name());
            cantidades.add(cantidad);
        }

        Map<String, Object> datos = new HashMap<>();
        datos.put("tipos", tipos);
        datos.put("cantidades", cantidades);

        return datos;
    }

    /**
     * Obtiene estadísticas de avisos por mes y tipo
     */
    public Map<String, Object> getAvisosPorMes() {
        List<Object[]> resultados = avisoRepository.countAvisosPorMesYTipo();

        // Organizar datos por mes
        Map<String, Map<String, Long>> mesesMap = new LinkedHashMap<>();

        for (Object[] row : resultados) {
            String mes = (String) row[0];
            AvisoAdopcion.TipoMascota tipo = (AvisoAdopcion.TipoMascota) row[1];
            Long cantidad = (Long) row[2];

            mesesMap.putIfAbsent(mes, new HashMap<>());
            mesesMap.get(mes).put(tipo.name(), cantidad);
        }

        // Crear listas para el resultado
        List<String> meses = new ArrayList<>(mesesMap.keySet());
        List<Long> perros = new ArrayList<>();
        List<Long> gatos = new ArrayList<>();

        for (String mes : meses) {
            Map<String, Long> data = mesesMap.get(mes);
            perros.add(data.getOrDefault("perro", 0L));
            gatos.add(data.getOrDefault("gato", 0L));
        }

        Map<String, Object> datos = new HashMap<>();
        datos.put("meses", meses);
        datos.put("perros", perros);
        datos.put("gatos", gatos);

        return datos;
    }

    // Creacion de comentarios
    public Integer crearComentario(Integer avisoId, String nombre, String texto) {
        Optional<AvisoAdopcion> avisoOpt = avisoRepository.findById(avisoId);

        if (avisoOpt.isEmpty()) {
            return null;
        }

        Comentario comentario = new Comentario();
        comentario.setNombre(nombre.trim());
        comentario.setTexto(texto.trim());
        comentario.setFecha(LocalDateTime.now());
        comentario.setAviso(avisoOpt.get());

        comentario = comentarioRepository.save(comentario);
        return comentario.getId();
    }

    // Obtiene comentarios
    public List<Map<String, Object>> getComentariosPorAviso(Integer avisoId) {
        List<Comentario> comentarios = comentarioRepository.findByAvisoIdOrderByFechaDesc(avisoId);

        return comentarios.stream().map(comentario -> {
            Map<String, Object> comentarioMap = new HashMap<>();
            comentarioMap.put("id", comentario.getId());
            comentarioMap.put("nombre", comentario.getNombre());
            comentarioMap.put("texto", comentario.getTexto());
            comentarioMap.put("fecha", comentario.getFecha());
            return comentarioMap;
        }).collect(Collectors.toList());
    }

    // Valida la existencia de un aviso
    public boolean existeAviso(Integer avisoId) {
        return avisoRepository.existsById(avisoId);
    }
}