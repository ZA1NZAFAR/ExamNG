package net.examng.backend.repository;

import net.examng.backend.model.Exam;
import net.examng.backend.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExamRepository extends MongoRepository<Exam, String> {

//    public List<Exam> findByModuleCode(String moduleCode);

    public Exam findByIdAndModuleCode(String id, String moduleCode);

    Optional<Exam> findById(String id);

    @Query("SELECT e FROM Exam e JOIN FETCH e.questions WHERE e.moduleCode = :moduleCode")
    List<Exam> findByModuleCode(@Param("moduleCode") String moduleCode);

    @Query("SELECT q FROM Question q")
    List<Question> findAllQuestions();

    Page<Exam> findAllByModuleCode(String moduleCode, Pageable pageable);

}