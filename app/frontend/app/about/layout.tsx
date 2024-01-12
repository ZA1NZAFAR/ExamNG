export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col justify-center">
			<div className="text-center justify-center">
				{children}
			</div>
		</section>
	);
}
