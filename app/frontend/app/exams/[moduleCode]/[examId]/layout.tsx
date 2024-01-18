import { useService } from '@/hooks/useService';

export default function SingleExamLayout({
	student, teacher
}: {
	student: React.ReactNode;
	teacher: React.ReactNode;
}) {
	const { authService } = useService();

	return (
		<section className="flex flex-col items-center justify-center gap-4 p-8 md:py-10">
			<div className="inline-block w-full text-center justify-center flex-col space-y-4">
				{ authService.isTeacher ? teacher : student }
			</div>
		</section>
	);
}
