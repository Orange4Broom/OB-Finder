export const useFileType = (fileName: string) => {
  const fileExtension = fileName.split(".").pop();
  const fileType =
    fileExtension === "jpg" ||
    fileExtension === "png" ||
    fileExtension === "gif" ||
    fileExtension === "jpeg" ||
    fileExtension === "webp" ||
    fileExtension === "svg"
      ? "image"
      : fileExtension === "mp4" ||
        fileExtension === "webm" ||
        fileExtension === "ogg" ||
        fileExtension === "avi" ||
        fileExtension === "mov" ||
        fileExtension === "flv" ||
        fileExtension === "wmv" ||
        fileExtension === "mkv"
      ? "video"
      : fileExtension === "mp3" ||
        fileExtension === "wav" ||
        fileExtension === "flac" ||
        fileExtension === "ogg" ||
        fileExtension === "m4a" ||
        fileExtension === "wma"
      ? "audio"
      : fileExtension === "pdf"
      ? "pdf"
      : fileExtension === "doc" || fileExtension === "docx"
      ? "doc"
      : fileExtension === "xls" || fileExtension === "xlsx"
      ? "xls"
      : fileExtension === "ppt" || fileExtension === "pptx"
      ? "ppt"
      : fileExtension === "txt"
      ? "txt"
      : fileExtension === "zip" ||
        fileExtension === "rar" ||
        fileExtension === "7z"
      ? "archive"
      : fileExtension === "exe"
      ? "exe"
      : fileExtension === "html" ||
        fileExtension === "css" ||
        fileExtension === "js" ||
        fileExtension === "ts" ||
        fileExtension === "jsx" ||
        fileExtension === "tsx" ||
        fileExtension === "json" ||
        fileExtension === "xml"
      ? "code"
      : "file";
  return fileType;
};
