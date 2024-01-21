import { Answer, AnswerSheet, Question } from '@/types';
import { create, StateCreator } from 'zustand';

type ErrorMessages = Record<string, string>;

interface AnswerSheetState {
	/** The answer sheet that contains the answers of the student. */
	answerSheet: AnswerSheet;
	/**
	 * Initializes the answer sheet.
	 * @param {string} examId - The id of the exam.
	 * @param {Question[]} questions - The list of questions of the exam.
	 * */
	initializeAnswerSheet: (examId: string, questions: Question[]) => void;
	/**
	 * Sets the answer of a question.
	 * @param {string} questionId - The id of the question.
	 * @param {string} answer - The answer of the question.
	 * */
	setAnswer: (questionId: string, answer: string) => void;
}

interface ErrorState {
	/** The error messages. */
	errors: ErrorMessages;
	/**
	 * Sets the error messages.
	 * @param {ErrorMessages} errorMessages - The error messages.
	 * */
	setErrors: (errorMessages: ErrorMessages) => void;
	/**
	 * Deletes an error message.
	 * @param {string} key - The key of the error message.
	 * */
	deleteError: (key: string) => void;
}

interface AnswerFormState extends AnswerSheetState, ErrorState {}

const defaultAnswerSheet: AnswerSheet = {
	examId: '',
	answers: new Map(),
	summaryFields: { totalScore: 0 }
};

const useAnswerSheetStore: StateCreator<AnswerFormState, [], [], AnswerSheetState> = (set) => ({
	answerSheet: defaultAnswerSheet,
	initializeAnswerSheet: (examId: string, questions: Question[]) => {
		const answers = new Map<string, Answer>();
		questions.forEach((question) => {
			answers.set(question.id, {
				answer: ''
			});
		});
		set((state) => ({
			answerSheet: {
				...state.answerSheet,
				examId,
				answers
			}
		}));
	},
	setAnswer: (questionId: string, answer: string) => set((state) => {
		const answers = new Map(state.answerSheet.answers);
		answers.set(questionId, { answer });
		return {
			answerSheet: {
				...state.answerSheet,
				answers
			}
		};
	}),
});

const useErrorStore: StateCreator<ErrorState, [], [], ErrorState> = (set) => ({
	errors: {},
	setErrors: (errors: ErrorMessages) => set({ errors }),
	deleteError: (key: string) => set((state) => {
		const { [key]: _, ...errors } = state.errors;
		return { errors };
	}),
});

/**
 * This is a custom hooks that contains all the states and actions related to the answer form.
 * @property {AnswerSheet} answerSheet - The answer sheet that contains the answers of the user.
 * @property {function} initializeAnswerSheet - The function that initializes the answer sheet.
 * @property {function} setAnswer - The function that sets the answer of a question.
 * @property {ErrorMessages} errors - The error messages.
 * @property {function} setErrors - The function that sets the error messages.
 * @property {function} deleteError - The function that deletes an error message.
*/

export const useAnswerFormStore = create<AnswerFormState>((...args) => ({
	...useAnswerSheetStore(...args),
	...useErrorStore(...args),
}));
