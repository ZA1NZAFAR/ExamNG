import { createContext } from 'react';
import ExamService from '../services/ExamService';

const ExamServiceContext = createContext<ExamService | undefined>(undefined);

export default ExamServiceContext;
