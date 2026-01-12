import React, { type ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdPlaceholder from '../components/AdPlaceholder';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans text-brand-dark bg-gradient-to-br from-brand-dark via-[#103040] to-brand-secondary">
            {/* Top Ad (Optionnel) */}
            <div className="pt-6">
                <AdPlaceholder position="top" />
            </div>

            <Header />

            <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
                <div className="w-full max-w-4xl bg-[#F3F4F4] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md bg-opacity-95 border border-white/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="p-6 sm:p-10 lg:p-14">
                        {children}
                    </div>
                </div>
            </main>

            {/* Bottom Ad */}
            <div className="pb-6">
                <AdPlaceholder position="bottom" />
            </div>

            <Footer />
        </div>
    );
};

export default MainLayout;
