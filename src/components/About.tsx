
import { motion } from 'framer-motion';
import { Music, Code } from 'lucide-react';

const About = () => {
    return (
        <section className="py-20 bg-dark-900 relative overflow-hidden" id="about">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center gap-12"
                >
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className="absolute inset-0 bg-gold-500 rounded-lg transform rotate-3 scale-105 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
                        <div className="relative overflow-hidden rounded-lg shadow-2xl border border-white/10">
                            <img
                                src="/images/about.png"
                                alt="DJ SeyJ Portrait"
                                width="600"
                                height="800"
                                loading="lazy"
                                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x800/1E1E1E/D4AF37?text=DJ+SeyJ+Portrait';
                                }}
                            />
                            {/* Overlay content on image */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className="text-white font-bold text-xl">SeyJ Mandem</h3>
                                <p className="text-gold-500 text-sm">DJ & Developer / Cyber Analyst</p>
                                <p className="text-gray-400 text-xs mt-1 italic">Formerly DJ Valency</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-[2px] w-12 bg-gold-500"></div>
                            <span className="text-gold-500 text-sm font-bold uppercase tracking-widest">About Me</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            Bridging the Gap Between <span className="text-gold-500">Rhythm</span> & <span className="text-gold-500">Code</span>
                        </h2>

                        <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                            I'm SeyJ (formerly DJ Valency), a multifaceted creative blending the art of DJing with the precision of web development.
                            Whether I'm curating a sonic journey for the dancefloor or architecting a clean, functional web experience,
                            my goal remains the same: to create something memorable, seamless, and high-quality.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                            {[
                                { icon: <Music className="w-6 h-6 text-gold-500" />, title: "Music Curation", desc: "Open format DJ specializing in Afro, Amapiano, and Hip Hop." },
                                { icon: <Code className="w-6 h-6 text-gold-500" />, title: "Web Development", desc: "Building fast, modern, and accessible web experiences." },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="bg-dark-800 p-6 rounded-lg border border-white/5 hover:border-gold-500/30 transition-colors"
                                >
                                    <div className="mb-4 bg-dark-900 w-12 h-12 rounded-full flex items-center justify-center border border-white/10">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-white font-bold mb-2">{item.title}</h4>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
