import { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Dropzone from './components/Dropzone';
import ProgressBar from './components/ProgressBar';
import SuccessView from './components/SuccessView';
import { useConversionQueue } from './hooks/useConversionQueue';
import type { AppState, ConvertedFile } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>('IDLE');
  const [files, setFiles] = useState<File[]>([]);
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png'>('image/jpeg');
  const [results, setResults] = useState<ConvertedFile[]>([]);

  // Callback appelé quand TOUT est fini
  const handleConversionFinished = (finalResults: ConvertedFile[]) => {
    setResults(finalResults);
    setAppState('SUCCESS');
  };

  const { progress, currentIndex, totalFiles, start, cancel, reset } = useConversionQueue({
    onAllFinished: handleConversionFinished
  });

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const startConversion = () => {
    if (files.length === 0) return;
    setAppState('PROCESSING');
    start(files, targetFormat);
  };

  const handleCancel = () => {
    cancel();
    setAppState('IDLE');
    setFiles([]);
  };

  const handleReset = () => {
    // Nettoyage mémoire des URLs créées (State App + Hook Refs)
    results.forEach(file => URL.revokeObjectURL(file.url));
    reset(); // Vide les refs du hook

    setAppState('IDLE');
    setFiles([]);
    setResults([]);
  };

  return (
    <MainLayout>
      {appState === 'IDLE' && (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-black text-brand-dark tracking-tight">
              Bienvenue sur <span className="text-brand-accent">BulkHEIC</span>
            </h1>
            <p className="text-gray-500 font-medium">
              Le convertisseur de masse ultra-rapide et sécurisé.
              <br />
              <span className="text-xs text-brand-secondary/60 uppercase tracking-widest font-bold">Privacy First • 100% Secure</span>
            </p>
          </div>

          {files.length === 0 ? (
            <div className="transform transition-transform hover:scale-[1.01] duration-300">
              <Dropzone onFilesSelected={handleFilesSelected} />
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-xl animate-slide-up">
              <div className="text-5xl mb-4 p-4 bg-brand-light inline-block rounded-full shadow-inner animate-[bounce_2s_infinite]">📄</div>
              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                {files.length} fichier{files.length > 1 ? 's' : ''} prêt{files.length > 1 ? 's' : ''}
              </h3>
              <p className="text-gray-400 mb-6 text-sm">Prêts à être convertis en haute qualité.</p>
              <button
                onClick={() => setFiles([])} // Reset simple
                className="text-sm text-red-400 hover:text-red-600 font-bold uppercase tracking-wider hover:underline transition-colors"
              >
                Changer de fichiers
              </button>
            </div>
          )}

          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center bg-white p-1.5 rounded-xl shadow-inner border border-gray-200">
              <button
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${targetFormat === 'image/jpeg' ? 'bg-brand-secondary text-white shadow-md transform scale-105' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTargetFormat('image/jpeg')}
              >
                JPG (85%)
              </button>
              <button
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${targetFormat === 'image/png' ? 'bg-brand-secondary text-white shadow-md transform scale-105' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTargetFormat('image/png')}
              >
                PNG (Transparent)
              </button>
            </div>

            <button
              onClick={startConversion}
              disabled={files.length === 0}
              className={`
                            px-12 py-4 rounded-full font-black text-white text-lg tracking-wide shadow-xl transition-all transform
                            bg-gradient-to-r from-brand-accent to-brand-secondary
                            border-2 border-transparent
                            ${files.length > 0
                  ? 'hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent/30 active:scale-95'
                  : 'opacity-50 cursor-not-allowed grayscale'}
                        `}
            >
              LANCER LA CONVERSION
            </button>
          </div>
        </div>
      )}

      {appState === 'PROCESSING' && (
        <div className="text-center py-20 max-w-lg mx-auto">
          <h2 className="text-3xl font-black text-brand-dark animate-pulse mb-8 tracking-tight">Conversion...</h2>

          <ProgressBar
            progress={progress}
            current={currentIndex + 1}
            total={totalFiles}
          />

          <button
            onClick={handleCancel}
            className="mt-12 text-sm text-gray-400 hover:text-red-500 transition-colors uppercase font-bold tracking-widest border-b border-transparent hover:border-red-500 pb-1"
          >
            Annuler le traitement
          </button>
        </div>
      )}

      {appState === 'SUCCESS' && (
        <SuccessView
          results={results}
          totalExpected={totalFiles}
          onReset={handleReset}
        />
      )}
    </MainLayout>
  );
}

export default App;
