import React, { useEffect } from 'react';

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div
                className="bg-white text-brand-dark rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-brand-light">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        🛡️ Confidentialité & Sécurité
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-brand-dark transition-colors">
                        ✕
                    </button>
                </div>

                <div className="p-6 space-y-4 text-sm sm:text-base leading-relaxed text-gray-600">
                    <p>
                        <strong className="text-brand-dark">bulkheic</strong> est conçu avec une philosophie "Local-First".
                    </p>

                    <div className="bg-brand-secondary/5 p-4 rounded-lg border border-brand-secondary/10">
                        <h4 className="font-bold text-brand-secondary mb-2">Comment ça marche ?</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Vos images ne quittent <strong>jamais</strong> votre appareil.</li>
                            <li>La conversion est effectuée par votre navigateur (via WebAssembly).</li>
                            <li>Aucun serveur cloud n'a accès à vos fichiers.</li>
                        </ul>
                    </div>

                    <p>
                        Une fois la conversion terminée et le téléchargement effectué, les données temporaires sont <strong>automatiquement effacées</strong> de la mémoire de votre navigateur.
                    </p>
                </div>

                <div className="p-6 pt-2 text-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-brand-dark text-white rounded-full font-bold hover:bg-brand-secondary transition-colors shadow-lg"
                    >
                        J'ai compris
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
