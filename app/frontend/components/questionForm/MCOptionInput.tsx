import React from 'react';
import { QuestionFormContext } from './questionFormContext';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { MCOption, MCQuestion } from '@/types';
import { isMCQuestion } from '../question/question.util';
import { Checkbox } from '@nextui-org/react';

type MCOptionInputProps = {
  index: number;
};

const MCOptionInput: React.FC<MCOptionInputProps> = ({ index }) => {
	const { question, setQuestion, errors, setErrors, deleteError } = React.useContext(QuestionFormContext);

	React.useEffect(() => {
		if ((question as MCQuestion).options[index].statement === '')
			setErrors({...errors, [`option${index}Statement`]: 'Option statement cannot be empty'});
	}, []);

	if (isMCQuestion(question) && question.options.length > index) {
		const option = question.options[index];
    
		const updateOptions = (key: keyof MCOption, value: unknown) => {
			const newOptions = [...question.options];
			newOptions[index] = {
				...option,
				[key]: value,
			} as MCOption;
			setQuestion({
				...question,
				options: newOptions,
			} as MCQuestion);
			if (key === 'statement') {
				const newErrors = {...errors};
				if (value === '') {
					setErrors({...newErrors, [`option${index}Statement`]: 'Option statement cannot be empty'});
				} else {
					deleteError(`option${index}Statement`);
				}
			}
		};
    
		const deleteOption = () => {
			deleteError(`option${index}Statement`);
			const newOptions = [...question.options];
			newOptions.splice(index, 1);
			setQuestion({
				...question,
				options: newOptions,
			} as MCQuestion);
		};

		return (
			<div className="flex gap-4">
				<Input
					className="flex-grow"
					type="text"
					label={`Option ${index + 1}`}
					placeholder="Add your option here"
					value={option.statement}
					onValueChange={(value) => updateOptions('statement', value) }
					isRequired
					isInvalid={!!errors[`option${index}Statement`]}
					errorMessage={errors[`option${index}Statement`]}
				/>
				<Checkbox
					isSelected={option.isCorrectOption}
					onValueChange={(value) => updateOptions('isCorrectOption', value)}>
          Correct
				</Checkbox>
				<Button
					isIconOnly
					onPress={deleteOption}
					color="danger">
					<span className="material-icons">delete</span>
				</Button>
			</div>
		);
	}
	return <></>;
};

export default MCOptionInput;
