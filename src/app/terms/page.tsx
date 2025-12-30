'use client';

export default function TermsPage() {
    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-40">
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-4xl">
                <div className="mb-24 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-clinical-ink/40 mb-6 block">
                        Legal
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl text-clinical-ink leading-none uppercase">
                        Terms of Service
                    </h1>
                </div>

                <div className="space-y-12 text-clinical-ink/70">
                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Acceptance of Terms</h2>
                        <p className="text-sm leading-relaxed">
                            By accessing and using Olive Edge's website and services, you accept and agree to be bound by
                            these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Use of Service</h2>
                        <p className="text-sm leading-relaxed mb-4">
                            You agree to use our website and services only for lawful purposes and in accordance with these terms.
                            You are prohibited from:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>Violating any applicable laws or regulations</li>
                            <li>Impersonating any person or entity</li>
                            <li>Interfering with or disrupting the service</li>
                            <li>Attempting to gain unauthorized access to our systems</li>
                            <li>Using automated systems to access the service without permission</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Product Information</h2>
                        <p className="text-sm leading-relaxed">
                            We strive to provide accurate product descriptions and pricing. However, we do not warrant that
                            product descriptions, colors, or other content is accurate, complete, or error-free. We reserve
                            the right to correct any errors and to change or update information at any time without prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Orders and Payment</h2>
                        <p className="text-sm leading-relaxed">
                            All orders are subject to acceptance and availability. We reserve the right to refuse or cancel
                            any order for any reason. Payment must be received before orders are processed. All prices are
                            in Indian Rupees (INR) unless otherwise stated.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Intellectual Property</h2>
                        <p className="text-sm leading-relaxed">
                            All content on this website, including text, graphics, logos, images, and software, is the
                            property of Olive Edge and is protected by copyright and other intellectual property laws.
                            You may not reproduce, distribute, or create derivative works without our express written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Limitation of Liability</h2>
                        <p className="text-sm leading-relaxed">
                            To the fullest extent permitted by law, Olive Edge shall not be liable for any indirect,
                            incidental, special, or consequential damages arising out of or in connection with your use
                            of our website or services.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Changes to Terms</h2>
                        <p className="text-sm leading-relaxed">
                            We reserve the right to modify these terms at any time. Your continued use of our services
                            after changes are posted constitutes acceptance of the modified terms.
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
