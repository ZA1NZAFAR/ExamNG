'use client';

import React from 'react';
import { title } from '@/components/primitives';
import QuestionComponent from '@/components/question/question';
import { Exam, Question } from '@/types';
import { ExamContext } from '@/components/question/examContext';
import { useService } from '@/hooks/useService';
import QuestionSkeleton from '@/components/question/questionSkeleton';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { Button } from '@nextui-org/button';
import QuestionForm from '@/components/questionForm/questionForm';
import { QuestionContext, defaultQuestionData } from '@/components/questionForm/questionContext';

/**
 * Represents the parameters for an exam page.
 * @property {string} moduleCode - The module code of the exam.
 * @property {string} examId - The unique identifier of the exam.
 */
type SingleExamPageParams = {
	/**
	 * The module code of the exam.
	 */
	moduleCode: string;
	/**
	 * The unique identifier of the exam.
	 */
	examId: string;
}

export default function SingleExamPage({ params }: { params: SingleExamPageParams}) {
	const [exam, setExam] = React.useState<Exam>();
	const [questions, setQuestions] = React.useState<Question[]>([]);
	const [ question, setQuestion ] = React.useState<Question>(defaultQuestionData);
	const [ errors, setErrors ] = React.useState<Record<string, string>>({});
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { moduleCode, examId } = params;
	const { examService, authService } = useService();

	function openEditModal(editIndex: number) {
		if (editIndex === -1) {
			setQuestion(defaultQuestionData);
		} else {
			setQuestion(questions[editIndex]);
		}
		onOpen();
	}
	const canEdit = authService.isTeacher && !exam?.isValidated;

	React.useEffect(() => {
		(async () => {
			const fetchedExam = await examService.getExamById(moduleCode, examId);
			setExam(fetchedExam);
			const fetchedQuestions = await examService.getExamQuestions(moduleCode, examId);
			setQuestions(fetchedQuestions.results);
		})();
	}, [examService, moduleCode, examId]);
	if (!exam || questions.length === 0) {
		return (
			<>
				<h1 className={title()}>Exam: {moduleCode}</h1>
				<h2>{examId}</h2>
				<QuestionSkeleton />
			</>
		);
	}

	const totalScore = questions.reduce((total, question) => total + question.coefficient, 0);

	return (	
		<ExamContext.Provider value={{ exam, totalScore }}>
			<h1 className={title()}>Exam: {moduleCode}</h1>
			<h2>{examId}</h2>
			<Button
				color={canEdit ? 'primary' : 'default'}
				disabled={!canEdit}
				onPress={() => openEditModal(-1)}>
        Add Question
			</Button>
			<QuestionContext.Provider value={{ question, errors, setQuestion, setErrors }}>
				<QuestionForm
					isOpen={isOpen}
					onOpenChange={onOpenChange}
				/>
			</QuestionContext.Provider>
			{questions.map((question, index) => (
				<div
					key={index}
					className='relative'>
					<QuestionComponent
						id={index + 1}
						question={question}
						disableAnswer
						showCoefficient />
					<Button
						className='absolute top-2 right-2 z-50'
						color={canEdit ? 'primary' : 'default'}
						disabled={!canEdit}
						onPress={() => openEditModal(index)}>
            Edit Question
					</Button>
				</div>
			))}
		</ExamContext.Provider>
	);
}
