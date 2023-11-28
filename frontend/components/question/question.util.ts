import {
	Question,
	MCQuestion
} from '../../types/question';
export function isMCQuestion(question: Question): question is MCQuestion {
	return 'options' in question;
}

export function hasSingleCorrectOption(question: MCQuestion): boolean {
	return question.options.filter(option => option.correctOption).length === 1;
}

export function isMCQuestionValid(question: MCQuestion): boolean {
	return question.options.length >= 2 && hasSingleCorrectOption(question);
}