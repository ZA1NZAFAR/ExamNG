import { createContext } from 'react';
import ExamService from '../services/ExamService';

export const ExamServiceContext = createContext<ExamService | undefined>(undefined);
