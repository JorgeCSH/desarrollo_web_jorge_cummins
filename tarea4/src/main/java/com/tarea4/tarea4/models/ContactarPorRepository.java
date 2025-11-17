package com.tarea4.tarea4.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactarPorRepository extends JpaRepository<ContactarPor, Integer> {
}