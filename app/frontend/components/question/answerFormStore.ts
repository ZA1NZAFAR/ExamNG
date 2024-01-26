import { Answer, AnswerSheet, Question } from '@/types';
import { create } from 'zustand';

interface AnswerFormState {
	/** The answer sheet that contains the answers of the student. */
	answerSheet: AnswerSheet;
	/**
	 * Initializes the answer sheet.
	 * @param {string} examId - The id of the exam.
	 * @param {Question[]} questions - The list of questions of the exam.
	 * */
	initializeAnswerSheet: (examId: string, questions: Question[], answers: Map<string, Answer>) => void;
	/**
	 * Sets the answer of a question.
	 * @param {string} questionId - The id of the question.
	 * @param {string} answer - The answer of the question.
	 * */
	setAnswer: (questionId: string, answer: string | string[]) => void;
}

const defaultAnswerSheet: AnswerSheet = {
	examId: '',
	answers: new Map(),
	summaryFields: { totalScore: 0 }
};

/**
 * This is a custom hooks that contains all the states and actions related to the answer form.
 * @property {AnswerSheet} answerSheet - The answer sheet that contains the answers of the user.
 * @property {function} initializeAnswerSheet - The function that initializes the answer sheet.
 * @property {function} setAnswer - The function that sets the answer of a question.
*/
export const useAnswerFormStore = create<AnswerFormState>((set) => ({
	answerSheet: defaultAnswerSheet,
	initializeAnswerSheet: (examId: string, questions: Question[], answers: Map<string, Answer>) => {
		questions.forEach((question) => {
			if (!answers.has(question.id)) {
				answers.set(question.id, { answer: '' });
			}
		});
		set((state) => ({
			answerSheet: {
				...state.answerSheet,
				examId,
				answers
			}
		}));
	},
	setAnswer: (questionId: string, answer: string | string[]) => set((state) => {
		const answers = new Map(state.answerSheet.answers);
		answers.set(questionId, { answer });
		return {
			answerSheet: {
				...state.answerSheet,
				answers
			}
		};
	}),
}));


