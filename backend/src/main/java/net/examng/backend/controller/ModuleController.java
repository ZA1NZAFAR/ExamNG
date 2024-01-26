package net.examng.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import net.examng.backend.model.Exam;
import net.examng.backend.model.Module;
import net.examng.backend.model.Question;
import net.examng.backend.model.dto.ExamDTO;
import net.examng.backend.service.ExamService;
import net.examng.backend.service.ModuleService;
import net.examng.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    @GetMapping("")
    @CrossOrigin(origins = "*")
    @Operation(summary = "Get all modules with pagination")
    public Page<Module> getModules(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
        return moduleService.getAllModules(PageRequest.of(page - 1, pageSize));
    }
    @GetMapping("/{moduleCode}")
    @Operation(summary = "Get a module by its code")
    public Module getModule(@PathVariable String moduleCode) {
        return moduleService.getModule(moduleCode);
    }

    @PostMapping("/")
    @Operation(summary = "Add a new module")
    public Module addModule(@RequestBody Module module) {
        return moduleService.addModule(module);
    }

    @PutMapping("/{moduleCode}")
    @Operation(summary = "Update a module")
    public Module updateModule(@PathVariable String moduleCode, @RequestBody Module updatedModule) {
        return moduleService.updateModule(moduleCode, updatedModule);
    }

    @DeleteMapping("/{moduleCode}")
    @Operation(summary = "Delete a module")
    public void deleteModule(@PathVariable String moduleCode) {
        moduleService.deleteModule(moduleCode);
    }

    // Exam endpoints

    @PostMapping("/{moduleCode}/addExam")
    @Operation(summary = "Add a new exam to a module")
    public ResponseEntity<Exam> addExam(@PathVariable String moduleCode, @RequestBody ExamDTO newExam) {
        return moduleService.addExam(moduleCode, newExam);
    }

    @GetMapping("/{moduleCode}/exams")
    @Operation(summary = "Get all exams of a module")
    public List<Exam> getExams(@PathVariable String moduleCode) {
        return moduleService.getExams(moduleCode);
    }

    @GetMapping("/{moduleCode}/exams/{examId}")
    @Operation(summary = "Get an exam by its id")
    public Exam getExam(@PathVariable String moduleCode, @PathVariable String examId) {
        return examService.getExam(moduleCode, examId);
    }

    @PutMapping("/{moduleCode}/exams/{examId}")
    @Operation(summary = "Update an exam")
    public Exam updateExam(@PathVariable String moduleCode, @PathVariable String examId, @RequestBody ExamDTO updatedExam) {
        throw new UnsupportedOperationException("This feature is not yet implemented");
    }

    @DeleteMapping("/{moduleCode}/exams/{examId}")
    @Operation(summary = "Delete an exam")
    public void deleteExam(@PathVariable String moduleCode, @PathVariable String examId) {
        examService.deleteExam(moduleCode, examId);
    }


    // Question endpoints

    @PostMapping("/{moduleCode}/exams/{examId}/addQuestion")
    @Operation(summary = "Add a new question to an exam")
    public ResponseEntity<?> addQuestion(@PathVariable String moduleCode, @PathVariable String examId, @RequestBody Question question) {
        return examService.addQuestion(moduleCode, examId, question);
    }

    @GetMapping("/{moduleCode}/exams/{examId}/questions")
    @Operation(summary = "Get all questions of an exam")
    public List<Question> getQuestions(@PathVariable String moduleCode, @PathVariable String examId) {
        return examService.getQuestions(moduleCode, examId);
    }

    @GetMapping("/{moduleCode}/exams/{examId}/questions/{questionId}")
    @Operation(summary = "Get a question by its id")
    public Question getQuestion(@PathVariable String moduleCode, @PathVariable String examId, @PathVariable String questionId) {
        return questionService.getQuestion(questionId);
    }
}
