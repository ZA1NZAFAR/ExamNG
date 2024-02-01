'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { useService } from '@/hooks/useService';

type AuthGuardProps = {
	redirectPath?: string;
	children: React.ReactNode;
	requireRole?: 'teacher' | 'student';
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ redirectPath = '/', children, requireRole: lockFor }) => {
	const { authService } = useService();

	if (!authService.isLoggedIn) {
		redirect(redirectPath); // TODO: need to implement where to redirect
	}

	if (lockFor === 'teacher' && !authService.isTeacher) {
		redirect(redirectPath);
	}

	return (
		<>
			{children}
		</>
	);
};
