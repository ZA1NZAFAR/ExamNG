// old ExamService.ts file that contains some mock data, can be useful for later

import axios from 'axios';
import { Exam } from '@/types';

class ExamService {
	private apiUrl: string;

	constructor(apiUrl: string) {
		this.apiUrl = apiUrl;
	}

	async getExams() {
		// const response = await axios.get<Array<Exam>>(`${this.apiUrl}/exams`);
		// return response.data;

		// Mock data to test used on initial stages
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const exams = [
					{
						id: '1',
						description: 'Java JEE',
						startDate: new Date('2023-06-12T12:00:00'),
						endDate: new Date('2023-06-12T15:00:00'),
						groups: [
							{
								code: 'M1APPLSI1',
								name: 'M1-APP-LSI-1',
								size: 35
							}
						],
						course: {
							code: 'JavaJEE',
							name: 'Java enterprise edition',
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
						description: 'Cybersecurity',
						duration: 2.30,
						startDate: new Date('2023-12-05T08:00:00'),
						endDate: new Date('2023-12-05T10:30:00'),
						groups: [
							{
								code: 'M1APPLSI1',
								name: 'M1-APP-LSI-1',
								size: 35
							},
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
					},
					{
						id: '3',
						description: 'Sociology',
						duration: 2,
						startDate: new Date('2024-03-15T09:00:00'),
						endDate: new Date('2024-03-15T11:00:00'),
						groups: [
							{
								code: 'L3LSI1',
								name: 'L3-LSI-1',
								size: 40
							}
						],
						course: {
							code: 'Sociology',
							name: 'Sociology',
							instructor: {
								firstName: 'Richard',
								lastName: 'Doe',
								dateOfBirth: new Date('1980-01-24T08:00:00'),
								city: 'New York',
								country: 'USA',
								id: 3,
								occupation: 'Professor of Social Sciences, Emeritus'
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
	}

	async getExamById(id: number) {
		const response = await axios.get(`${this.apiUrl}/exams/${id}`);
		return response.data;
	}

	async createExam(newExam: Exam) {
		const response = await axios.post(`${this.apiUrl}/exams`, newExam);
		return response.data;
	}

	async updateExam(id: number, updatedExam: Exam) {
		const response = await axios.put(`${this.apiUrl}/exams/${id}`, updatedExam);
		return response.data;
	}

	async removeExam(id: number) {
		await axios.delete(`${this.apiUrl}/exams/${id}`);
	}
}

export default ExamService;
