'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { useService } from '@/hooks/useService';

type AuthGuardProps = {
  userType?: 'none' | 'teacher' | 'student';
  redirectPath?: string;
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ userType = 'none', redirectPath = '/', children }) => {
	const { authService } = useService();

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