import React, { useCallback, useState } from 'react';
import { scanFiles } from '../utils/fileScanner';

interface DropzoneProps {
    onFilesSelected: (files: File[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFilesSelected }) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        // Si des items sont disponibles (mode récursif pour dossiers)
        if (e.dataTransfer.items) {
            setIsScanning(true);
            try {
                const allFiles = await scanFiles(e.dataTransfer.items);

                const heicFiles = allFiles.filter(f =>
                    f.name.toLowerCase().endsWith('.heic') || f.name.toLowerCase().endsWith('.heif')
                );

                if (heicFiles.length > 0) {
                    onFilesSelected(heicFiles);
                } else {
                    alert("Aucun fichier HEIC détecté dans la sélection (dossiers inclus).");
                }
            } catch (error) {
                console.error("Erreur lors du scan des dossiers:", error);
                alert("Erreur lors de la lecture des dossiers.");
            } finally {
                setIsScanning(false);
            }
        } else {
            // Fallback standard (peu probable sur navigateurs modernes)
            const droppedFiles = Array.from(e.dataTransfer.files);
            const heicFiles = droppedFiles.filter(f =>
                f.name.toLowerCase().endsWith('.heic') || f.name.toLowerCase().endsWith('.heif')
            );
            if (heicFiles.length > 0) onFilesSelected(heicFiles);
            else alert("Aucun fichier HEIC détecté.");
        }

    }, [onFilesSelected]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            onFilesSelected(selectedFiles);
        }
    }, [onFilesSelected]);

    return (
        <div
            className={`
            border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer h-64
            ${isDragActive ? 'border-brand-accent bg-brand-light/50' : 'border-gray-300 hover:border-brand-secondary'}
        `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
        >
            <input
                id="fileInput"
                type="file"
                className="hidden"
                accept=".heic,.heif"
                multiple
                onChange={handleInputChange}
            />

            <div className="mb-4">
                <svg className={`w-16 h-16 ${isDragActive ? 'text-brand-accent' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            </div>

            <h3 className="text-xl font-medium text-brand-dark mb-2">
                {isScanning ? "Analyse des dossiers..." : (isDragActive ? "Lâchez pour ajouter !" : "Glissez vos fichiers HEIC ici")}
            </h3>
            <p className="text-gray-500 text-sm">
                ou cliquez pour parcourir vos dossiers
            </p>
        </div>
    );
};

export default Dropzone;
