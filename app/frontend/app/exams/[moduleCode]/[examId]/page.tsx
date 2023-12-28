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
import { QuestionFormContext, defaultQuestionData } from '@/components/questionForm/questionFormContext';
import { useSearchParams } from 'next/navigation';

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
	// TODO: add pagination
	const searchParams = useSearchParams();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [ page, setPage ] = React.useState<number>(parseInt(searchParams.get('page') ?? '1'));
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [ pageSize, setPageSize ] = React.useState<number>(parseInt(searchParams.get('pageSize') ?? '10'));
	const [ render, setRender ] = React.useState<number>(0);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { moduleCode, examId } = params;
	const { examService, authService } = useService();

	function reloadExamQuestions() {
		setRender(render + 1);
	}

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
			const fetchedQuestions = await examService.getExamQuestions(moduleCode, examId, { page, pageSize });
			setQuestions(fetchedQuestions.results);
		})();
	}, [render]);
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

	function handleAddQuestion(question: Question) {
		examService.createExamQuestion(moduleCode, examId, question);
		reloadExamQuestions();
	}

	function handleEditQuestion(question: Question) {
		examService.updateExamQuestion(moduleCode, examId, question.id, question);
		reloadExamQuestions();
	}

	function handleDeleteQuestion(questionId: string) {
		examService.deleteExamQuestion(moduleCode, examId, questionId);
		reloadExamQuestions();
	}

	function deleteError(key: string) {
		if (!errors[key]) {
			return;
		}
		const newErrors = { ...errors };
		delete newErrors[key];
		setErrors(newErrors);
	}

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
			<QuestionFormContext.Provider value={{ question, errors, setQuestion, setErrors, deleteError }}>
				<QuestionForm
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					onAddQuestion={handleAddQuestion}
					onEditQuestion={handleEditQuestion}
				/>
			</QuestionFormContext.Provider>
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
							onPress={() => handleDeleteQuestion(question.id)}>
							<span className="material-icons">delete</span>
						</Button>
					</div>
				</div>
			))}
		</ExamContext.Provider>
	);
}
