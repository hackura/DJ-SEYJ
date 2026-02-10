import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black" id="hero">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-dark-900 to-dark-800 z-0 opacity-90"></div>

            {/* Animated Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

            <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center justify-between">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="md:w-1/2 text-center md:text-left pt-20 md:pt-0"
                >
                    <h2 className="text-gold-500 tracking-[0.3em] font-medium mb-4 text-sm md:text-base">STUDENT DJ & WEB DEV</h2>
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-6">
                        DJ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">SEYJ</span>
                        <span className="block text-4xl md:text-5xl text-gray-500 font-light tracking-widest mt-2">MANDEM</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-8 mx-auto md:mx-0">
                        DJing and web development. The intersection of rhythm and code.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                        <Link to="/music">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 w-full md:w-auto"
                            >
                                <Play size={20} fill="currentColor" /> Latest Mix
                            </motion.button>
                        </Link>

                        <Link to="/about">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border border-white/20 hover:border-gold-500 hover:text-gold-500 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 backdrop-blur-sm w-full md:w-auto"
                            >
                                View Portfolio <ArrowRight size={20} />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Image Area */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="md:w-1/2 relative h-[50vh] md:h-[80vh] w-full flex items-center justify-center mt-10 md:mt-0"
                >
                    {/* Placeholder for DJ Image - User needs to add image named 'dj-hero.png' to public/images */}
                    <div className="relative w-full h-full max-w-lg mx-auto">
                        <div className="absolute inset-0 bg-gold-500/20 rounded-t-full blur-3xl opacity-30 transform translate-y-20"></div>
                        <img
                            src="/images/seyjlogo.png"
                            alt="DJ SeyJ"
                            width="600"
                            height="800"
                            // @ts-ignore
                            fetchPriority="high"
                            loading="eager"
                            className="w-full h-full object-contain drop-shadow-2xl relative z-10 mask-image-gradient"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x800/121212/D4AF37?text=DJ+Image+Here';
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
