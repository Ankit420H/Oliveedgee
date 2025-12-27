import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className="bg-clinical-canvas min-h-screen text-clinical-ink pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <h1 className="font-display font-black text-6xl md:text-heading-main mb-8 uppercase leading-[0.9]">Privacy Protocols</h1>

                <div className="prose prose-stone max-w-none font-sans text-sm leading-loose text-clinical-ink/80">
                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">1.0 Data Collection</h3>
                    <p className="mb-6">
                        Olive Edge collects only the data necessary to execute your orders and improve your experience.
                        This includes your name, contact coordinates, shipping address, and payment confirmation tokens.
                        We do not store raw credit card numbers on our servers.
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">2.0 Telemetry Packets (Cookies)</h3>
                    <p className="mb-6">
                        We utilize cookies to maintain your session integrity (Cart functionality) and to analyze site traffic patterns.
                        You may disable these in your browser settings, though it may compromise the functionality of the tactical store.
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">3.0 Third-Party Intelligence</h3>
                    <p className="mb-6">
                        We verify operations efficiently by sharing limited data with trusted logistical partners (couriers) and payment processors.
                        We do not sell your personal dossier to external marketing agencies.
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">4.0 Security Measures</h3>
                    <p className="mb-6">
                        All transmissions are encrypted via SSL. Our database is fortified with modern access controls.
                        However, no digital transmission is entirely impenetrable. We urge you to maintain secure credentials.
                    </p>

                    <div className="border-t border-black/10 pt-8 mt-12">
                        <p className="text-xs text-clinical-ink/60">Last Updated: December 2025</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
