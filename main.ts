import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { useFormatDate } from "./src/hooks/useFormatDate";
import { useFormatSize } from "./src/hooks/useFormatSize";
const { exec } = require("child_process");

try {
  require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });
} catch (err) {
  console.error("Error loading electron-reload", err);
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
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
    const fileEntries = await Promise.all(
      files.map(async (entry) => {
        const fullPath = path.join(targetPath, entry.name);
        const stats = await fs.promises.stat(fullPath);
        return {
          name: entry.name,
          isDirectory: entry.isDirectory(),
          size: useFormatSize(stats.size),
          createdAt: useFormatDate(stats.birthtime, false),
          modifiedAt: useFormatDate(stats.mtime, false),
        };
      })
    );
    return fileEntries;
  } catch (error) {
    throw new Error(`Failed to read directory at ${targetPath}`);
  }
});

ipcMain.handle("get-disk-info", async () => {
  return new Promise((resolve, reject) => {
    exec("diskutil info /", (error: any, stdout: string, stderr: any) => {
      if (error) {
        reject(stderr);
        return;
      }

      const lines = stdout.trim().split("\n");
      const info: { [key: string]: string } = {};

      lines.forEach((line) => {
        const [key, value] = line.split(/:\s+/);
        if (key && value) {
          info[key.trim()] = value.trim();
        }
      });

      resolve(info);
    });
  });
});

console.log("ipcMain.handle set for get-disk-info");

// ipcMain.handle("get-disk-info", async () => {
//   return new Promise((resolve, reject) => {
//     exec("diskutil list", (error: any, stdout: string, stderr: any) => {
//       if (error) {
//         reject(stderr);
//         return;
//       }

//       const diskIdentifiers = stdout.match(/\/dev\/disk\d+/g) || [];
//       const diskInfoPromises = diskIdentifiers.map((diskIdentifier) => {
//         return new Promise<{ [key: string]: string }>((res, rej) => {
//           exec(
//             `diskutil info ${diskIdentifier}`,
//             (err: any, out: any, errStderr: any) => {
//               if (err) {
//                 rej(errStderr);
//                 return;
//               }

//               const lines = out.trim().split("\n");
//               const info: { [key: string]: string } = {};

//               lines.forEach((line: any) => {
//                 const [key, value] = line.split(/:\s+/);
//                 if (key && value) {
//                   info[key.trim()] = value.trim();
//                 }
//               });

//               res(info);
//             }
//           );
//         });
//       });

//       Promise.all(diskInfoPromises)
//         .then((diskInfos) => resolve(diskInfos))
//         .catch((err) => reject(err));
//     });
//   });
// });
