import {
	Question,
	MCQuestion,
	TextQuestion,
	CodeQuestion
} from '@/types';

export function isMCQuestion(question: Question): question is MCQuestion {
	return (question as MCQuestion).options !== undefined;
}

export function isTextQuestion(question: Question): question is TextQuestion {
	return (question as TextQuestion).isTextQuestion !== undefined;
}

export function isCodeQuestion(question: Question): question is CodeQuestion {
	return (question as CodeQuestion).defaultLanguage !== undefined;
}

export function hasSingleCorrectOption(question: MCQuestion): boolean {
	return question.options.filter(option => option.correctOption).length === 1;
}

export function isMCQuestionValid(question: MCQuestion): boolean {
	return question.options.length >= 2 && hasSingleCorrectOption(question);
}
