'use client';

import React from 'react';

import { AuthContext } from '../services/authService';
import { redirect } from 'next/navigation';
import { AuthGuardProps } from '@/types';

export const AuthGuard: React.FC<AuthGuardProps> = ({ userType = 'none', redirectPath = '/', children }) => {
	const authService = React.useContext(AuthContext);

	if (!authService.user) {
		redirect(redirectPath); // TODO: need to implement where to redirect
	}
	const teacherGuardTrigger = authService.user.type !== 'teacher' && userType === 'teacher';
	const studentGuardTrigger = authService.user.type !== 'student' && userType === 'student';

	if (teacherGuardTrigger || studentGuardTrigger) {
		redirect(redirectPath);  // TODO: need to implement where to redirect
	}

	return (
		<>
			{children}
		</>
	);
};