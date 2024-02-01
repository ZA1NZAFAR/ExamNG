import { AuthGuard } from '@/components/authGuard';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function TestLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className= "full-calendar-page" >
			<AuthGuard requireRole="teacher">
				{children}
			</AuthGuard>
		</section>
	);
}
