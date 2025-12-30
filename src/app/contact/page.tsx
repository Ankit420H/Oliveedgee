'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/api';
import { getErrorMessage } from '../../lib/error-utils';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/api/contact', formData);
            toast.success('Message sent successfully! We\'ll get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
        } catch (err: unknown) {
            toast.error(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-40">
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-3xl">
                <div className="mb-24 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-clinical-ink/40 mb-6 block">
                        Get In Touch
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl text-clinical-ink leading-none uppercase">
                        Contact Us
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block font-sans text-xs uppercase tracking-widest text-clinical-ink/60 mb-3">
                            Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-6 py-4 bg-white border border-clinical-ink/10 rounded-2xl focus:border-clinical-ink transition-colors text-clinical-ink"
                        />
                    </div>

                    <div>
                        <label className="block font-sans text-xs uppercase tracking-widest text-clinical-ink/60 mb-3">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full px-6 py-4 bg-white border border-clinical-ink/10 rounded-2xl focus:border-clinical-ink transition-colors text-clinical-ink"
                        />
                    </div>

                    <div>
                        <label className="block font-sans text-xs uppercase tracking-widest text-clinical-ink/60 mb-3">
                            Message
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            rows={6}
                            className="w-full px-6 py-4 bg-white border border-clinical-ink/10 rounded-2xl focus:border-clinical-ink transition-colors text-clinical-ink resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-12 py-4 bg-clinical-ink text-white font-sans text-xs uppercase tracking-widest rounded-full hover:bg-accent-bronze transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}
