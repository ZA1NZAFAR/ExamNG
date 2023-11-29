import axios from 'axios';
import { Exam, Course, Participant } from '@/types/exam';
import { Instructor } from '@/types/physical';

class ExamService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getExams(): Promise<Array<Exam>> {
        // const response = await axios.get<Array<Exam>>(`${this.apiUrl}/exams`);
        // return response.data;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const exams: Array<Exam> = [
                    {
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
                    },
                    {
                        id: '2',
                        title: 'Cybersecurity',
                        duration: 1.30,
                        startDate: new Date('2023-12-01T08:00:00'),
                        endDate: new Date('2023-12-01T09:30:00'),
                        participants: [
                            {
                                code: 'M1APPLSI2',
                                name: 'M1-APP-LSI-2',
                                size: 37
                            }
                        ],
                        course: {
                            code: 'CybersecurityE',
                            name: 'Cybersecurity essentials',
                            instructor: {
                                firstName: 'Jane',
                                lastName: 'Doe',
                                dateOfBirth: new Date('1975-12-02T08:12:15'),
                                city: 'Paris',
                                country: 'France',
                                id: 2,
                                occupation: 'Professor of Mathematics'
                            }
                        }
                    }
                ];

                resolve(exams);

                if (exams.length === 0) {
                    reject(exams);
                }
            }, 1000);
        });

        // return Promise.resolve(exams);
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
