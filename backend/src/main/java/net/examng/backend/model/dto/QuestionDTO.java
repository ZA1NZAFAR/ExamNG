package net.examng.backend.model.dto;

import lombok.Data;
import net.examng.backend.model.Attachment;

import java.util.List;

@Data
public class QuestionDTO {
    private String id;
    protected String type;
    private String statement;
    private List<Attachment> attachments;
    private int coefficient;
}
