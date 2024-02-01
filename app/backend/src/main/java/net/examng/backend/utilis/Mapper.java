package net.examng.backend.utilis;

import net.examng.backend.model.Module;
import net.examng.backend.model.*;
import net.examng.backend.model.dto.*;
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

    public static <T> Page<T> mapToPage(List<T> lists, Pageable pageable) {
        return new PageImpl<T>(lists, pageable, lists.size());
    }

    public static Exam mapToExam(ExamDTO examDTO) {
        Exam exam = new Exam();
        if (examDTO.getId() != null && !examDTO.getId().isEmpty()) {
            exam.setId(examDTO.getId());
        }
        exam.setStartTimestamp(examDTO.getStartTimestamp());
        exam.setEndTimestamp(examDTO.getEndTimestamp());
        exam.setDescription(examDTO.getDescription());
        exam.setValidated(examDTO.isValidated());
        exam.setSubmitted(examDTO.isSubmitted());

        if (examDTO.getSummaryFields() == null)
            return exam;

        exam.setModuleCode(examDTO.getSummaryFields().getModule().getCode());
        return exam;
    }

    public static List<OptionDTO> mapToDTO(List<Option> options) {
        List<OptionDTO> optionDTOS = new ArrayList<>();
        for (Option option : options) {
            var optionDTO = new OptionDTO();
            optionDTO.setCorrectOption(option.isCorrectOption());
            optionDTO.setStatement(option.getStatement());
            optionDTOS.add(optionDTO);
        }
        return optionDTOS;
    }
    public static QuestionDTO mapToDTO(Question question) {
        QuestionDTO questionDTO = new QuestionDTO();
        if (question instanceof MCQQuestion mcqQuestion) {
            questionDTO.setType(QuestionDTO.QuestionType.mcq);
            questionDTO.setOptions(mapToDTO(mcqQuestion.getOptions()));
        } else if (question instanceof TextQuestion) {
            questionDTO.setType(QuestionDTO.QuestionType.text);
        } else if (question instanceof CodeQuestion codeQuestion) {
            questionDTO.setType(QuestionDTO.QuestionType.code);
            questionDTO.setInitialCode(codeQuestion.getInitialCode());
            questionDTO.setDefaultLanguage(codeQuestion.getDefaultLanguage());
        } else {
            throw new RuntimeException("Unknown question type");
        }
        questionDTO.setId(question.getId());
        questionDTO.setStatement(question.getStatement());
        questionDTO.setAttachments(question.getAttachments());
        questionDTO.setCoefficient(question.getCoefficient());
        return questionDTO;
    }

    public static List<Option> mapToOptions(List<OptionDTO> optionDTOS) {
        List<Option> options = new ArrayList<>();
        for (OptionDTO optionDTO : optionDTOS) {
            var option = new Option();
            option.setCorrectOption(optionDTO.isCorrectOption());
            option.setStatement(optionDTO.getStatement());
            options.add(option);
        }
        return options;
    }

    public static Question mapToQuestion(QuestionDTO questionDTO) {
        Question question;
        switch (questionDTO.getType()) {
            case mcq:
                var mcqQuestion = new MCQQuestion();
                mcqQuestion.setOptions(mapToOptions(questionDTO.getOptions()));
                question = mcqQuestion;
                break;
            case text:
                question = new TextQuestion();
                break;
            case code:
                var codeQuestion = new CodeQuestion();
                codeQuestion.setInitialCode(questionDTO.getInitialCode());
                codeQuestion.setDefaultLanguage(questionDTO.getDefaultLanguage());
                question = codeQuestion;
                break;
            default:
                throw new RuntimeException("Unknown question type");
        }
        if (questionDTO.getId() != null && !questionDTO.getId().isEmpty()) {
            question.setId(questionDTO.getId());
        }
        question.setStatement(questionDTO.getStatement());
        question.setAttachments(questionDTO.getAttachments());
        question.setCoefficient(questionDTO.getCoefficient());
        return question;
    }
}
