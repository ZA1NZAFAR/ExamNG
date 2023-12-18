import { envConfig } from '@/config/envConfig';
import { Exam, Module, Question, PageResult, PageOptions } from '@/types';
import axios from 'axios';

export class ExamService {  
	async getModules(options: PageOptions = {
		page: 1,
		pageSize: envConfig.defaultQueryPageSize
	}): Promise<PageResult<Module>> {
		const { page, pageSize } = options;
		const response = await axios.get<PageResult<Module>>(`${envConfig.backendAPI}/modules?page=${page}&pageSize=${pageSize}`);
		return response.data;
	}

	async getModuleById(moduleCode: string): Promise<Module> {
		const response = await axios.get<Module>(`${envConfig.backendAPI}/modules/${moduleCode}`);
		return response.data;
	}

	async getExams(
		moduleCode: string,
		options: PageOptions = {
			page: 1,
			pageSize: envConfig.defaultQueryPageSize
		}): Promise<PageResult<Exam>> {
		const { page, pageSize } = options;
		const response = await axios.get<PageResult<Exam>>(`${envConfig.backendAPI}/modules/${moduleCode}/exams?page=${page}&pageSize=${pageSize}`);
		return response.data;
	}

	async getExamById(moduleCode: string, examId: string): Promise<Exam> {
		const response = await axios.get<Exam>(`${envConfig.backendAPI}/modules/${moduleCode}/exams/${examId}`);
		return response.data;
	}

	async updateExam(moduleCode: string, examId: string, exam: Exam): Promise<Exam> {
		const response = await axios.put<Exam>(`${envConfig.backendAPI}/modules/${moduleCode}/exams/${examId}`, exam);
		return response.data;
	}

	async getExamQuestions(
		moduleCode: string,
		examId: string,
		options: PageOptions = {
			page: 1,
			pageSize: envConfig.defaultQueryPageSize
		}): Promise<PageResult<Question>> {
		const { page, pageSize } = options;
		const response = await axios.get<PageResult<Question>>(`${envConfig.backendAPI}/modules/${moduleCode}/exams/${examId}/questions?page=${page}&pageSize=${pageSize}`);
		return response.data;
	}

	async createExamQuestion(moduleCode: string, examId: string, question: Question): Promise<Question> {
		const response = await axios.post<Question>(`${envConfig.backendAPI}/modules/${moduleCode}/exams/${examId}/questions`, question);
		return response.data;
	}

	async updateExamQuestion(moduleCode: string, examId: string, questionId: string, question: Question): Promise<Question> {
		const response = await axios.put<Question>(`${envConfig.backendAPI}/modules/${moduleCode}/exams/${examId}/questions/${questionId}`, question);
		return response.data;
	}

	async deleteExamQuestion(moduleCode: string, examId: string, questionId: string): Promise<void> {
		await axios.delete(`${envConfig.backendAPI}/modules/${moduleCode}/exams/${examId}/questions/${questionId}`);
	}
}
