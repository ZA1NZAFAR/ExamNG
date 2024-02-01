package net.examng.backend.repository;

import net.examng.backend.model.Module;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ModuleRepository extends MongoRepository<Module, String> {
    public Module findByCode(String code);

    public List<Module> findAll();


    default void addExam(String moduleCode, String id) {
        Module module = findByCode(moduleCode);
        module.getExams().add(id);
        save(module);
    }

    public void deleteByCode(String code);
}