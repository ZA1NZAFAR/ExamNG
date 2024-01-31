package net.examng.backend.utilis;

import net.examng.backend.model.Exam;
import net.examng.backend.model.Module;
import net.examng.backend.model.dto.ExamDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

public class Mapper {
    public static ExamDTO mapToDTO(Exam exam, Module module, int average) {
        ExamDTO examDTO = new ExamDTO();
        examDTO.setId(exam.getId());
        examDTO.setStartTimestamp(exam.getStartTimestamp());
        examDTO.setEndTimestamp(exam.getEndTimestamp());
        examDTO.setDescription(exam.getDescription());
        examDTO.setValidated(exam.isValidated());
        examDTO.setSubmitted(exam.isSubmitted());
        var summaryFields = new ExamDTO.SummaryFields();
        summaryFields.setModule(module);
        summaryFields.setAverage(average);
        examDTO.setSummaryFields(summaryFields);
        return examDTO;
    }

    public static Page<ExamDTO> mapToPage(List<ExamDTO> exams, Pageable pageable) {
        return new PageImpl<>(exams, pageable, exams.size());
    }

    public static Exam mapToExam(ExamDTO examDTO) {
        Exam exam = new Exam();
        exam.setId(examDTO.getId());
        exam.setQuestions(new ArrayList<>());
        examDTO.getQuestions().forEach(question -> {
            exam.getQuestions().add(question.getId());
        });
        exam.setStartTimestamp(examDTO.getStartTimestamp());
        exam.setEndTimestamp(examDTO.getEndTimestamp());
        exam.setDescription(examDTO.getDescription());
        exam.setValidated(examDTO.isValidated());
        exam.setSubmitted(examDTO.isSubmitted());
        exam.setModuleCode(examDTO.getSummaryFields().getModule().getCode());
        return exam;
    }
}
