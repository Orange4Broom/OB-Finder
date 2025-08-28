# OB-Finder 🍊

A modern, cross-platform file explorer built with Electron and React, designed to provide a native file management experience on macOS, Linux, and Windows.

## What is OB-Finder?

OB-Finder is a custom file explorer application that combines the power of Electron with the flexibility of React to create a modern, user-friendly file management tool. It's designed to be a lightweight alternative to native file explorers while maintaining familiar functionality and adding modern UI/UX improvements.

## Features ✨

- **File Navigation**: Browse through your file system with an intuitive interface
- **Directory Traversal**: Navigate into folders and back with breadcrumb navigation
- **File Information**: View file sizes, creation dates, and modification dates
- **File Type Detection**: Automatic file type recognition with appropriate icons
- **Bookmarks**: Quick access to frequently used directories (Documents, Downloads)
- **Disk Information**: View system disk details and storage information
- **Cross-Platform**: Works on macOS, Linux, and Windows
- **Modern UI**: Clean, responsive interface built with React and SCSS

## How It Works 🔧

The application is built using a hybrid architecture:

1. **Electron Main Process** (`main.ts`): Handles file system operations, disk information, and creates the main application window
2. **React Frontend**: Provides the user interface and handles user interactions
3. **IPC Communication**: Secure communication between the main process and renderer process
4. **File System API**: Uses Node.js file system APIs to read directories and file metadata

### Core Components:

- **File Browser**: Displays files and folders with icons and metadata
- **Top Menu**: Shows current path and navigation controls
- **Bookmarks**: Quick access to common directories
- **Icon System**: Dynamic icons for different file types using FontAwesome

## Technologies Used 🛠️

### Frontend

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe JavaScript development
- **SCSS**: Advanced CSS preprocessing for better styling
- **FontAwesome**: Professional icon library

### Backend & Runtime

- **Electron 23**: Cross-platform desktop application framework
- **Node.js**: Server-side JavaScript runtime
- **TypeScript**: Backend type safety

### Development Tools

- **React Scripts**: Create React App tooling
- **Concurrently**: Run multiple commands simultaneously
- **Wait-on**: Wait for services to be ready
- **Nodemon**: Development server with auto-reload

### File System

- **Node.js fs API**: File system operations
- **Disk utilities**: System disk information retrieval
- **Path handling**: Cross-platform path manipulation

## Getting Started 🚀

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd OB-Finder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the Electron application**

   ```bash
   npm run build-electron
   ```

4. **Start the development server**
   ```bash
   npm run electron
   ```

### Available Scripts

- `npm start` - Start React development server
- `npm run build` - Build React application
- `npm run build-electron` - Compile TypeScript to JavaScript
- `npm run electron` - Start both React dev server and Electron app
- `npm test` - Run test suite

## Project Structure 📁

```
OB-Finder/
├── main.ts                 # Electron main process
├── preload.ts             # Preload script for IPC
├── src/
│   ├── App.tsx           # Main React application
│   ├── components/       # React components
│   │   ├── bookmarks/    # Bookmarks component
│   │   ├── icon/         # Icon system
│   │   └── topMenu/      # Top navigation menu
│   ├── hooks/            # Custom React hooks
│   └── styles/           # SCSS stylesheets
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## Development 🧪

The application uses a development setup that runs both the React development server and Electron simultaneously. The React app runs on `http://localhost:3000` and Electron loads it in a desktop window.

### Key Features for Developers:

- Hot reload for both React and Electron
- TypeScript compilation
- SCSS preprocessing
- Electron-reload for development

## Building for Production 🏗️

To create a production build:

1. Build the React application:

   ```bash
   npm run build
   ```

2. Compile TypeScript:

   ```bash
   npm run build-electron
   ```

3. Package with Electron Builder (if configured)

## Contributing 🤝

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License 📄

This project is open source and available under the [MIT License](LICENSE).

---

**Note**: This project was developed as a learning experience and personal tool. It's designed to be lightweight and efficient while providing essential file management functionality.
