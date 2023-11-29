import ExamService from '@/app/services/ExamService';
import { ExamServiceProviderProps } from '@/types';
import { ExamServiceContext } from '../ExamServiceContext';

export const ExamServiceProvider: React.FC<ExamServiceProviderProps> = ({ apiUrl, children }) => {
	const examService = new ExamService(apiUrl);

	return (
		<ExamServiceContext.Provider value={examService}>
			{children}
		</ExamServiceContext.Provider>
	);
};
