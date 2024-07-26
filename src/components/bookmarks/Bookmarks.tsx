import React, { useState } from "react";
import { Icon } from "../icon/Icon";

import "./bookmarks.scss";

interface BookmarksProps {
  buttonPath: (path: string) => void;
}

export const Bookmarks: React.FC<BookmarksProps> = ({ buttonPath }) => {
  const [path, setPath] = useState<string>("");

  const handleButtonClick = (path: string) => {
    setPath(path);
    buttonPath(path);
  };

  return (
    <div className="bookmarks">
      <h3 className="bookmarks__title">
        <Icon type="fas" name="bookmark" /> Bookmarks
      </h3>
      <button
        className={`bookmarks__button${path === "" ? "--active" : ""}`}
        onClick={() => handleButtonClick("")}
      >
        <Icon type="fas" name="home" />
        Home
      </button>
      <button
        className={`bookmarks__button${path === "Desktop" ? "--active" : ""}`}
        onClick={() => handleButtonClick("Desktop")}
      >
        <Icon type="fas" name="display" />
        Desktop
      </button>

      <button
        className={`bookmarks__button${path === "Downloads" ? "--active" : ""}`}
        onClick={() => handleButtonClick("Downloads")}
      >
        <Icon type="fas" name="download" />
        Downloads
      </button>

      <button
        className={`bookmarks__button${path === "Documents" ? "--active" : ""}`}
        onClick={() => handleButtonClick("Documents")}
      >
        <Icon type="fas" name="file" />
        Documents
      </button>

      <button
        className={`bookmarks__button${path === "pc" ? "--active" : ""}`}
        onClick={() => setPath("pc")}
      >
        <Icon type="fas" name="computer" />
        This PC
      </button>
    </div>
  );
};
