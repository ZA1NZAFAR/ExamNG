package net.examng.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "modules")
public class Module {
    @Id
    private String code;
    private String description;
    private String imageURL;
    private List<String> exams;

    public void addExam(String examId) {
        exams.add(examId);
    }
}