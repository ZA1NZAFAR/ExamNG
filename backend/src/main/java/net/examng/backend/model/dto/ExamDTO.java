package net.examng.backend.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import net.examng.backend.model.Module;

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
    private SummaryFields summaryFields;
    @Data
    @Getter
    @Setter
    public static
    class SummaryFields {
        private Module module;
        private int average;

    }
}
