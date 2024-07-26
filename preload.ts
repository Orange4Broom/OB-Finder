import { contextBridge, ipcRenderer } from "electron";
import { FileEntry } from "./src/hooks/useDirectoryFiles";

interface DiskInfo {
  [key: string]: string;
}

interface ElectronAPI {
  getFiles: (dirPath: string) => Promise<FileEntry[]>;
  getDiskInfo: () => Promise<DiskInfo[]>;
}

const electronAPI: ElectronAPI = {
  getFiles: (dirPath: string) => ipcRenderer.invoke("get-files", dirPath),
  getDiskInfo: () => ipcRenderer.invoke("get-disk-info"),
};

contextBridge.exposeInMainWorld("electron", electronAPI);

console.log("preload.js loaded");
console.log("contextBridge setup:", !!window.electron.getDiskInfo);
