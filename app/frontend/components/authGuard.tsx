'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { useService } from '@/hooks/useService';

type AuthGuardProps = {
  redirectPath?: string;
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ redirectPath = '/', children }) => {
	const { authService } = useService();

	if (!authService.isLoggedIn) {
		redirect(redirectPath); // TODO: need to implement where to redirect
	}

	return (
		<>
			{children}
		</>
	);
};
