export type AppState = 'IDLE' | 'PROCESSING' | 'SUCCESS';

export interface ConvertedFile {
    originalName: string;
    blob: Blob;
    url: string;
}
