import React, { useState } from 'react';
import { User, Briefcase, Code, FileText, ImageIcon, FolderOpen, SkipBack, SkipForward } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/config';

const Finder = () => {
  const [currentPath, setCurrentPath] = useState('Overview');
  
  const renderContent = () => {
    switch(currentPath) {
      case 'Desktop':
        return (
          <div className="grid grid-cols-4 gap-4 p-4">
             <div className="flex flex-col items-center gap-1 group cursor-pointer" onClick={() => handleDockClick('resume')}>
             <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20 shadow-sm group-hover:bg-white/30 transition-colors">
               <FileText size={32} className="text-white" />
             </div>
             <span className="text-white text-xs drop-shadow-md font-medium px-2 py-0.5 rounded bg-black/0 group-hover:bg-blue-600/80 transition-colors">Resume.pdf</span>
            </div>
             <div className="flex flex-col items-center gap-1 group cursor-pointer">
               <ImageIcon size={48} className="text-blue-500 fill-blue-100" />
               <span className="text-xs text-center">Profile_Pic.jpg</span>
             </div>
          </div>
        );
      case 'Documents':
        return (
          <div className="flex flex-col gap-2 p-2">
            {['Project_Specs.docx', 'Budget_2024.xlsx', 'Notes.txt', 'Ideas.md'].map(file => (
              <div key={file} className="flex items-center gap-2 p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded cursor-pointer">
                <FileText size={16} className="text-gray-500" />
                <span className="text-sm">{file}</span>
              </div>
            ))}
          </div>
        );
      case 'Developer':
        return (
          <div className="flex flex-col gap-2 p-2">
             <div className="flex items-center gap-2 p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded cursor-pointer">
                <FolderOpen size={16} className="text-blue-500" />
                <span className="text-sm font-medium">react-project-v1</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded cursor-pointer">
                <FolderOpen size={16} className="text-blue-500" />
                <span className="text-sm font-medium">node-api-server</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded cursor-pointer">
                <Code size={16} className="text-yellow-500" />
                <span className="text-sm">script.py</span>
              </div>
          </div>
        );
      default: // Overview
        return (
          <div className="p-6 overflow-y-auto h-full">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <User className="text-blue-500" size={20} /> About Me
                </h3>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  {PORTFOLIO_DATA.about}
                </p>
              </div>
              <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Code className="text-purple-500" size={18} /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-xs font-medium shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="text-green-500" size={18} /> Experience
                </h3>
                <div className="space-y-4">
                  {PORTFOLIO_DATA.experience.map((job, idx) => (
                    <div key={idx} className="border-l-2 border-gray-300 pl-3">
                      <div className="font-medium text-sm">{job.role}</div>
                      <div className="text-xs text-gray-500">{job.company} • {job.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex gap-1 text-gray-400">
          <SkipBack size={14} className="rotate-180" />
          <SkipForward size={14} className="rotate-180" />
        </div>
        <span className="text-xs text-gray-500 ml-2">Macintosh HD &gt; Users &gt; Priyanshu &gt; {currentPath}</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-gray-100/50 dark:bg-gray-800/30 backdrop-blur-md p-4 flex flex-col gap-2 border-r border-gray-200 dark:border-gray-800 text-sm">
          <div className="text-gray-400 text-xs font-semibold mb-1">Favorites</div>
          <div onClick={() => setCurrentPath('Overview')} className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors ${currentPath === 'Overview' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            <User size={14} /> Overview
          </div>
          <div onClick={() => setCurrentPath('Desktop')} className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors ${currentPath === 'Desktop' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            <FolderOpen size={14} /> Desktop
          </div>
          <div onClick={() => setCurrentPath('Documents')} className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors ${currentPath === 'Documents' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            <Briefcase size={14} /> Documents
          </div>
          <div onClick={() => setCurrentPath('Developer')} className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors ${currentPath === 'Developer' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            <Code size={14} /> Developer
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 bg-white dark:bg-gray-900 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Finder;
// import React, { useState } from 'react';
// import { User, Briefcase, Code, FileText, ImageIcon, FolderOpen, SkipBack, SkipForward, Cpu } from 'lucide-react';
// import { PORTFOLIO_DATA } from '../../data/config';

// const Finder = () => {
//   const [currentPath, setCurrentPath] = useState('Overview');
  
//   const renderContent = () => {
//     switch(currentPath) {
//       case 'Desktop':
//         return (
//           <div className="grid grid-cols-4 gap-4 p-4">
//              <div className="flex flex-col items-center gap-1 group cursor-pointer">
//                <FileText size={48} className="text-gray-500 fill-gray-100" />
//                <span className="text-xs text-center">Resume.pdf</span>
//              </div>
//              {/* ... more desktop items */}
//           </div>
//         );
//       case 'Overview':
//       default: 
//         return (
//           <div className="p-6 overflow-y-auto h-full">
//             <h2 className="text-2xl font-bold mb-6">Overview</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="col-span-1 md:col-span-2 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
//                 <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
//                   <User className="text-blue-500" size={20} /> About Me
//                 </h3>
//                 <p className="leading-relaxed text-gray-700 dark:text-gray-300">{PORTFOLIO_DATA.about}</p>
//               </div>
//               {/* ... Experience and Skills sections */}
//             </div>
//           </div>
//         );
//     }
//   }

//   return (
//     <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
//       <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
//         <div className="flex gap-1 text-gray-400">
//           <SkipBack size={14} className="rotate-180" />
//           <SkipForward size={14} className="rotate-180" />
//         </div>
//         <span className="text-xs text-gray-500 ml-2">Macintosh HD &gt; Users &gt; priyanshu &gt; {currentPath}</span>
//       </div>
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <div className="w-48 bg-gray-100/50 dark:bg-gray-800/30 backdrop-blur-md p-4 flex flex-col gap-2 border-r border-gray-200 dark:border-gray-800 text-sm">
//           <div onClick={() => setCurrentPath('Overview')} className={`flex items-center gap-2 p-1 rounded cursor-pointer ${currentPath === 'Overview' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
//             <User size={14} /> Overview
//           </div>
//           <div onClick={() => setCurrentPath('Desktop')} className={`flex items-center gap-2 p-1 rounded cursor-pointer ${currentPath === 'Desktop' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
//             <FolderOpen size={14} /> Desktop
//           </div>
//           {/* Add Documents, Developer links... */}
//         </div>
//         {/* Main Content */}
//         <div className="flex-1 bg-white dark:bg-gray-900 overflow-y-auto">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Finder;