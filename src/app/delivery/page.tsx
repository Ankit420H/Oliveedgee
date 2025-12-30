'use client';

export default function DeliveryPage() {
    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-40">
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-4xl">
                <div className="mb-24 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-clinical-ink/40 mb-6 block">
                        Logistics
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl text-clinical-ink leading-none uppercase">
                        Delivery Info
                    </h1>
                </div>

                <div className="space-y-12">
                    {/* Shipping Methods */}
                    <section className="border-b border-clinical-ink/10 pb-8">
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Shipping Methods</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 border border-clinical-ink/10 rounded-2xl bg-white">
                                <h3 className="font-sans font-bold text-sm uppercase tracking-wide mb-2">Standard Shipping</h3>
                                <p className="text-clinical-ink/70 text-sm mb-2">5-7 business days</p>
                                <p className="font-bold text-clinical-ink">Free on orders over ₹2,000</p>
                            </div>
                            <div className="p-6 border border-clinical-ink/10 rounded-2xl bg-white">
                                <h3 className="font-sans font-bold text-sm uppercase tracking-wide mb-2">Express Shipping</h3>
                                <p className="text-clinical-ink/70 text-sm mb-2">2-3 business days</p>
                                <p className="font-bold text-clinical-ink">₹200</p>
                            </div>
                        </div>
                    </section>

                    {/* Delivery Coverage */}
                    <section className="border-b border-clinical-ink/10 pb-8">
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Delivery Coverage</h2>
                        <div className="text-clinical-ink/70 space-y-4">
                            <p className="text-sm leading-relaxed">
                                We deliver across India to all major cities and towns. International shipping is available to select countries.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                <div className="text-center p-4 bg-clinical-ink/5 rounded-xl">
                                    <p className="font-bold text-clinical-ink mb-1">500+</p>
                                    <p className="text-xs">Cities Covered</p>
                                </div>
                                <div className="text-center p-4 bg-clinical-ink/5 rounded-xl">
                                    <p className="font-bold text-clinical-ink mb-1">All States</p>
                                    <p className="text-xs">Pan-India Delivery</p>
                                </div>
                                <div className="text-center p-4 bg-clinical-ink/5 rounded-xl">
                                    <p className="font-bold text-clinical-ink mb-1">15+</p>
                                    <p className="text-xs">Countries Worldwide</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Order Tracking */}
                    <section className="border-b border-clinical-ink/10 pb-8">
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Order Tracking</h2>
                        <p className="text-clinical-ink/70 text-sm leading-relaxed mb-4">
                            Once your order is shipped, you'll receive a tracking number via email. You can also track your order status from your profile dashboard.
                        </p>
                        <a
                            href="/profile"
                            className="inline-block px-8 py-3 bg-clinical-ink text-white font-sans text-xs uppercase tracking-widest rounded-full hover:bg-accent-bronze transition-colors"
                        >
                            Track Your Order
                        </a>
                    </section>

                    {/* Returns */}
                    <section>
                        <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">Returns & Exchanges</h2>
                        <p className="text-clinical-ink/70 text-sm leading-relaxed">
                            We accept returns within 30 days of delivery for unworn, unwashed items with original tags. Return shipping is free for defective or incorrect items. For more information, please visit our FAQ page.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
