import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Music', path: '/music' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-black tracking-tighter hover:text-gold-500 transition-colors">
                    DJ<span className="text-gold-500"> SEY J</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm uppercase tracking-widest hover:text-gold-500 transition-colors font-medium ${isActive(link.path) ? 'text-gold-500' : 'text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" className="bg-white/10 hover:bg-gold-500 hover:text-black px-6 py-2 rounded-full transition-all text-sm font-bold border border-white/10 text-white">
                        Book Me
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Nav Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 top-[72px] bg-dark-900/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2 z-40 h-[calc(100vh-72px)] overflow-y-auto">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`text-lg uppercase tracking-widest hover:text-gold-500 transition-colors py-4 border-b border-white/5 text-left ${isActive(link.path) ? 'text-gold-500' : 'text-white'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
