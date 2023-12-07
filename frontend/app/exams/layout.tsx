export default function ExamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
			<div className="inline-block max-w-lg text-center justify-center gap-4 py-8 md:py-5">
				{children}
			</div>
	);
}
