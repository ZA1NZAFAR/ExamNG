'use client';

import React, { Suspense } from 'react';
import { title } from '@/components/primitives';
import { Exam, Question } from '@/types';
import QuestionComponent from '@/components/question/question';
import { ExamContext } from '@/components/question/examContext';
import { useService } from '@/hooks/useService';
import QuestionSkeleton from '@/components/question/questionSkeleton';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from '@nextui-org/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { SingleExamParams } from '../../params';
import Timer from '@/components/Timer';
import ExamBackground from '@/components/ExamBackground';

// TODO: temporary for now, will remove eslint disable later
export default function StudentExamPage ({ params }: { params: SingleExamParams }) {
	const { examService } = useService();
	const router = useRouter();
	
	const { moduleCode, examId } = params;
	const searchParams = useSearchParams();

	const [exam, setExam] = React.useState<Exam>();
	const [questions, setQuestions] = React.useState<Question[]>([]);

	const page = parseInt(searchParams.get('page') ?? '1');
	const pageSize = parseInt(searchParams.get('pageSize') ?? '10');
	
	React.useEffect(() => {
		(async () => {
			const fetchedExam = await examService.getExamById(moduleCode, examId);
			setExam(fetchedExam);
			const fetchedQuestions = await examService.getExamQuestions(moduleCode, examId, { page, pageSize });
			setQuestions(fetchedQuestions.results);
		})();
	}, [examService, moduleCode, examId, page, pageSize]);
	if (!exam || questions.length === 0) {
		return (
			<>
				<h1 className={title()}>Exam: {moduleCode}</h1>
				<h2>{examId}</h2>
				<QuestionSkeleton />
			</>
		);
	}
	const currentTime = Date.now();

	const totalScore = questions.reduce((total, question) => total + question.coefficient, 0);


	if (exam.startTimestamp > Date.now()) {
		router.push('/exams');
	}
	if (exam.endTimestamp < Date.now()) {
		router.push('/exams');
	}

	const disableAnswer = exam.endTimestamp < currentTime;

	return (
		<ExamContext.Provider value={{ exam, totalScore }}>
			<ExamBackground moduleCode={moduleCode} examId={examId} />
			<h1 className={title()}>Exam: {moduleCode}</h1>
			<h2>{examId}</h2>
			<Suspense fallback={<QuestionSkeleton />}>
				<Timer deadlineTimestamp={exam.endTimestamp} onTimerEnd={() => {
					router.push('/exams');
				}} />
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
			</Suspense>
		</ExamContext.Provider>
	);
}

