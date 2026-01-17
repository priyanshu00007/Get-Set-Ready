import React, { useState, useEffect } from "react";
import {
  FolderOpen,
  Globe,
  Code,
  Mail,
  Music,
  Settings as SettingsIcon,
  Trash2,
  Calculator as CalcIcon,
  Github,
  Linkedin,
  Twitter,
  FileText,
  FolderPlus,
  Info,
  RefreshCw,
  ImageIcon,
  StickyNote,
  Notebook,
  NotebookIcon,
  Computer,
} from "lucide-react";

import { WALLPAPERS } from "./data/config";
import WindowFrame from "./system/WindowFrame";
import MenuBar from "./system/MenuBar";
import Dock from "./system/Dock";

// Import Apps
import Learn from "./components/app/Learn";
import Notes from "./components/app/Notes";
import Finder from "./components/app/Finder";
import Safari from "./components/app/Safari";
import VSCode from "./components/app/VSCode";
import Terminal from "./components/app/Terminal";
import MailApp from "./components/app/Mail";
import MusicPlayer from "./components/app/MusicPlayer";
import Settings from "./components/app/Settings";
import Calculator from "./components/app/Calculator";
import Trash from "./components/app/Trash";
// 1. IMPORT RESUME PREVIEW
import ResumePreview from "./components/app/ResumePreview";

export default function App() {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [topZIndex, setTopZIndex] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0].url);
  const [brightness, setBrightness] = useState(100);
  const [contextMenu, setContextMenu] = useState(null);
  const [bouncingId, setBouncingId] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      setDarkMode(true);
  }, []);

  const handleDockClick = (appId) => {
    const win = openWindows.find((w) => w.id === appId);
    if (win) {
      if (win.minimized) {
        setOpenWindows((prev) =>
          prev.map((w) =>
            w.id === appId
              ? { ...w, minimized: false, zIndex: topZIndex + 1 }
              : w
          )
        );
        setActiveWindowId(appId);
        setTopZIndex((prev) => prev + 1);
      } else {
        if (activeWindowId === appId) {
          setOpenWindows((prev) =>
            prev.map((w) => (w.id === appId ? { ...w, minimized: true } : w))
          );
          setActiveWindowId(null);
        } else {
          setActiveWindowId(appId);
          setTopZIndex((prev) => prev + 1);
          setOpenWindows((prev) =>
            prev.map((w) =>
              w.id === appId ? { ...w, zIndex: topZIndex + 1 } : w
            )
          );
        }
      }
    } else {
      setBouncingId(appId);
      setTimeout(() => setBouncingId(null), 700);
      const offset = openWindows.length * 30;
      const defaultPos =
        window.innerWidth < 768
          ? { x: 0, y: 40 }
          : { x: 100 + offset, y: 60 + offset };

      setTimeout(() => {
        setOpenWindows((prev) => [
          ...prev,
          { id: appId, zIndex: topZIndex + 1, pos: defaultPos },
        ]);
        setTopZIndex((prev) => prev + 1);
        setActiveWindowId(appId);
      }, 200);
    }
  };

  const closeWindow = (id) =>
    setOpenWindows(openWindows.filter((w) => w.id !== id));

  const minimizeWindow = (id) => {
    setOpenWindows(
      openWindows.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
    setActiveWindowId(null);
  };

  const bringToFront = (id) => {
    setActiveWindowId(id);
    setTopZIndex((prev) => prev + 1);
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: topZIndex + 1, minimized: false } : w
      )
    );
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDesktopClick = () => {
    setContextMenu(null);
  };

  const ALL_APPS = [
    {
      id: "finder",
      title: "Finder",
      icon: <FolderOpen className="text-blue-500" />,

      content: <Finder onOpenApp={handleDockClick} />,
      defaultSize: { w: 800, h: 500 },
    },
    {
      id: "safari",
      title: "Safari",
      icon: <Globe className="text-blue-400" />,
      content: <Safari />,
      defaultSize: { w: 900, h: 600 },
    },
    {
      id: "vscode",
      title: "VS Code",
      icon: <Code className="text-blue-600" />,
      content: <VSCode />,
      defaultSize: { w: 900, h: 600 },
    },
    {
      id: "terminal",
      title: "Terminal",
      icon: (
        <div className="bg-black text-white p-1 rounded font-mono text-xs font-bold">
          &gt;_
        </div>
      ),
      content: <Terminal />,
      defaultSize: { w: 600, h: 400 },
    },
    {
      id: "mail",
      title: "Mail",
      icon: <Mail className="text-blue-500" />,
      content: <MailApp />,
      defaultSize: { w: 800, h: 500 },
    },
    {
      id: "music",
      title: "Music",
      icon: <Music className="text-pink-500" />,
      content: <MusicPlayer isWidget={false} />,
      defaultSize: { w: 400, h: 500 },
    },

    // apps adding
    {
      id: "resume",
      title: "Resume.pdf",
      icon: <FileText className="text-gray-500" />,
      content: <ResumePreview />,
      defaultSize: { w: 700, h: 800 },
    },
    {
      id: "notes",
      title: "Notes",
      icon: <Notebook className="text-gray-500" />,
      content: <Notes />,
      defaultSize: { w: 700, h: 800 },
    },
    {
      id: "Learn",
      title: "Learn",
      icon: <NotebookIcon className="text-gray-500" />,
      content: <Learn />,
      defaultSize: { w: 700, h: 800 },
    },

    {
      id: "settings",
      title: "Settings",
      icon: <SettingsIcon className="text-gray-500" />,
      content: <Settings onWallpaperChange={setWallpaper} />,
      defaultSize: { w: 700, h: 500 },
    },
    {
      id: "trash",
      title: "Trash",
      icon: <Trash2 className="text-gray-400" />,
      content: <Trash />,
      defaultSize: { w: 400, h: 300 },
    },
    {
      id: "calc",
      title: "Calculator",
      icon: <CalcIcon className="text-gray-600" />,
      content: <Calculator />,
      defaultSize: { w: 300, h: 420 },
      fixedSize: true,
    },
  ];

  return (
    <div
      className={`h-screen w-screen overflow-hidden select-none bg-cover bg-center font-sans transition-colors duration-500 ${
        darkMode ? "dark" : ""
      }`}
      style={{ backgroundImage: `url(${wallpaper})` }}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* Brightness Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[99999] bg-black transition-opacity duration-300"
        style={{ opacity: (100 - brightness) / 100 }}
      ></div>

      <MenuBar
        activeWindow={ALL_APPS.find((a) => a.id === activeWindowId)}
        handleDockClick={handleDockClick}
        onRefresh={() => window.location.reload()}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        brightness={brightness}
        setBrightness={setBrightness}
      />

      {/* Desktop Area */}
      <div className="relative h-[calc(100vh-28px)] w-full flex flex-col">
        <div
          className="absolute left-10 top-6
             grid grid-flow-col grid-rows-5 gap-8"
        >
          {/* ICON 1 */}
          <div
            className="flex flex-col items-center gap-1 group cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => handleDockClick("finder")}
          >
            <div className="w-16 h-16 bg-blue-100/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-sm group-hover:bg-blue-100/40 transition-colors">
              <FolderOpen size={32} className="text-blue-200" />
            </div>
            <span className="text-white text-xs font-medium px-2 py-0.5 rounded group-hover:bg-blue-600/80 transition-colors">
              Portfolio
            </span>
          </div>

          {/* ICON 2 */}
          <div
            className="flex flex-col items-center gap-1 group cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            <div className="w-16 h-16 bg-gray-800/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-sm group-hover:bg-gray-800/40 transition-colors">
              <Github size={32} className="text-white" />
            </div>
            <span className="text-white text-xs font-medium px-2 py-0.5 rounded group-hover:bg-blue-600/80 transition-colors">
              GitHub
            </span>
          </div>

          {/* ICON 3 */}
          <div
            className="flex flex-col items-center gap-1 group cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => window.open("https://linkedin.com", "_blank")}
          >
            <div className="w-16 h-16 bg-blue-700/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-sm group-hover:bg-blue-700/40 transition-colors">
              <Linkedin size={32} className="text-white" />
            </div>
            <span className="text-white text-xs font-medium px-2 py-0.5 rounded group-hover:bg-blue-600/80 transition-colors">
              LinkedIn
            </span>
          </div>

          {/* ICON 4 */}
          <div
            className="flex flex-col items-center gap-1 group cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => window.open("https://twitter.com", "_blank")}
          >
            <div className="w-16 h-16 bg-sky-500/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-sm group-hover:bg-sky-500/40 transition-colors">
              <Twitter size={32} className="text-white" />
            </div>
            <span className="text-white text-xs font-medium px-2 py-0.5 rounded group-hover:bg-blue-600/80 transition-colors">
              Twitter
            </span>
          </div>

          {/* ICON 5 */}
          <div
            className="flex flex-col items-center gap-1 group cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => handleDockClick("resume")}
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-sm group-hover:bg-white/30 transition-colors">
              <FileText size={32} className="text-white" />
            </div>
            <span className="text-white text-xs font-medium px-2 py-0.5 rounded group-hover:bg-blue-600/80 transition-colors">
              Resume.pdf
            </span>
          </div>

          {/* ICON 6 */}
          <div
            className="flex flex-col items-center gap-1 group cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => handleDockClick("mail")}
          >
            <div className="w-16 h-16 bg-red-500/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-sm group-hover:bg-red-500/40 transition-colors">
              <Mail size={32} className="text-white" />
            </div>
            <span className="text-white text-xs font-medium px-2 py-0.5 rounded group-hover:bg-blue-600/80 transition-colors">
              Mail
            </span>
          </div>

          {/* ICON 7 */}
          <div
            className="flex flex-col items-center gap-1 group cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => handleDockClick("notes")}
          >
            <div className="w-16 h-16 bg-yellow-500/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-sm group-hover:bg-yellow-500/40 transition-colors">
              <StickyNote size={32} className="text-white" />
            </div>
            <span className="text-white text-xs font-medium px-2 py-0.5 rounded group-hover:bg-blue-600/80 transition-colors">
              Notion
            </span>
          </div>
         
          <div
            className="flex flex-col items-center gap-1 group cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => handleDockClick("learn")}
          >
            <div className="w-16 h-16 bg-yellow-500/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-sm group-hover:bg-yellow-500/40 transition-colors">
              <Computer size={32} className="text-white" />
            </div>
            <span className="text-white text-xs font-medium px-2 py-0.5 rounded group-hover:bg-blue-600/80 transition-colors">
              Learn
            </span>
          </div>
        </div>

        {/* Open Windows */}
        {openWindows.map((win) => {
          if (win.minimized) return null;
          const appConfig = ALL_APPS.find((a) => a.id === win.id);
          if (!appConfig) return null;
          return (
            <WindowFrame
              key={win.id}
              app={appConfig}
              isActive={activeWindowId === win.id}
              zIndex={win.zIndex}
              style={win.pos}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onFocus={bringToFront}
            >
              {appConfig.content}
            </WindowFrame>
          );
        })}
      </div>

      <Dock
        apps={ALL_APPS}
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onDockClick={handleDockClick}
        bouncingId={bouncingId}
      />

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="absolute bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-1 w-48 z-[99999]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2"
            onClick={() => {
              alert("New Folder created");
              setContextMenu(null);
            }}
          >
            <FolderPlus size={14} /> New Folder
          </div>
          <div
            className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2"
            onClick={() => {
              alert("Get Info");
              setContextMenu(null);
            }}
          >
            <Info size={14} /> Get Info
          </div>
          <div className="h-px bg-gray-300 dark:bg-gray-600 my-1"></div>
          <div
            className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2"
            onClick={() => {
              handleDockClick("settings");
              setContextMenu(null);
            }}
          >
            <ImageIcon size={14} /> Change Wallpaper
          </div>
          <div className="h-px bg-gray-300 dark:bg-gray-600 my-1"></div>
          <div
            className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={14} /> Refresh
          </div>
        </div>
      )}
    </div>
  );
}
// import React, { useState, useEffect } from 'react';
// import { FolderOpen, Globe, Code, Mail, Music, Settings, Trash2, Calculator, Github, Linkedin, Twitter, FileText, FolderPlus, Info, RefreshCw, ImageIcon } from 'lucide-react';

// // Import Data
// import { WALLPAPERS } from '../src/data/config';

// // Import System Components
// import WindowFrame from "../src/system/WindowFrame";

// import MenuBar from '../src/system/MenuBar';
// import Dock from '../src/system/Dock';

// // Import Apps
// import Finder from './components/app/Finder';
// import Safari from './components/app/Safari';
// import VSCode from './components/app/VSCode';
// import Terminal from './components/app/Terminal';
// import MailApp from './components/app/Mail';
// import MusicPlayer from './components/app/MusicPlayer';
// import SettingsApp from './components/app/Settings';
// import CalculatorApp from './components/app/Calculator';
// import Trash from './components/app/Trash';

// const App = () => {
//   const [openWindows, setOpenWindows] = useState([]);
//   const [activeWindowId, setActiveWindowId] = useState(null);
//   const [topZIndex, setTopZIndex] = useState(1);
//   const [darkMode, setDarkMode] = useState(false);
//   const [wallpaper, setWallpaper] = useState(WALLPAPERS[0].url);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [brightness, setBrightness] = useState(100);
//   const [contextMenu, setContextMenu] = useState(null);
//   const [bouncingId, setBouncingId] = useState(null);

//   useEffect(() => {
//     if (window.matchMedia('(prefers-color-scheme: dark)').matches) setDarkMode(true);
//   }, []);

//   // Define Apps Configuration
//   const ALL_APPS = [
//     { id: 'finder', title: 'Finder', icon: <FolderOpen className="text-blue-500" />, content: <Finder />, defaultSize: { w: 800, h: 500 } },
//     { id: 'safari', title: 'Safari', icon: <Globe className="text-blue-400" />, content: <Safari />, defaultSize: { w: 900, h: 600 } },
//     { id: 'vscode', title: 'VS Code', icon: <Code className="text-blue-600" />, content: <VSCode />, defaultSize: { w: 900, h: 600 } },
//     { id: 'terminal', title: 'Terminal', icon: <div className="bg-black text-white p-1 rounded font-mono text-xs font-bold">&gt;_</div>, content: <Terminal />, defaultSize: { w: 600, h: 400 } },
//     { id: 'mail', title: 'Mail', icon: <Mail className="text-blue-500" />, content: <MailApp />, defaultSize: { w: 800, h: 500 } },
//     { id: 'music', title: 'Music', icon: <Music className="text-pink-500" />, content: <MusicPlayer />, defaultSize: { w: 400, h: 500 } },
//     { id: 'settings', title: 'Settings', icon: <Settings className="text-gray-500" />, content: <SettingsApp onWallpaperChange={setWallpaper} />, defaultSize: { w: 700, h: 500 } },
//     { id: 'trash', title: 'Trash', icon: <Trash2 className="text-gray-400" />, content: <Trash />, defaultSize: { w: 400, h: 300 } },
//     { id: 'calc', title: 'Calculator', icon: <Calculator className="text-gray-600" />, content: <CalculatorApp />, defaultSize: { w: 300, h: 420 }, fixedSize: true },
//   ];

//   // Window Management
//   const handleDockClick = (appId) => {
//     const win = openWindows.find(w => w.id === appId);
//     if (win) {
//       if (win.minimized) {
//         setOpenWindows(prev => prev.map(w => w.id === appId ? { ...w, minimized: false, zIndex: topZIndex + 1 } : w));
//         setActiveWindowId(appId);
//         setTopZIndex(prev => prev + 1);
//       } else {
//         if (activeWindowId === appId) {
//           setOpenWindows(prev => prev.map(w => w.id === appId ? { ...w, minimized: true } : w));
//           setActiveWindowId(null);
//         } else {
//           setActiveWindowId(appId);
//           setTopZIndex(prev => prev + 1);
//           setOpenWindows(prev => prev.map(w => w.id === appId ? { ...w, zIndex: topZIndex + 1 } : w));
//         }
//       }
//     } else {
//       setBouncingId(appId);
//       setTimeout(() => setBouncingId(null), 700);

//       const offset = openWindows.length * 30;
//       const defaultPos = window.innerWidth < 768 ? { x: 0, y: 40 } : { x: 100 + offset, y: 60 + offset };

//       setTimeout(() => {
//           setOpenWindows(prev => [...prev, { id: appId, zIndex: topZIndex + 1, pos: defaultPos }]);
//           setTopZIndex(prev => prev + 1);
//           setActiveWindowId(appId);
//       }, 200);
//     }
//   };

//   const closeWindow = (id) => setOpenWindows(openWindows.filter(w => w.id !== id));

//   const minimizeWindow = (id) => {
//     setOpenWindows(openWindows.map(w => w.id === id ? { ...w, minimized: true } : w));
//     setActiveWindowId(null);
//   };

//   const bringToFront = (id) => {
//     setActiveWindowId(id);
//     setTopZIndex(prev => prev + 1);
//     setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: topZIndex + 1, minimized: false } : w));
//   };

//   return (
//     <div className={`h-screen w-screen overflow-hidden select-none bg-cover bg-center font-sans transition-colors duration-500 ${darkMode ? 'dark' : ''}`}
//       style={{ backgroundImage: `url(${wallpaper})` }}
//       onClick={() => { setActiveMenu(null); setContextMenu(null); }}
//       onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }}
//     >
//       <div className="absolute inset-0 pointer-events-none z-[99999] bg-black transition-opacity duration-300" style={{ opacity: (100 - brightness) / 100 }}></div>

//       <MenuBar
//         activeAppName={activeWindowId ? ALL_APPS.find(a => a.id === activeWindowId)?.title : 'Finder'}
//         handleMenuClick={(menu) => setActiveMenu(activeMenu === menu ? null : menu)}
//         activeMenu={activeMenu}
//         setDarkMode={setDarkMode}
//         darkMode={darkMode}
//         brightness={brightness}
//         setBrightness={setBrightness}
//         onRestart={() => window.location.reload()}
//         onSettings={() => handleDockClick('settings')}
//       />

//       {/* Desktop Area */}
//       <div className="relative h-[calc(100vh-28px)] w-full">
//          {/* Desktop Icons */}
//          <div className="absolute top-4 right-4 flex flex-col gap-6 items-end p-2 z-0">
//              <div className="flex flex-col items-center gap-1 group cursor-pointer" onClick={() => handleDockClick('finder')}>
//                 <div className="w-16 h-16 bg-blue-100/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 shadow-sm group-hover:bg-blue-100/40 transition-colors">
//                   <FolderOpen size={32} className="text-blue-200" />
//                 </div>
//                 <span className="text-white text-xs drop-shadow-md font-medium px-2 py-0.5 rounded bg-black/0 group-hover:bg-blue-600/80 transition-colors">Portfolio</span>
//              </div>
//              {/* Add GitHub, LinkedIn icons here... */}
//          </div>

//         {/* Render Windows */}
//         {openWindows.map(win => {
//           if (win.minimized) return null;
//           const appConfig = ALL_APPS.find(a => a.id === win.id);
//           return (
//             <WindowFrame
//               key={win.id}
//               app={appConfig}
//               isActive={activeWindowId === win.id}
//               zIndex={win.zIndex}
//               style={win.pos}
//               onClose={closeWindow}
//               onMinimize={minimizeWindow}
//               onFocus={bringToFront}
//             >
//                 {appConfig.content}
//             </WindowFrame>
//           );
//         })}
//       </div>

//       <Dock
//         apps={ALL_APPS}
//         openWindows={openWindows}
//         handleDockClick={handleDockClick}
//         bouncingId={bouncingId}
//       />

//       {/* Context Menu */}
//       {contextMenu && (
//         <div
//           className="absolute bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-1 w-48 z-[99999]"
//           style={{ top: contextMenu.y, left: contextMenu.x }}
//           onClick={(e) => e.stopPropagation()}
//         >
//            <div className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default text-sm flex items-center gap-2" onClick={() => { alert("New Folder"); setContextMenu(null); }}>
//              <FolderPlus size={14} /> New Folder
//            </div>
//            <div className="h-px bg-gray-300 dark:bg-gray-600 my-1"></div>
//            <div className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default text-sm flex items-center gap-2" onClick={() => { handleDockClick('settings'); setContextMenu(null); }}>
//              <ImageIcon size={14} /> Change Wallpaper
//            </div>
//            <div className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default text-sm flex items-center gap-2" onClick={() => window.location.reload()}>
//              <RefreshCw size={14} /> Refresh
//            </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
