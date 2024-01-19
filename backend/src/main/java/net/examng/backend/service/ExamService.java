package net.examng.backend.service;

import net.examng.backend.model.Exam;
import net.examng.backend.model.Question;
import net.examng.backend.model.dto.ExamDTO;
import net.examng.backend.repository.ExamRepository;
import net.examng.backend.repository.ModuleRepository;
import net.examng.backend.repository.QuestionRepository;
import net.examng.backend.utilis.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ExamService {


    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private ExamRepository examRepo;


    public List<Exam> getExamsForModule(String moduleCode) {
        return examRepo.findAllByModuleCode(moduleCode);
    }

    public Exam getExam(String moduleCode, String examId) {
        return getExamsForModule(moduleCode).stream().filter(e -> e.getId().equals(examId)).findFirst().orElse(null);
    }

    public Exam addExam(String moduleCode, ExamDTO exam) {
        exam.setModuleCode(moduleCode);
        List<Question> ids = questionRepo.saveAll(exam.getQuestions());
        List<String> questionIds = new ArrayList<>();
        ids.forEach(question -> questionIds.add(question.getId()));
        Exam toSave = Mapper.mapToExam(exam);
        toSave.setQuestions(questionIds);
        return examRepo.save(toSave);
    }

    public ResponseEntity<?> addQuestion(String moduleCode, String examId, Question question) {
        Exam exam = getExam(moduleCode, examId);
        if (Objects.isNull(exam)) {
            return ResponseEntity.notFound().build();
        }
        exam.getQuestions().add(questionRepo.save(question).getId());
        examRepo.save(exam);

        return ResponseEntity.ok().build();
    }

    public List<Question> getQuestions(String moduleCode, String examId) {
        Exam exam = getExam(moduleCode, examId);
        List<Question> questions = new ArrayList<>();
        exam.getQuestions().forEach(questionId -> {
            questions.add(questionRepo.findById(questionId).orElse(null));
        });
        return questions;
    }

    public void deleteExam(String moduleCode, String examId) {
        Exam exam = getExam(moduleCode, examId);
        examRepo.delete(exam);
    }
}