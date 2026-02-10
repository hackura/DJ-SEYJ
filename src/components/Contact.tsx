import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('idle');

        // Basic Validation
        if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formState.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });


            if (response.ok) {
                setStatus('success');
                setFormState({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                const errorText = await response.text();
                console.error('Failed to send message:', response.status, errorText);
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="py-24 bg-black relative" id="contact">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-black to-black opacity-80 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-gold-500 tracking-widest uppercase font-bold text-sm mb-2">Get In Touch</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white">Bookings & Inquiries</h3>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/3 space-y-8"
                    >
                        <div className="bg-dark-900 p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors">
                            <h4 className="text-2xl font-bold text-white mb-6">Contact Info</h4>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-dark-800 p-3 rounded-lg text-gold-500">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Email</p>
                                        <a href="mailto:mandemseyj@gmail.com" className="text-white hover:text-gold-500 transition-colors font-medium">mandemseyj@gmail.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-dark-800 p-3 rounded-lg text-gold-500">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Phone & WhatsApp</p>
                                        <a href="https://wa.me/233508579987" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-500 transition-colors font-medium">+233 50 857 9987</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-dark-800 p-3 rounded-lg text-gold-500">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Location</p>
                                        <p className="text-white font-medium">Accra, Ghana</p>
                                        <p className="text-gray-500 text-xs mt-1">Available for International Travel</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gold-500/10 p-8 rounded-2xl border border-gold-500/20">
                            <h4 className="text-gold-500 font-bold text-xl mb-4">Let's Create Magic</h4>
                            <p className="text-gray-300 mb-6">
                                Ready to elevate your event? Whether it's a club night, private party, or corporate event, I bring the perfect vibe.
                            </p>
                            <button onClick={() => document.getElementById('subject')?.focus()} className="text-gold-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                Book Now <Send size={18} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-2/3"
                    >
                        <form onSubmit={handleSubmit} className="bg-dark-900 p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-400 text-sm mb-2 font-medium">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-gray-600"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-400 text-sm mb-2 font-medium">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-gray-600"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="subject" className="block text-gray-400 text-sm mb-2 font-medium">Subject</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formState.subject}
                                    onChange={handleChange as any}
                                    className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-gray-400"
                                >
                                    <option value="" disabled>Select an option</option>
                                    <option value="booking">DJ Booking</option>
                                    <option value="production">Music Production</option>
                                    <option value="webdev">Web Development</option>
                                    <option value="other">Other Inquiry</option>
                                </select>
                            </div>

                            <div className="mb-8">
                                <label htmlFor="message" className="block text-gray-400 text-sm mb-2 font-medium">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-gray-600"
                                    placeholder="Tell me about your event or project..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-gold-500/20 transform hover:-translate-y-1 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
                                >
                                    Thanks for reaching out! I will get back to you soon.
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center"
                                >
                                    Failed to send message. Please try again later.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
