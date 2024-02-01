'use client';

import { Question } from '@/types';
import { Selection } from '@nextui-org/react';
import { Divider } from '@nextui-org/divider';
import React from 'react';
import {
	ModalContent, 
	ModalHeader, 
	ModalBody, 
	ModalFooter
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import '@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CoefficientInput from './coefficientInput';
import { isCodeQuestion, isMCQuestion } from '../question/question.util';
import { defaultQuestionData, useQuestionFormStore } from './questionFormStore';
import AttachmentForm from './attachmentForm';
import QuestionTypeInput from './questionTypeInput';
import AnswerForm from './answerForm';
import { useShallow } from 'zustand/react/shallow';
import { useService } from '@/hooks/useService';
import dynamic from 'next/dynamic';

// weird bug with react-draft-wysiwyg with window not being defined
// dynamic import fixes it
const StatementInput = dynamic(() => import('./statementInput'), { ssr: false });

/**
 * The props for the QuestionForm component
 * @property {string} moduleCode - The module code of the exam
 * @property {string} examId - The unique identifier of the exam
 * @property {() => void} [onSubmit] - The function to be called when the form is submitted
 * */
type QuestionFormProps = {
	/** The module code of the exam */
	moduleCode: string;
	/** The unique identifier of the exam */
	examId: string;
	/** The function to be called when the form is submitted */
	onSubmit?: () => void;
};

const QuestionForm: React.FC<QuestionFormProps> = ({
	moduleCode,
	examId,
	onSubmit = () => {},
}) => {
	const { examService } = useService();
	const {
		question,
		answerAccordionIsActive,
		isDataValid
	} = useQuestionFormStore(useShallow((state) => ({
		question: state.question,
		answerAccordionIsActive: isMCQuestion(state.question) || isCodeQuestion(state.question),
		isDataValid: Object.keys(state.errors).length <= 0
	})));
	const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(['1', '3']));
	const isInEditMode = question.id !== defaultQuestionData.id;
	console.log('rendering question form');
	async function handleAddQuestion() {
		await examService.createExamQuestion(moduleCode, examId, question);
		onSubmit();
	}
	async function handleEditQuestion() {
		await examService.updateExamQuestion(moduleCode, examId, question.id, question);
		onSubmit();
	}
  
	function updateSelectedKeysForTypeUsingAnswerAccordionItem() {
		if (selectedKeys !== 'all' && answerAccordionIsActive) {
			const newSelectedKeys = new Set(selectedKeys);
			setSelectedKeys(newSelectedKeys.add('3'));
		}
	}

	function disableAccordionKeys() {
		if (answerAccordionIsActive) {
			return [];
		}
		return ['3'];
	}

	return (
		<ModalContent>
			{(onClose) => ( <>
				<ModalHeader>{ isInEditMode ? 'Edit question' : 'Add a question' }</ModalHeader>
				<ModalBody>
					<div className="grid grid-cols-2 gap-4">
						<QuestionTypeInput onTypeChange={updateSelectedKeysForTypeUsingAnswerAccordionItem} />
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
							<AttachmentForm />
						</AccordionItem>
						<AccordionItem title="Answer" key="3" area-label="Accordion 3">
							<AnswerForm />
						</AccordionItem>
					</Accordion>
				</ModalBody>
				<ModalFooter>
					<Button color='danger' onPress={onClose}>Cancel</Button>
					<Button
						color='primary'
						onPress={async () => {
							if (isInEditMode) await handleEditQuestion();
							else await handleAddQuestion();
							onClose();
						}}
						disabled={!isDataValid}
					>
					Confirm
					</Button>
				</ModalFooter>
			</> )}
		</ModalContent>
	);


};

export default QuestionForm;
