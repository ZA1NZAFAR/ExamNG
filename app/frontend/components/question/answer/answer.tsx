import { Question } from '@/types';
import MCQAnswerComponent from './mcqAnswer';
import { isCodeQuestion, isMCQuestion, isTextQuestion } from '../question.util';
import { Textarea } from '@nextui-org/input';
import CodeAnswerComponent from './codeAnswer';

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
			<Textarea
				isDisabled={isDisabled}
				placeholder={ isDisabled ? 'You cannot submit your answer' : 'Enter your answer here'}
			/>
		);
	}
	if (isCodeQuestion(question)) {
		return (
			<CodeAnswerComponent
				defaultLanguage={question.defaultLanguage}
				initialCode={question.initialCode || ''}
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
