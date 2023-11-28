import { envConfig } from "@/config/envConfig";
import { Exam } from "@/types/module";

export class ExamService {
  private static _instance: ExamService;

  static get instance() {
    if (!ExamService._instance) {
      ExamService._instance = new ExamService();
    }
    return ExamService._instance;
  }
  constructor() {
  }

  async getModules() {
    return await fetch(`${envConfig.backendAPI}/modules`).then(res => res.json());
  }

  async getExams(moduleCode: string) {
    return await fetch(`${envConfig.backendAPI}/modules/${moduleCode}`).then(res => res.json());
  }

  async getExam(moduleCode: string, examId: string): Promise<Exam> {
    try {
      const response = await fetch(`${envConfig.backendAPI}/modules/${moduleCode}/${examId}`);
      return await response.json();
    } catch {
      throw new Error('Network error');
    }
  }
}