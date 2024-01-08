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
	question: Question;
	initializeQuestion: () => void;
	setQuestion: (question: Question) => void;
}
interface ErrorState {
	errors: ErrorMessages;
	setErrors: (errors: ErrorMessages) => void;
	deleteError: (key: string) => void;
}
interface FileState {
	files: Record<string, File>;
	setFiles: (files: Record<string, File>) => void;
}
interface QuestionFormState extends QuestionState, ErrorState, FileState {};

const useQuestionStore: StateCreator<QuestionFormState, [], [], QuestionState> = (set) => ({
	question: defaultQuestionData,
	initializeQuestion: () => set({ question: defaultQuestionData }),
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

export const useQuestionFormStore = create<QuestionFormState>((...args) => ({
	...useQuestionStore(...args),
	...useErrorStore(...args),
	...useFileStore(...args)
}));

