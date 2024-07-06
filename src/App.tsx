import React from "react";
import { useDirectoryFiles } from "./hooks/useDirectoryFiles";
import { useFileType } from "./hooks/useFileType";
import { Icon } from "./components/icon/Icon";

const App: React.FC = () => {
  const { files, error, setPath, path } = useDirectoryFiles("");

  console.log(files);

  return (
    <div>
      <h3>~{path}</h3>
      <button onClick={() => setPath("Documents")}>
        Load Files from ~/Documents
      </button>
      <button onClick={() => setPath("Desktop")}>
        Load Files from ~/Desktop
      </button>
      <button onClick={() => setPath("Downloads")}>
        Load Files from ~/Downloads
      </button>
      <button onClick={() => setPath("")}>Load Files from ~/Home</button>
      <button
        onClick={() => {
          setPath((prev) => prev.split("/").slice(0, -1).join("/"));
        }}
      >
        Back
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {files.map((file, index) =>
          file.name.startsWith(".") ? null : (
            <li
              key={index}
              onClick={() => setPath((prev) => `${prev}/${file.name}`)}
            >
              {file.isDirectory ? (
                <Icon type="fas" name="folder" color="#eebd40" />
              ) : (
                <Icon type="fas" name="file" color="#6ecff2" />
              )}
              {file.name} {file.size} {file.modifiedAt} -- {file.createdAt}{" "}
              {useFileType(file.name)}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default App;
