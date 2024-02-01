package net.examng.backend.model;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Email {
    private String to;
    private String subject;
    private String body;
}
