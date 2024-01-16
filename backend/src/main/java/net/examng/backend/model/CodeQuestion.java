package net.examng.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CodeQuestion extends Question {

    private String defaultLanguage;
    private String initialCode;

    // Getters and setters
}