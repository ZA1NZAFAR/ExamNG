'use client';

import '@/styles/globals.css';
import React, { useState, useEffect, useRef } from 'react';
import { Exam } from '@/types';
import { ExamCard } from '@/components/examCard';
import { useService } from '@/hooks/useService';

export default function ExamPage() {
	// TODO: verify if we still need isSidebarCollapsed
	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);
	const dateFormatter = useRef<Intl.DateTimeFormat>(new Intl.DateTimeFormat('default', { month: 'long', year: 'numeric' }));
	/*
	TODO: might be useful
	const toggleSidebarCollapseHandler = () => {
		setIsSidebarCollapsed((prevState: any) => !prevState);
	};
	*/

	const [ exams, setExams ] = useState<Exam[]>([]);
	const { examService } = useService();
	
	// Helper function to get month and year from date or timestamp
	const getMonthYear = (date: Date | number): string => {
		// Check if the passed parameter has a Date type or is formatted in UNIX timestamp manner
		const monthYear = dateFormatter.current.format(date instanceof Date ? date : new Date(date));
		return monthYear;
	};

	// Function to group exams by month and year
	const groupExamsByMonthAndYear = (exams: Exam[]) => {
		return exams.reduce((result: {[monthYear: string]: Exam[]}, exam) => {
			const monthYear = getMonthYear(exam.startTimestamp);

			if (!result[monthYear]) {
				result[monthYear] = [];
			}

			result[monthYear].push(exam);
			return result;
		}, {});
	};

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
			{ Object.entries(groupExamsByMonthAndYear(exams)).map(([monthYear, exams]) => (
				<div key={monthYear} className='my-12'>
					<h3 className='text-large font-semibold text-foreground/90 mb-6'>{ monthYear }</h3>
					<div className='flex flex-row flex-wrap gap-4 lg:gap-8 place-content-center w-full'>
						{exams.map((exam) => (
							<ExamCard
								key={ exam.id }
								exam={ exam }
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
