package com.tarea4.tarea4.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ComunaRepository extends JpaRepository<Comuna, Integer> {
    Optional<Comuna> findByNombre(String nombre);
}