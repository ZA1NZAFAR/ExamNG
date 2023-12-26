import { Input } from '@nextui-org/input';
import React from 'react';
import { QuestionContext } from './questionContext';

const CoefficientInput: React.FC = () => {
	const { question, setQuestion, errors, setErrors } = React.useContext(QuestionContext);
  
	function parseCoefficient(value: string) {
		const coefficient = parseFloat(value);
		console.log(coefficient);
		if (isNaN(coefficient)) {
			setErrors({ ...errors, coefficient: 'Coefficient must be a positive number' });
			return 0;
		}
		if (coefficient <= 0) {
			setErrors({ ...errors, coefficient: 'Coefficient must be positive' });
			return 0;
		}
		const newErrors = { ...errors };
		delete newErrors.coefficient;
		setErrors(newErrors);
		return coefficient;
	}

	function onValueChange(value: string) {
		const coefficient = parseCoefficient(value);
		if (coefficient === question.coefficient) return;
		setQuestion({ ...question, coefficient: coefficient });
	}

	return (
		<Input
			type="number"
			label="Coefficient"
			value={question.coefficient.toString()}
			step="0.01"
			placeholder="1.00"
			onValueChange={onValueChange}
			labelPlacement="outside"
			isInvalid={!!errors.coefficient}
			endContent={
				<span className="text-gray-500">pts</span>
			}
			errorMessage={errors.coefficient}
		/>
	);
};

export default CoefficientInput;
