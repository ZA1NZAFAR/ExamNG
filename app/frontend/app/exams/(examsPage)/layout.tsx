'use client';
import '@/styles/globals.css';
import Sidebar from '@/components/sidebar/sidebar';
import {useEffect, useState} from 'react';
import {SideBarProvider} from '@/components/sidebar/SideBarContext';

export default function ExamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// TODO: verify if we still need isSidebarCollapsed
	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);
	/*
	TODO: might be useful
	const toggleSidebarCollapseHandler = () => {
		setIsSidebarCollapsed((prevState: any) => !prevState);
	};
	*/

	useEffect(() => {
		const handleRouteChange = () => {
			// Check if the current path is /exams
			if (window.location.pathname === '/exams') {
				// Set the sidebar collapsed state when returning to /exams
				setIsSidebarCollapsed(true);
			}
		};

		// Listen to navigation changes
		window.addEventListener('popstate', handleRouteChange);

		// Clean up listener
		return () => {
			window.removeEventListener('popstate', handleRouteChange);
		};
	}, []);
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<SideBarProvider>
				<Sidebar />
			</SideBarProvider>
			<div className="inline-block max-w-full text-center justify-center">
				{children}
			</div>
		</section>
	);
}