package net.examng.backend.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import net.examng.backend.model.Question;

import java.util.List;

@Data
@Getter
@Setter
public class ExamDTO {
    private String id;
    private long startTimestamp;
    private long endTimestamp;
    private String description;
    private boolean isValidated;
    private boolean isSubmitted;
    private List<Question> questions;
    private String moduleCode;
}
