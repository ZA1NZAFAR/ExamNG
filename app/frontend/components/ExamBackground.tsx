'use client';

import { useService } from '@/hooks/useService';
import React from 'react';

type ExamBackgroundProps = {
	moduleCode: string;
	examId: string;
};

const ExamBackground: React.FC<ExamBackgroundProps> = ({
	moduleCode,
	examId
}) => {
	const [color, setColor] = React.useState<string>('');
	const { examService } = useService();

	React.useEffect(() => {
		const getColor = setInterval(async () => {
			if (new Date().getSeconds() % 30 === 0) {
				setColor(await examService.getExamColorCode(moduleCode, examId));
			}
		}, 1000);
		return () => clearInterval(getColor);
	}, [examService, setColor]);
	return (
		<div
			className="fixed inset-x-0 top-0 h-16 z-0"
			style={{ backgroundColor: color }}
		></div>
	);
};

export default ExamBackground;
