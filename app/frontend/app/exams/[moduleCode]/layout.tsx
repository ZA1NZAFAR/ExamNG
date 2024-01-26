import { AuthGuard } from '@/components/authGuard';

export default function SingleExamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AuthGuard>
			{ children }
		</AuthGuard>
	);
}
