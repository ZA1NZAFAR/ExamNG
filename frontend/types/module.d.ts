import { Question } from "./question";

export type Module = {
  code: string;
  name: string;
  description?: string;
}

export type Exam = {
  id: string;
  name: string;
  duration: number;
  startDate: Date;
  endDate: Date;
  questions: Question[];
}

export type ExamPageParams = {
	moduleCode: string;
	examId: string;
}