import ExamService from '@/app/services/ExamService';
import { ExamServiceContext } from '../ExamServiceContext';
import Proptypes from 'prop-types';

export const ExamServiceProvider = ({ apiUrl, children } : { apiUrl: string, children: React.ReactNode}) => {
	const examService = new ExamService(apiUrl);

	return (
		<ExamServiceContext.Provider value={examService}>
			{children}
		</ExamServiceContext.Provider>
	);
};

ExamServiceProvider.propTypes = {
	apiUrl: Proptypes.string.isRequired,
	children: Proptypes.node.isRequired,
};
