'use client';

import { Question } from '@/types';
import { Selection } from '@nextui-org/react';
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
import CoefficientInput from './coefficientInput';
import StatementInput from './statementInput';
import { isCodeQuestion, isMCQuestion } from '../question/question.util';
import { defaultQuestionData, useQuestionFormStore } from './questionFormStore';
import AttachmentForm from './attachmentForm';
import QuestionTypeInput from './questionTypeInput';
import AnswerForm from './answerForm';
import { useShallow } from 'zustand/react/shallow';

type QuestionFormProps = {
  questionData?: Question;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddQuestion: () => void;
  onEditQuestion: () => void;
};

const QuestionForm: React.FC<QuestionFormProps> = ({
	isOpen,
	onOpenChange,
	onAddQuestion,
	onEditQuestion
}) => {
	const { 
		questionId,
		answerAccordionIsActive,
		errors
	} = useQuestionFormStore(useShallow((state) => ({
		questionId: state.question.id,
		answerAccordionIsActive: isMCQuestion(state.question) || isCodeQuestion(state.question),
		errors: state.errors
	})));
	const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(['1', '3']));
	const isInEditMode = questionId !== defaultQuestionData.id;
  
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

	function validateForm() {
		return Object.keys(errors).length <= 0;
	}
  
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl'>
			<ModalContent>
				{(onClose) => (
					<>
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
								onPress={() => {
									if (isInEditMode) onEditQuestion();
									else onAddQuestion();
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
