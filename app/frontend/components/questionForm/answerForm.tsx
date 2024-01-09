import React from 'react';
import { useQuestionFormStore } from './questionFormStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@nextui-org/button';
import MCOptionInput from './MCOptionInput';
import CodeEditor from '../codeEditor';
import { CodeQuestion, MCQuestion } from '@/types';

const MCQOptionList: React.FC = () => {
	const [ render, setRender ] = React.useState<boolean>(false);
	const {
		options,
		addNewOption,
		optionsErrors,
		setOptionsError,
		deleteOptionsError,
		setOptionErrors,
	} = useQuestionFormStore(useShallow((state) => {
		const currentMCQOptions = (state.question as MCQuestion).options;
		const currentErrors = state.errors;
		return {
			options: currentMCQOptions,
			addNewOption: () => {
				state.setQuestion({
					...state.question,
					options: [...currentMCQOptions, {
						statement: '',
						isCorrectOption: false,
					}]
				} as MCQuestion);
				state.setErrors({
					...currentErrors,
					[`option${currentMCQOptions.length}-statement`]: 'Option statement cannot be empty'
				});
			},
			optionsErrors: Object.keys(currentErrors)
				.filter((key) => key.startsWith('options-'))
				.reduce((obj, key) => {
					obj[key] = currentErrors[key];
					return obj;
				}, {} as Record<string, string>),
			setOptionsError: (errorType: string, newOptionsError: string) => state.setErrors({
				...currentErrors,
				[`options-${errorType}`]: newOptionsError
			}),
			deleteOptionsError: (errorType: string) => state.deleteError(`options-${errorType}`),
			setOptionErrors: (...args: { key: string, indices: number[], errorMessage?: string }[]) => {
				const newErrors = {...currentErrors};
				args.forEach(({ key, indices, errorMessage }) => {
					indices.forEach((index) => {
						if (errorMessage) {
							newErrors[`option${index}-${key}`] = errorMessage;
						} else {
							delete newErrors[`option${index}-${key}`];
						}
					});
				});
				state.setErrors(newErrors);
			}
		};
	}));

	const optionsQuantityValidator = () => {
		const hasAtLeastTwoOptions = () => options.length >= 2;
		if (!hasAtLeastTwoOptions()) {
			setOptionsError('atLeastTwo', 'Please add at least two options.');
		} else {
			deleteOptionsError('atLeastTwo');
		}
		const hasCorrectOption = () => options.some(option => option.isCorrectOption);
		if (!hasCorrectOption()) {
			setOptionsError('atLeastOneCorrect', 'Please select at least one correct option.');
		} else {
			deleteOptionsError('atLeastOneCorrect');
		}
		const hasIncorrectOption = () => options.some(option => !option.isCorrectOption);
		if (!hasIncorrectOption()) {
			setOptionsError('atLeastOneIncorrect', 'Please select at least one incorrect option.');
		} else {
			deleteOptionsError('atLeastOneIncorrect');
		}
	};

	const optionStatementValidator = () => {
		const optionStatementToIndices = new Map<string, number[]>();
		options.forEach((option, index) => {
			if (optionStatementToIndices.has(option.statement)) {
				optionStatementToIndices.get(option.statement)!.push(index);
			} else {
				optionStatementToIndices.set(option.statement, [index]);
			}
		});
		console.log(optionStatementToIndices);
		const duplicateEntryIndices = Array.from(optionStatementToIndices.values()).filter((indices) => indices.length > 1).flat();
		const singleEntryIndices = Array.from(optionStatementToIndices.values()).filter((indices) => indices.length === 1).flat();
		const emptyEntryIndices = optionStatementToIndices.has('') ? optionStatementToIndices.get('')!.flat() : [];
		const nonEmptyEntryIndices = singleEntryIndices.filter((index) => options[index].statement !== '');
		setOptionErrors(
			{ key: 'statement', indices: duplicateEntryIndices, errorMessage: 'Duplicate option statement' },
			{ key: 'statement', indices: emptyEntryIndices, errorMessage: 'Option statement cannot be empty' },
			{ key: 'statement', indices: nonEmptyEntryIndices, errorMessage: undefined  },
		);
	};

	const validateOptions = () => {
		optionsQuantityValidator();
		optionStatementValidator();
	};
	
	function reloadComponent() {
		setRender(!render);
	}

	React.useEffect(() => {
		validateOptions();
		// F**k you React
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [render]);
	return (
		<div className="p-4">
			<div className="flex flex-col gap-4 py-4">
				{ options.map((_, index) => (
					<MCOptionInput key={index} index={index} onInputChange={reloadComponent} />
				))}
				{ Object.keys(optionsErrors).map((errorType, index) => (
					<span className="text-red-500" key={index}>{optionsErrors[errorType]}</span>
				))}
				<Button color="secondary" onPress={addNewOption}>Add new choice</Button>
			</div>
		</div>
	);
};

const CodeSampleAnswer: React.FC = () => {
	const {
		defaultLanguage,
		initialCode,
		setCodeQuestionField,
	} = useQuestionFormStore(useShallow((state) => ({
		type: state.question.type,
		defaultLanguage: (state.question as CodeQuestion).defaultLanguage,
		initialCode: (state.question as CodeQuestion).initialCode,
		setCodeQuestionField: (key: keyof CodeQuestion, value: string = '') => {
			state.setQuestion({
				...state.question,
				[key]: value
			} as CodeQuestion);
		},
	})));
	return (
		<div className="flex flex-col border-2 border-gray-300 rounded-md py-2 px-4 gap-4">
			<span className="text-gray-500">Add an initial code for the answer.</span>
			<CodeEditor
				language={defaultLanguage}
				code={initialCode}
				onCodeChange={(code) => setCodeQuestionField('initialCode', code)}
				onLanguageChange={(language) => setCodeQuestionField('defaultLanguage', language)}
			/>
		</div>
	);
};

const AnswerForm: React.FC = () => {
	const {
		type,
	} = useQuestionFormStore(useShallow((state) => ({
		type: state.question.type,
	})));

	if (type === 'mcq') {
		return (
			<MCQOptionList />
		);
	}
	if (type === 'code') {
		return (
			<CodeSampleAnswer />
		);
	}
	return (
		<></>
	);
};

export default AnswerForm;
