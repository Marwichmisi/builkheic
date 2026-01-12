import React, { useState } from 'react';
import type { ConvertedFile } from '../types';
import { generateZip } from '../utils/zip';

interface SuccessViewProps {
    results: ConvertedFile[];
    totalExpected: number;
    onReset: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ results, totalExpected, onReset }) => {
    const [isZipping, setIsZipping] = useState(false);
    const failureCount = totalExpected - results.length;

    const handleDownloadZip = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsZipping(true);
        try {
            const zipBlob = await generateZip(results);
            const url = URL.createObjectURL(zipBlob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `heic_converted_${new Date().getTime()}.zip`;
            link.style.display = 'none';
            document.body.appendChild(link);

            // Lancement du téléchargement
            link.click();

            // Nettoyage immédiat du DOM
            document.body.removeChild(link);

            // Redirection immédiate vers l'accueil
            onReset();

            // On révoque l'URL plus tard pour laisser le temps au navigateur de démarrer le flux
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 5000);

        } catch (e) {
            console.error("ZIP Generation failed", e);
            alert("Erreur lors de la création du ZIP.");
            setIsZipping(false); // On ne reset pas si erreur, pour laisser l'utilisateur réessayer
        }
    };

    return (
        <div className="text-center py-10 space-y-8 max-w-2xl mx-auto animate-fade-in">
            <div className="space-y-4">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-5xl shadow-sm">
                    ✓
                </div>
                <h2 className="text-3xl font-bold text-brand-dark">Conversion Terminée !</h2>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 inline-block text-left">
                    <p className="text-brand-secondary font-medium">
                        ✅ Succès : <span className="font-bold">{results.length}</span> image{results.length > 1 ? 's' : ''}
                    </p>
                    {failureCount > 0 && (
                        <p className="text-red-500 font-medium">
                            ❌ Échecs : <span className="font-bold">{failureCount}</span> image{failureCount > 1 ? 's' : ''}
                        </p>
                    )}
                </div>
            </div>

            {results.length > 0 && (
                <div className="flex justify-center gap-4 py-4">
                    {results.slice(0, 3).map((file, idx) => (
                        <div key={idx} className="relative group">
                            <img
                                src={file.url}
                                alt="Preview"
                                className="w-24 h-24 object-cover rounded-lg shadow-md border-2 border-white transform rotate-[-2deg] group-hover:rotate-0 transition-all"
                            />
                        </div>
                    ))}
                    {results.length > 3 && (
                        <div className="w-24 h-24 bg-gray-100 rounded-lg shadow-md border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-bold">
                            +{results.length - 3}
                        </div>
                    )}
                </div>
            )}

            <div className="flex flex-col items-center gap-4 pt-4">
                <button
                    onClick={handleDownloadZip}
                    disabled={isZipping || results.length === 0}
                    className={`
                px-10 py-4 rounded-full font-bold text-white text-lg shadow-xl transition-all transform flex items-center gap-3
                ${isZipping
                            ? 'bg-gray-400 cursor-wait'
                            : 'bg-brand-accent hover:bg-brand-secondary hover:scale-105 active:scale-95'}
            `}
                >
                    {isZipping ? (
                        <>⏳ Création du ZIP...</>
                    ) : (
                        <>📥 TÉLÉCHARGER LE ZIP ({results.length})</>
                    )}
                </button>

                <button
                    onClick={onReset}
                    className="text-gray-500 hover:text-brand-dark hover:underline py-2"
                >
                    ↻ Convertir d'autres images
                </button>
            </div>
        </div>
    );
};

export default SuccessView;
