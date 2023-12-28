import {
	Question,
	MCQuestion,
	TextQuestion,
	CodeQuestion
} from '@/types';

export function isMCQuestion(question: Question): question is MCQuestion {
	const mcQuestion = question as MCQuestion;
	return mcQuestion.options !== undefined && mcQuestion.type === 'mcq';
}

export function isTextQuestion(question: Question): question is TextQuestion {
	return (question as TextQuestion).type === 'text';
}

export function isCodeQuestion(question: Question): question is CodeQuestion {
	const codeQuestion = question as CodeQuestion;
	return codeQuestion.defaultLanguage !== undefined && codeQuestion.type === 'code';
}

export function hasSingleCorrectOption(question: MCQuestion): boolean {
	return question.options.filter(option => option.isCorrectOption).length === 1;
}

export function isMCQuestionValid(question: MCQuestion): boolean {
	return question.options.length >= 2 && hasSingleCorrectOption(question);
}
