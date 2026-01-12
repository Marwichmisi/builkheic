import { useState, useRef, useEffect, useCallback } from 'react';
import type { ConvertedFile } from '../types';

interface UseConversionQueueProps {
    onAllFinished: (results: ConvertedFile[]) => void;
}

export const useConversionQueue = ({ onAllFinished }: UseConversionQueueProps) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalFiles, setTotalFiles] = useState(0);

    const workerRef = useRef<Worker | null>(null);
    const queueRef = useRef<File[]>([]);
    const resultsRef = useRef<ConvertedFile[]>([]);
    const currentFileIndexRef = useRef(0);
    const targetFormatRef = useRef<'image/jpeg' | 'image/png'>('image/jpeg');

    // Initialisation du Worker
    useEffect(() => {
        workerRef.current = new Worker(new URL('../workers/magick.worker.ts', import.meta.url), {
            type: 'module'
        });

        workerRef.current.onmessage = handleWorkerMessage;

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const handleWorkerMessage = useCallback((e: MessageEvent) => {
        const { blob, error } = e.data;

        // Si succès, on stocke le résultat
        if (blob && !error) {
            const originalFile = queueRef.current[currentFileIndexRef.current];

            resultsRef.current.push({
                originalName: originalFile.name,
                blob: blob,
                url: URL.createObjectURL(blob)
            });
        } else if (error) {
            console.warn(`Conversion failed for file index ${currentFileIndexRef.current}:`, error);
            // Silent fail: on continue juste
        }

        // Passage au suivant
        processNext();
    }, [onAllFinished]); // dependency stable normalement

    const processNext = useCallback(() => {
        currentFileIndexRef.current++;
        const nextIndex = currentFileIndexRef.current;

        // Mise à jour progression
        setCurrentIndex(nextIndex);
        const total = queueRef.current.length;
        if (total > 0) {
            setProgress(Math.round((nextIndex / total) * 100));
        }

        // Vérification fin
        if (nextIndex >= total) {
            setIsProcessing(false);
            onAllFinished(resultsRef.current);
            return;
        }

        // Envoi du suivant
        const nextFile = queueRef.current[nextIndex];
        workerRef.current?.postMessage({
            file: nextFile,
            format: targetFormatRef.current
        });
    }, [onAllFinished]);

    const start = useCallback((files: File[], format: 'image/jpeg' | 'image/png') => {
        if (files.length === 0) return;

        queueRef.current = files;
        resultsRef.current = [];
        currentFileIndexRef.current = -1; // Sera incrémenté à 0 par processNext appelé manuellement ou non? 
        // Non, on appelle processNext une fois le premier fini? Non, il faut lancer le premier.

        // Reset state
        setTotalFiles(files.length);
        setCurrentIndex(0);
        setProgress(0);
        setIsProcessing(true);
        targetFormatRef.current = format;

        // Lancement du premier (index 0)
        currentFileIndexRef.current = 0;
        const firstFile = files[0];
        workerRef.current?.postMessage({
            file: firstFile,
            format: format
        });

    }, []);

    const cancel = useCallback(() => {
        // Terminer et recréer le worker pour être sûr d'arrêter le processing en cours
        workerRef.current?.terminate();
        workerRef.current = new Worker(new URL('../workers/magick.worker.ts', import.meta.url), {
            type: 'module'
        });
        workerRef.current.onmessage = handleWorkerMessage;

        setIsProcessing(false);
        setProgress(0);
        setCurrentIndex(0);
        queueRef.current = [];
        resultsRef.current = []; // Nettoyage references blobs en cas d'annulation
    }, [handleWorkerMessage]);

    // Nouvelle fonction reset pour nettoyage mémoire explicite
    const reset = useCallback(() => {
        queueRef.current = [];
        resultsRef.current = [];
        setTotalFiles(0);
        setProgress(0);
        setCurrentIndex(0);
        setIsProcessing(false);
    }, []);

    return {
        isProcessing,
        progress,
        currentIndex,
        totalFiles,
        start,
        cancel,
        reset
    };
};
