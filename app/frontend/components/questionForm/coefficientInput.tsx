import { Input } from '@nextui-org/input';
import React from 'react';
import { useQuestionFormStore } from './questionFormStore';
import { useShallow } from 'zustand/react/shallow';

const CoefficientInput: React.FC = () => {
	const { coefficient, setCoefficient, coefficientError, setCoefficientError, deleteCoefficientError } = useQuestionFormStore(
		useShallow((state) => ({
			coefficient: state.question.coefficient,
			setCoefficient: (newCoefficient: number) => state.setQuestion({ ...state.question, coefficient: newCoefficient }),
			coefficientError: state.errors.coefficient,
			setCoefficientError: (newCoefficientError: string) => state.setErrors({ ...state.errors, coefficient: newCoefficientError }),
			deleteCoefficientError: () => state.deleteError('coefficient')
	})));


	function parseCoefficient(value: string) {
		const newCoefficient = parseFloat(value);
		if (isNaN(newCoefficient)) {
			setCoefficientError('Coefficient must be a number');
			return 0;
		}
		if (newCoefficient <= 0) {
			setCoefficientError('Coefficient must be positive');
			return 0;
		}
		deleteCoefficientError();
		return newCoefficient;
	}

	function onValueChange(value: string) {
		const newCoefficient = parseCoefficient(value);
		if (newCoefficient === coefficient) return;
		setCoefficient(newCoefficient);
	}

	return (
		<Input
			type="number"
			label="Coefficient"
			value={coefficient.toString()}
			step="0.01"
			placeholder="1.00"
			onValueChange={onValueChange}
			labelPlacement="outside"
			isInvalid={!!coefficientError}
			endContent={
				<span className="text-gray-500">pts</span>
			}
			errorMessage={coefficientError}
		/>
	);
};

export default CoefficientInput;
