export interface FileEntry {
  name: string;
  isDirectory: boolean;
}

export interface ElectronAPI {
  getFiles: (path: string) => Promise<FileEntry[]>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
