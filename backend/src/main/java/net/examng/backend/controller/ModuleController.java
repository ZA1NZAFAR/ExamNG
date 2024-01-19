package net.examng.backend.controller;

import net.examng.backend.model.Exam;
import net.examng.backend.model.Module;
import net.examng.backend.model.Question;
import net.examng.backend.model.dto.ExamDTO;
import net.examng.backend.service.ExamService;
import net.examng.backend.service.ModuleService;
import net.examng.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/modules")
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @Autowired
    private ExamService examService;

    @Autowired
    private QuestionService questionService;


    // Module endpoints
    @GetMapping("/")
    public List<Module> getModules() {
        return moduleService.getAllModules();
    }

    @GetMapping("/{moduleCode}")
    public Module getModule(@PathVariable String moduleCode) {
        return moduleService.getModule(moduleCode);
    }

    @PostMapping("/")
    public Module addModule(@RequestBody Module module) {
        return moduleService.addModule(module);
    }

    @PutMapping("/{moduleCode}")
    public Module updateModule(@PathVariable String moduleCode, @RequestBody Module updatedModule) {
        return moduleService.updateModule(moduleCode, updatedModule);
    }

    @DeleteMapping("/{moduleCode}")
    public void deleteModule(@PathVariable String moduleCode) {
        moduleService.deleteModule(moduleCode);
    }

    // Exam endpoints

    @PostMapping("/{moduleCode}/addExam")
    public ResponseEntity<Exam> addExam(@PathVariable String moduleCode, @RequestBody ExamDTO newExam) {
        return moduleService.addExam(moduleCode, newExam);
    }

    @GetMapping("/{moduleCode}/exams")
    public List<Exam> getExams(@PathVariable String moduleCode) {
        return moduleService.getExams(moduleCode);
    }

    @GetMapping("/{moduleCode}/exams/{examId}")
    public Exam getExam(@PathVariable String moduleCode, @PathVariable String examId) {
        return examService.getExam(moduleCode, examId);
    }

    @PutMapping("/{moduleCode}/exams/{examId}")
    public Exam updateExam(@PathVariable String moduleCode, @PathVariable String examId, @RequestBody ExamDTO updatedExam) {
        throw new UnsupportedOperationException("This feature is not yet implemented");
    }

    @DeleteMapping("/{moduleCode}/exams/{examId}")
    public void deleteExam(@PathVariable String moduleCode, @PathVariable String examId) {
        examService.deleteExam(moduleCode, examId);
    }


    // Question endpoints

    @PostMapping("/{moduleCode}/exams/{examId}/addQuestion")
    public ResponseEntity<?> addQuestion(@PathVariable String moduleCode, @PathVariable String examId, @RequestBody Question question) {
        return examService.addQuestion(moduleCode, examId, question);
    }

    @GetMapping("/{moduleCode}/exams/{examId}/questions")
    public List<Question> getQuestions(@PathVariable String moduleCode, @PathVariable String examId) {
        return examService.getQuestions(moduleCode, examId);
    }

    @GetMapping("/{moduleCode}/exams/{examId}/questions/{questionId}")
    public Question getQuestion(@PathVariable String moduleCode, @PathVariable String examId, @PathVariable String questionId) {
        return questionService.getQuestion(questionId);
    }
}
