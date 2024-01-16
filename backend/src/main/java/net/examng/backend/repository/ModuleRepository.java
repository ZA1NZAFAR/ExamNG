package net.examng.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import net.examng.backend.model.Module; // Make sure this is your own Module class

import java.util.List;

public interface ModuleRepository extends MongoRepository<Module, String> {

    public Module findByCode(String code);

    public List<Module> findAll();

    public void deleteByCode(String code);

}