package net.examng.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class HelloWorldController {

    @GetMapping("/hello-world")
    @Operation(summary = "Returns a simple hello world message")
    public String helloWorld() {
        return "Hi there! This is the ExamNG backend. Version 0.0.1";
    }
}