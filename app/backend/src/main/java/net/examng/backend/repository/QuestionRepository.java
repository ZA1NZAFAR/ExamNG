package net.examng.backend.repository;

import net.examng.backend.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface QuestionRepository extends MongoRepository<Question, String> {
    public default Question findByIdNull(String id) {
        Optional<Question> question = findById(id);
        return question.orElse(null);
    }

    Page<Question> findAllByIdIn(Iterable<String> ids, Pageable pageable);
}
