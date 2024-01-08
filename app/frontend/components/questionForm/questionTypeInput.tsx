import React from 'react';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { useQuestionFormStore } from './questionFormStore';
import { CodeQuestion, MCOption, MCQuestion, QuestionType, TextQuestion } from '@/types';
import { useShallow } from 'zustand/react/shallow';

const questionTypeNames: Map<QuestionType, string> = new Map([
	['text', 'Text Answer'],
	['mcq', 'Multiple Choice'],
	['code', 'Code Answer'],
]);

type QuestionTypeInputProps = {
	onTypeChange?: (newType?: QuestionType) => void;
};

const QuestionTypeInput: React.FC<QuestionTypeInputProps> = ({
	onTypeChange = (_) => {}
}) => {
	const {
		type,
		setType,
	} = useQuestionFormStore(useShallow((state) => ({
		type: state.question.type,
		setType: (newType: string) => {
			switch (newType) {
			case 'mcq':
				state.setQuestion({
					...state.question,
					type: newType,
					options: [] as MCOption[],
				} as MCQuestion);
				break;
			case 'code':
				state.setQuestion({
					...state.question,
					type: newType,
					initialCode: '',
					defaultLanguage: null,
				} as CodeQuestion);
				break;
			case 'text':
				state.setQuestion({
					...state.question,
					type: newType
				} as TextQuestion);
				break;
			default:
				throw new Error(`Invalid question type: ${newType}`);
			}
		}
	})));

	const handleTypeChange = (newType: string) => {
		setType(newType);
		onTypeChange(newType as QuestionType);
	};

	return (
		<RadioGroup
			label="Question Type"
			value={type}
			onValueChange={handleTypeChange}
		>
			{
				Array.from(questionTypeNames.entries()).map(([key, value]) => (
					<Radio key={key} value={key}>{value}</Radio>
				))
			}
		</RadioGroup>
	);
};

export default QuestionTypeInput;
