import React, { use } from 'react';
import { title } from '@/components/primitives';
import { ExamPageParams } from '@/types/module';
import { ExamService } from '@/services/examService';
import QuestionComponent from '@/components/question/question';

export default function ExamPage({ params }: { params: ExamPageParams}) {
	const { moduleCode, examId } = params;
	const examService = ExamService.instance;
	const exam = use(examService.getExam(moduleCode, examId));

	return (	
		<div>
			<h1 className={title()}>Exam: {moduleCode}</h1>
			<h2>{params.examId}</h2>
			{exam.questions.map((question, index) => (
				<QuestionComponent key={index} id={index + 1} question={question} />
			))}
		</div>
	);
}
