import React from 'react';

const ShippingPolicyPage = () => {
    return (
        <div className="bg-clinical-canvas min-h-screen text-clinical-ink pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 mb-4 block">
                    Shipping Policy
                </span>
                <h1 className="font-display font-black text-6xl md:text-heading-main mb-8 uppercase leading-[0.8]">Shipping Protocols</h1>

                <div className="prose prose-stone max-w-none font-sans text-sm leading-loose text-clinical-ink/80">
                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">1.0 Dispatch Timelines</h3>
                    <p className="mb-6">
                        All orders are processed within 24 hours of successful payment confirmation.
                        Priority tactical dispatch ensures your equipment leaves our facility by the next operational window (0900 - 1700 IST).
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">2.0 Courier Partners</h3>
                    <p className="mb-6">
                        We utilize secure, tracked services including BlueDart and Delhivery for domestic operations.
                        Tracking coordinates are transmitted to your registered email immediately upon generation.
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">3.0 Packaging Standards</h3>
                    <p className="mb-6">
                        Each item is sealed in weather-resistant polymer packaging before being secured in our signature rigid cardboard transport boxes.
                        Discretion is paramount; external branding is minimal to maintain operational security.
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">4.0 Returns Policy</h3>
                    <p className="mb-6">
                        You may initiate a return within 14 days of receipt. Equipment must be returned in "Issue Standard" condition—unworn,
                        unwashed, with all tactical tags attached. Field-tested or damaged gear will be rejected at the depot.
                    </p>

                    <h3 className="font-display font-black text-3xl md:text-heading-sub text-clinical-ink mb-6 mt-12 uppercase tracking-tight">5.0 Exchange Mechanism</h3>
                    <p className="mb-6">
                        Size exchanges are processed free of charge. Please consult the <a href="/sizing" className="underline underline-offset-4">Measurement Guide</a> prior to ordering to minimize logistical friction.
                    </p>

                    <div className="border-t border-black/10 pt-8 mt-12 bg-aesop-surface p-6">
                        <p className="text-xs text-clinical-ink/60 mb-2 font-bold uppercase tracking-widest">Incident Report</p>
                        <p className="text-xs text-clinical-ink">
                            If your package arrives damaged or tampered with, do not accept delivery.
                            Contact support immediately at support@oliveedge.com.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicyPage;
