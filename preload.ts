import { contextBridge, ipcRenderer } from "electron";
import { FileEntry } from "./src/hooks/useDirectoryFiles";

interface ElectronAPI {
  getFiles: (dirPath: string) => Promise<FileEntry[]>;
}

const electronAPI: ElectronAPI = {
  getFiles: (dirPath: string) => ipcRenderer.invoke("get-files", dirPath),
};

contextBridge.exposeInMainWorld("electron", {
  getFiles: async (dirPath: any) => {
    try {
      console.log("Requesting files for path:", dirPath);
      const files = await ipcRenderer.invoke("get-files", dirPath);
      console.log("Received files:", files);
      return files;
    } catch (error) {
      console.error("Error in getFiles:", error);
      throw error;
    }
  },
});

contextBridge.exposeInMainWorld("electron", electronAPI);
