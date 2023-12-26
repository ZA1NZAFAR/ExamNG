'use client';

import { Question, QuestionType } from '@/types';
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
import { QuestionContext, defaultQuestionData } from './questionContext';
import CoefficientInput from './coefficientInput';
import StatementInput from './statementInput';

type QuestionFormProps = {
  questionData?: Question;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const questionTypeNames: Map<QuestionType, string> = new Map([
	['text', 'Text Answer'],
	['mcq', 'Multiple Choice'],
	['code', 'Code Answer'],
]);


const QuestionForm: React.FC<QuestionFormProps> = ({
	isOpen,
	onOpenChange,
}) => {
	// TODO: use setQuestion to update the question context
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { question, setQuestion } = React.useContext(QuestionContext);
	const isInEditMode = question.id !== defaultQuestionData.id;
  
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
							<Accordion isCompact defaultExpandedKeys={['1']} selectionMode="multiple">
								<AccordionItem title="Question" key="1" area-label="Accordion 1">
									<StatementInput />
								</AccordionItem>
								<AccordionItem title="Attachments" key="2" area-label="Accordion 2">
									<Button color="secondary">Add new attachment</Button>
								</AccordionItem>
							</Accordion>
						</ModalBody>
						<ModalFooter>
							<Button color='danger' onPress={onClose}>Cancel</Button>
							<Button color='primary' onPress={onClose}>Confirm</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);


};

export default QuestionForm;
