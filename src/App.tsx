import React from "react";
import { useDirectoryFiles } from "./hooks/useDirectoryFiles";

const App: React.FC = () => {
  const { files, error, setPath } = useDirectoryFiles("");

  console.log(files);

  return (
    <div>
      <button onClick={() => setPath("Documents/work")}>
        Load Files from ~/Documents
      </button>
      <button onClick={() => setPath("Desktop")}>
        Load Files from ~/Desktop
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.isDirectory ? "📁" : "📄"} {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
