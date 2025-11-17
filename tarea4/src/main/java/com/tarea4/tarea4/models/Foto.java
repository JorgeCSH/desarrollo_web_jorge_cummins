package com.tarea4.tarea4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "foto")
public class Foto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ruta_archivo", nullable = false, length = 300)
    private String rutaArchivo;

    @Column(name = "nombre_archivo", nullable = false, length = 300)
    private String nombreArchivo;

    @ManyToOne
    @JoinColumn(name = "aviso_id", nullable = false)
    private AvisoAdopcion aviso;

    public Foto() {

    }

    public Foto(String rutaArchivo, String nombreArchivo, AvisoAdopcion aviso) {
        this.rutaArchivo = rutaArchivo;
        this.nombreArchivo = nombreArchivo;
        this.aviso = aviso;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRutaArchivo() {
        return rutaArchivo;
    }

    public void setRutaArchivo(String rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }

    public String getNombreArchivo() {
        return nombreArchivo;
    }

    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    public AvisoAdopcion getAviso() {
        return aviso;
    }

    public void setAviso(AvisoAdopcion aviso) {
        this.aviso = aviso;
    }
}