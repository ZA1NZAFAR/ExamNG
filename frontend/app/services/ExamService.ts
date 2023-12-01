import axios from 'axios';
import { Exam } from '@/types/exam';
import javaEE from '../../resources/img/java_ee.png';
import cybersecurity from '../../resources/img/cybersecurity.jpg';

class ExamService {
	private apiUrl: string;

	constructor(apiUrl: string) {
		this.apiUrl = apiUrl;
	}

	async getExams(): Promise<Array<Exam>> {
		// const response = await axios.get<Array<Exam>>(`${this.apiUrl}/exams`);
		// return response.data;

		// Mock data to test used on initial stages
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const exams: Array<Exam> = [
					{
						id: '1',
						title: 'Java JEE',
						imageURL: javaEE.src,
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
						title: 'Cybersecurity',
						imageURL: cybersecurity.src,
						duration: 1.30,
						startDate: new Date('2023-12-01T08:00:00'),
						endDate: new Date('2023-12-01T09:30:00'),
						participants: [
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
						title: 'Sociology',
						duration: 2,
						startDate: new Date('2023-12-07T09:00:00'),
						endDate: new Date('2023-12-07T11:00:00'),
						participants: [
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
