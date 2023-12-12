import ExamService from '@/app/services/ExamService';
import { ExamServiceContext } from '../ExamServiceContext';

export const ExamServiceProvider = ({ apiUrl, children } : { apiUrl: string, children: React.ReactNode}) => {
	const examService = new ExamService(apiUrl);

	return (
		<ExamServiceContext.Provider value={examService}>
			{children}
		</ExamServiceContext.Provider>
	);
};
