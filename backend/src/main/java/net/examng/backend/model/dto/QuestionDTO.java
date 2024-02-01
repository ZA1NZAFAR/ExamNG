package net.examng.backend.model.dto;

import lombok.Data;
import net.examng.backend.model.Attachment;

import java.util.List;

@Data
public class QuestionDTO {
    private String id;
    protected QuestionType type;
    private String statement;
    private List<Attachment> attachments;
    private List<OptionDTO> options;
    private int coefficient;
    private String defaultLanguage;
    private String initialCode;

    public enum QuestionType {
        mcq, code, text
    }
}
