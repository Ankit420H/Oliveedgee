'use client';

export default function FAQPage() {
    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-40">
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-4xl">
                <div className="mb-24 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-clinical-ink/40 mb-6 block">
                        Support
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl text-clinical-ink leading-none uppercase">
                        FAQs
                    </h1>
                </div>

                <div className="space-y-12">
                    {/* Shipping */}
                    <div className="border-b border-clinical-ink/10 pb-8">
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-4">Shipping & Delivery</h2>
                        <div className="space-y-4 text-clinical-ink/70">
                            <div>
                                <h3 className="font-sans font-bold text-sm uppercase tracking-wide mb-2">How long does shipping take?</h3>
                                <p className="text-sm leading-relaxed">Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days.</p>
                            </div>
                            <div>
                                <h3 className="font-sans font-bold text-sm uppercase tracking-wide mb-2">Do you ship internationally?</h3>
                                <p className="text-sm leading-relaxed">Yes, we ship worldwide. International shipping times vary by location.</p>
                            </div>
                        </div>
                    </div>

                    {/* Returns */}
                    <div className="border-b border-clinical-ink/10 pb-8">
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-4">Returns & Exchanges</h2>
                        <div className="space-y-4 text-clinical-ink/70">
                            <div>
                                <h3 className="font-sans text-sm uppercase tracking-wide mb-2">What is your return policy?</h3>
                                <p className="text-sm leading-relaxed">We accept returns within 30 days of purchase for unworn, unwashed items with tags attached.</p>
                            </div>
                            <div>
                                <h3 className="font-sans font-bold text-sm uppercase tracking-wide mb-2">How do I initiate a return?</h3>
                                <p className="text-sm leading-relaxed">Go to your profile, select the order, and request a return. We'll send you a return label.</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="pb-8">
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-4">Payment</h2>
                        <div className="space-y-4 text-clinical-ink/70">
                            <div>
                                <h3 className="font-sans font-bold text-sm uppercase tracking-wide mb-2">What payment methods do you accept?</h3>
                                <p className="text-sm leading-relaxed">We accept all major credit cards, debit cards, UPI, and net banking through Razorpay.</p>
                            </div>
                            <div>
                                <h3 className="font-sans font-bold text-sm uppercase tracking-wide mb-2">Is my payment information secure?</h3>
                                <p className="text-sm leading-relaxed">Yes, all payments are processed securely through Razorpay with industry-standard encryption.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
