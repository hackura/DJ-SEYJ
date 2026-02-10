import { Helmet } from 'react-helmet-async';
import MainLayout from '../layouts/MainLayout';
import { ArrowRight, Disc, Shield, Laptop } from 'lucide-react';
import Hero from '../components/Hero';

const Home = () => {
    return (
        <MainLayout>
            <Helmet>
                <title>DJ Sey J (Valency) | Professional DJ & Web Developer</title>
                <meta name="description" content="Official website of DJ Sey J (Valency). Experience the best mixes and check out my web development portfolio." />
                <link rel="canonical" href="https://djseyj.vercel.app/" />

                <meta name="keywords" content="DJ SeyJ, SeyJ Mandem, DJ Sey J, Dorpe Karl Seyram, DJ Valency, Ghana DJ, Afrobeat, Amapiano, Vulnerability Assessment, Cyber Security, Web Developer, React Developer" />

                {/* JSON-LD Structured Data */}
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "SeyJ Mandem",
                            "alternateName": ["DJ SeyJ", "DJ Valency", "Dorpe Karl Seyram"],
                            "url": "https://djseyj.vercel.app",
                            "image": "https://djseyj.vercel.app/images/about.png",
                            "sameAs": [
                                "https://www.facebook.com/djseyj/",
                                "https://www.instagram.com/djseyj/",
                                "https://x.com/djseyj",
                                "https://www.tiktok.com/@djseyj",
                                "https://www.youtube.com/@djseyj",
                                "https://audiomack.com/djseyj",
                                "https://linktr.ee/djseyj"
                            ],
                            "jobTitle": ["DJ", "Web Developer", "Cyber Analyst"],
                            "worksFor": {
                                "@type": "Organization",
                                "name": "SeyJ Mandem Brand"
                            },
                            "description": "Professional DJ specializing in Afrobeat and Amapiano, and skilled Web Developer."
                        }
                    `}
                </script>

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://djseyj.vercel.app/" />
                <meta property="og:title" content="DJ Sey J (Valency) | Professional DJ & Web Developer" />
                <meta property="og:description" content="Official website of DJ Sey J (Valency) (Dorpe Karl Seyram). Experience the best mixes from the former DJ Valency and check out my web development portfolio." />
                <meta property="og:image" content="https://djseyj.vercel.app/images/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://djseyj.vercel.app/" />
                <meta property="twitter:title" content="DJ Sey J (Valency) | Professional DJ & Web Developer" />
                <meta property="twitter:description" content="Official website of DJ Sey J (Valency) (Dorpe Karl Seyram). Experience the best mixes from the former DJ Valency and check out my web development portfolio." />
                <meta property="twitter:image" content="https://djseyj.vercel.app/images/og-image.jpg" />
            </Helmet>

            <Hero />

            {/* Featured Mix Teaser */}
            <section className="py-20 bg-dark-900 border-b border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-gold-500 tracking-widest uppercase font-bold text-sm mb-2">Listen Now</h2>
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Latest Mixes & Vibes</h3>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                Dive into the sounds of Afrobeat, Amapiano, and more. Experience the energy of a SeyJ set from anywhere in the world.
                            </p>
                            <a href="/music" className="inline-flex items-center gap-2 text-gold-500 font-bold hover:gap-3 transition-all">
                                Explore Mixes <ArrowRight size={20} />
                            </a>
                        </div>
                        <div className="w-full md:w-1/2 relative group">
                            <div className="absolute inset-0 bg-gold-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <img
                                src="https://images.unsplash.com/photo-1594623930572-300a3011d9ae?q=80&w=1000&auto=format&fit=crop"
                                alt="DJ Turntables"
                                className="rounded-2xl shadow-2xl relative z-10 border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Teaser */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-gold-500 tracking-widest uppercase font-bold text-sm mb-2">What I Do</h2>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-16">Services</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Disc size={32} />, title: "Live DJ Sets", desc: "Weddings, Clubs, & Private Events" },
                            { icon: <Shield size={32} />, title: "Vulnerability Assessment", desc: "Security Audits & Pen Testing" },
                            { icon: <Laptop size={32} />, title: "Web Development", desc: "Custom Websites & Apps" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-zinc-900 p-8 rounded-xl border border-white/5 hover:border-gold-500/30 transition-all hover:-translate-y-2 group">
                                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-6 text-gold-500 group-hover:text-white group-hover:bg-gold-500 transition-all border border-white/10">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <a href="/services" className="inline-flex items-center gap-2 text-white hover:text-gold-500 font-bold transition-colors">
                            View All Services <ArrowRight size={20} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-24 bg-gold-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/90"></div>
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to Create Something Amazing?</h2>
                    <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
                        Whether you need a DJ for your next event or a developer for your next project, let's make it happen.
                    </p>
                    <a href="/contact" className="bg-gold-500 text-black font-bold py-4 px-10 rounded-full hover:bg-gold-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] inline-flex items-center gap-2">
                        Book Now <ArrowRight size={20} />
                    </a>
                </div>
            </section>
        </MainLayout>
    );
};

export default Home;
