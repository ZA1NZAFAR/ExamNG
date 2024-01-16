package net.examng.backend.service;

import net.examng.backend.model.Exam;
import net.examng.backend.model.Module; // Make sure this is your own Module class
import net.examng.backend.repository.ExamRepository;
import net.examng.backend.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModuleService {

    @Autowired
    private ModuleRepository moduleRepo;

    @Autowired
    private ExamRepository examRepo;

    public Module getModule(String code) {
        return moduleRepo.findByCode(code);
    }

    public List<Module> getAllModules() {
        return moduleRepo.findAll();
    }

    public Module addModule(Module module) {
        return moduleRepo.save(module);
    }

    public void deleteModule(String code) {
        moduleRepo.deleteByCode(code);
    }

    public Exam getExam(String moduleCode, String examId) {
        return examRepo.findByIdAndModuleCode(examId, moduleCode);
    }

    public List<Exam> getExamsForModule(String moduleCode) {
        return examRepo.findByModuleCode(moduleCode);
    }

    public Exam addExam(String moduleCode, Exam exam) {
        exam.setModuleCode(moduleCode);
        return examRepo.save(exam);
    }

    public void deleteExam(String moduleCode, String examId) {
        Exam exam = examRepo.findByIdAndModuleCode(examId, moduleCode);
        examRepo.delete(exam);
    }

}