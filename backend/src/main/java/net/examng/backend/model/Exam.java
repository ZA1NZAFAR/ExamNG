package net.examng.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "exams")
public class Exam {

    private String id;
    private long startTimestamp;
    private long endTimestamp;
    private String description;
    private boolean isValidated;
    private boolean isSubmitted;
    private List<Question> questions;
    private String moduleCode;



    // Getters and setters

}