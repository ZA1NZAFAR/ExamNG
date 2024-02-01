package net.examng.backend.service;

import net.examng.backend.model.Exam;
import net.examng.backend.model.dto.ExamDTO;
import net.examng.backend.repository.ExamRepository;
import net.examng.backend.repository.ModuleRepository;
import net.examng.backend.utilis.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ExamService {
    @Autowired
    private ExamRepository examRepo;
    @Autowired
    private ModuleRepository moduleRepo;

    public Page<ExamDTO> getExamsForModule(String moduleCode, Pageable pageable) {
        var exams = examRepo.findAllByModuleCode(moduleCode, pageable);
        List<ExamDTO> examDTOS = new ArrayList<>();
        exams.forEach(exam -> {
            var module = moduleRepo.findByCode(moduleCode);
            // TODO: calculate average
            var average = 0;
            var examDTO = Mapper.mapToDTO(exam, module, average);
            examDTOS.add(examDTO);
        });
        return Mapper.mapToPage(examDTOS, exams.getPageable());
    }

    public ExamDTO getExam(String moduleCode, String examId) {
        var exam = examRepo.findById(examId).orElse(null);
        if (Objects.isNull(exam) || !exam.getModuleCode().equals(moduleCode)) {
            return null;
        }
        // TODO: calculate average
        var average = 0;
        var module = moduleRepo.findByCode(moduleCode);
        return Mapper.mapToDTO(exam, module, average);
    }

    public Exam addExam(String moduleCode, ExamDTO examDTO) {
        Exam exam = Mapper.mapToExam(examDTO);
        exam.setModuleCode(moduleCode);
        return examRepo.save(exam);
    }

    public void deleteExam(String moduleCode, String examId) {
        ExamDTO examDTO = getExam(moduleCode, examId);
        Exam exam = Mapper.mapToExam(examDTO);
        examRepo.delete(exam);
    }
}