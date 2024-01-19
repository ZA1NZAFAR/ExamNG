'use client';

import React from 'react';
import { title } from '@/components/primitives';
import QuestionComponent from '@/components/question/question';
import { Exam, Question } from '@/types';
import { ExamContext } from '@/components/question/examContext';
import { useService } from '@/hooks/useService';
import QuestionSkeleton from '@/components/question/questionSkeleton';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from '@nextui-org/button';
import { redirect, useSearchParams } from 'next/navigation';
import { SingleExamParams } from '../../params';

// TODO: temporary for now, will remove eslint disable later
export default function StudentExamPage ({ params }: { params: SingleExamParams }) {
	const [ exam, setExam ] = React.useState<Exam>();
	const [ questions, setQuestions ] = React.useState<Question[]>([]);
	
	const { examService } = useService();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { moduleCode, examId } = params;
	const searchParams = useSearchParams();

	const currentTime = Date.now();
	const page = parseInt(searchParams.get('page') ?? '1');
	const pageSize = parseInt(searchParams.get('pageSize') ?? '10');

	const totalScore = questions.reduce((total, question) => total + question.coefficient, 0);
	
	React.useEffect(() => {
		(async () => {
			const fetchedExam = await examService.getExamById(moduleCode, examId);
			setExam(fetchedExam);
			const fetchedQuestions = await examService.getExamQuestions(moduleCode, examId, { page, pageSize });
			setQuestions(fetchedQuestions.results);
		})();
	}, [ examService, moduleCode, examId, page, pageSize ]);

	if (!exam || questions.length === 0) {
		return (
			<>
				<h1 className={title()}>Exam: {moduleCode}</h1>
				<h2>{examId}</h2>
				<QuestionSkeleton />
			</>
		);
	}

	if (exam.startTimestamp > Date.now()) {
		redirect('/exams');
	}

	const disableAnswer = exam.endTimestamp < currentTime;

	return (
		<ExamContext.Provider value={{ exam, totalScore }}>
			<h1 className={title()}>Exam: {moduleCode}</h1>
			<h2>{examId}</h2>
			{questions.map((question, index) => (
				<div
					key={index}
					className='relative'>
					<QuestionComponent
						id={index + 1}
						question={question}
						disableAnswer={disableAnswer}
						showCoefficient />
				</div>
			))}
		</ExamContext.Provider>
	);
}

