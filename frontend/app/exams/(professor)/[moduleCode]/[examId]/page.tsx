'use client';

import React from 'react';
import { title } from '@/components/primitives';
import QuestionComponent from '@/components/question/question';
import { Exam } from '@/types/module';
import { ExamContext } from '@/components/question/examContext';
import { useService } from '@/hooks/useService';

/**
 * Represents the parameters for an exam page.
 * @property {string} moduleCode - The module code of the exam.
 * @property {string} examId - The unique identifier of the exam.
 */
type ExamPageParams = {
	/**
	 * The module code of the exam.
	 */
	moduleCode: string;
	/**
	 * The unique identifier of the exam.
	 */
	examId: string;
}

export default function ExamPage({ params }: { params: ExamPageParams}) {
	const [exam, setExam] = React.useState<Exam>();
	
	const { moduleCode, examId } = params;
	const { examService } = useService();

	React.useEffect(() => {
		(async () => {
			const exam = await examService.getExam(moduleCode, examId);
			setExam(exam);
		})();
	}, [examService, moduleCode, examId]);
	if (!exam) {
		return <h1>Loading...</h1>;
	}

	const totalScore = exam.questions.reduce((total, question) => total + question.coefficient, 0);

	return (	
		<ExamContext.Provider value={{ exam, totalScore }}>
			<h1 className={title()}>Exam: {moduleCode}</h1>
			<h2>{params.examId}</h2>
			{exam.questions.map((question, index) => (
				<QuestionComponent
					key={index}
					id={index + 1}
					question={question}
					disableAnswer
					showCoefficient />
			))}
		</ExamContext.Provider>
	);
}