import React from 'react';
import { Question } from '@/types/question';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { ExamContext } from './examContext';
import AttachmentComponent from './attachment/attachment';
import AnswerComponent from './answer/answer';


/**
 * Represents the properties of a question component.
 * @property {number} id The unique identifier of the question.
 * @property {Question} question The question object containing its content.
 * @property {boolean} canAnswer Whether the answer can be submitted.
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
	canAnswer?: boolean;
	/**
	 * Whether the coefficient should be shown.
	 * @default false
	 */
	showCoefficient?: boolean;
}

const QuestionComponent: React.FC<QuestionProps> = ({
	id, question,
	canAnswer = false,
	showCoefficient = false
}) => {
	const examContext = React.useContext(ExamContext);
	const showScore = showCoefficient ? 'text-small text-default-500' : 'hidden';
	return (
		<Card className="w-full text-start">
			<CardHeader className="flex gap-3">
				<div className="flex flex-col">
					<p className="text-md">{id}. {question.statement}</p>
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
			<CardFooter>
				<AnswerComponent question={question} canAnswer={canAnswer}/>
			</CardFooter>
		</Card>
	);
};

export default QuestionComponent;
