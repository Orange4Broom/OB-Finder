export interface FileEntry {
  name: string;
  isDirectory: boolean;
}

export interface ElectronAPI {
  getDiskInfo(): unknown;
  getFiles: (path: string) => Promise<FileEntry[]>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};

declare global {
  interface Window {
    electron: {
      getFiles: (dirPath: string) => Promise<FileEntry[]>;
      getDiskInfo: () => Promise<DiskInfo[]>;
    };
  }
}
