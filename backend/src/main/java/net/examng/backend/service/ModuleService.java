package net.examng.backend.service;

import net.examng.backend.model.Exam;
import net.examng.backend.model.Module;
import net.examng.backend.model.dto.ExamDTO;
import net.examng.backend.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModuleService {

    @Autowired
    private ModuleRepository moduleRepo;

    @Autowired
    private ExamService examService;


    public Module getModule(String code) {
        return moduleRepo.findByCode(code);
    }

    public Page<Module> getAllModules(Pageable pageable) {
        return moduleRepo.findAll(pageable);
    }

    public Module addModule(Module module) {
        return moduleRepo.save(module);
    }

    public void deleteModule(String code) {
        moduleRepo.deleteByCode(code);
    }


    public ResponseEntity<Exam> addExam(String moduleCode, ExamDTO exam) {
        Exam ex = examService.addExam(moduleCode, exam);
        moduleRepo.addExam(moduleCode, ex.getId());

        return ResponseEntity.ok(ex);
    }

    public Module updateModule(String moduleCode, Module updatedModule) {
        Module module = moduleRepo.findByCode(moduleCode);
        module.setCode(updatedModule.getCode());
        module.setDescription(updatedModule.getDescription());
        module.setImageURL(updatedModule.getImageURL());
        return moduleRepo.save(module);
    }

    public List<Exam> getExams(String moduleCode) {
        return examService.getExamsForModule(moduleCode);
    }
}