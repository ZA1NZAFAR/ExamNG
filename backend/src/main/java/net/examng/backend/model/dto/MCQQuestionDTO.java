package net.examng.backend.model.dto;

import lombok.Data;
import net.examng.backend.model.Option;

import java.util.List;

@Data
public class MCQQuestionDTO extends QuestionDTO {
    private final String type = "mcq";
    private List<Option> options;
}
