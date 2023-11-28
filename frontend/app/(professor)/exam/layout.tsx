import { AuthGuard } from '@/components/authGuard';

export default function ExamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-start justify-center">
				<AuthGuard userType='teacher'>
					{children}
				</AuthGuard>
			</div>
		</section>
	);
}
