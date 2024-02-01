package net.examng.backend.service;

import net.examng.backend.model.dto.QuestionDTO;
import net.examng.backend.repository.ExamRepository;
import net.examng.backend.repository.ModuleRepository;
import net.examng.backend.repository.QuestionRepository;
import net.examng.backend.utilis.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class QuestionService {

    @Autowired
    private ModuleRepository moduleRepo;

    @Autowired
    private ExamRepository examRepo;
    @Autowired
    private QuestionRepository questionRepo;

    private boolean verifyURIPath(String moduleCode, String examId, String questionId) {
        var module = moduleRepo.findByCode(moduleCode);
        if (Objects.isNull(module)) {
            return false;
        }
        var exam = examRepo.findById(examId).orElse(null);
        if (Objects.isNull(exam) || !exam.getModuleCode().equals(moduleCode)) {
            return false;
        }
        if (questionId == null) {
            return true;
        }
        return exam.getQuestions().contains(questionId);
    }

    public QuestionDTO getQuestion(String moduleCode, String examId, String questionId) {
        if (!verifyURIPath(moduleCode, examId, questionId)) {
            return null;
        }
        var question = questionRepo.findById(questionId).orElse(null);
        return Mapper.mapToDTO(question);
    }

    public QuestionDTO putQuestion(String moduleCode, String examId, String questionId, QuestionDTO questionDTO) {
        if (!verifyURIPath(moduleCode, examId, questionId)) {
            return null;
        }
        var question = Mapper.mapToQuestion(questionDTO);
        question.setId(questionId);
        questionRepo.save(question);
        return Mapper.mapToDTO(question);
    }

    public ResponseEntity<?> addQuestion(String moduleCode, String examId, QuestionDTO questionDTO) {
        if (!verifyURIPath(moduleCode, examId, null)) {
            return ResponseEntity.notFound().build();
        }
        var exam = examRepo.findById(examId).orElse(null);
        var question = Mapper.mapToQuestion(questionDTO);
        var result = questionRepo.save(question);
        exam.getQuestions().add(result.getId());
        examRepo.save(exam);

        return ResponseEntity.ok().build();
    }

    public Page<QuestionDTO> getQuestions(String moduleCode, String examId, Pageable pageable) {
        if (!verifyURIPath(moduleCode, examId, null)) {
            return null;
        }
        var exam = examRepo.findById(examId).orElse(null);
        var questionPage = questionRepo.findAllById(exam.getQuestions(), pageable);
        List<QuestionDTO> questionDTOS = new ArrayList<>();
        questionPage.forEach(question -> questionDTOS.add(Mapper.mapToDTO(question)));
        return Mapper.mapToPage(questionDTOS, pageable);
    }

    public boolean deleteQuestion(String moduleCode, String examId, String questionId) {
        if (!verifyURIPath(moduleCode, examId, questionId)) {
            return false;
        }
        var exam = examRepo.findById(examId).orElse(null);
        exam.getQuestions().remove(questionId);
        examRepo.save(exam);
        questionRepo.deleteById(questionId);
        return true;
    }
}
