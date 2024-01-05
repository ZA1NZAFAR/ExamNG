export default function PricingLayout({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {
    return (
        <section className="pricing">
            {children}
        </section>
    );
}
