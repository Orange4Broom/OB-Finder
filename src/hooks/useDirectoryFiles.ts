import { useState, useEffect, useRef } from "react";

export interface FileEntry {
  name: string;
  isDirectory: boolean;
  size: number;
  createdAt: string;
  modifiedAt: string;
}

export const useDirectoryFiles = (initialPath: string) => {
  const [path, setPath] = useState(initialPath);
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const cancelRequest = useRef<boolean>(false);

  useEffect(() => {
    cancelRequest.current = false;
    const loadFiles = async () => {
      try {
        let fetchedFiles = await window.electron.getFiles(path);
        if (cancelRequest.current) return;
        setFiles(fetchedFiles as FileEntry[]);
      } catch (err) {
        if (cancelRequest.current) return;

        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(`Failed to load files from ${path}: ${message}`);
      }
    };

    loadFiles();

    return () => {
      cancelRequest.current = true;
    };
  }, [path]);

  return { files, error, setPath, path };
};
