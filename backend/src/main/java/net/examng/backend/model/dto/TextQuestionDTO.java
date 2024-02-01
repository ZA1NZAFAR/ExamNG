package net.examng.backend.model.dto;

import lombok.Data;

@Data
public class TextQuestionDTO extends QuestionDTO {
    private final String type = "text";
}
