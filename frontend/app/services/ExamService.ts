import axios from 'axios';
import { Exam } from '@/types/exam';

class ExamService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getExams(): Promise<Array<Exam>> {
        const response = await axios.get<Array<Exam>>(`${this.apiUrl}/exams`);
        return response.data;
    }

    async getExamById(id: number): Promise<Exam> {
        const response = await axios.get<Exam>(`${this.apiUrl}/exams/${id}`);
        return response.data;
    }

    async createExam(newExam: Exam): Promise<Exam> {
        const response = await axios.post<Exam>(`${this.apiUrl}/exams`, newExam);
        return response.data;
    }

    async updateExam(id: number, updatedExam: Exam): Promise<Exam> {
        const response = await axios.put<Exam>(`${this.apiUrl}/exams/${id}`, updatedExam);
        return response.data;
    }

    async removeExam(id: number): Promise<void> {
        await axios.delete(`${this.apiUrl}/exams/${id}`);
    }
}

export default ExamService;
