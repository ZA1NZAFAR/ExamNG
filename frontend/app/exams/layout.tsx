export default function ExamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
			<div className="inline-block text-center justify-center">
				{children}
			</div>
	);
}
