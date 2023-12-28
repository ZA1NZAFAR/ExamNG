import { Question } from '@/types';
import React from 'react';

type ErrorMessages = Record<string, string>;

export const defaultQuestionData: Question = {
	id: '',
	type: 'text',
	coefficient: 1,
	statement: '',
	attachments: []
};

export const QuestionFormContext = React.createContext({
	question: defaultQuestionData,
	errors: {} as ErrorMessages,
	setQuestion: (_: Question) => {},
	setErrors: (_: ErrorMessages) => {},
	deleteError: (_: string) => {},
});
