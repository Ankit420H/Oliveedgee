'use client';

export default function AccessibilityPage() {
    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-40">
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-4xl">
                <div className="mb-24 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-clinical-ink/40 mb-6 block">
                        Inclusivity
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl text-clinical-ink leading-none uppercase">
                        Accessibility
                    </h1>
                </div>

                <div className="space-y-12">
                    <section className="border-b border-clinical-ink/10 pb-8">
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Our Commitment</h2>
                        <p className="text-clinical-ink/70 text-sm leading-relaxed">
                            Olive Edge is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.
                        </p>
                    </section>

                    <section className="border-b border-clinical-ink/10 pb-8">
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Accessibility Features</h2>
                        <div className="text-clinical-ink/70 space-y-4">
                            <div>
                                <h3 className="font-sans font-bold text-sm uppercase tracking-wide mb-2 text-clinical-ink">Keyboard Navigation</h3>
                                <p className="text-sm leading-relaxed">Our website can be navigated using keyboard shortcuts for users who cannot use a mouse.</p>
                            </div>
                            <div>
                                <h3 className="font-sans font-bold text-sm uppercase tracking-wide mb-2 text-clinical-ink">Screen Reader Compatible</h3>
                                <p className="text-sm leading-relaxed">We use semantic HTML and ARIA labels to ensure compatibility with screen readers.</p>
                            </div>
                            <div>
                                <h3 className="font-sans font-bold text-sm uppercase tracking-wide mb-2 text-clinical-ink">Text Alternatives</h3>
                                <p className="text-sm leading-relaxed">All images include descriptive alt text for users with visual impairments.</p>
                            </div>
                            <div>
                                <h3 className="font-sans font-bold text-sm uppercase tracking-wide mb-2 text-clinical-ink">Responsive Design</h3>
                                <p className="text-sm leading-relaxed">Our website adapts to different screen sizes and works on various devices.</p>
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-clinical-ink/10 pb-8">
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Standards Compliance</h2>
                        <p className="text-clinical-ink/70 text-sm leading-relaxed">
                            We aim to conform to Level AA of the Web Content Accessibility Guidelines (WCAG) 2.1. These guidelines explain how to make web content more accessible for people with disabilities.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Feedback</h2>
                        <p className="text-clinical-ink/70 text-sm leading-relaxed mb-6">
                            We welcome your feedback on the accessibility of Olive Edge. If you encounter any accessibility barriers, please contact us.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-3 bg-clinical-ink text-white font-sans text-xs uppercase tracking-widest rounded-full hover:bg-accent-bronze transition-colors"
                        >
                            Contact Us
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
