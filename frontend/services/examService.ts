import { envConfig } from '@/config/envConfig';
import { Exam } from '@/types/module';

export class ExamService {
	async getModules() {
		return await fetch(`${envConfig.backendAPI}/modules`).then(res => res.json());
	}

	async getExams(moduleCode: string) {
		return await fetch(`${envConfig.backendAPI}/modules/${moduleCode}`).then(res => res.json());
	}

	async getExam(moduleCode: string, examId: string): Promise<Exam> {
		// eslint-disable-next-line no-useless-catch 
		try {
			const response = await fetch(`${envConfig.backendAPI}/modules/${moduleCode}/${examId}`);
			return await response.json();
		} catch (error) {
			throw error;
		}
	}
}
