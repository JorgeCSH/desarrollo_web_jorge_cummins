package com.tarea4.tarea4.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    List<Comentario> findByAvisoIdOrderByFechaDesc(Integer avisoId);
}