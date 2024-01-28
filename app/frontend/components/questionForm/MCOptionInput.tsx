import React from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { MCOption, MCQuestion } from '@/types';
import { Checkbox } from '@nextui-org/react';
import { useQuestionFormStore } from './questionFormStore';
import { useShallow } from 'zustand/react/shallow';

/**
 * The props for the MCOptionInput component
 * @property {number} index - The index of the option in the options array
 * @property {function} [onInputChange] - The function to call when the input changes
 * */
type MCOptionInputProps = {
	/** The index of the option in the options array */
	index: number;
	/** The function to call when the input changes */
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
		deleteOptionError
	} = useQuestionFormStore(useShallow((state) => {
		const currentMCQOptions = (state.question as MCQuestion).options;
		const currentErrors = state.errors;
		return {
			option: currentMCQOptions[index],
			setOption: (newOption: MCOption) => {
				const newOptions = [...currentMCQOptions];
				newOptions[index] = newOption;
				state.setQuestion({
					...state.question,
					options: newOptions,
				} as MCQuestion);
			},
			deleteOption: () => {
				const newOptions = [...currentMCQOptions];
				newOptions.splice(index, 1);
				state.setQuestion({
					...state.question,
					options: newOptions,
				} as MCQuestion);
			},
			optionErrors: Object.keys(currentErrors).filter((key) => key.startsWith(`option${index}-`)).reduce((obj, key) => {
				obj[key] = currentErrors[key];
				return obj;
			}, {} as Record<string, string>),
			deleteOptionError: (key:string) => state.deleteError(`option${index}-${key}`)
		};
	}));

	const updateOptions = (key: keyof MCOption, value: unknown) => {
		setOption({
			...option,
			[key]: value,
		});
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
				autoFocus
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
