import { Question } from '@/types/question';
import MCQAnswerComponent from './mcqanswer';
import { isMCQuestion, isTextQuestion } from '../question.util';
import { Textarea } from '@nextui-org/input';

/**
 * Props for the Answer component.
 * @property {Question} question The question to answer.
 * @property {boolean} [canAnswer] Whether the answer can be submitted.
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
	canAnswer?: boolean;
}

const AnswerComponent: React.FC<AnswerProps> = ({ question, canAnswer = false }) => {
	
	if (isMCQuestion(question)) {
		return (
			<MCQAnswerComponent
				question={question}
				canAnswer={canAnswer}
			/>
		);
	}
	if (isTextQuestion(question)) {
		return (
			<Textarea
				isDisabled={canAnswer}
				placeholder="Enter your answer here"
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