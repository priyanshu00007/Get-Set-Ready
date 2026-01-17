import React, { useState } from 'react';
import { Search, SkipBack, SkipForward, RefreshCw, Globe } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/config';

const Safari = () => {
  const [url, setUrl] = useState('portfolio.priyanshu.com/projects');
  const [displayUrl, setDisplayUrl] = useState('portfolio.priyanshu.com/projects');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = (newUrl) => {
    setIsLoading(true);
    setDisplayUrl(newUrl);
    setTimeout(() => {
      setUrl(newUrl);
      setIsLoading(false);
    }, 800);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const val = displayUrl.trim();
    if (val.includes('portfolio.priyanshu.com')) {
        let target = val;
        if (!target.startsWith('http')) target = `https://${target}`;
        navigate(target);
        return;
    }
    let target = val;
    const isUrl = val.includes('.') && !val.includes(' ');
    if (!isUrl) {
        target = `https://www.google.com/search?q=${encodeURIComponent(val)}`;
    } else if (!target.startsWith('http')) {
        target = `https://${target}`;
    }
    window.open(target, '_blank');
  };

  const renderBrowserContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      );
    }
    return (
      <div className="flex-1 overflow-y-auto p-8 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Recent Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PORTFOLIO_DATA.projects.map(project => (
            <div key={project.id} className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`h-32 ${project.color} flex items-center justify-center`}>
                <span className="text-white font-bold text-4xl opacity-30">{project.title[0]}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 h-10">{project.desc}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                    {project.tech.split(',')[0]}
                  </span>
                  <button 
                    onClick={() => window.open(project.link, '_blank')}
                    className="text-blue-500 text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    View Case <Globe size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      <div className="h-12 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 gap-4">
        <div className="flex gap-2 text-gray-500">
          <div className="hover:text-gray-800 dark:hover:text-white cursor-pointer"><SkipBack size={16} className="rotate-180" /></div>
          <div className="hover:text-gray-800 dark:hover:text-white cursor-pointer"><SkipForward size={16} className="rotate-180" /></div>
          <div className="hover:text-gray-800 dark:hover:text-white cursor-pointer ml-2" onClick={() => navigate(url)}><RefreshCw size={14} /></div>
        </div>
        <form onSubmit={handleSearch} className="flex-1 bg-white dark:bg-gray-700 rounded-lg h-8 flex items-center px-3 text-sm text-gray-600 dark:text-gray-300 shadow-sm mx-4">
          <Search size={14} className="mr-2 opacity-50" />
          <input 
            type="text" 
            value={displayUrl}
            onChange={(e) => setDisplayUrl(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none"
          />
        </form>
      </div>
      {renderBrowserContent()}
    </div>
  );
};

export default Safari;
// import React, { useState } from 'react';
// import { SkipBack, SkipForward, RefreshCw, Search, Globe } from 'lucide-react';
// import { PORTFOLIO_DATA } from '../../data/config';

// const Safari = () => {
//   const [url, setUrl] = useState('portfolio.priyanshu.com/projects');
//   const [displayUrl, setDisplayUrl] = useState('portfolio.priyanshu.com/projects');
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = (newUrl) => {
//     setIsLoading(true);
//     setDisplayUrl(newUrl);
//     setTimeout(() => {
//       setUrl(newUrl);
//       setIsLoading(false);
//     }, 800);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (displayUrl.includes('.')) navigate(`https://${displayUrl}`);
//     else window.open(`https://www.google.com/search?q=${displayUrl}`, '_blank');
//   };

//   return (
//     <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
//       {/* Browser Toolbar */}
//       <div className="h-12 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 gap-4">
//         <div className="flex gap-2 text-gray-500">
//           <div className="hover:text-gray-800 dark:hover:text-white cursor-pointer"><SkipBack size={16} className="rotate-180" /></div>
//           <div className="hover:text-gray-800 dark:hover:text-white cursor-pointer"><SkipForward size={16} className="rotate-180" /></div>
//           <div className="hover:text-gray-800 dark:hover:text-white cursor-pointer ml-2" onClick={() => navigate(url)}><RefreshCw size={14} /></div>
//         </div>
//         <form onSubmit={handleSearch} className="flex-1 bg-white dark:bg-gray-700 rounded-lg h-8 flex items-center px-3 text-sm text-gray-600 dark:text-gray-300 shadow-sm mx-4">
//           <Search size={14} className="mr-2 opacity-50" />
//           <input type="text" value={displayUrl} onChange={(e) => setDisplayUrl(e.target.value)} className="flex-1 bg-transparent border-none outline-none" />
//         </form>
//       </div>

//       {/* Content Area */}
//       {isLoading ? (
//         <div className="flex h-full items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
//       ) : (
//         <div className="flex-1 overflow-y-auto p-8 bg-white dark:bg-gray-900">
//           <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Recent Projects</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {PORTFOLIO_DATA.projects.map(project => (
//               <div key={project.id} className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//                 <div className={`h-32 ${project.color} flex items-center justify-center`}>
//                   <span className="text-white font-bold text-4xl opacity-30">{project.title[0]}</span>
//                 </div>
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{project.title}</h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 h-10 line-clamp-2">{project.desc}</p>
//                   <div className="flex items-center justify-between mt-4">
//                     <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">{project.tech.split(',')[0]}</span>
//                     <button onClick={() => window.open(project.link, '_blank')} className="text-blue-500 text-sm font-medium hover:underline flex items-center gap-1">View Case <Globe size={14} /></button>
//                   </div>    
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Safari;