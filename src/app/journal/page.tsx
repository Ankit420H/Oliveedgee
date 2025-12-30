'use client';

export default function JournalPage() {
    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-40">
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-5xl">
                <div className="mb-24 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-clinical-ink/40 mb-6 block">
                        Stories & Insights
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl text-clinical-ink leading-none uppercase">
                        Journal
                    </h1>
                </div>

                <div className="text-center py-20">
                    <p className="font-display text-2xl italic text-clinical-ink/30 mb-8">
                        Coming Soon
                    </p>
                    <p className="text-clinical-ink/50 max-w-md mx-auto">
                        Our journal featuring stories, style guides, and insights will be launching soon.
                    </p>
                </div>
            </div>
        </div>
    );
}
