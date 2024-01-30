import React from 'react';
import { Question } from '@/types';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { ExamContext } from './examContext';
import AttachmentComponent from './attachment/attachment';
import AnswerComponent from './answer/answer';
import SafeHTML from '../safeHtml';


/**
 * Represents the properties of a question component.
 * @property {number} id The unique identifier of the question.
 * @property {Question} question The question object containing its content.
 * @property {boolean} disableAnswer Whether the answer can be submitted.
 * @property {boolean} showCoefficient Whether the coefficient should be shown.
 */
type QuestionProps = {
	/**
	 * The unique identifier of the question.
	 */
	id: number;
	/**
	 * The question object containing its content.
	 */
	question: Question;
	/**
	 * Whether the answer can be submitted.
	 * @default false
	*/
	disableAnswer?: boolean;
	/**
	 * Whether the coefficient should be shown.
	 * @default false
	 */
	showCoefficient?: boolean;
}

const QuestionComponent: React.FC<QuestionProps> = ({
	id, question,
	disableAnswer = false,
	showCoefficient = false
}) => {
	const examContext = React.useContext(ExamContext);
	const showScore = showCoefficient ? 'text-sm text-default-500' : 'hidden';
	return (
		<Card className="w-full text-start">
			<CardHeader className="flex gap-3">
				<div className="flex flex-col">
					<div className="text-md">{id}. <SafeHTML html={question.statement} /></div>
					<p className={showScore}>Score: {question.coefficient}/{examContext.totalScore}</p>
				</div>
			</CardHeader>
			<CardBody>
				{
					question.attachments.map((attachment, index) => (
						<AttachmentComponent
							key={index}
							attachment={attachment}
						/>
					))
				}
			</CardBody>
			<Divider/>
			<CardFooter className="flex flex-col items-start text-start gap-2">
				<p className="text-sm">Your answer</p>
				<AnswerComponent question={question} isDisabled={disableAnswer}/>
			</CardFooter>
		</Card>
	);
};

export default QuestionComponent;
