'use client';

import React, { useState, useEffect } from 'react';
import { title } from '@/components/primitives';
import { Exam } from '@/types/exam';
import { ExamServiceProvider } from '../contexts/providers/ExamServiceProvider';
import { useExamService } from '../hooks/useExamService';
import { ExamCard } from '@/components/examCard';

const ExamPageContent: React.FC = () => {
	const [exams, setExams] = useState<Array<Exam>>([]);
	const examService = useExamService();

	// Fetch exams when the Exam page loads
	useEffect(() => {
		const fetchExams = async () => {
			try {
				const fetchedExams = await examService.getExams();
				setExams(fetchedExams);
			} catch (error) {
				console.error('Error fetching exams:', error);
			}
		};

		fetchExams();
	}, [examService]);

	return (
		<div>
			<h1 className={title()}>Exam</h1>
			{ exams.map((exam) => (
				// <div key={exam.id}>
				// 	<p>{exam.title}</p>
				// </div>
				<ExamCard key={ exam.id } exam={ exam } />
			)) }
		</div>
	);
};

const ExamPage: React.FC = () => {
	const apiUrl = 'https://exam-ng.com';

	return (
		<ExamServiceProvider apiUrl={apiUrl}>
			<ExamPageContent />
		</ExamServiceProvider>
	);
};

export default ExamPage;
