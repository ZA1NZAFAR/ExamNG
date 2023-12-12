'use client';

import { SideBarProvider } from '@/components/sidebar/SideBarContext';
import Sidebar from '@/components/sidebar/sidebar';

export default function ExamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
