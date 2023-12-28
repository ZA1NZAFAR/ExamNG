import { envConfig } from '@/config/envConfig';
import { Exam, Module, Question, PageResult, PageOptions } from '@/types';
import httpClient from '../utils/httpClient';

export class ExamService {  
	async getModules(options: PageOptions = {
		page: 1,
		pageSize: envConfig.defaultQueryPageSize
	}): Promise<PageResult<Module>> {
		const { page, pageSize } = options;
		const response = await httpClient.get<PageResult<Module>>(`/modules?page=${page}&pageSize=${pageSize}`);
		return response.data;
	}

	async getModuleById(moduleCode: string): Promise<Module> {
		const response = await httpClient.get<Module>(`/modules/${moduleCode}`);
		return response.data;
	}

	async getExams(
		moduleCode: string,
		options: PageOptions = {
			page: 1,
			pageSize: envConfig.defaultQueryPageSize
		}): Promise<PageResult<Exam>> {
		const { page, pageSize } = options;
		const response = await httpClient.get<PageResult<Exam>>(`/modules/${moduleCode}/exams?page=${page}&pageSize=${pageSize}`);
		return response.data;
	}

	async getExamById(moduleCode: string, examId: string): Promise<Exam> {
		const response = await httpClient.get<Exam>(`/modules/${moduleCode}/exams/${examId}`);
		return response.data;
	}

	async updateExam(moduleCode: string, examId: string, exam: Exam): Promise<Exam> {
		const response = await httpClient.put<Exam>(`/modules/${moduleCode}/exams/${examId}`, exam);
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
		const response = await httpClient.get<PageResult<Question>>(`/modules/${moduleCode}/exams/${examId}/questions?page=${page}&pageSize=${pageSize}`);
		return response.data;
	}

	async createExamQuestion(moduleCode: string, examId: string, question: Question): Promise<Question> {
		const response = await httpClient.post<Question>(`/modules/${moduleCode}/exams/${examId}/questions`, question);
		return response.data;
	}

	async updateExamQuestion(moduleCode: string, examId: string, questionId: string, question: Question): Promise<Question> {
		const response = await httpClient.put<Question>(`/modules/${moduleCode}/exams/${examId}/questions/${questionId}`, question);
		return response.data;
	}

	async deleteExamQuestion(moduleCode: string, examId: string, questionId: string): Promise<void> {
		await httpClient.delete(`/modules/${moduleCode}/exams/${examId}/questions/${questionId}`);
	}
}
