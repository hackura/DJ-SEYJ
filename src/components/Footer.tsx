import { Facebook, Instagram, Mail } from 'lucide-react';
import { AudiomackIcon, LinktreeIcon, TikTokIcon, XIcon } from './Icons';
import { motion } from 'framer-motion';

const Footer = () => {
    const socialLinks = [
        { icon: <Facebook size={24} />, href: "https://www.facebook.com/djseyj/", label: "Facebook" },
        { icon: <Instagram size={24} />, href: "https://www.instagram.com/djseyj/", label: "Instagram" },
        { icon: <XIcon className="w-6 h-6" />, href: "https://x.com/dorpe_karl", label: "X (Twitter)" },
        { icon: <TikTokIcon className="w-6 h-6" />, href: "https://www.tiktok.com/@djseyj", label: "TikTok" },
        { icon: <AudiomackIcon className="w-6 h-6" />, href: "https://audiomack.com/djseyj", label: "Audiomack" },
        { icon: <LinktreeIcon className="w-6 h-6" />, href: "https://linktr.ee/djseyj", label: "Linktree" },
        { icon: <Mail size={24} />, href: "mailto:mandemseyj@gmail.com", label: "Email" }
    ];

    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-black mb-8">DJ<span className="text-gold-500">SEYJ</span> MANDEM</h2>

                <div className="flex justify-center gap-6 mb-8">
                    {socialLinks.map((social, idx) =>
                        <motion.a
                            key={idx}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, color: '#FFD700' }}
                            className="text-gray-400 transition-colors"
                        >
                            {social.icon}
                        </motion.a>
                    )}
                </div>

                <p className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} DJ SeyJ Mandem. All rights reserved. <br />
                    Built by <span className="text-gold-500">Karl Seyram</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
