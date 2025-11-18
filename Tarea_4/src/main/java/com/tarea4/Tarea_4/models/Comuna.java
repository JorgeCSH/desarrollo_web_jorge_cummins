package com.tarea4.Tarea_4.models;

import jakarta.persistence.*;

@Entity
@Table
public class Comuna {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false, length = 200)
    private String nombre;


    public Comuna() {
    }

    public String getNombre() {
        return nombre;
    }

}