// Utilitaire pour scanner récursivement les fichiers et dossiers déposés
// Utilise l'API FileSystemEntry (webkitGetAsEntry)

export async function scanFiles(items: DataTransferItemList): Promise<File[]> {
    const files: File[] = [];

    // Fonction helper pour traverser les entrées
    const traverse = async (entry: FileSystemEntry) => {
        if (entry.isFile) {
            const file = await new Promise<File>((resolve, reject) => {
                (entry as FileSystemFileEntry).file(resolve, reject);
            });
            files.push(file);
        } else if (entry.isDirectory) {
            const dirReader = (entry as FileSystemDirectoryEntry).createReader();
            const entries = await new Promise<FileSystemEntry[]>((resolve, reject) => {
                dirReader.readEntries(resolve, reject);
            });

            // On continue récursivement pour chaque entrée du dossier
            for (const nestedEntry of entries) {
                await traverse(nestedEntry);
            }
        }
    };

    const entries: FileSystemEntry[] = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
            const entry = item.webkitGetAsEntry();
            if (entry) {
                entries.push(entry);
            }
        }
    }

    // Exécution parallèle des traversées de premier niveau
    await Promise.all(entries.map(traverse));

    return files;
}
