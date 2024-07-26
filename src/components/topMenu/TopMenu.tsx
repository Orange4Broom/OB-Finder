import React from "react";
import { Icon } from "../icon/Icon";

import "./topMenu.scss";

interface TopMenuProps {
  buttonPath: (path: string) => void;
  path: string;
}

export const TopMenu: React.FC<TopMenuProps> = ({ buttonPath, path }) => {
  const handleButtonClick = () => {
    const newPath = path.split("/").slice(0, -1).join("/");
    buttonPath(newPath);
  };
  return (
    <div className="menu">
      <button className="menu__back" onClick={handleButtonClick}>
        <Icon type="fas" name="arrow-left" />
      </button>
      <h3 className="menu__path">
        ~{path}{" "}
        <button
          className="menu__copy"
          onClick={() => {
            navigator.clipboard.writeText(path);
          }}
        >
          <Icon type="fas" name="copy" />{" "}
        </button>
      </h3>
    </div>
  );
};
