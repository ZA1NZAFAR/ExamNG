import React from 'react';
import { Question } from '@/types';
import CodeAnswerComponent from './codeAnswer';
import MCQAnswerComponent from './mcqAnswer';
import { isCodeQuestion, isMCQuestion, isTextQuestion } from '../question.util';
import TextAnswerComponent from './textAnswer';

/**
 * Props for the Answer component.
 * @property {Question} question The question to answer.
 * @property {boolean} isDisabled Whether the answer can be submitted.
 */
type AnswerProps = {
	/**
	 * The question to answer.
	 */
	question: Question;
	/**
	 * Whether the answer can be submitted.
	 * @default false
	 */
	isDisabled?: boolean;
}

const AnswerComponent: React.FC<AnswerProps> = ({ question, isDisabled = false }) => {

	if (isMCQuestion(question)) {
		return (
			<MCQAnswerComponent
				question={question}
				isDisabled={isDisabled}
			/>
		);
	}
	if (isTextQuestion(question)) {
		return (
			<TextAnswerComponent
				question={question}
				isDisabled={isDisabled}
			/>
		);
	}
	if (isCodeQuestion(question)) {
		return (
			<CodeAnswerComponent
				question={question}
				isDisabled={isDisabled}
			/>
		);
	}
	return (
		<div>
			<p>Unknown question type</p>
		</div>
	);
};
export default AnswerComponent;
