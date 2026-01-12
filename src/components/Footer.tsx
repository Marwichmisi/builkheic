import { useState } from 'react';
import PrivacyModal from './PrivacyModal';

const Footer = () => {
    const [showPrivacy, setShowPrivacy] = useState(false);
    const { footerText, footerCopyright } = window.AppConfig?.seo || {
        footerText: "Convertissez vos images HEIC localement en toute sécurité.",
        footerCopyright: "BulkHEIC (c) 2026"
    };

    return (
        <>
            <footer className="w-full p-6 text-center text-[#F3F4F4]/60 text-xs sm:text-sm mt-auto">
                <p className="mb-2 max-w-2xl mx-auto leading-relaxed opacity-80 hover:opacity-100 transition-opacity">
                    {footerText}
                </p>

                <div className="flex justify-center items-center gap-4 mt-4">
                    <span>{footerCopyright}</span>
                    <span className="text-gray-600">•</span>
                    <button
                        onClick={() => setShowPrivacy(true)}
                        className="hover:text-brand-accent hover:underline transition-colors"
                    >
                        Confidentialité & Fonctionnement
                    </button>
                </div>
            </footer>

            <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
        </>
    );
};

export default Footer;
