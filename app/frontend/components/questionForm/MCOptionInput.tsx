import React from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { MCOption, MCQuestion } from '@/types';
import { Checkbox } from '@nextui-org/react';
import { useQuestionFormStore } from './questionFormStore';
import { useShallow } from 'zustand/react/shallow';

type MCOptionInputProps = {
	index: number;
	onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const MCOptionInput: React.FC<MCOptionInputProps> = ({
	index,
	onInputChange = (_) => { }
}) => {
	const {
		option,
		setOption,
		deleteOption,
		optionErrors,
		setOptionError,
		deleteOptionError
	} = useQuestionFormStore(useShallow((state) => ({
		option: (state.question as MCQuestion).options[index],
		setOption: (newOption: MCOption) => {
			const newOptions = [...(state.question as MCQuestion).options];
			newOptions[index] = newOption;
			state.setQuestion({
				...state.question,
				options: newOptions,
			} as MCQuestion);
		},
		deleteOption: () => {
			const newOptions = [...(state.question as MCQuestion).options];
			newOptions.splice(index, 1);
			state.setQuestion({
				...state.question,
				options: newOptions,
			} as MCQuestion);
		},
		optionErrors: Object.keys(state.errors).filter((key) => key.startsWith(`option${index}-`)).reduce((obj, key) => {
			obj[key] = state.errors[key];
			return obj;
		}, {} as Record<string, string>),
		setOptionError: (key: string, newOptionError: string) => state.setErrors({ ...state.errors, [`option${index}-${key}`]: newOptionError }),
		deleteOptionError: (key:string) => state.deleteError(`option${index}-${key}`)
	})));

	const updateOptions = (key: keyof MCOption, value: unknown) => {
		setOption({
			...option,
			[key]: value,
		});
		if (key === 'statement') {
			if (value === '') {
				setOptionError('statement', 'Option statement cannot be empty');
			} else {
				deleteOptionError('statement');
			}
		}
	};

	const handleDeleteOption = () => {
		deleteOptionError('statement');
		deleteOption();
	};

	return (
		<div className="flex gap-4 place-items-center">
			<Input
				className="flex-grow"
				size="sm"
				type="text"
				label={`Option ${index + 1}`}
				placeholder="Add your option here"
				value={option.statement}
				onChange={(event) => {
					updateOptions('statement', event.target.value);
					onInputChange(event);
				}}
				isRequired
				isInvalid={!!optionErrors[`option${index}-statement`]}
				errorMessage={optionErrors[`option${index}-statement`]}
			/>
			<Checkbox
				isSelected={option.isCorrectOption}
				onChange={(event) => {
					updateOptions('isCorrectOption', event.target.checked);
					onInputChange(event);
				}}
			>
				Correct
			</Checkbox>
			<Button
				isIconOnly
				onPress={handleDeleteOption}
				color="danger">
				<span className="material-icons">delete</span>
			</Button>
		</div>
	);
};

export default MCOptionInput;
