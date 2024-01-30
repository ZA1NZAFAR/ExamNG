export default function FAQLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="faq">
			{children}
		</section>
	);
}
