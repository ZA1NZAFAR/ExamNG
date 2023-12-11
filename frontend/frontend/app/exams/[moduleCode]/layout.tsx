import { AuthGuard } from '@/components/authGuard';

export default function SingleExamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 p-8 md:py-10">
			<div className="inline-block w-full text-center justify-center flex flex-col space-y-4">
				<AuthGuard userType='teacher'>
					{children}
				</AuthGuard>
			</div>
		</section>
	);
}
