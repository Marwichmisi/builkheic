import JSZip from 'jszip';
import type { ConvertedFile } from '../types';

export const generateZip = async (files: ConvertedFile[]): Promise<Blob> => {
    const zip = new JSZip();

    files.forEach((file) => {
        // Correction critique : On utilise le type MIME du blob pour déterminer l'extension
        // car file.url est un blob:URI opaque.
        const extension = file.blob.type === 'image/png' ? '.png' : '.jpg';
        const fileName = file.originalName.replace(/\.[^/.]+$/, "") + extension;

        zip.file(fileName, file.blob);
    });

    const zipContent = await zip.generateAsync({ type: 'blob' });
    // Force octet-stream pour obliger le navigateur à télécharger (évite l'ouverture/page blanche)
    return new Blob([zipContent], { type: 'application/octet-stream' });
};
