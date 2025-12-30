'use client';

export default function PrivacyPage() {
    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-40">
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-4xl">
                <div className="mb-24 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-clinical-ink/40 mb-6 block">
                        Legal
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl text-clinical-ink leading-none uppercase">
                        Privacy Policy
                    </h1>
                </div>

                <div className="space-y-12 text-clinical-ink/70">
                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Information We Collect</h2>
                        <p className="text-sm leading-relaxed mb-4">
                            We collect information that you provide directly to us, including when you create an account,
                            make a purchase, sign up for our newsletter, or contact us for support.
                        </p>
                        <p className="text-sm leading-relaxed">
                            This may include your name, email address, shipping address, phone number, and payment information.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">How We Use Your Information</h2>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>Process and fulfill your orders</li>
                            <li>Send you order confirmations and shipping updates</li>
                            <li>Respond to your customer service requests</li>
                            <li>Send marketing communications (with your consent)</li>
                            <li>Improve our website and services</li>
                            <li>Detect and prevent fraud</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Data Security</h2>
                        <p className="text-sm leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information
                            against unauthorized access, alteration, disclosure, or destruction. All payment information is
                            processed securely through Razorpay's encrypted payment gateway.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Your Rights</h2>
                        <p className="text-sm leading-relaxed mb-4">
                            You have the right to access, update, or delete your personal information at any time.
                            You can manage your account settings in your profile or contact us directly.
                        </p>
                        <p className="text-sm leading-relaxed">
                            You may also opt out of marketing communications by clicking the unsubscribe link in our emails.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Contact Us</h2>
                        <p className="text-sm leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us through our contact page.
                        </p>
                    </section>

                    <p className="text-xs text-clinical-ink/40 pt-8">
                        Last updated: December 30, 2024
                    </p>
                </div>
            </div>
        </div>
    );
}
