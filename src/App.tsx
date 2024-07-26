import React, { useEffect, useState } from "react";
import { useDirectoryFiles } from "./hooks/useDirectoryFiles";
import { useFileType } from "./hooks/useFileType";
import { Icon } from "./components/icon/Icon";
import { Bookmarks } from "./components/bookmarks/Bookmarks";

interface DiskInfo {
  [key: string]: string;
}

const App: React.FC = () => {
  const { files, error, setPath, path } = useDirectoryFiles("");
  const [diskInfo, setDiskInfo] = useState<DiskInfo[]>([]);

  useEffect(() => {
    const fetchDiskInfo = async () => {
      try {
        console.log("Fetching disk info...");
        if (window.electron && window.electron.getDiskInfo) {
          const info: any = await window.electron.getDiskInfo();
          console.log("Disk info fetched:", info);
          setDiskInfo(info);
        } else {
          console.error("window.electron.getDiskInfo is not defined");
        }
      } catch (error) {
        console.error("Failed to fetch disk info:", error);
      }
    };

    fetchDiskInfo();
    console.log(diskInfo);
  }, []);

  return (
    <div className="container">
      <Bookmarks buttonPath={setPath} />
      <div>
        <h3>~{path}</h3>
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
                onClick={() =>
                  file.isDirectory
                    ? setPath((prev) => `${prev}/${file.name}`)
                    : null
                }
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
        {/* Display disk information if available */}
        {diskInfo.length > 0 && (
          <div>
            <h4>Disk Information:</h4>
            {diskInfo.map((info, index) => (
              <div key={index}>
                <p>Filesystem: {info.filesystem}</p>
                <p>Blocks: {info.blocks}</p>
                <p>Used: {info.used}</p>
                <p>Available: {info.available}</p>
                <p>Capacity: {info.capacity}</p>
                <p>Mounted: {info.mounted}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
