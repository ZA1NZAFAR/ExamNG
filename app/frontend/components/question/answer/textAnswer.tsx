import React from 'react';
import { TextQuestion } from '@/types';
import { Textarea } from '@nextui-org/react';
import { useAnswerFormStore } from '../answerFormStore';
import { useService } from '@/hooks/useService';

type TextAnswerProps = {
	question: TextQuestion;
	isDisabled?: boolean;
}

const TextAnswerComponent: React.FC<TextAnswerProps> = ({
	question,
	isDisabled = false
}) => {
	const {
		answer,
		setAnswer
	} = useAnswerFormStore(state => ({
		answer: state.answerSheet.answers.get(question.id)?.answer as string || '',
		setAnswer: state.setAnswer
	}));
	const { localAnswerService } = useService();
	const handleChange = (value: string) => {
		setAnswer(question.id, value);
		localAnswerService.setAnswer(question.id, { answer: value });
	};
	return (
		<Textarea
			isDisabled={isDisabled}
			placeholder={ isDisabled ? 'You cannot submit your answer' : 'Enter your answer here'}
			value={answer}
			onValueChange={handleChange}
		/>
	);
};

export default TextAnswerComponent;
