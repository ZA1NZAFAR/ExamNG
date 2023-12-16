import { envConfig } from '@/config/envConfig';
import { Exam, Module, Question, Result } from '@/types';
import axios from 'axios';

export class ExamService {
  
	async getModules(): Promise<Result<Module>> {
		const response = await axios.get<Result<Module>>(`${envConfig.backendAPI}/modules`);
		return response.data;
	}

	async getExams(moduleCode: string): Promise<Result<Exam>> {
		const response = await axios.get<Result<Exam>>(`${envConfig.backendAPI}/modules/${moduleCode}`);
		return response.data;
	}

	async getExamById(moduleCode: string, examId: string): Promise<Exam> {
		const response = await axios.get<Exam>(`${envConfig.backendAPI}/modules/${moduleCode}/${examId}`);
		return response.data;
	}

	async updateExam(moduleCode: string, examId: string, exam: Exam): Promise<Exam> {
		const response = await axios.put<Exam>(`${envConfig.backendAPI}/modules/${moduleCode}/${examId}`, exam);
		return response.data;
	}

	async getExamQuestions(moduleCode: string, examId: string): Promise<Result<Question>> {
		const response = await axios.get<Result<Question>>(`${envConfig.backendAPI}/modules/${moduleCode}/${examId}/questions`);
		return response.data;
	}

	async createExamQuestion(moduleCode: string, examId: string, question: Question): Promise<Question> {
		const response = await axios.post<Question>(`${envConfig.backendAPI}/modules/${moduleCode}/${examId}/questions`, question);
		return response.data;
	}

	async updateExamQuestion(moduleCode: string, examId: string, questionId: string, question: Question): Promise<Question> {
		const response = await axios.put<Question>(`${envConfig.backendAPI}/modules/${moduleCode}/${examId}/questions/${questionId}`, question);
		return response.data;
	}

	async deleteExamQuestion(moduleCode: string, examId: string, questionId: string): Promise<void> {
		await axios.delete(`${envConfig.backendAPI}/modules/${moduleCode}/${examId}/questions/${questionId}`);
	}
}
