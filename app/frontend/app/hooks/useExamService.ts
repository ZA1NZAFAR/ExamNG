import { useContext } from 'react';
import { ExamServiceContext } from '../contexts/ExamServiceContext';

// Custom hook to use ExamService
export const useExamService = () => {
	const context = useContext(ExamServiceContext);

	if (!context) {
		throw new Error('useExamService must be used within an ExamServiceProvider');
	}

	return context;
};
