import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

// Použití electron-reload pro automatické obnovení aplikace při změně souborů
try {
  require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });
} catch (err) {
  console.error("Error loading electron-reload", err);
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("get-files", async (_, dirPath) => {
  const userHome = os.homedir();
  const targetPath = path.join(userHome, dirPath);
  console.log("Requested path:", dirPath);

  try {
    const files = await fs.promises.readdir(targetPath, {
      withFileTypes: true,
    });
    const fileEntries = files.map((entry) => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
    }));
    console.log(`Files in ~/${dirPath}:`, fileEntries);
    return fileEntries;
  } catch (error) {
    console.error("Error reading directory:", error);
    throw new Error(`Failed to read directory at ${targetPath}`);
  }
});
