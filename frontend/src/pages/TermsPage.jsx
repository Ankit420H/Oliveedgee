import React from 'react';

const TermsPage = () => {
    return (
        <div className="bg-clinical-canvas min-h-screen text-clinical-ink pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 mb-4 block">
                    Legal Framework
                </span>
                <h1 className="font-display font-black text-6xl md:text-heading-main mb-8 uppercase leading-[0.9]">Terms of Engagement</h1>

                <div className="prose prose-stone max-w-none font-sans text-sm leading-loose text-clinical-ink/80">
                    <p className="font-serif italic text-lg mb-8 text-clinical-ink/60">
                        "Access to this digital flagship constitutes agreement to the following terms."
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">1.0 Usage License</h3>
                    <p className="mb-6">
                        Olive Edge grants you a limited, non-exclusive, non-transferable license to access and use the Platform for personal, non-commercial purposes.
                        Any attempt to reverse-engineer, scrape, or disrupt the command center architecture is strictly prohibited.
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">2.0 Product Accuracy</h3>
                    <p className="mb-6">
                        While we strive for precision, technical specifications (color, weight, dimensions) may vary slightly due to manufacturing tolerances.
                        Digital representations on screen are approximations of the physical asset.
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">3.0 Limitation of Liability</h3>
                    <p className="mb-6">
                        Olive Edge equipment is designed for rigorous use. However, we are not liable for injury or damage resulting from the misuse
                        of our products in environments exceeding their rated specifications.
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">4.0 Intellectual Property</h3>
                    <p className="mb-6">
                        All imagery, text, and code contained within this domain are the sole property of Olive Edge.
                        Unauthorized reproduction of our "Digital Flagship" aesthetic is a violation of international copyright laws.
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">5.0 Jurisdiction</h3>
                    <p className="mb-6">
                        These terms are governed by the laws of India. Any disputes shall be resolved in the courts of New Delhi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
