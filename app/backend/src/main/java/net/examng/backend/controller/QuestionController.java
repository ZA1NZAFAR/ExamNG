package net.examng.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import net.examng.backend.model.dto.QuestionDTO;
import net.examng.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/modules/{moduleCode}/exams/{examId}/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @GetMapping("")
    @Operation(summary = "Get all questions of an exam")
    public Page<QuestionDTO> getQuestions(@PathVariable String moduleCode, @PathVariable String examId, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
        return questionService.getQuestions(moduleCode, examId, PageRequest.of(page - 1, pageSize));
    }

    @PostMapping("")
    @Operation(summary = "Add a new question to an exam")
    public ResponseEntity<?> addQuestion(@PathVariable String moduleCode, @PathVariable String examId, @RequestBody QuestionDTO questionDTO) {
        return questionService.addQuestion(moduleCode, examId, questionDTO);
    }

    @GetMapping("/{questionId}")
    @Operation(summary = "Get a question by its id")
    public QuestionDTO getQuestion(@PathVariable String moduleCode, @PathVariable String examId, @PathVariable String questionId) {
        return questionService.getQuestion(moduleCode, examId, questionId);
    }

    @PutMapping("/{questionId}")
    @Operation(summary = "Edit a question by its id")
    public QuestionDTO putQuestion(@PathVariable String moduleCode, @PathVariable String examId, @PathVariable String questionId, @RequestBody QuestionDTO questionDTO) {
        return questionService.putQuestion(moduleCode, examId, questionId, questionDTO);
    }

    @DeleteMapping("/{questionId}")
    @Operation(summary = "Delete a question by its id")
    public ResponseEntity<?> deleteQuestion(@PathVariable String moduleCode, @PathVariable String examId, @PathVariable String questionId) {
        var result = questionService.deleteQuestion(moduleCode, examId, questionId);
        if (result) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}
