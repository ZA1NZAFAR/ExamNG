package net.examng.backend.model.dto;

import lombok.Data;

@Data
public class CodeQuestionDTO extends QuestionDTO {
    private final String type = "code";
    private String defaultLanguage;
    private String initialCode;
}
