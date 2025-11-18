package com.tarea4.Tarea_4.controllers;

import com.tarea4.Tarea_4.models.Aviso;
import com.tarea4.Tarea_4.services.AppService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class AppController {

    private final AppService appService;
    public AppController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/")
    public String index(Model model) {
        List<Aviso> avisos = appService.obtenerAvisosConPromedio();
        model.addAttribute("avisos", avisos);
        return "index";
    }
}