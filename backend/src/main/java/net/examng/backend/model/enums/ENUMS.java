package net.examng.backend.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ENUMS {
    EXAMNG0("examng0@gmail.com"),NEW_EXAM("New Exam");

    private final String type;

    private ENUMS(String type) {
        this.type = type;
    }

    @JsonValue
    public String getType() {
        return type;
    }
}
