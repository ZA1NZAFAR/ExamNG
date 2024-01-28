import { ExamParams } from '../../param';

export type QuestionParams = ExamParams & {
	questionId: string;
};
