package com.tarea4.tarea4.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FotoRepository extends JpaRepository<Foto, Integer> {
    Optional<Foto> findFirstByAvisoId(Integer avisoId);
}