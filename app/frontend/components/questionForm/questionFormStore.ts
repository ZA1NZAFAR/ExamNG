import { create, StateCreator } from 'zustand';
import { Question } from '@/types';

type ErrorMessages = Record<string, string>;

export const defaultQuestionData: Question = {
	id: '',
	type: 'text',
	coefficient: 1,
	statement: '',
	attachments: []
};

interface QuestionState {
	/** The question object. */
	question: Question;
	/**
	 * Sets the question object.
	 * @param {Question} question - The data to be set.
	 * */
	setQuestion: (question: Question) => void;
}
interface ErrorState {
	/** The error messages. */
	errors: ErrorMessages;
	/**
	 * Sets the error messages.
	 * @param {ErrorMessages} errors - The error messages to be set.
	 * */
	setErrors: (errors: ErrorMessages) => void;
	/**
	 * Deletes an error message.
	 * @param {string} key - The key of the error message to be deleted.
	 * */
	deleteError: (key: string) => void;
}
interface FileState {
	/** The files to be uploaded. */
	files: Record<string, File>;
	/**
	 * Sets the files to be uploaded.
	 * @param {Record<string, File>} files - The files to be uploaded.
	 * */
	setFiles: (files: Record<string, File>) => void;
}
interface QuestionFormState extends QuestionState, ErrorState, FileState {}

const useQuestionStore: StateCreator<QuestionFormState, [], [], QuestionState> = (set) => ({
	question: {} as Question,
	setQuestion: (question) => set({ question })
});
const useErrorStore: StateCreator<QuestionFormState, [], [], ErrorState> = (set) => ({
	errors: {},
	setErrors: (errors) => set({ errors }),
	deleteError: (key) => set((state) => {
		const { [key]: _, ...rest } = state.errors;
		return { errors: rest };	
	})
});
const useFileStore: StateCreator<QuestionFormState, [], [], FileState> = (set) => ({
	files: {},
	setFiles: (files) => set({ files })
});

/**
 * This is a custom hook that contains all the states and actions related to the question form.
 * @property {Question} question - The question object.
 * @property {ErrorMessages} errors - The error messages.
 * @property {Record<string, File>} files - The files to be uploaded.
 * @method {function} setQuestion - Sets the question object.
 * @method {function} setErrors - Sets the error messages.
 * @method {function} deleteError - Deletes an error message.
 * */
export const useQuestionFormStore = create<QuestionFormState>((...args) => ({
	...useQuestionStore(...args),
	...useErrorStore(...args),
	...useFileStore(...args)
}));

