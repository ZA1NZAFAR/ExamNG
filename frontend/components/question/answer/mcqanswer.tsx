'use client';

import { MCQuestion } from '@/types/question';
import React from 'react';
import { hasSingleCorrectOption } from '../question.util';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { CheckboxGroup, Checkbox } from '@nextui-org/checkbox';
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
	if (hasSingleCorrectOption(question)) {
		return (
			<RadioGroup isDisabled={isDisabled}>
				{question.options.map((option, index) => (
					<Radio key={index} value={option.statement}>
						{option.statement}
					</Radio>
				))}
			</RadioGroup>
		);
	}
	return (
		<CheckboxGroup isDisabled={isDisabled}>
			{question.options.map((option, index) => (
				<Checkbox key={index} value={option.statement}>
					{option.statement}
				</Checkbox>
			))}
		</CheckboxGroup>
	);
};

export default MCQAnswerComponent;