import { Question } from "@/types/question";
import MCQAnswerComponent from "./mcqanswer";
import { isMCQuestion, isTextQuestion } from "../question.util";
import { Textarea } from "@nextui-org/input";

type AnswerProps = {
	question: Question;
	canAnswer: boolean;
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