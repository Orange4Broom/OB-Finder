import { useState, useEffect, useRef } from "react";

export interface FileEntry {
  name: string;
  isDirectory: boolean;
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
        setFiles(fetchedFiles);
      } catch (err) {
        if (cancelRequest.current) return;

        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(`Failed to load files from ${path}: ${message}`);
        console.error(`Error loading files for ${path}: ${message}`); // Debugging log
      }
    };

    loadFiles();

    return () => {
      cancelRequest.current = true;
    };
  }, [path]);

  return { files, error, setPath };
};
