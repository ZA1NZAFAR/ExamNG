package net.examng.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import net.examng.backend.model.Exam;
import net.examng.backend.model.dto.ExamDTO;
import net.examng.backend.service.EmailService;
import net.examng.backend.service.ExamService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/modules/{moduleCode}/exams")
public class ExamController {

    Logger log = LoggerFactory.getLogger(ExamController.class);

    @Autowired
    private ExamService examService;

    @Autowired
    private EmailService emailService;

    @PostMapping("")
    @Operation(summary = "Add a new exam to a module")
    public ResponseEntity<Exam> addExam(@PathVariable String moduleCode, @RequestBody ExamDTO newExam) {
        try {
            Exam createdExam = examService.addExam(moduleCode, newExam);
            if (createdExam == null) {
                // Log the error and return HTTP 400
                log.error("Failed to create exam for module: " + moduleCode);
                return ResponseEntity.badRequest().build();
            }
            emailService.sendCreatedExamEmail(moduleCode, createdExam);
            // Log the success and return HTTP 201
            log.info("Successfully created exam for module: " + moduleCode);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdExam);
        } catch (Exception e) {
            // Log the exception and return HTTP 500
            log.error("Exception while creating exam for module: " + moduleCode, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("")
    @Operation(summary = "Get all exam with pagination")
    public Page<ExamDTO> getExams(@PathVariable String moduleCode, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
        return examService.getExamsForModule(moduleCode, PageRequest.of(page - 1, pageSize));
    }

    @GetMapping("/{examId}")
    @Operation(summary = "Get an exam by its id")
    public ExamDTO getExam(@PathVariable String moduleCode, @PathVariable String examId) {
        return examService.getExam(moduleCode, examId);
    }

    @PutMapping("/{examId}")
    @Operation(summary = "Update an exam")
    public ExamDTO updateExam(@PathVariable String moduleCode, @PathVariable String examId, @RequestBody ExamDTO updatedExam) {
        throw new UnsupportedOperationException("This feature is not yet implemented");
    }

    @DeleteMapping("/{examId}")
    @Operation(summary = "Delete an exam")
    public void deleteExam(@PathVariable String moduleCode, @PathVariable String examId) {
        examService.deleteExam(moduleCode, examId);
    }
}
