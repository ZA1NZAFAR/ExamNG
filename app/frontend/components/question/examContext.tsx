'use client';

import { Exam } from '@/types';
import React from 'react';



export const ExamContext = React.createContext({
	exam: {} as Exam,
	totalScore: 0
});