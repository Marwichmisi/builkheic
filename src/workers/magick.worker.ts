import {
    initializeImageMagick,
    ImageMagick,
    MagickFormat,
} from '@imagemagick/magick-wasm';

const WASM_LOCATION = '/magick.wasm';

// Initialisation unique
const initPromise = (async () => {
    try {
        const wasmBytes = await fetch(WASM_LOCATION).then(res => res.arrayBuffer());
        await initializeImageMagick(wasmBytes);
        console.log('Magick Worker: Initialized');
    } catch (err) {
        console.error('Magick Worker: Initialization failed', err);
        throw err;
    }
})();

self.onmessage = async (e: MessageEvent) => {
    await initPromise;

    const { file, format } = e.data; // format can be 'image/jpeg' or 'image/png'

    if (!file) {
        self.postMessage({ error: 'No file provided' });
        return;
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        ImageMagick.read(bytes, (image) => {
            // Configuration explicite du format cible
            console.log(`WORKER: Received format request: ${format}`);

            // On déclare explicitement le type pour éviter l'inférence étroite
            let targetFormat: MagickFormat = MagickFormat.Jpeg;

            // Vérification souple du format
            if (format && (format === 'image/png' || format.includes('png'))) {
                console.log('WORKER: Switching to PNG mode');
                targetFormat = MagickFormat.Png;
            } else {
                console.log('WORKER: Defaulting to JPEG mode');
                targetFormat = MagickFormat.Jpeg;
            }

            if (targetFormat === MagickFormat.Jpeg) {
                image.quality = 85;
            }

            // Exécution de la conversion
            image.write(targetFormat, (data) => {
                // Création du Blob résultat - Cast any pour éviter les erreurs TS
                const resultBlob = new Blob([data as any], { type: format });

                // @ts-ignore - Signature postMessage simple
                self.postMessage({ buffer: data, blob: resultBlob });
            });
        });

    } catch (error) {
        console.error('Conversion Error:', error);
        self.postMessage({ error: (error as Error).message });
    }
};
