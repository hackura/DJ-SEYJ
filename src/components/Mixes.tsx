
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Download, Pause, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ShareModal from './ShareModal';

interface Mix {
    id: number;
    title: string;
    description: string;
    audio_url: string;
    cover_url: string;
    created_at: string;
}

const Mixes = () => {
    const [mixes, setMixes] = useState<Mix[]>([]);
    const [currentMix, setCurrentMix] = useState<Mix | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        fetchMixes();
    }, []);

    useEffect(() => {
        if (currentMix && audioRef.current) {
            // Only update src if it's different to prevent reloading on every render
            if (audioRef.current.src !== currentMix.audio_url) {
                audioRef.current.src = currentMix.audio_url;
                // Attempt to play, handling potential autoplay policy errors
                const playPromise = audioRef.current.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                        })
                        .catch(error => {
                            console.error("Playback failed:", error);
                            setIsPlaying(false);
                        });
                }
            } else {
                // If same source, just resume if not playing
                if (!isPlaying) {
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => setIsPlaying(true))
                            .catch(console.error);
                    }
                }
            }
        }
    }, [currentMix]);

    const fetchMixes = async () => {
        const { data, error } = await supabase
            .from('mixes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching mixes:', error);
        } else {
            setMixes(data || []);

            // Check for mixId in URL
            const searchParams = new URLSearchParams(window.location.search);
            const mixId = searchParams.get('mixId');

            if (mixId && data) {
                const sharedMix = data.find(m => m.id === Number(mixId));
                if (sharedMix) {
                    setCurrentMix(sharedMix);
                    // Optionally auto-play if desired, but browser policies might block it
                    // setIsPlaying(true); 
                } else if (data.length > 0) {
                    // setCurrentMix(data[0]); // Optional default
                }
            } else if (data && data.length > 0) {
                // setCurrentMix(data[0]); // Optional default if no ID
            }
        }
    };

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch(error => console.error("Play failed:", error));
            }
        }
    };

    const handleMixSelect = (mix: Mix) => {
        if (currentMix?.id === mix.id) {
            togglePlay();
        } else {
            setCurrentMix(mix);
        }
    };

    const featuredMix = currentMix || mixes[0];

    return (
        <section className="py-24 bg-dark-900 relative" id="music">
            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} crossOrigin="anonymous" />

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                title={featuredMix?.title || 'Check out this mix by DJ SeyJ'}
                url={featuredMix ? `${window.location.origin}/music?mixId=${featuredMix.id}` : window.location.href}
                description={featuredMix?.description}
            />

            {/* Decorative Elements */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-start gap-12">

                    {/* Latest Mix / Player Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full md:w-2/3"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-[2px] w-12 bg-gold-500"></div>
                            <span className="text-gold-500 text-sm font-bold uppercase tracking-widest">
                                {currentMix ? 'Now Playing' : 'Latest Mix'}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
                            Vibes on <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Replay</span>
                        </h2>

                        {featuredMix ? (
                            <div className="w-full bg-dark-800 rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative group p-8 flex flex-col md:flex-row gap-8 items-center">
                                {/* Cover Art */}
                                <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-xl overflow-hidden relative shadow-lg">
                                    <img
                                        src={featuredMix.cover_url || 'https://placehold.co/400x400/222/D4AF37?text=No+Cover'}
                                        alt={featuredMix.title}
                                        width="400"
                                        height="400"
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Play Overlay for Cover */}
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <button
                                            onClick={togglePlay}
                                            className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
                                        >
                                            {isPlaying && currentMix?.id === featuredMix.id ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Track Info & Controls */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{featuredMix.title}</h3>
                                    <p className="text-gray-400 mb-6 line-clamp-3">{featuredMix.description}</p>

                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                        <button
                                            onClick={togglePlay}
                                            className="px-6 py-3 bg-gold-500 text-black font-bold rounded-lg hover:bg-gold-400 transition-colors flex items-center gap-2"
                                        >
                                            {isPlaying && currentMix?.id === featuredMix.id ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Play Now</>}
                                        </button>

                                        <a
                                            href={featuredMix.audio_url}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                                        >
                                            <Download size={20} /> Download
                                        </a>

                                        <button
                                            onClick={() => setIsShareModalOpen(true)}
                                            className="px-6 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                                        >
                                            <Share2 size={20} /> Share
                                        </button>
                                    </div>
                                    <div className="mt-4 text-xs text-gray-500">
                                        Uploaded on {new Date(featuredMix.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-[400px] bg-dark-800 rounded-2xl border border-white/5 flex items-center justify-center text-gray-500">
                                <p>No mixes uploaded yet.</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Mix List */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/3 bg-black p-6 rounded-2xl border border-white/5 max-h-[600px] overflow-y-auto custom-scrollbar"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="bg-gold-500 w-2 h-8 rounded-sm"></span> Recent Sets
                        </h3>

                        <div className="space-y-4">
                            {mixes.map((mix) => (
                                <div
                                    key={mix.id}
                                    onClick={() => handleMixSelect(mix)}
                                    className={`group flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer ${currentMix?.id === mix.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                >
                                    <div className="w-16 h-16 bg-dark-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                                        <img
                                            src={mix.cover_url || 'https://placehold.co/100x100/222/D4AF37?text=Mix'}
                                            alt={mix.title}
                                            width="100"
                                            height="100"
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${currentMix?.id === mix.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                            {currentMix?.id === mix.id && isPlaying ? (
                                                <Pause size={20} className="text-gold-500" fill="currentColor" />
                                            ) : (
                                                <Play size={20} className="text-white" fill="white" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-bold text-sm truncate transition-colors ${currentMix?.id === mix.id ? 'text-gold-500' : 'text-white group-hover:text-gold-500'}`}>
                                            {mix.title}
                                        </h4>
                                        <p className="text-gray-500 text-xs mt-1 truncate">{new Date(mix.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <ExternalLink size={16} className="text-gray-600 ml-auto group-hover:text-gold-500 transition-colors" />
                                </div>
                            ))}

                            {mixes.length === 0 && (
                                <div className="text-gray-500 text-center py-4">
                                    No mixes found.
                                </div>
                            )}
                        </div>

                        <button className="w-full mt-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all">
                            View All Mixes
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Mixes;

