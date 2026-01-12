import { useState } from 'react';
import PrivacyModal from './PrivacyModal';

const Footer = () => {
    const [showPrivacy, setShowPrivacy] = useState(false);

    const { footerCopyright, descriptionTitle, descriptionText } = window.AppConfig?.seo || {
        footerCopyright: "bulkheic ©",
        descriptionTitle: "Convertisseur HEIC Local",
        descriptionText: "Description..."
    };

    return (
        <>
            <footer className="w-full mt-auto">
                {/* SEO Section */}
                <div className="bg-black/20 py-12 px-6 border-t border-white/5 shadow-inner">
                    <div className="max-w-4xl mx-auto text-brand-light/80">
                        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white flex items-center gap-2">
                            {descriptionTitle}
                        </h2>
                        <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-justify whitespace-pre-line leading-relaxed">
                            {descriptionText}
                        </div>
                    </div>
                </div>

                {/* Copyright Line */}
                <div className="p-6 text-center text-[#F3F4F4]/60 text-xs sm:text-sm bg-black/10">
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                        <span>{footerCopyright}</span>
                        <span className="hidden sm:inline">•</span>
                        <button
                            onClick={() => setShowPrivacy(true)}
                            className="hover:text-brand-accent hover:underline transition-colors"
                        >
                            Confidentialité & Fonctionnement
                        </button>
                    </div>
                </div>
            </footer>

            <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
        </>
    );
};

export default Footer;
