package net.examng.backend.repository;

import net.examng.backend.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends MongoRepository<Question, String> {
    public default Question findByIdNull(String id) {
        Optional<Question> question = findById(id);
        return question.orElse(null);
    }

    public List<Question> findAllById(Iterable<String> ids);
}
