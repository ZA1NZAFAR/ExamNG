package net.examng.backend.controller;

import net.examng.backend.model.Exam;
import net.examng.backend.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        List<Exam> exams = examService.getAllExams();
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/{code}")
    public ResponseEntity<List<Exam>> getExams(@PathVariable String code) {
        List<Exam> exams = examService.getExamsForModule(code);
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/{code}/{id}")
    public ResponseEntity<Exam> getExam(@PathVariable String code, @PathVariable String id) {
        Exam exam = examService.getExam(code, id);
        return ResponseEntity.ok(exam);
    }

    @PostMapping("/{code}")
    public ResponseEntity<Exam> addExam(@PathVariable String code, @RequestBody Exam newExam) {
        Exam exam = examService.addExam(code, newExam);
        return ResponseEntity.ok(exam);
    }

    @PutMapping("/{code}/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable String code, @PathVariable String id, @RequestBody Exam updatedExam) {
        // Implement update logic
        return ResponseEntity.ok(updatedExam);
    }

    @DeleteMapping("/{code}/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable String code, @PathVariable String id) {
        examService.deleteExam(code, id);
        return ResponseEntity.noContent().build();
    }

}