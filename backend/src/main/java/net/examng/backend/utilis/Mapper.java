package net.examng.backend.utilis;

import net.examng.backend.model.Exam;
import net.examng.backend.model.dto.ExamDTO;

public class Mapper {
    public static ExamDTO mapToDTO(Exam exam) {
        ExamDTO examDTO = new ExamDTO();
        examDTO.setId(exam.getId());
        examDTO.setStartTimestamp(exam.getStartTimestamp());
        examDTO.setEndTimestamp(exam.getEndTimestamp());
        examDTO.setDescription(exam.getDescription());
        examDTO.setValidated(exam.isValidated());
        examDTO.setSubmitted(exam.isSubmitted());
        examDTO.setModuleCode(exam.getModuleCode());
        return examDTO;
    }

    public static Exam mapToExam(ExamDTO examDTO) {
        Exam exam = new Exam();
        exam.setId(examDTO.getId());
        exam.setStartTimestamp(examDTO.getStartTimestamp());
        exam.setEndTimestamp(examDTO.getEndTimestamp());
        exam.setDescription(examDTO.getDescription());
        exam.setValidated(examDTO.isValidated());
        exam.setSubmitted(examDTO.isSubmitted());
        exam.setModuleCode(examDTO.getModuleCode());
        return exam;
    }
}
