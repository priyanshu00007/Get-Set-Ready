import React from 'react';

const DockIcon = ({ app, onClick, isOpen, isBouncing }) => (
  <div className="group relative flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 hover:-translate-y-2">
    <div 
      onClick={onClick}
      className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 bg-white/90 backdrop-blur-sm border border-white/20 hover:scale-110 active:scale-95 text-gray-700 ${isBouncing ? 'animate-bounce' : ''}`}
    >
      <div className="transform scale-125">{app.icon}</div>
    </div>
    <div className={`w-1 h-1 rounded-full bg-gray-800 dark:bg-white transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-md pointer-events-none">
      {app.title}
    </div>
  </div>
);

const Dock = ({ apps, openWindows, activeWindowId, onDockClick, bouncingId }) => {
  const regularApps = apps.filter(a => a.id !== 'trash');
  const trashApp = apps.find(a => a.id === 'trash');

  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-[9999]">
      <div className="flex items-end gap-2 px-4 py-2 bg-white/20 dark:bg-black/30 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl mb-1">
        {regularApps.map(app => (
          <DockIcon 
            key={app.id}
            app={app} 
            onClick={() => onDockClick(app.id)}
            isOpen={openWindows.find(w => w.id === app.id && !w.minimized)}
            isBouncing={bouncingId === app.id}
          />
        ))}
        {trashApp && (
          <>
            <div className="w-px h-10 bg-white/20 mx-1"></div>
            <DockIcon 
              app={trashApp}
              onClick={() => onDockClick('trash')}
              isOpen={openWindows.find(w => w.id === 'trash' && !w.minimized)}
              isBouncing={bouncingId === 'trash'}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dock;
// import React from 'react';

// const Dock = ({ apps, openWindows, handleDockClick, bouncingId }) => {
//   return (
//     <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-[9999]">
//       <div className="flex items-end gap-2 px-4 py-2 bg-white/20 dark:bg-black/30 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl mb-1">
//         {apps.map((app, index) => {
//           // Add separator before Trash if it's the last item
//           const isTrash = app.id === 'trash';
//           return (
//             <React.Fragment key={app.id}>
//               {isTrash && <div className="w-px h-10 bg-white/20 mx-1"></div>}
//               <div className="group relative flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 hover:-translate-y-2">
//                 <div 
//                   onClick={() => handleDockClick(app.id)}
//                   className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 bg-white/90 backdrop-blur-sm border border-white/20 hover:scale-110 active:scale-95 text-gray-700 ${bouncingId === app.id ? 'animate-bounce' : ''}`}
//                 >
//                   <div className="transform scale-125">{app.icon}</div>
//                 </div>
//                 <div className={`w-1 h-1 rounded-full bg-gray-800 dark:bg-white transition-opacity duration-300 ${openWindows.find(w => w.id === app.id && !w.minimized) ? 'opacity-100' : 'opacity-0'}`} />
//                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-md pointer-events-none">
//                   {app.title}
//                 </div>
//               </div>
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Dock;