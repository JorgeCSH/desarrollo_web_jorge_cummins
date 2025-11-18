package com.tarea4.Tarea_4.models;

import jakarta.persistence.*;

@Entity
@Table
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aviso_id", nullable = false)
    private Long avisoId;

    @Column(name = "nota", nullable = false)
    private Integer nota;

    public Nota() {
    }

    public void setAvisoId(Long avisoId) {
        this.avisoId = avisoId;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }
}