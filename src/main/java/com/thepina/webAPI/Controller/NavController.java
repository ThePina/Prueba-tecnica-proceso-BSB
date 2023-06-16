package com.thepina.webAPI.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class NavController {

    @RequestMapping("/")
    public ModelAndView home() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index"); // Establece el nombre de la vista "home"
        return modelAndView;
    }

    @RequestMapping("/charts")
    public ModelAndView graficos() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("charts"); // Establece el nombre de la vista "charts"
        return modelAndView;
    }

    @RequestMapping("/side")
    public ModelAndView side() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("side"); // Establece el nombre de la vista "charts"
        return modelAndView;
    }


 
}
