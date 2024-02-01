package net.examng.backend.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ExamType {
    MCQ("MCQ"), TEXT("TEXT"), CODE("CODE");

    private final String type;

    private ExamType(String type) {
        this.type = type;
    }

    @JsonValue
    public String getType() {
        return type;
    }
}
