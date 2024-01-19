package net.examng.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class HelloWorldController {

    @GetMapping("/hello-world")
    public String helloWorld() {
        return "Hi there! This is the ExamNG backend. Version 0.0.1";
    }
}