package net.examng.backend.service;

import net.examng.backend.model.Exam;
import net.examng.backend.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepo;



    public List<Exam> getExamsForModule(String moduleCode) {
        return examRepo.findByModuleCode(moduleCode);
    }

    public Exam getExam(String moduleCode, String examId) {
        return examRepo.findByIdAndModuleCode(examId, moduleCode);
    }

    public Exam addExam(String moduleCode, Exam exam) {
        exam.setModuleCode(moduleCode);
        return examRepo.save(exam);
    }

    public Exam updateExam(String moduleCode, String examId, Exam updatedExam) {

        // Get existing exam
        Exam exam = examRepo.findByIdAndModuleCode(examId, moduleCode);

        // Copy required fields
        exam.setDescription(updatedExam.getDescription());
        exam.setQuestions(updatedExam.getQuestions());

        // Save copied exam
        return examRepo.save(exam);
    }

    public void deleteExam(String moduleCode, String examId) {
        Exam exam = examRepo.findByIdAndModuleCode(examId, moduleCode);
        // Delete exam
        examRepo.delete(exam);
    }

    public List<Exam> getAllExams() {
        //depending on exam type cast the question to the appropriate type
        List<Exam> exams = examRepo.findAll();
        exams.forEach(exam -> {
            exam.getQuestions().forEach(question -> {
                question.setType(question.getType());
            });
        });
        return exams;
    }
}