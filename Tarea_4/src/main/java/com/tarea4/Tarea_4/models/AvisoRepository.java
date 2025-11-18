package com.tarea4.Tarea_4.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvisoRepository extends JpaRepository<Aviso, Long> {
}