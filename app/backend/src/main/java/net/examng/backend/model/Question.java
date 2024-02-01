package net.examng.backend.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
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
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = MCQQuestion.class, name = "MCQ"),
        @JsonSubTypes.Type(value = TextQuestion.class, name = "TEXT"),
        @JsonSubTypes.Type(value = CodeQuestion.class, name = "CODE")
})
@Document(collection = "questions")
public class Question {
    private String id;
    private String statement;
    private List<Attachment> attachments;
    private int coefficient;
}