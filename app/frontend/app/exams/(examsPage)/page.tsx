'use client';

import '@/styles/globals.css';
import React, { useState, useEffect } from 'react';
import { Exam } from '@/types';
import { ExamCard } from '@/components/examCard';
import { useService } from '@/hooks/useService';

export default function ExamPage() {
	// TODO: verify if we still need isSidebarCollapsed
	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);
	/*
	TODO: might be useful
	const toggleSidebarCollapseHandler = () => {
		setIsSidebarCollapsed((prevState: any) => !prevState);
	};
	*/

	const [exams, setExams] = useState<Exam[]>([]);
	const { examService } = useService();

	// Fetch exams when the Exam page loads
	useEffect(() => {
		(async () => {
			try {
				const fetchedModules = await examService.getModules();
				const fetchedExams: Exam[] = [];
				for (const fetchedModule of fetchedModules.results) {
					const response = await examService.getExams(fetchedModule.code);
					fetchedExams.push(...response.results);
				}
				
				setExams(fetchedExams);
			} catch (error) {
				console.error('Error fetching exams:', error);
			}
		})();
	}, [examService]);

	return (
		<div>
			<div className='flex flex-row flex-wrap gap-4 lg:gap-8 place-content-center w-full'>
				{ exams.map ((exam) => (
					<ExamCard
						key={ exam.id }
						exam={ exam }
					/>
				)) }
			</div>
		</div>
	);
}