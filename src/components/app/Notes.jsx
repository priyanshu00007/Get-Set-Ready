import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Plus, 
  Trash2, 
  FileText, 
  MoreHorizontal, 
  GripVertical, 
  CheckSquare, 
  List, 
  Type, 
  Heading1, 
  Heading2, 
  Heading3, 
  ChevronRight,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Settings,
  Menu,
  Quote,
  Minus,
  MessageSquare,
  Copy,
  X,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Moon,
  Sun,
  Download,
  Users,
  Lock,
  ArrowRight,
  Star,
  Maximize2,
  Minimize2,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Info
} from 'lucide-react';

// --- Utility: ID Generator ---
const generateId = () => Math.random().toString(36).substr(2, 9);

// --- Utility: Auto-resize Textarea ---
const useAutosizeTextArea = (textAreaRef, value) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

// --- Utility: Random Assets ---
const getRandomEmoji = () => {
  const emojis = ['📄', '👋', '🚀', '💡', '🎨', '⚡', '💻', '🔮', '✨', '📝', '📌', '🗓️'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const getRandomCover = () => {
  const gradients = [
    'bg-gradient-to-r from-pink-100 to-blue-100',
    'bg-gradient-to-r from-green-100 to-blue-100',
    'bg-gradient-to-r from-yellow-100 to-orange-100',
    'bg-gradient-to-r from-purple-100 to-pink-100',
    'bg-gradient-to-r from-gray-200 to-gray-400',
    'bg-gradient-to-r from-indigo-100 to-purple-200',
    'bg-gradient-to-r from-slate-300 to-slate-500',
    'bg-gradient-to-r from-emerald-100 to-teal-200',
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

const FONT_LIBRARY = [
    { cat: 'Sans Serif', fonts: [
        { name: 'Inter', family: "'Inter', sans-serif" },
        { name: 'Roboto', family: "'Roboto', sans-serif" },
        { name: 'Open Sans', family: "'Open Sans', sans-serif" },
        { name: 'Lato', family: "'Lato', sans-serif" },
        { name: 'Montserrat', family: "'Montserrat', sans-serif" },
        { name: 'Oswald', family: "'Oswald', sans-serif" },
        { name: 'Raleway', family: "'Raleway', sans-serif" },
        { name: 'Nunito', family: "'Nunito', sans-serif" },
    ]},
    { cat: 'Serif', fonts: [
        { name: 'Merriweather', family: "'Merriweather', serif" },
        { name: 'Playfair', family: "'Playfair Display', serif" },
        { name: 'Lora', family: "'Lora', serif" },
        { name: 'PT Serif', family: "'PT Serif', serif" },
        { name: 'Crimson Text', family: "'Crimson Text', serif" },
        { name: 'Libre Baskerville', family: "'Libre Baskerville', serif" },
        { name: 'Bitter', family: "'Bitter', serif" },
    ]},
    { cat: 'Monospace', fonts: [
        { name: 'Fira Code', family: "'Fira Code', monospace" },
        { name: 'JetBrains', family: "'JetBrains Mono', monospace" },
        { name: 'Inconsolata', family: "'Inconsolata', monospace" },
        { name: 'Source Code', family: "'Source Code Pro', monospace" },
        { name: 'Ubuntu Mono', family: "'Ubuntu Mono', monospace" },
    ]},
    { cat: 'Display & Other', fonts: [
        { name: 'Dancing Script', family: "'Dancing Script', cursive" },
        { name: 'Pacifico', family: "'Pacifico', cursive" },
        { name: 'Shadows Into Light', family: "'Shadows Into Light', cursive" },
        { name: 'Indie Flower', family: "'Indie Flower', cursive" },
        { name: 'Amatic SC', family: "'Amatic SC', cursive" },
        { name: 'Righteous', family: "'Righteous', cursive" },
        { name: 'Bangers', family: "'Bangers', cursive" },
        { name: 'Comfortaa', family: "'Comfortaa', cursive" },
    ]}
];

// --- Data: Colors ---
const TEXT_COLORS = [
    { name: 'Default', class: '' },
    { name: 'Gray', class: 'text-gray-500' },
    { name: 'Brown', class: 'text-amber-700' },
    { name: 'Orange', class: 'text-orange-500' },
    { name: 'Yellow', class: 'text-yellow-600' },
    { name: 'Green', class: 'text-emerald-600' },
    { name: 'Blue', class: 'text-blue-600' },
    { name: 'Purple', class: 'text-purple-600' },
    { name: 'Pink', class: 'text-pink-600' },
    { name: 'Red', class: 'text-red-600' },
];

const BG_COLORS = [
    { name: 'Default', class: '' },
    { name: 'Gray', class: 'bg-gray-100' },
    { name: 'Brown', class: 'bg-amber-100' },
    { name: 'Orange', class: 'bg-orange-100' },
    { name: 'Yellow', class: 'bg-yellow-100' },
    { name: 'Green', class: 'bg-emerald-100' },
    { name: 'Blue', class: 'bg-blue-100' },
    { name: 'Purple', class: 'bg-purple-100' },
    { name: 'Pink', class: 'bg-pink-100' },
    { name: 'Red', class: 'bg-red-100' },
];

// 1. Search Modal
const SearchModal = ({ isOpen, onClose, pages, onSelect }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 50);
        setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20" onClick={onClose}>
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center border-b border-gray-100 px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input 
                ref={inputRef}
                type="text" 
                placeholder="Search pages..." 
                className="flex-1 outline-none text-lg text-gray-700 placeholder-gray-300"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
        </div>
        <div className="max-h-96 overflow-y-auto py-2">
            {filteredPages.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">No pages found.</div>
            ) : (
                filteredPages.map(page => (
                    <div 
                        key={page.id}
                        onClick={() => { onSelect(page.id); onClose(); }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3 transition-colors"
                    >
                        <span className="text-xl">{page.icon || '📄'}</span>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-gray-700">{page.title || 'Untitled'}</div>
                            <div className="text-xs text-gray-400 capitalize">{page.workspace} Workspace</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

// 2. Settings Modal
const SettingsModal = ({ isOpen, onClose, darkMode, toggleDarkMode, onExport }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={onClose}>
            <div className={`w-full max-w-md rounded-lg shadow-xl p-6 animate-in fade-in zoom-in duration-200 ${darkMode ? 'bg-[#202020] text-gray-100' : 'bg-white text-gray-900'}`} onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Settings className="w-5 h-5" /> Settings
                </h2>
                
                <div className="space-y-6">
                    <div className={`flex items-center justify-between pb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                {darkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-orange-500" />}
                            </div>
                            <div>
                                <div className="font-medium">Dark Mode</div>
                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Switch between light and dark themes</div>
                            </div>
                        </div>
                        <button 
                            onClick={toggleDarkMode}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${darkMode ? 'bg-indigo-600' : 'bg-gray-200'}`}
                        >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <div className={`flex items-center justify-between pb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <Download className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                            </div>
                            <div>
                                <div className="font-medium">Export Data</div>
                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Download all pages as JSON</div>
                            </div>
                        </div>
                        <button onClick={onExport} className={`px-3 py-1.5 text-sm rounded transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}>
                            Export
                        </button>
                    </div>

                    <div className={`text-xs text-center mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Notion Lite v2.5 • Made by Gemini
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Timer Widget
const TimerWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('pomodoro'); // 'pomodoro' | 'stopwatch'
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    if (mode === 'pomodoro') {
                        return prevTime > 0 ? prevTime - 1 : 0;
                    } else {
                        return prevTime + 1;
                    }
                });
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time, mode]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime(mode === 'pomodoro' ? 25 * 60 : 0);
    };

    const toggleMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTime(newMode === 'pomodoro' ? 25 * 60 : 0);
    }

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:scale-105 text-gray-600"
                title="Open Timer"
            >
                <Clock className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-40 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-64 animate-in slide-in-from-bottom-5 fade-in duration-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Focus Timer
                </h3>
                <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-gray-400 hover:text-gray-600" /></button>
            </div>
            
            <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                <button 
                    onClick={() => toggleMode('pomodoro')}
                    className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${mode === 'pomodoro' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
                >
                    Pomodoro
                </button>
                <button 
                    onClick={() => toggleMode('stopwatch')}
                    className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${mode === 'stopwatch' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
                >
                    Stopwatch
                </button>
            </div>

            <div className="text-center py-2">
                <div className="text-5xl font-mono font-bold text-gray-800 tracking-wider mb-4">
                    {formatTime(time)}
                </div>
                
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={() => setIsActive(!isActive)}
                        className={`p-3 rounded-full text-white shadow-md transition-transform active:scale-95 ${isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current pl-0.5" />}
                    </button>
                    <button 
                        onClick={resetTimer}
                        className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-sm transition-transform active:scale-95"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// 4. Sidebar 
const Sidebar = ({ pages, activePageId, onAddPage, onSelectPage, onDeletePage, isOpen, toggleSidebar, onOpenSearch, onOpenSettings, activeWorkspace, onSwitchWorkspace, darkMode }) => {
  const displayedPages = pages.filter(p => p.workspace === activeWorkspace && !p.favorite);
  const favoritePages = pages.filter(p => p.workspace === activeWorkspace && p.favorite);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 z-20 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      <div className={`
        fixed md:relative z-30 h-full border-r flex flex-col
        transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-0 md:border-none'}
        ${darkMode ? 'bg-[#202020] border-gray-700' : 'bg-[#F7F7F5] border-gray-200'}
      `}>
        <div className={`flex flex-col h-full w-64 overflow-hidden transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}>
            
            <div className="p-3 m-2 flex items-center justify-between group">
                <div className={`flex items-center gap-2 cursor-pointer p-1 rounded-md transition-colors flex-1 overflow-hidden ${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-200 text-gray-700'}`}>
                     <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0">N</div>
                     <span className={`font-medium text-sm truncate ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>My Workspace</span>
                </div>
                <button 
                    onClick={toggleSidebar}
                    className={`p-1 rounded transition-colors opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 ${darkMode ? 'text-gray-500 hover:bg-gray-800 hover:text-gray-300' : 'text-gray-400 hover:bg-gray-200 hover:text-gray-600'}`}
                    title="Close Sidebar"
                >
                    <ChevronsLeft className="w-4 h-4" />
                </button>
            </div>

            <div className="px-3 space-y-0.5 mb-4">
                <div onClick={onOpenSearch} className={`flex items-center gap-3 px-3 py-1.5 rounded cursor-pointer text-sm font-medium transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}>
                    <Search className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`} />
                    <span>Search</span>
                </div>
                <div onClick={onOpenSettings} className={`flex items-center gap-3 px-3 py-1.5 rounded cursor-pointer text-sm font-medium transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}>
                    <Settings className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`} />
                    <span>Settings</span>
                </div>
            </div>

            <div className="px-5 mb-4">
                <div className={`flex p-0.5 rounded-lg ${darkMode ? 'bg-gray-800/60' : 'bg-gray-200/60'}`}>
                    <button 
                        onClick={() => onSwitchWorkspace('private')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1 text-xs font-medium rounded-md transition-all ${activeWorkspace === 'private' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-white shadow-sm text-gray-800') : (darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')}`}
                    >
                        <Lock className="w-3 h-3" /> Private
                    </button>
                    <button 
                        onClick={() => onSwitchWorkspace('public')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1 text-xs font-medium rounded-md transition-all ${activeWorkspace === 'public' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-white shadow-sm text-gray-800') : (darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')}`}
                    >
                        <Users className="w-3 h-3" /> Public
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                
                {favoritePages.length > 0 && (
                    <div className="mb-4">
                        <div className={`px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Favorites</div>
                        {favoritePages.map(page => (
                             <div 
                             key={page.id}
                             className={`group flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer text-sm mb-0.5 transition-colors ${activePageId === page.id ? (darkMode ? 'bg-gray-800 text-gray-200 font-semibold' : 'bg-gray-200 text-gray-900 font-semibold') : (darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-300' : 'text-gray-600 hover:bg-gray-200')}`}
                             onClick={() => {
                                 onSelectPage(page.id);
                                 if (window.innerWidth < 768) toggleSidebar();
                             }}
                             >
                                 <FileText className={`w-4 h-4 shrink-0 ${activePageId === page.id ? (darkMode ? 'text-gray-300' : 'text-gray-600') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`} />
                                 <span className="truncate flex-1">{page.title || 'Untitled'}</span>
                             </div>
                        ))}
                    </div>
                )}

                <div className={`px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider flex justify-between items-center ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    <span>{activeWorkspace}</span>
                </div>
                
                {displayedPages.length === 0 && favoritePages.length === 0 && (
                    <div className={`px-3 text-xs italic py-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>No pages yet.</div>
                )}

                {displayedPages.map(page => (
                    <div 
                    key={page.id}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer text-sm mb-0.5 transition-colors ${activePageId === page.id ? (darkMode ? 'bg-gray-800 text-gray-200 font-semibold' : 'bg-gray-200 text-gray-900 font-semibold') : (darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-300' : 'text-gray-600 hover:bg-gray-200')}`}
                    onClick={() => {
                        onSelectPage(page.id);
                        if (window.innerWidth < 768) toggleSidebar();
                    }}
                    >
                        <FileText className={`w-4 h-4 shrink-0 ${activePageId === page.id ? (darkMode ? 'text-gray-300' : 'text-gray-600') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`} />
                        <span className="truncate flex-1">{page.title || 'Untitled'}</span>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onDeletePage(page.id); }}
                            className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-300 text-gray-500'}`}
                            title="Delete page"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                ))}
                
                <button 
                    onClick={onAddPage}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer text-sm w-full mt-2 transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                    <Plus className="w-4 h-4 shrink-0" />
                    <span>Add a page</span>
                </button>
            </div>
            
            <div className={`p-3 border-t text-xs text-center ${darkMode ? 'border-gray-800 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
                Notion Lite v2.5
            </div>
        </div>
      </div>
    </>
  );
};

// 5. Slash Menu
const SlashMenu = ({ position, onSelect, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const options = [
    { type: 'text', label: 'Text', icon: Type, desc: 'Just start writing with plain text.' },
    { type: 'h1', label: 'Heading 1', icon: Heading1, desc: 'Big section heading.' },
    { type: 'h2', label: 'Heading 2', icon: Heading2, desc: 'Medium section heading.' },
    { type: 'h3', label: 'Heading 3', icon: Heading3, desc: 'Small section heading.' },
    { type: 'bullet', label: 'Bulleted list', icon: List, desc: 'Create a simple bulleted list.' },
    { type: 'todo', label: 'To-do list', icon: CheckSquare, desc: 'Track tasks with a to-do list.' },
    { type: 'quote', label: 'Quote', icon: Quote, desc: 'Capture a quote.' },
    { type: 'callout', label: 'Callout', icon: MessageSquare, desc: 'Make writing stand out.' },
    { type: 'divider', label: 'Divider', icon: Minus, desc: 'Visually divide blocks.' },
  ];

  return (
    <div 
      ref={menuRef}
      className="absolute z-50 w-72 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden text-gray-800 animate-in fade-in zoom-in duration-100"
      style={{ top: position.top, left: position.left }}
    >
      <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase bg-gray-50/50">Basic blocks</div>
      <div className="max-h-64 overflow-y-auto py-1 custom-scrollbar">
        {options.map((opt) => (
          <button
            key={opt.type}
            onClick={() => onSelect(opt.type)}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-3 transition-colors"
          >
            <div className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center bg-white shadow-sm flex-shrink-0">
              <opt.icon className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">{opt.label}</div>
              <div className="text-xs text-gray-400">{opt.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// 6. Block Action Menu (Color, Align, etc)
const BlockActionMenu = ({ position, onDelete, onDuplicate, onColor, onAlign, onClose }) => {
    const menuRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          onClose();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div 
            ref={menuRef}
            className="absolute z-50 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden text-gray-800 animate-in fade-in zoom-in duration-100 flex flex-col"
            style={{ top: position.top, left: position.left }}
        >
            <div className="p-1 border-b border-gray-100 flex justify-between bg-gray-50/50">
               <div className="flex">
                   <button onClick={() => onAlign('left')} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Align Left"><AlignLeft className="w-4 h-4"/></button>
                   <button onClick={() => onAlign('center')} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Align Center"><AlignCenter className="w-4 h-4"/></button>
                   <button onClick={() => onAlign('right')} className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Align Right"><AlignRight className="w-4 h-4"/></button>
               </div>
               <button onClick={onDelete} className="p-1.5 hover:bg-red-100 text-red-500 rounded" title="Delete"><Trash2 className="w-4 h-4"/></button>
            </div>

            <button onClick={onDuplicate} className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm text-gray-600">
                <Copy className="w-4 h-4" /> Duplicate
            </button>

            <div className="border-t border-gray-100">
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Color</div>
                <div className="max-h-32 overflow-y-auto custom-scrollbar px-1 pb-1">
                    {TEXT_COLORS.map(c => (
                        <button 
                            key={c.name}
                            onClick={() => onColor({ color: c.class })}
                            className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded text-sm flex items-center gap-2"
                        >
                            <div className={`w-4 h-4 rounded border border-gray-200 ${c.name === 'Default' ? 'bg-black' : c.class.replace('text-', 'bg-')}`} />
                            <span className={c.class || 'text-gray-900'}>{c.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-100">
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Background</div>
                <div className="max-h-32 overflow-y-auto custom-scrollbar px-1 pb-1">
                    {BG_COLORS.map(c => (
                        <button 
                            key={c.name}
                            onClick={() => onColor({ background: c.class })}
                            className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded text-sm flex items-center gap-2"
                        >
                             <div className={`w-4 h-4 rounded border border-gray-200 ${c.name === 'Default' ? 'bg-white' : c.class}`} />
                             <span>{c.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

// 7. Page Style Menu (Now with Fonts)
const PageStyleMenu = ({ isOpen, onClose, page, onUpdatePage, darkMode }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            onClose();
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    if (!isOpen) return null;

    // Word Count Calculation
    const wordCount = page.blocks.reduce((acc, block) => {
        if (!block.content) return acc;
        return acc + block.content.trim().split(/\s+/).length;
    }, 0);
    const readTime = Math.ceil(wordCount / 200);

    return (
        <div 
            ref={menuRef}
            className={`absolute top-12 right-4 z-40 w-72 rounded-xl shadow-xl border overflow-hidden animate-in fade-in zoom-in duration-100 flex flex-col max-h-[80vh] ${darkMode ? 'bg-[#202020] border-gray-700 text-gray-100' : 'bg-white border-gray-100 text-gray-900'}`}
        >
             {/* Stats */}
             <div className={`p-3 border-b text-xs flex justify-between ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-500'}`}>
                <span>{wordCount} words</span>
                <span>~{readTime} min read</span>
             </div>

            <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-4">
                     <span className="text-sm font-medium">Full Width</span>
                     <button 
                        onClick={() => onUpdatePage({ ...page, fullWidth: !page.fullWidth })}
                        className={`w-10 h-5 rounded-full relative transition-colors ${page.fullWidth ? 'bg-blue-500' : 'bg-gray-300'}`}
                     >
                         <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${page.fullWidth ? 'left-6' : 'left-1'}`} />
                     </button>
                </div>

                <div className="text-xs font-medium text-gray-500 uppercase mb-2">Typography</div>
                
                <div className="space-y-4">
                    {FONT_LIBRARY.map((cat) => (
                        <div key={cat.cat}>
                            <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>{cat.cat}</div>
                            <div className="grid grid-cols-1 gap-1">
                                {cat.fonts.map(font => (
                                    <button
                                        key={font.name}
                                        onClick={() => onUpdatePage({ ...page, fontFamily: font.family })}
                                        className={`text-left px-2 py-1.5 text-sm rounded transition-colors flex justify-between items-center ${page.fontFamily === font.family ? (darkMode ? 'bg-indigo-900/50 text-indigo-300' : 'bg-blue-50 text-blue-600') : (darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50')}`}
                                        style={{ fontFamily: font.family }}
                                    >
                                        <span>{font.name}</span>
                                        {page.fontFamily === font.family && <CheckSquare className="w-3 h-3" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className={`p-2 border-t text-xs text-center ${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-100 text-gray-400'}`}>
                Appearance
            </div>
        </div>
    );
};


// 8. Block Component
const Block = ({ block, updateBlock, addBlock, deleteBlock, duplicateBlock, focusNext, focusPrev, darkMode }) => {
  const inputRef = useRef(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  useAutosizeTextArea(inputRef.current, block.content);

  useEffect(() => {
    if (block.focus) {
      inputRef.current?.focus();
      updateBlock(block.id, { focus: false });
    }
  }, [block.focus, block.id, updateBlock]);

  // Markdown shortcut handler
  const checkMarkdown = (text) => {
      if (block.type !== 'text') return false;
      
      let type = null;
      let newText = text;

      if (text === '# ') { type = 'h1'; newText = ''; }
      else if (text === '## ') { type = 'h2'; newText = ''; }
      else if (text === '### ') { type = 'h3'; newText = ''; }
      else if (text === '- ') { type = 'bullet'; newText = ''; }
      else if (text === '> ') { type = 'quote'; newText = ''; }
      else if (text === '[] ') { type = 'todo'; newText = ''; }
      else if (text === '---') { type = 'divider'; newText = ''; }

      if (type) {
          updateBlock(block.id, { type, content: newText });
          return true;
      }
      return false;
  }

  const handleKeyDown = (e) => {
    if (e.key === '/') {
      // Allow slash menu
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showSlashMenu) return;
      addBlock(block.id);
    }
    if (e.key === 'Backspace' && block.content === '') {
      e.preventDefault();
      deleteBlock(block.id);
    }
    if (e.key === 'ArrowUp') {
      const cursorStart = inputRef.current?.selectionStart;
      if (cursorStart === 0 || block.type === 'divider') {
          e.preventDefault();
          focusPrev(block.id);
      }
    }
    if (e.key === 'ArrowDown') {
      const cursorEnd = inputRef.current?.selectionEnd;
      if (cursorEnd === block.content?.length || block.type === 'divider') {
         e.preventDefault();
         focusNext(block.id);
      }
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (checkMarkdown(val)) return;

    updateBlock(block.id, { content: val });

    if (val === '/') {
      const rect = inputRef.current.getBoundingClientRect();
      setMenuPos({ 
        top: rect.bottom + window.scrollY, 
        left: rect.left + window.scrollX 
      });
      setShowSlashMenu(true);
    } else if (showSlashMenu && val !== '/') {
        setShowSlashMenu(false);
    }
  };

  const transformBlock = (type) => {
    updateBlock(block.id, { type, content: '' }); 
    setShowSlashMenu(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleActionMenu = (e) => {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPos({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
      });
      setShowActionMenu(true);
  }

  // Styles based on block type
  const getStyles = () => {
    const baseText = darkMode ? 'text-gray-100' : 'text-gray-900';
    const mutedText = darkMode ? 'text-gray-300' : 'text-gray-800';
    
    // Base classes
    let classes = block.textColor || baseText;
    
    // Alignment
    if (block.align === 'center') classes += ' text-center';
    else if (block.align === 'right') classes += ' text-right';
    else classes += ' text-left';

    switch (block.type) {
      case 'h1': classes += ` text-4xl font-bold mt-6 mb-2`; break;
      case 'h2': classes += ` text-2xl font-semibold mt-5 mb-2`; break;
      case 'h3': classes += ` text-xl font-semibold mt-4 mb-2`; break;
      case 'bullet': classes += ` text-base mb-1 leading-relaxed`; break;
      case 'todo': classes += ` text-base mb-1 leading-relaxed`; break;
      case 'quote': classes += ` text-lg italic ${darkMode ? 'border-gray-500' : 'border-gray-900'} border-l-4 pl-4 py-1 my-2`; break;
      case 'callout': classes += ` text-base ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-900'} p-4 rounded-md my-2 flex gap-3 items-start`; break;
      default: classes += ` text-base mb-1 leading-relaxed min-h-[1.5rem]`; break;
    }

    return classes;
  };

  return (
    <div className={`group relative flex items-start -ml-8 pl-8 py-0.5 ${block.backgroundColor ? (darkMode ? 'bg-opacity-20' : 'bg-opacity-50') + ' rounded px-2 ' + block.backgroundColor : ''}`}>
      {/* Hover Controls */}
      <div className="absolute left-0 top-1.5 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
            className="p-0.5 hover:bg-gray-200 rounded text-gray-400 transition-colors"
            onClick={() => addBlock(block.id)}
            title="Click to add block below"
        >
            <Plus className="w-3.5 h-3.5" />
        </button>
        <button 
            className="p-0.5 hover:bg-gray-200 rounded text-gray-400 cursor-pointer transition-colors"
            onClick={handleActionMenu}
            title="Click for options"
        >
            <GripVertical className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Render based on Type */}
      <div className="flex-1 flex items-start gap-2 min-w-0 relative">
        {block.type === 'bullet' && (
          <span className={`text-xl leading-6 select-none w-4 ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>•</span>
        )}
        {block.type === 'todo' && (
          <div className="pt-1.5 select-none">
             <input 
                type="checkbox" 
                checked={block.checked || false} 
                onChange={(e) => updateBlock(block.id, { checked: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
             />
          </div>
        )}
        {block.type === 'callout' && (
             <div className="select-none text-xl">💡</div>
        )}
        
        {block.type === 'divider' ? (
            <div 
                className={`w-full h-px my-3 cursor-pointer transition-colors ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-600 hover:bg-gray-800'}`} 
                onClick={() => updateBlock(block.id, { focus: true })}
                ref={(el) => {
                    inputRef.current = el;
                    if (el && block.focus) el.tabIndex = 0;
                }}
            />
        ) : (
            <textarea
            ref={inputRef}
            value={block.content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={block.type === 'text' ? "Type '/' for commands" : (block.type.includes('h') ? `Heading ${block.type.replace('h','')}` : '')}
            className={`w-full bg-transparent resize-none outline-none border-none overflow-hidden placeholder-gray-300 ${getStyles()} ${block.checked ? 'line-through text-gray-400' : ''}`}
            rows={1}
            />
        )}
      </div>

      {showSlashMenu && (
        <SlashMenu 
            position={menuPos} 
            onSelect={transformBlock} 
            onClose={() => {
                setShowSlashMenu(false);
                updateBlock(block.id, { content: '' }); 
                inputRef.current?.focus();
            }} 
        />
      )}

      {showActionMenu && (
          <BlockActionMenu 
            position={menuPos}
            onClose={() => setShowActionMenu(false)}
            onDelete={() => {
                deleteBlock(block.id);
                setShowActionMenu(false);
            }}
            onDuplicate={() => {
                duplicateBlock(block.id);
                setShowActionMenu(false);
            }}
            onColor={(styles) => {
                updateBlock(block.id, styles);
                setShowActionMenu(false);
            }}
            onAlign={(align) => {
                updateBlock(block.id, { align });
                setShowActionMenu(false);
            }}
          />
      )}
    </div>
  );
};

// 9. Main Page Editor
const Editor = ({ page, onUpdatePage, darkMode }) => {
  const [coverHover, setCoverHover] = useState(false);

  // Dynamic Font Injection
  useEffect(() => {
    if (page?.fontFamily) {
        const fontName = page.fontFamily.split(',')[0].replace(/['"]/g, '');
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        }
    }
  }, [page?.fontFamily]);

  if (!page) return <div className={`flex-1 flex items-center justify-center ${darkMode ? 'bg-[#191919] text-gray-500' : 'bg-white text-gray-400'}`}>Select or create a page</div>;

  const widthClass = page.fullWidth ? 'max-w-full px-12' : 'max-w-4xl mx-auto px-12 md:px-24';

  const updateTitle = (e) => {
    onUpdatePage({ ...page, title: e.target.value });
  };

  const updateBlock = (blockId, data) => {
    const newBlocks = page.blocks.map(b => b.id === blockId ? { ...b, ...data } : b);
    onUpdatePage({ ...page, blocks: newBlocks });
  };

  const addBlock = (afterBlockId) => {
    const newBlock = { id: generateId(), type: 'text', content: '', focus: true };
    const index = page.blocks.findIndex(b => b.id === afterBlockId);
    const newBlocks = [...page.blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    onUpdatePage({ ...page, blocks: newBlocks });
  };

  const deleteBlock = (blockId) => {
    if (page.blocks.length <= 1) return;
    const index = page.blocks.findIndex(b => b.id === blockId);
    const newBlocks = page.blocks.filter(b => b.id !== blockId);
    const focusIndex = index > 0 ? index - 1 : 0;
    if (newBlocks[focusIndex]) newBlocks[focusIndex].focus = true;
    onUpdatePage({ ...page, blocks: newBlocks });
  };

  const duplicateBlock = (blockId) => {
      const blockToCopy = page.blocks.find(b => b.id === blockId);
      if (!blockToCopy) return;
      const newBlock = { ...blockToCopy, id: generateId(), focus: false };
      const index = page.blocks.findIndex(b => b.id === blockId);
      const newBlocks = [...page.blocks];
      newBlocks.splice(index + 1, 0, newBlock);
      onUpdatePage({ ...page, blocks: newBlocks });
  }

  const focusNext = (currentId) => {
      const index = page.blocks.findIndex(b => b.id === currentId);
      if (index < page.blocks.length - 1) {
          updateBlock(page.blocks[index + 1].id, { focus: true });
      }
  };

  const focusPrev = (currentId) => {
      const index = page.blocks.findIndex(b => b.id === currentId);
      if (index > 0) {
          updateBlock(page.blocks[index - 1].id, { focus: true });
      }
  };

  const cycleCover = () => {
    onUpdatePage({ ...page, cover: getRandomCover() });
  };

  const cycleIcon = () => {
    onUpdatePage({ ...page, icon: getRandomEmoji() });
  };

  return (
    <div 
        className={`flex-1 h-full overflow-y-auto relative scroll-smooth ${darkMode ? 'bg-[#191919] text-gray-100' : 'bg-white text-gray-900'}`}
        style={{ fontFamily: page.fontFamily || "'Inter', sans-serif" }}
    >
        {/* Cover Image */}
        <div 
            className={`h-48 w-full relative group transition-colors duration-500 ${page.cover || 'bg-gradient-to-r from-pink-100 to-blue-100'}`}
            onMouseEnter={() => setCoverHover(true)}
            onMouseLeave={() => setCoverHover(false)}
        >
            {coverHover && (
                <button 
                    onClick={cycleCover}
                    className="absolute bottom-4 right-10 bg-white/80 hover:bg-white text-xs px-3 py-1.5 rounded shadow-sm text-gray-600 transition-all font-medium flex items-center gap-2 font-sans"
                >
                    Change cover
                </button>
            )}
        </div>

        <div className={`${widthClass} pb-48 transition-all duration-300`}>
            {/* Icon */}
            <div className="-mt-10 mb-8 relative group w-20 h-20 z-10">
                <div 
                    onClick={cycleIcon}
                    className="text-7xl cursor-pointer hover:opacity-90 transition-opacity select-none"
                    title="Click to change icon"
                >
                    {page.icon || '📄'}
                </div>
            </div>

            {/* Title */}
            <div className="group mb-4">
                <textarea
                    value={page.title}
                    onChange={updateTitle}
                    placeholder="Untitled"
                    className={`w-full text-4xl font-bold placeholder-gray-300 resize-none outline-none border-none bg-transparent overflow-hidden h-14 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                    rows={1}
                />
            </div>

            {/* Meta Info (Workspace) */}
            <div className="flex items-center gap-2 mb-8 font-sans">
                <div className={`text-xs px-2 py-0.5 rounded border ${page.workspace === 'private' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                    {page.workspace === 'private' ? 'Private Workspace' : 'Public Workspace'}
                </div>
            </div>
            
            {/* Blocks */}
            <div className="space-y-1">
                {page.blocks.map(block => (
                    <Block 
                        key={block.id} 
                        block={block} 
                        updateBlock={updateBlock}
                        addBlock={addBlock}
                        deleteBlock={deleteBlock}
                        duplicateBlock={duplicateBlock}
                        focusNext={focusNext}
                        focusPrev={focusPrev}
                        darkMode={darkMode}
                    />
                ))}
            </div>
            
            {/* Bottom padding click area */}
            <div 
                className="h-48 cursor-text" 
                onClick={() => {
                   if (page.blocks.length > 0) {
                       updateBlock(page.blocks[page.blocks.length-1].id, { focus: true });
                   } else {
                       onUpdatePage({ ...page, blocks: [{ id: generateId(), type: 'text', content: '', focus: true }] });
                   }
                }}
            />
        </div>
    </div>
  );
};

// 10. Main App Container
export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState('private'); // 'private' | 'public'
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem('notion-lite-pages-v5');
    if (saved) return JSON.parse(saved);
    return [{
      id: generateId(),
      title: 'Welcome to Notion Lite',
      icon: '👋',
      workspace: 'private',
      favorite: false,
      fontFamily: "'Inter', sans-serif",
      fullWidth: false,
      cover: 'bg-gradient-to-r from-pink-100 to-blue-100',
      blocks: [
        { id: generateId(), type: 'h1', content: 'Notion Lite 4.0' },
        { id: generateId(), type: 'callout', content: 'New: 30+ Fonts, Block Colors & Text Alignment!' },
        { id: generateId(), type: 'text', content: 'Explore the "..." menu to change the page font.' },
        { id: generateId(), type: 'text', content: 'Click the "::" handle next to a block to change its color.' },
        { id: generateId(), type: 'divider', content: '' },
        { id: generateId(), type: 'todo', content: 'Try the "Comfortaa" font', checked: false },
        { id: generateId(), type: 'todo', content: 'Highlight this block yellow', checked: false },
      ]
    }];
  });
  
  const [activePageId, setActivePageId] = useState(() => {
     return pages.length > 0 ? pages[0].id : null;
  });

  // Auto-save
  useEffect(() => {
    localStorage.setItem('notion-lite-pages-v5', JSON.stringify(pages));
  }, [pages]);

  const activePage = pages.find(p => p.id === activePageId);

  const addPage = () => {
    const newPage = {
      id: generateId(),
      title: '',
      icon: getRandomEmoji(),
      cover: getRandomCover(),
      workspace: activeWorkspace,
      favorite: false,
      fontFamily: "'Inter', sans-serif",
      fullWidth: false,
      blocks: [{ id: generateId(), type: 'text', content: '' }]
    };
    setPages([...pages, newPage]);
    setActivePageId(newPage.id);
  };

  const updatePage = (updatedPage) => {
    setPages(pages.map(p => p.id === updatedPage.id ? updatedPage : p));
  };

  const deletePage = (id) => {
    const newPages = pages.filter(p => p.id !== id);
    setPages(newPages);
    if (activePageId === id && newPages.length > 0) {
        const sameWorkspacePage = newPages.find(p => p.workspace === activeWorkspace);
        setActivePageId(sameWorkspacePage ? sameWorkspacePage.id : newPages[0].id);
    } else if (newPages.length === 0) {
      setActivePageId(null);
    }
  };

  const toggleFavorite = () => {
      if (activePage) {
          updatePage({ ...activePage, favorite: !activePage.favorite });
      }
  };

  const handleExport = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pages));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "notion_lite_export.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
  };

  return (
    <div className={`flex h-screen w-full font-sans overflow-hidden transition-colors duration-200 ${darkMode ? 'bg-[#191919] text-gray-100' : 'bg-white text-gray-900'}`}>
      
      <Sidebar 
        pages={pages} 
        activePageId={activePageId} 
        onAddPage={addPage}
        onSelectPage={setActivePageId}
        onDeletePage={deletePage}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenSearch={() => setShowSearch(true)}
        onOpenSettings={() => setShowSettings(true)}
        activeWorkspace={activeWorkspace}
        onSwitchWorkspace={setActiveWorkspace}
        darkMode={darkMode}
      />

      <div className="flex-1 flex flex-col h-full relative min-w-0">
        {/* Top Bar */}
        <div className={`h-12 border-b flex items-center px-4 justify-between shrink-0 z-10 transition-colors ${darkMode ? 'bg-[#191919] border-gray-800' : 'bg-white border-gray-100'}`}>
           <div className="flex items-center gap-2">
             <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className={`p-1 hover:bg-gray-100 rounded text-gray-500 transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400' : ''}`}
                title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
             >
               <Menu className="w-4 h-4" />
             </button>

             <div className="flex items-center gap-2 text-sm text-gray-500 overflow-hidden">
               <span>{activePage?.icon || '📄'}</span>
               <span className={`font-medium truncate max-w-[200px] ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                 {activePage?.title || 'Untitled'}
               </span>
             </div>
           </div>
           
           <div className="flex items-center gap-1">
             <button 
                onClick={toggleFavorite}
                className={`text-sm hover:bg-gray-100 p-1 rounded transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500'}`}
                title={activePage?.favorite ? "Remove from Favorites" : "Add to Favorites"}
             >
                <Star className={`w-4 h-4 ${activePage?.favorite ? 'fill-orange-400 text-orange-400' : ''}`} />
             </button>
             <div className="relative">
                <button 
                    onClick={() => setShowStyleMenu(!showStyleMenu)}
                    className={`hover:bg-gray-100 p-1 rounded transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500'}`}
                >
                    <MoreHorizontal className="w-4 h-4" />
                </button>
                <PageStyleMenu 
                    isOpen={showStyleMenu} 
                    onClose={() => setShowStyleMenu(false)}
                    page={activePage}
                    onUpdatePage={updatePage}
                    darkMode={darkMode}
                />
             </div>
           </div>
        </div>

        <Editor 
            page={activePage} 
            onUpdatePage={updatePage} 
            darkMode={darkMode}
        />
      </div>

      <SearchModal 
          isOpen={showSearch} 
          onClose={() => setShowSearch(false)} 
          pages={pages}
          onSelect={setActivePageId}
      />

      <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          onExport={handleExport}
      />

      <TimerWidget />
    </div>
  );
}