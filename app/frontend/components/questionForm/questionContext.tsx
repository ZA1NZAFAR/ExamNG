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

export const QuestionContext = React.createContext({
	question: defaultQuestionData,
	errors: {} as ErrorMessages,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setQuestion: (_: Question) => {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setErrors: (_: ErrorMessages) => {},
});
