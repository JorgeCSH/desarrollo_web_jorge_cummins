package com.tarea4.Tarea_4.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "aviso_adopcion")
public class Aviso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_ingreso", nullable = false)
    private LocalDateTime fechaIngreso;

    @Column(name = "comuna_id", nullable = false)
    private Integer comunaId;

    @Column(length = 100)
    private String sector;

    @Column(nullable = false, length = 200)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(length = 15)
    private String celular;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoMascota tipo;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(nullable = false)
    private Integer edad;

    @Enumerated(EnumType.STRING)
    @Column(name = "unidad_medida", nullable = false)
    private UnidadMedida unidadMedida;

    @Column(name = "fecha_entrega", nullable = false)
    private LocalDateTime fechaEntrega;

    @Column(length = 500)
    private String descripcion;

    @Transient
    private String nombreComuna;

    @Transient
    private Double promedio;

    public enum TipoMascota {
        gato, perro
    }

    public enum UnidadMedida {
        a, m
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDateTime fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Integer getComunaId() {
        return comunaId;
    }


    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public TipoMascota getTipo() {
        return tipo;
    }

    public void setTipo(TipoMascota tipo) {
        this.tipo = tipo;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public UnidadMedida getUnidadMedida() {
        return unidadMedida;
    }

    public void setUnidadMedida(UnidadMedida unidadMedida) {
        this.unidadMedida = unidadMedida;
    }

    public LocalDateTime getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(LocalDateTime fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }


    public String getNombreComuna() {
        return nombreComuna;
    }

    public void setNombreComuna(String nombreComuna) {
        this.nombreComuna = nombreComuna;
    }

    public Double getPromedio() {
        return promedio;
    }

    public void setPromedio(Double promedio) {
        this.promedio = promedio;
    }
}