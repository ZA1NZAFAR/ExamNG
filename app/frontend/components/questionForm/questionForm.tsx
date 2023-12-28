'use client';

import { CodeQuestion, MCOption, MCQuestion, Question, QuestionType } from '@/types';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { Divider } from '@nextui-org/divider';
import React from 'react';
import {
	Modal, 
	ModalContent, 
	ModalHeader, 
	ModalBody, 
	ModalFooter
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import '@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { QuestionFormContext, defaultQuestionData } from './questionFormContext';
import CoefficientInput from './coefficientInput';
import StatementInput from './statementInput';
import { isCodeQuestion, isMCQuestion } from '../question/question.util';
import MCOptionInput from './MCOptionInput';
import { Selection } from '@nextui-org/react';
import CodeEditor from '../codeEditor';

type QuestionFormProps = {
  questionData?: Question;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddQuestion: (question: Question) => void;
  onEditQuestion: (question: Question) => void;
};

const questionTypeNames: Map<QuestionType, string> = new Map([
	['text', 'Text Answer'],
	['mcq', 'Multiple Choice'],
	['code', 'Code Answer'],
]);

const QuestionForm: React.FC<QuestionFormProps> = ({
	isOpen,
	onOpenChange,
	onAddQuestion,
	onEditQuestion
}) => {
	const { question, setQuestion, errors } = React.useContext(QuestionFormContext);
	const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(['1', '3']));
	const isInEditMode = question.id !== defaultQuestionData.id;
  
	function updateSelectedKeysForTypeUsingAnswerAccordionItem() {
		if (selectedKeys !== 'all' && (isMCQuestion(question) || isCodeQuestion(question))) {
			const newSelectedKeys = new Set(selectedKeys);
			setSelectedKeys(newSelectedKeys.add('3'));
		}
	}

	function disableAccordionKeys() {
		if (isMCQuestion(question) || isCodeQuestion(question)) {
			return [];
		}
		return ['3'];
	}


	function handleQuestionTypeChange(value: string) {
		if (value === 'mcq') {
			setQuestion({
				...question,
				type: value,
				options: [] as MCOption[],
			} as MCQuestion);
			updateSelectedKeysForTypeUsingAnswerAccordionItem();
		} else if (value === 'code') {
			setQuestion({
				...question,
				type: value,
				initialCode: '',
				defaultLanguage: null,
			} as CodeQuestion);
			updateSelectedKeysForTypeUsingAnswerAccordionItem();
		} else if (value === 'text') {
			setQuestion({
				...question,
				type: value
			});
		} else {
			throw new Error(`Invalid question type: ${value}`);
		}
	}

	function addNewOption() {
		if (isMCQuestion(question)) {
			setQuestion({
				...question,
				options: [...question.options, {
					statement: '',
					isCorrectOption: false,
				} as MCOption]
			} as MCQuestion);
		}
	}

	function hasEmptyOption() {
		if (isMCQuestion(question)) {
			return question.options.some(option => option.statement === '');
		}
		return false;
	}

	function hasAtLeastTwoOptions() {
		if (isMCQuestion(question)) {
			return question.options.length >= 2;
		}
		return true;
	}

	function hasCorrectOption() {
		if (isMCQuestion(question)) {
			return question.options.some(option => option.isCorrectOption);
		}
		return true;
	}

	function hasIncorrectOption() {
		if (isMCQuestion(question)) {
			return question.options.some(option => !option.isCorrectOption);
		}
		return true;
	}

	function hasDuplicateOptions() {
		if (isMCQuestion(question)) {
			const optionStatements = question.options.map(option => option.statement);
			const uniqueOptionStatements = new Set(optionStatements);
			return optionStatements.length !== uniqueOptionStatements.size;
		}
		return false;
	}

	function validateOptions() {
		return !hasEmptyOption() &&
      hasAtLeastTwoOptions() &&
      hasCorrectOption() &&
      hasIncorrectOption() &&
      !hasDuplicateOptions();
	}

	function validateForm() {
		const hasError = Object.keys(errors).length > 0;
		return !hasError && validateOptions();
	}

	const OptionErrorMessage: React.FC = () => (
		<>
			{
				!hasAtLeastTwoOptions() && (
					<p className="text-sm text-red-500">Please add at least two options.</p>
				)
			}
			{
				!hasCorrectOption() && (
					<p className="text-sm text-red-500">Please select at least one correct option.</p>
				)
			}
			{
				!hasIncorrectOption() && (
					<p className="text-sm text-red-500">Please select at least one incorrect option.</p>
				)
			}
			{
				hasDuplicateOptions() && (
					<p className="text-sm text-red-500">Please remove duplicate options.</p>
				)
			}
		</>
	);
  
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl'>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader>{ isInEditMode ? 'Edit question' : 'Add a question' }</ModalHeader>
						<ModalBody>
							<div className="grid grid-cols-2 gap-4">
								<RadioGroup
									label="Question Type"
									value={question.type}
									onValueChange={handleQuestionTypeChange}
								>
									{
										Array.from(questionTypeNames.entries()).map(([key, value]) => (
											<Radio key={key} value={key}>{value}</Radio>
										))
									}
								</RadioGroup>
								<CoefficientInput />
							</div>
							<Divider />
							<Accordion
								isCompact
								selectedKeys={selectedKeys}
								onSelectionChange={(keys) => setSelectedKeys(keys)}
								disabledKeys={disableAccordionKeys()}
								selectionMode="multiple">
								<AccordionItem title="Question" key="1" area-label="Accordion 1">
									<StatementInput />
								</AccordionItem>
								<AccordionItem title="Attachments" key="2" area-label="Accordion 2">
									<Button color="secondary">Add new attachment</Button>
								</AccordionItem>
								<AccordionItem title="Answer" key="3" area-label="Accordion 3">
									{
										isMCQuestion(question) && (
											<div className="flex flex-col gap-4">
												{
													question.options.map((_, index) => (
														<MCOptionInput key={index} index={index} />
													))
												}
												<OptionErrorMessage />
												<Button color="secondary" onPress={addNewOption}>Add new choice</Button>
											</div>
										)
									}
									{
										isCodeQuestion(question) && (
											<>
												<span className="text-gray-500">Add an initial code for the answer.</span>
												<CodeEditor
													defaultLanguage={question.defaultLanguage}
													code={question.initialCode}
													onChange={(code) => setQuestion({
														...question,
														initialCode: code,
													} as CodeQuestion)}
												/>
											</>
										)
									}
								</AccordionItem>
							</Accordion>
						</ModalBody>
						<ModalFooter>
							<Button color='danger' onPress={onClose}>Cancel</Button>
							<Button
								color='primary'
								onPress={() => {
									if (isInEditMode) onEditQuestion(question);
									else onAddQuestion(question);
									onClose();
								}}
								disabled={!validateForm()}
							>
                Confirm
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);


};

export default QuestionForm;
