import React from 'react';
import Meta from '../components/Meta';

const StoreLocation = ({ city, address, hours, phone }) => (
    <div className="border-t border-clinical-ink/20 py-12 flex flex-col md:flex-row md:justify-between md:items-start gap-8 group hover:bg-white/40 transition-colors px-4 -mx-4">
        <div className="md:w-1/3">
            <h2 className="font-display font-black text-4xl uppercase mb-2">{city}</h2>
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60">Flagship</span>
        </div>
        <div className="md:w-1/3 font-sans text-sm leading-relaxed text-clinical-ink/80">
            <p className="whitespace-pre-line">{address}</p>
        </div>
        <div className="md:w-1/3 font-sans text-sm leading-relaxed text-clinical-ink/80 md:text-right">
            <p className="mb-4">{hours}</p>
            <p className="font-mono text-xs">{phone}</p>
        </div>
    </div>
);

const StoresPage = () => {
    return (
        <div className="bg-clinical-canvas min-h-screen text-clinical-ink pt-32 pb-24">
            <Meta title="Locations | Olive Edge" description="Visit our flagship tactical supplies outposts in New York, Tokyo, and London." />
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">

                <div className="mb-24 text-center">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 mb-4 block">
                        Global Outposts
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-heading-main leading-[0.9] mb-8 uppercase">
                        Physical <br /> Presence.
                    </h1>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-clinical-ink/70 max-w-2xl mx-auto">
                        Experience our equipment in the physical realm.
                        Our spaces are designed as sanctuaries of silence and tactical readiness.
                    </p>
                </div>

                <div className="border-b border-clinical-ink/20">
                    <StoreLocation
                        city="New York"
                        address={`104 Prince St.\nSoHo, NY 10012`}
                        hours={`Mon-Sat: 11:00 - 19:00\nSun: 12:00 - 18:00`}
                        phone="+1 212 555 0199"
                    />
                    <StoreLocation
                        city="Tokyo"
                        address={`5-12-6 Minami-Aoyama\nMinato-ku, Tokyo 107-0062`}
                        hours={`Daily: 11:00 - 20:00`}
                        phone="+81 3 5555 0199"
                    />
                    <StoreLocation
                        city="London"
                        address={`42 Redchurch St.\nShoreditch, E2 7DP`}
                        hours={`Mon-Sat: 10:00 - 19:00\nSun: 12:00 - 17:00`}
                        phone="+44 20 7555 0199"
                    />
                </div>

                <div className="mt-24 bg-aesop-surface p-12 text-center rounded-3xl">
                    <h3 className="font-display font-medium text-2xl mb-4">Stockists</h3>
                    <p className="font-sans text-sm text-clinical-ink/70 max-w-md mx-auto mb-8">
                        Olive Edge equipment is also available at select specialized retailers worldwide.
                    </p>
                    <a href="/contact" className="px-8 py-3 border border-clinical-ink/20 hover:bg-clinical-ink hover:text-clinical-canvas transition-colors font-sans text-xs font-bold uppercase tracking-widest inline-block rounded-full">
                        Inquire about Wholesale
                    </a>
                </div>

            </div>
        </div>
    );
};

export default StoresPage;
