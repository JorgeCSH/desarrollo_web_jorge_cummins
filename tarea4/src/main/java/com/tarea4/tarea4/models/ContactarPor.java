package com.tarea4.tarea4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "contactar_por")
public class ContactarPor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RedSocial nombre;

    @Column(nullable = false, length = 150)
    private String identificador;

    @ManyToOne
    @JoinColumn(name = "aviso_id", nullable = false)
    private AvisoAdopcion aviso;

    // Enum
    public enum RedSocial {
        whatsapp, telegram, X, instagram, tiktok, otra
    }

    public ContactarPor() {

    }


    public ContactarPor(RedSocial nombre, String identificador, AvisoAdopcion aviso) {
        this.nombre = nombre;
        this.identificador = identificador;
        this.aviso = aviso;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RedSocial getNombre() {
        return nombre;
    }

    public void setNombre(RedSocial nombre) {
        this.nombre = nombre;
    }

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    public AvisoAdopcion getAviso() {
        return aviso;
    }

    public void setAviso(AvisoAdopcion aviso) {
        this.aviso = aviso;
    }
}