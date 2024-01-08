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
import { useSearchParams } from 'next/navigation';
import { useQuestionFormStore } from '@/components/questionForm/questionFormStore';
import { useShallow } from 'zustand/react/shallow';

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
	const { examService, authService } = useService();
	const [ questions, setQuestions ] = React.useState<Question[]>([]);
	// TODO: add pagination
	const searchParams = useSearchParams();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [ page, setPage ] = React.useState<number>(parseInt(searchParams.get('page') ?? '1'));
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [ pageSize, setPageSize ] = React.useState<number>(parseInt(searchParams.get('pageSize') ?? '10'));
	const [ render, setRender ] = React.useState<boolean>(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { moduleCode, examId } = params;
	
	function reloadExamQuestions() {
		setRender(!render);
	}

	const {
		setQuestion,
		initializeQuestion,
		handleAddQuestion,
		handleEditQuestion,
		handleDeleteQuestion
	} = useQuestionFormStore(useShallow((state) => ({
		setQuestion: state.setQuestion,
		initializeQuestion: state.initializeQuestion,
		handleAddQuestion: () => {
			examService.createExamQuestion(moduleCode, examId, state.question);
			reloadExamQuestions();
		},
		handleEditQuestion: () => {
			examService.updateExamQuestion(moduleCode, examId, state.question.id, state.question);
			reloadExamQuestions();
		},
		handleDeleteQuestion: () => {
			examService.deleteExamQuestion(moduleCode, examId, state.question.id);
			reloadExamQuestions();
		}
	})));
	console.log('rendering exam page');	

	function openEditModal(editIndex: number) {
		if (editIndex === -1) {
			initializeQuestion();
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
			const fetchedQuestions = await examService.getExamQuestions(moduleCode, examId, { page, pageSize });
			setQuestions(fetchedQuestions.results);
		})();
	}, [render, examService, moduleCode, examId, page, pageSize]);
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
				onPress={() => openEditModal(-1)}
			>
				Add Question
			</Button>
			<QuestionForm
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onAddQuestion={handleAddQuestion}
				onEditQuestion={handleEditQuestion}
			/>
			{questions.map((question, index) => (
				<div
					key={index}
					className='relative'>
					<QuestionComponent
						id={index + 1}
						question={question}
						disableAnswer
						showCoefficient />
					<div className='absolute flex top-2 right-2 z-50 gap-2'>
						<Button
							isIconOnly
							color={canEdit ? 'primary' : 'default'}
							disabled={!canEdit}
							onPress={() => openEditModal(index)}>
							<span className="material-icons">edit</span>
						</Button>
						<Button
							isIconOnly
							color={canEdit ? 'danger' : 'default'}
							disabled={!canEdit}
							onPress={() => handleDeleteQuestion()}>
							<span className="material-icons">delete</span>
						</Button>
					</div>
				</div>
			))}
		</ExamContext.Provider>
	);
}
