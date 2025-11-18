package com.tarea4.Tarea_4.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {
    List<Nota> findByAvisoId(Long avisoId);
}