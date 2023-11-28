import React from 'react';
import { MCQuestion, QuestionProps } from '@/types/question';
import { hasSingleCorrectOption, isMCQuestion } from './question.util';
import AttachmentComponent from './attachment/attachment';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { CheckboxGroup, Checkbox } from '@nextui-org/checkbox';

const QuestionComponent: React.FC<QuestionProps> = ({ id, question }) => {
	let options: React.ReactNode = null;
	if (isMCQuestion(question)) {
		if (hasSingleCorrectOption(question)) {
			options = (
				<RadioGroup>
					{question.options.map((option, index) => (
						<Radio key={index} value={option.statement}>
							{option.statement}
						</Radio>
					))}
				</RadioGroup>
			);
		} else {
			options = (
				<CheckboxGroup>
					{question.options.map((option, index) => (
						<Checkbox key={index} value={option.statement}>
							{option.statement}
						</Checkbox>
					))}
				</CheckboxGroup>
			);
		}
	}
	return (
		<div>
			<h2>{id}. {question.statement}</h2>
			{
				question.attachments.map((attachment, index) => (
					<AttachmentComponent
						key={index}
						attachment={attachment}
					/>
				))
			}
			{options}
		</div>
	);
};

export default QuestionComponent;
