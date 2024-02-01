package net.examng.backend.service;

import net.examng.backend.model.Email;
import net.examng.backend.model.Exam;
import net.examng.backend.model.enums.Enums;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class EmailService {


    @Autowired
    private JavaMailSender emailSender;

    @PostMapping("/send")
    public void sendEmail(@RequestBody Email email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email.getTo());
        message.setSubject(email.getSubject());
        message.setText(email.getBody());
        emailSender.send(message);
    }

    public void sendCreatedExamEmail(String moduleCode, Exam createdExam) {
        emailSender.send(new SimpleMailMessage() {{
            setTo(Enums.Emails.EXAMNG_EMAIL);
            setSubject(String.format(Enums.EmailMessages.NEW_EXAM_SUBJECT, moduleCode));
            setText(String.format(Enums.EmailMessages.NEW_EXAM_BODY, moduleCode, createdExam.getDescription()) + Enums.EmailMessages.FOOTER);
        }});
    }
}