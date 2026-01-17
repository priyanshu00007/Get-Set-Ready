import React from 'react';
import { WALLPAPERS } from '../../data/config';

const Settings = ({ onWallpaperChange }) => (
    <div className="h-full bg-gray-100 dark:bg-gray-800 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">System Settings</h2>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">Wallpaper</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {WALLPAPERS.map(wp => (
                    <div key={wp.id} className="cursor-pointer group" onClick={() => onWallpaperChange(wp.url)}>
                        <div className="h-24 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all">
                            <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-xs text-center mt-2 text-gray-500">{wp.name}</div>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
             <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">About This Mac</h3>
             <div className="flex items-center gap-4">
                 <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl"></div>
                 <div>
                     <div className="font-bold">MacFolio OS</div>
                     <div className="text-sm text-gray-500">Version 14.2.1</div>
                     <div className="text-sm text-gray-500">Processor: React Virtual DOM</div>
                     <div className="text-sm text-gray-500">Memory: 16 GB Unified</div>
                 </div>
             </div>
        </div>
    </div>
);

export default Settings;
// import React from 'react';
// import { Monitor, Cpu, HardDrive } from 'lucide-react';
// import { WALLPAPERS } from '../../data/config';

// const Settings = ({ onWallpaperChange }) => {
//   return (
//     <div className="flex flex-col h-full bg-[#f5f5f7] dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      
//       {/* Sidebar (Visual only for aesthetics) */}
//       <div className="flex h-full">
//         <div className="w-48 hidden md:flex flex-col bg-gray-50/50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 p-4 gap-1">
//            <div className="flex items-center gap-2 px-2 py-1 bg-blue-500 text-white rounded-md text-sm font-medium cursor-default">
//              <Monitor size={14} /> Wallpaper
//            </div>
//            <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md text-sm text-gray-500 cursor-not-allowed">
//              <Cpu size={14} /> General
//            </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 overflow-y-auto p-6 md:p-8">
//           <h2 className="text-2xl font-bold mb-6">Wallpaper</h2>
          
//           {/* Wallpaper Grid */}
//           <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//               {WALLPAPERS.map((wp) => (
//                   <div 
//                     key={wp.id} 
//                     className="cursor-pointer group relative" 
//                     onClick={() => onWallpaperChange(wp.url)}
//                   >
//                       <div className="aspect-video rounded-xl overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all shadow-sm bg-gray-200">
//                           <img 
//                             src={wp.url} 
//                             alt={wp.name} 
//                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
//                             loading="lazy"
//                           />
//                       </div>
//                       <div className="text-xs font-medium text-center mt-2 text-gray-600 dark:text-gray-400">{wp.name}</div>
//                   </div>
//               ))}
//           </div>

//           <div className="h-px bg-gray-200 dark:bg-gray-700 my-6"></div>

//           {/* About Section */}
//           <h3 className="text-lg font-bold mb-4">About This Mac</h3>
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6">
//                <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full flex items-center justify-center text-4xl shadow-inner text-gray-700">
//                  
//                </div>
//                <div className="text-center md:text-left">
//                    <div className="text-xl font-bold">MacFolio OS</div>
//                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">Version 14.2.1 (Sonoma)</div>
                   
//                    <div className="grid grid-cols-1 gap-1 text-xs text-gray-500 dark:text-gray-400">
//                      <div className="flex items-center justify-center md:justify-start gap-2">
//                        <Cpu size={12} /> Apple M3 Max (Virtual)
//                      </div>
//                      <div className="flex items-center justify-center md:justify-start gap-2">
//                        <HardDrive size={12} /> 1TB SSD
//                      </div>
//                      <div className="flex items-center justify-center md:justify-start gap-2">
//                        <Monitor size={12} /> Built-in Liquid Retina XDR
//                      </div>
//                    </div>
//                </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;