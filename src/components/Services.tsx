import { motion } from 'framer-motion';
import { Disc, Shield, Laptop, ArrowUpRight } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Disc size={28} />,
            title: "Live DJ Sets",
            description: "High-energy open format sets that keep the dancefloor moving. Specializing in Afro, Amapiano, Hip Hop, and RnB.",
            tags: ["Club Events", "Private Parties", "Weddings", "Festivals"]
        },
        {
            icon: <Shield size={28} />,
            title: "Vulnerability Assessment",
            description: "Comprehensive security assessments to identify and mitigate potential threats in your digital infrastructure. Ensuring your systems are secure and resilient.",
            tags: ["Penetration Testing", "Security Audits", "Risk Analysis", "Network Safety"]
        },
        {
            icon: <Laptop size={28} />,
            title: "Web Development",
            description: "Modern, responsive websites built with React, TypeScript, and TailwindCSS. From portfolios to full-stack applications.",
            tags: ["Frontend", "UI/UX Design", "eCommerce", "SEO"]
        }
    ];

    return (
        <section className="py-24 bg-black relative" id="services">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-gold-500 tracking-widest uppercase font-bold text-sm mb-2">What I Do</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white">Services & Expertise</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900/80 backdrop-blur-sm group relative p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <ArrowUpRight className="text-gold-500" />
                            </div>

                            <div className="relative w-16 h-16 mb-8 group-hover:-translate-y-1 transition-transform duration-500">
                                <div className="absolute inset-0 bg-gold-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative h-full w-full bg-black border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-gold-500/50 transition-colors duration-500">
                                    <div className="text-gold-500 group-hover:text-white transition-colors duration-500">
                                        {service.icon}
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
                            <p className="text-gray-400 mb-8 leading-relaxed text-sm border-l-2 border-gold-500/20 pl-4">{service.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {service.tags.map((tag, i) => (
                                    <span key={i} className="text-[10px] uppercase tracking-wider font-semibold bg-white/5 text-gray-400 px-3 py-1 rounded-sm border border-white/5 hover:border-gold-500/30 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
