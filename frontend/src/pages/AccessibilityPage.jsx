import React from 'react';
import Meta from '../components/Meta';
import { Helmet } from 'react-helmet-async';

const AccessibilityPage = () => {
    return (
        <div className="bg-clinical-canvas min-h-screen pt-32 pb-40 text-clinical-ink">
            <Helmet>
                <title>Accessibility | Olive Edge</title>
                <meta name="description" content="Our commitment to digital accessibility for all users." />
            </Helmet>
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-4xl">

                <div className="mb-24 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 mb-4 block">
                        Digital Inclusivity
                    </span>
                    <h1 className="font-display font-black text-5xl md:text-7xl lg:text-heading-main leading-[0.9] uppercase mb-8">
                        Accessibility<br />Statement
                    </h1>
                </div>

                <div className="prose prose-lg prose-headings:font-display prose-headings:uppercase prose-p:font-sans prose-p:text-clinical-ink/80 prose-li:font-sans max-w-none">
                    <p className="font-display text-2xl leading-relaxed mb-12 border-l-4 border-accent-bronze pl-6 text-clinical-ink">
                        Olive Edge is dedicated to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                    </p>

                    <h3>Measures to support accessibility</h3>
                    <p>
                        Olive Edge takes the following measures to ensure accessibility of our digital presence:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-12">
                        <li>Include accessibility as part of our mission statement.</li>
                        <li>Integrate accessibility into our procurement practices.</li>
                        <li>Appoint an accessibility officer and/or ombudsperson.</li>
                        <li>Provide continual accessibility training for our staff.</li>
                    </ul>

                    <h3>Conformance status</h3>
                    <p>
                        The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Olive Edge is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
                    </p>

                    <h3 className="mt-12">Feedback</h3>
                    <p>
                        We welcome your feedback on the accessibility of Olive Edge. Please let us know if you encounter accessibility barriers on our site:
                    </p>
                    <p className="font-mono text-sm bg-clinical-ink/5 p-6 rounded-2xl">
                        E-mail: ops@oliveedge.com<br />
                        Visitor Address: 104 Prince St. SoHo, NY 10012
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityPage;
