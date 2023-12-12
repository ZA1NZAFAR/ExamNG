'use client';

import '@/styles/globals.css';
import React, { useState, useEffect } from 'react';
import { Exam } from '@/types/exam';
import { ExamServiceProvider } from '../../contexts/providers/ExamServiceProvider';
import { useExamService } from '../../hooks/useExamService';
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
			<div className='flex flex-row flex-wrap gap-4 lg:gap-8 place-content-center w-full'>
				{ exams.map((exam) => (
					<ExamCard key={ exam.id } exam={ exam } />
				)) }
			</div>
		</div>
	);
};

export default function ExamPage() {
	// TODO: verify if we still need isSidebarCollapsed
	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);
	const apiUrl = 'https://exam-ng.com';
	/*
	TODO: might be useful
	const toggleSidebarCollapseHandler = () => {
		setIsSidebarCollapsed((prevState: any) => !prevState);
	};
	*/

	useEffect(() => {
		const handleRouteChange = () => {
			// Check if the current path is /exams
			if (window.location.pathname === '/exams') {
				// Set the sidebar collapsed state when returning to /exams
				setIsSidebarCollapsed(true);
			}
		};

		// Listen to navigation changes
		window.addEventListener('popstate', handleRouteChange);

		// Clean up listener
		return () => {
			window.removeEventListener('popstate', handleRouteChange);
		};
	}, []);
	return (
		<ExamServiceProvider apiUrl={apiUrl}>
			<ExamPageContent />
		</ExamServiceProvider>
	);
}
