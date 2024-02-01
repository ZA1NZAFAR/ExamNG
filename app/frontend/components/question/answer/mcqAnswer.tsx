'use client';

import { MCQuestion } from '@/types';
import React from 'react';
import { hasSingleCorrectOption } from '../question.util';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { CheckboxGroup, Checkbox } from '@nextui-org/checkbox';
import { useAnswerFormStore } from '../answerFormStore';
import { useService } from '@/hooks/useService';
/**
 * Represents the properties of a multiple-choice question component.
 * @property {MCQuestion} question The MC question object containing its content.
 * @property {boolean} isDisabled Whether the answer can be submitted.
 */
type MCQAnswerProps = {
	/**
	 * The MC question object containing its content.
	 */
  question: MCQuestion;
  /**
   * Whether the answer can be submitted.
   * @default false
   */
  isDisabled?: boolean;
}

const MCQAnswerComponent: React.FC<MCQAnswerProps> = ({
	question,
	isDisabled = false,
}) => {
	const {
		answer,
		setAnswer
	} = useAnswerFormStore(state => ({
		answer: state.answerSheet.answers.get(question.id)?.answer as string[] || [],
		setAnswer: state.setAnswer
	}));
	const { localAnswerService } = useService();
	const handleChange = (value: string[]) => {
		setAnswer(question.id, value);
		localAnswerService.setAnswer(question.id, { answer: value });
	};
	if (hasSingleCorrectOption(question)) {
		return (
			<RadioGroup
				isDisabled={isDisabled}
				value={answer[0]}
				onValueChange={(value) => handleChange([value])}
			>
				{question.options.map((option, index) => (
					<Radio key={index} value={'' + index}>
						{option.statement}
					</Radio>
				))}
			</RadioGroup>
		);
	}
	return (
		<CheckboxGroup
			isDisabled={isDisabled}
			value={answer}
			onValueChange={handleChange}
		>
			{question.options.map((option, index) => (
				<Checkbox key={index} value={'' + index}>
					{option.statement}
				</Checkbox>
			))}
		</CheckboxGroup>
	);
};

export default MCQAnswerComponent;
