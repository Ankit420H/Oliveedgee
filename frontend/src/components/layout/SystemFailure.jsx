import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const SystemFailure = ({ error }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-clinical-canvas px-6">
            <div className="mb-8 text-signal-error animate-pulse">
                <FaExclamationTriangle size={64} />
            </div>

            <h1 className="font-display font-black text-4xl md:text-6xl text-clinical-ink mb-4 leading-[0.9] uppercase">
                System Malfunction
            </h1>

            <span className="block font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 mb-8">
                Critical Protocol Error Detected
            </span>

            <div className="bg-clinical-ink/5 p-6 rounded-lg max-w-2xl w-full mb-12 border border-clinical-ink/10 font-mono text-xs text-left overflow-auto max-h-48">
                <p className="text-signal-error mb-2">Error Log:</p>
                <code className="text-clinical-ink/70">
                    {error?.message || 'Unknown Error'}
                </code>
                {error?.stack && (
                    <pre className="mt-4 text-clinical-ink/50 whitespace-pre-wrap">
                        {error.stack}
                    </pre>
                )}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-4 bg-clinical-ink text-white font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-opacity-90 transition-opacity rounded-full shadow-lg"
                >
                    Reboot System
                </button>
            </div>
        </div>
    );
};

export default SystemFailure;
