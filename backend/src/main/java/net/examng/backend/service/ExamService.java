package net.examng.backend.service;

import net.examng.backend.model.Exam;
import net.examng.backend.model.Question;
import net.examng.backend.model.dto.ExamDTO;
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
public class ExamService {


    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private ExamRepository examRepo;
    @Autowired
    private ModuleRepository moduleRepo;

    public Page<ExamDTO> getExamsForModule(String moduleCode, Pageable pageable) {
        var exams = examRepo.findAllByModuleCode(moduleCode, pageable);
        List<ExamDTO> examDTOS = new ArrayList<>();
        exams.forEach(exam -> {
            var module = moduleRepo.findByCode(moduleCode);
            // TODO: calculate average
            var average = 0;
            var questions = new ArrayList<Question>();
            exam.getQuestions().forEach(questionId -> {
                questions.add(questionRepo.findById(questionId).orElse(null));
            });
            var examDTO = Mapper.mapToDTO(exam, module, average);
            examDTO.setQuestions(questions);
            examDTOS.add(examDTO);
        });
        return Mapper.mapToPage(examDTOS, exams.getPageable());
    }

    public ExamDTO getExam(String moduleCode, String examId) {
        var exam = examRepo.findById(examId).orElse(null);
        if (Objects.isNull(exam) || !exam.getModuleCode().equals(moduleCode)) {
            return null;
        }
        // TODO: calculate average
        var average = 0;
        var module = moduleRepo.findByCode(moduleCode);
        return Mapper.mapToDTO(exam, module, average);
    }

    public Exam addExam(String moduleCode, ExamDTO examDTO) {
        Exam exam = Mapper.mapToExam(examDTO);
        exam.setModuleCode(moduleCode);
        List<Question> ids = questionRepo.saveAll(examDTO.getQuestions());
        List<String> questionIds = new ArrayList<>();
        ids.forEach(question -> questionIds.add(question.getId()));
        exam.setQuestions(questionIds);
        return examRepo.save(exam);
    }

    public ResponseEntity<?> addQuestion(String moduleCode, String examId, Question question) {
        ExamDTO examDTO = getExam(moduleCode, examId);
        if (Objects.isNull(examDTO)) {
            return ResponseEntity.notFound().build();
        }
        Exam exam = Mapper.mapToExam(examDTO);
        exam.getQuestions().add(questionRepo.save(question).getId());
        examRepo.save(exam);

        return ResponseEntity.ok().build();
    }

    public List<Question> getQuestions(String moduleCode, String examId) {
        ExamDTO examDTO = getExam(moduleCode, examId);
        Exam exam = Mapper.mapToExam(examDTO);
        List<Question> questions = new ArrayList<>();
        exam.getQuestions().forEach(questionId -> {
            questions.add(questionRepo.findById(questionId).orElse(null));
        });
        return questions;
    }

    public void deleteExam(String moduleCode, String examId) {
        ExamDTO examDTO = getExam(moduleCode, examId);
        Exam exam = Mapper.mapToExam(examDTO);
        examRepo.delete(exam);
    }
}