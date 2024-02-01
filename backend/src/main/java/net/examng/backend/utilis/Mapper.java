package net.examng.backend.utilis;

import net.examng.backend.model.Module;
import net.examng.backend.model.*;
import net.examng.backend.model.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

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
        exam.setId(examDTO.getId());
        exam.setStartTimestamp(examDTO.getStartTimestamp());
        exam.setEndTimestamp(examDTO.getEndTimestamp());
        exam.setDescription(examDTO.getDescription());
        exam.setValidated(examDTO.isValidated());
        exam.setSubmitted(examDTO.isSubmitted());
        exam.setModuleCode(examDTO.getSummaryFields().getModule().getCode());
        return exam;
    }

    public static QuestionDTO mapToDTO(Question question) {
        QuestionDTO questionDTO;
        if (question instanceof MCQQuestion) {
            var mcqQuestion = (MCQQuestion) question;
            var mcqQuestionDTO = new MCQQuestionDTO();
            mcqQuestionDTO.setOptions(mcqQuestion.getOptions());
            questionDTO = mcqQuestionDTO;
        } else if (question instanceof TextQuestion) {
            questionDTO = new TextQuestionDTO();
        } else if (question instanceof CodeQuestion) {
            var codeQuestion = (CodeQuestion) question;
            var codeQuestionDTO = new CodeQuestionDTO();
            codeQuestionDTO.setInitialCode(codeQuestion.getInitialCode());
            codeQuestionDTO.setDefaultLanguage(codeQuestion.getDefaultLanguage());
            questionDTO = codeQuestionDTO;
        } else {
            throw new RuntimeException("Unknown question type");
        }
        questionDTO.setId(question.getId());
        questionDTO.setStatement(question.getStatement());
        questionDTO.setAttachments(question.getAttachments());
        questionDTO.setCoefficient(question.getCoefficient());
        return questionDTO;
    }

    public static Question mapToQuestion(QuestionDTO questionDTO) {
        Question question;
        if (questionDTO instanceof MCQQuestionDTO) {
            var mcqQuestionDTO = (MCQQuestionDTO) questionDTO;
            var mcqQuestion = new MCQQuestion();
            mcqQuestion.setOptions(mcqQuestionDTO.getOptions());
            question = mcqQuestion;
        } else if (questionDTO instanceof TextQuestionDTO) {
            question = new TextQuestion();
        } else if (questionDTO instanceof CodeQuestionDTO) {
            var codeQuestionDTO = (CodeQuestionDTO) questionDTO;
            var codeQuestion = new CodeQuestion();
            codeQuestion.setInitialCode(codeQuestionDTO.getInitialCode());
            codeQuestion.setDefaultLanguage(codeQuestionDTO.getDefaultLanguage());
            question = codeQuestion;
        } else {
            throw new RuntimeException("Unknown question type");
        }
        question.setId(questionDTO.getId());
        question.setStatement(questionDTO.getStatement());
        question.setAttachments(questionDTO.getAttachments());
        question.setCoefficient(questionDTO.getCoefficient());
        return question;
    }
}
