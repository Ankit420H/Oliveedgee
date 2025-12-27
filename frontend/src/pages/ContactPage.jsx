import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import Meta from '../components/Meta';

const ContactPage = () => {
    // Basic form state (not connected to backend for this demo)
    const [status, setStatus] = useState('idle'); // idle, submitting, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <div className="bg-clinical-canvas min-h-screen text-clinical-ink pt-32 pb-24">
            <Meta title="Contact | Olive Edge" description="Contact our support team for inquiries regarding equipment and logistics." />
            <div className="container mx-auto px-6 md:px-12 max-w-2xl">
                <div className="mb-16 text-center">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-success">Customer Support</span>
                    <h1 className="font-display font-black text-6xl md:text-heading-main mb-6 uppercase">
                        Customer Service
                    </h1>
                    <p className="font-sans text-sm text-clinical-ink/70 leading-relaxed max-w-md mx-auto">
                        For inquiries regarding gear specifications, order tracking, or tactical consultations, please transmit your message below.
                    </p>
                </div>

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-clinical-highlight/20 p-12 text-center border border-clinical-ink/10 rounded-3xl"
                    >
                        <h3 className="font-display font-black text-3xl md:text-heading-sub mb-4 text-clinical-ink uppercase tracking-tight">Transmission Secure</h3>
                        <p className="font-sans text-sm text-clinical-ink/60">
                            Our team is analyzing your query. Expect a communique within 24 hours.
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-8 text-xs font-bold uppercase tracking-widest underline underline-offset-4"
                        >
                            Send Another Message
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aesop-input-group">
                                <input
                                    type="text"
                                    required
                                    className="aesop-input peer placeholder-transparent"
                                    placeholder="Your Name"
                                    id="name"
                                />
                                <label htmlFor="name">
                                    Name
                                </label>
                            </div>
                            <div className="aesop-input-group">
                                <input
                                    type="email"
                                    required
                                    className="aesop-input peer placeholder-transparent"
                                    placeholder="contact@domain.com"
                                    id="email"
                                />
                                <label htmlFor="email">
                                    Email
                                </label>
                            </div>
                        </div>

                        <div className="aesop-input-group">
                            <select className="aesop-input w-full appearance-none rounded-none" id="subject">
                                <option>Order Inquiry</option>
                                <option>Product Specification</option>
                                <option>Return Request</option>
                                <option>Other Matters</option>
                            </select>
                            <label htmlFor="subject">Subject</label> {/* Label handles float via CSS if placeholder is missing, but select always has value. */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-clinical-ink/40">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>

                        <div className="aesop-input-group">
                            <textarea
                                required
                                rows="1" // Start small, let user expand or simple fixed height
                                className="aesop-input peer placeholder-transparent resize-none h-32"
                                placeholder="Details of your inquiry..."
                                id="message"
                            ></textarea>
                            <label htmlFor="message">
                                Message
                            </label>
                        </div>

                        <div className="pt-4 text-center md:text-left">
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="px-10 py-4 bg-clinical-ink text-white font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-opacity-90 transition-opacity disabled:opacity-50 rounded-3xl"
                            >
                                {status === 'submitting' ? 'Transmitting...' : 'Submit Inquiry'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactPage;
