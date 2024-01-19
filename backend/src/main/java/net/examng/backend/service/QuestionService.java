package net.examng.backend.service;

import net.examng.backend.model.Question;
import net.examng.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepo;

    public Question getQuestion(String questionId) {
        return questionRepo.findById(questionId).orElse(null);
    }
}
