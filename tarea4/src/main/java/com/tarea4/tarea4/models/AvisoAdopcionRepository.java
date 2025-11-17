package com.tarea4.tarea4.models;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public interface AvisoAdopcionRepository extends JpaRepository<AvisoAdopcion, Integer> {

    // Obtener los últimos avisos
    List<AvisoAdopcion> findTop5ByOrderByFechaIngresoDesc();

    // Paginación
    Page<AvisoAdopcion> findAllByOrderByFechaIngresoDesc(Pageable pageable);

    // Estadísticas: avisos por día
    @Query("SELECT CAST(a.fechaIngreso AS date) as fecha, COUNT(a) as cantidad " +
            "FROM AvisoAdopcion a GROUP BY CAST(a.fechaIngreso AS date) ORDER BY fecha")
    List<Object[]> countAvisosPorDia();

    // Estadísticas: avisos por tipo
    @Query("SELECT a.tipo, COUNT(a) FROM AvisoAdopcion a GROUP BY a.tipo")
    List<Object[]> countAvisosPorTipo();

    // Estadísticas: avisos por mes y tipo
    @Query("SELECT FUNCTION('DATE_FORMAT', a.fechaIngreso, '%Y-%m') as mes, a.tipo, COUNT(a) as cantidad " +
            "FROM AvisoAdopcion a GROUP BY mes, a.tipo ORDER BY mes, a.tipo")
    List<Object[]> countAvisosPorMesYTipo();
}