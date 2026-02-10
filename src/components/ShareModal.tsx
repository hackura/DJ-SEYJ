import { useRef, useEffect, useState } from 'react';
import { X, Copy, Check, Facebook, Twitter, Linkedin, MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    url: string;
}

const ShareModal = ({ isOpen, onClose, title, url }: ShareModalProps) => {
    const [copied, setCopied] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: 'bg-[#1877F2]'
        },
        {
            name: 'X (Twitter)',
            icon: Twitter,
            href: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: 'bg-black border border-zinc-700'
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            href: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
            color: 'bg-[#25D366]'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: 'bg-[#0A66C2]'
        },
        {
            name: 'Telegram',
            icon: Send,
            href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            color: 'bg-[#0088cc]'
        }
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <motion.div
                    ref={modalRef}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <h3 className="text-xl font-bold text-white mb-6">Share this Mix</h3>

                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 mb-8">
                        {shareLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 ${link.color}`}>
                                    <link.icon size={20} fill="currentColor" className={link.name === 'X (Twitter)' ? 'fill-white' : 'fill-transparent'} />
                                </div>
                                <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{link.name}</span>
                            </a>
                        ))}
                    </div>

                    <div className="bg-black/50 rounded-xl p-3 flex items-center gap-3 border border-white/5">
                        <div className="flex-1 truncate text-sm text-gray-400 font-mono">
                            {url}
                        </div>
                        <button
                            onClick={handleCopy}
                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${copied ? 'bg-green-500/20 text-green-500' : 'bg-gold-500 text-black hover:bg-gold-400'}`}
                        >
                            {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ShareModal;
