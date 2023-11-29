import axios from 'axios';
import { Exam, Course, Participant } from '@/types/exam';
import { Instructor } from '@/types/physical';

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
       
        const exams: Array<Exam> = [];

        let exam: Exam = {
            id: '1',
            title: 'Java JEE',
            duration: 3,
            startDate: new Date('2023-12-01T12:00:00'),
            endDate: new Date('2023-12-01T15:00:00'),
            participants: [
                {
                    code: 'M1APPLSI1',
                    name: 'M1-APP-LSI-1',
                    size: 35
                }
            ],
            course: {
                code: 'JavaJEE',
                name: 'Java Edition Entreprise',
                instructor: {
                    firstName: 'John',
                    lastName: 'Doe',
                    dateOfBirth: new Date('1972-03-18T19:24:35'),
                    city: 'San-Francisco',
                    country: 'USA',
                    id: 1,
                    occupation: 'Professor of Computer Science, Emeritus'
                }
            }
        };

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
