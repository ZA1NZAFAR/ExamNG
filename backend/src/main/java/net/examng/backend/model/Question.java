package net.examng.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.examng.backend.model.enums.ExamType;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    private String id;
    private String statement;
    private ExamType type;
    private List<Attachment> attachments;
    private int coefficient;

}