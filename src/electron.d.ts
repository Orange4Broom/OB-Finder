export interface FileEntry {
  name: string;
  isDirectory: boolean;
}

export interface ElectronAPI {
  getFiles: (path: string) => Promise<FileEntry[]>; // Assuming FileEntry is correctly defined elsewhere
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
