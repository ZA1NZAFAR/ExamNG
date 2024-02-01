package net.examng.backend.service;

import net.examng.backend.model.ColorCode;
import net.examng.backend.model.Exam;
import net.examng.backend.model.dto.ExamDTO;
import net.examng.backend.repository.ExamRepository;
import net.examng.backend.repository.ModuleRepository;
import net.examng.backend.utilis.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class ExamService {

    private ArrayList<String> colors = new ArrayList<String>(Arrays.asList("#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"));
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
        exam.setQuestions(new ArrayList<>());
        return examRepo.save(exam);
    }

    public void deleteExam(String moduleCode, String examId) {
        ExamDTO examDTO = getExam(moduleCode, examId);
        Exam exam = Mapper.mapToExam(examDTO);
        examRepo.delete(exam);
    }

    public ColorCode getExamColorCode() {
        var colorIndex = LocalTime.now().getMinute() / 10;
        var colorCode = new ColorCode();
        colorCode.setColor(colors.get(colorIndex));
        return colorCode;
    }
}