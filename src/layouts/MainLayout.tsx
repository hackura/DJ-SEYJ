import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Analytics } from '@vercel/analytics/react';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-dark-900 text-white font-sans">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Analytics />
            <Footer />
        </div>
    );
};

export default MainLayout;
