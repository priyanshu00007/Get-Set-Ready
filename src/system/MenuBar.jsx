import React, { useState, useEffect } from 'react';
import { Sliders, Sun, Moon, Wifi, Search } from 'lucide-react';

const MenuBar = ({ activeWindow, handleDockClick, onRefresh, darkMode, setDarkMode, brightness, setBrightness }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMenuClick = (menu) => setActiveMenu(activeMenu === menu ? null : menu);

  // Close menus when clicking outside (handled via prop propagation or simple click listener in App)
  useEffect(() => {
     const closeMenu = () => setActiveMenu(null);
     window.addEventListener('click', closeMenu);
     return () => window.removeEventListener('click', closeMenu);
  }, []);

  return (
    <div className="h-7 bg-white/40 dark:bg-black/40 backdrop-blur-xl flex items-center justify-between px-4 text-xs font-medium text-gray-800 dark:text-white shadow-sm z-50 relative" onClick={e => e.stopPropagation()}>
      <div className="flex items-center gap-4">
        <div className="font-bold text-lg leading-none cursor-pointer hover:opacity-70 flex items-center justify-center w-6" onClick={(e) => { e.stopPropagation(); handleMenuClick('apple'); }}></div>
        
        {activeMenu === 'apple' && (
          <div className="absolute top-7 left-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-b-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50">
             <div className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default" onClick={() => handleDockClick('settings')}>System Settings...</div>
             <div className="h-px bg-gray-300 dark:bg-gray-600 my-1"></div>
             <div className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default">Sleep</div>
             <div className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default" onClick={onRefresh}>Restart...</div>
             <div className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default">Shut Down...</div>
          </div>
        )}
        
        <span className="font-bold hidden sm:block">{activeWindow ? activeWindow.title : 'Finder'}</span>
        
        {['File', 'Edit', 'View', 'Window', 'Help'].map(menu => (
          <div key={menu} className="relative hidden sm:block">
             <span className="cursor-pointer hover:bg-white/20 px-2 py-0.5 rounded" onClick={(e) => { e.stopPropagation(); handleMenuClick(menu); }}>{menu}</span>
             {activeMenu === menu && (
               <div className="absolute top-7 left-0 w-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-b-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50 text-gray-800 dark:text-white">
                  <div className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default" onClick={() => { if(menu === 'File') handleDockClick('finder'); }}>
                    {menu === 'File' ? 'New Window' : menu === 'Help' ? 'Search Help' : 'Action...'}
                  </div>
               </div>
             )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
           <div className="p-1 hover:bg-white/20 rounded cursor-pointer" onClick={(e) => { e.stopPropagation(); handleMenuClick('control'); }}>
             <Sliders size={14} />
           </div>
           {activeMenu === 'control' && (
             <div className="absolute top-7 right-0 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 text-gray-800 dark:text-white" onClick={e => e.stopPropagation()}>
               <div className="text-xs font-semibold mb-2">Display</div>
               <div className="bg-white/50 dark:bg-black/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                    <Sun size={12} /> Brightness
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="100" 
                    value={brightness} 
                    onChange={(e) => setBrightness(e.target.value)}
                    className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
                  />
               </div>
               <div className="mt-4 flex gap-2">
                  <div className={`flex-1 p-2 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${darkMode ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`} onClick={() => setDarkMode(!darkMode)}>
                     <Moon size={16} />
                     <span className="text-[10px]">Dark Mode</span>
                  </div>
                  <div className="flex-1 p-2 rounded-lg flex flex-col items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50">
                     <Wifi size={16} />
                     <span className="text-[10px]">Wi-Fi</span>
                  </div>
               </div>
             </div>
           )}
        </div>
        
        <Search size={14} className="hidden sm:block" />
        <span className="hidden sm:block">{currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

export default MenuBar;
// import React, { useState, useEffect } from 'react';
// import { Sliders, Search, Sun, Moon, Wifi } from 'lucide-react';

// const MenuBar = ({ activeAppName, handleMenuClick, activeMenu, setDarkMode, darkMode, brightness, setBrightness, onRestart, onSettings }) => {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="h-7 bg-white/40 dark:bg-black/40 backdrop-blur-xl flex items-center justify-between px-4 text-xs font-medium text-gray-800 dark:text-white shadow-sm z-50 relative select-none">
//       <div className="flex items-center gap-4">
//         <div className="font-bold text-lg leading-none cursor-pointer hover:opacity-70 flex items-center justify-center w-6" onClick={(e) => { e.stopPropagation(); handleMenuClick('apple'); }}></div>
        
//         {/* Apple Menu */}
//         {activeMenu === 'apple' && (
//             <div className="absolute top-7 left-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-b-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50">
//                 <div className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default" onClick={onSettings}>System Settings...</div>
//                 <div className="h-px bg-gray-300 dark:bg-gray-600 my-1"></div>
//                 <div className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-default" onClick={onRestart}>Restart...</div>
//             </div>
//         )}
        
//         <span className="font-bold hidden sm:block">{activeAppName}</span>
//         {['File', 'Edit', 'View', 'Window', 'Help'].map(menu => (
//            <span key={menu} className="hidden sm:block cursor-pointer hover:bg-white/20 px-2 py-0.5 rounded">{menu}</span>
//         ))}
//       </div>
      
//       <div className="flex items-center gap-4">
//         <div className="relative">
//            <div className="p-1 hover:bg-white/20 rounded cursor-pointer" onClick={(e) => { e.stopPropagation(); handleMenuClick('control'); }}>
//              <Sliders size={14} />
//            </div>
//            {activeMenu === 'control' && (
//              <div className="absolute top-7 right-0 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 text-gray-800 dark:text-white" onClick={e => e.stopPropagation()}>
//                <div className="text-xs font-semibold mb-2">Display</div>
//                <div className="bg-white/50 dark:bg-black/50 rounded-lg p-3">
//                   <div className="flex items-center gap-2 mb-2 text-xs text-gray-500"><Sun size={12} /> Brightness</div>
//                   <input type="range" min="20" max="100" value={brightness} onChange={(e) => setBrightness(e.target.value)} className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"/>
//                </div>
//                <div className="mt-4 flex gap-2">
//                   <div className={`flex-1 p-2 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${darkMode ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`} onClick={() => setDarkMode(!darkMode)}>
//                      <Moon size={16} /> <span className="text-[10px]">Dark Mode</span>
//                   </div>
//                   <div className="flex-1 p-2 rounded-lg flex flex-col items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 opacity-50"><Wifi size={16} /> <span className="text-[10px]">Wi-Fi</span></div>
//                </div>
//              </div>
//            )}
//         </div>
        
//         <Search size={14} className="hidden sm:block" />
//         <span className="hidden sm:block">{currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span>
//         <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//       </div>
//     </div>
//   );
// };

// export default MenuBar;