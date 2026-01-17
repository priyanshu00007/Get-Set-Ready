import React, { useState, useEffect } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';

const WindowFrame = ({ app, onClose, onMinimize, onFocus, isActive, style, zIndex, children }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState(style || { x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    setDragging(true);
    onFocus(app.id);
    setRel({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      setPosition({ x: e.clientX - rel.x, y: e.clientY - rel.y });
    };
    const handleMouseUp = () => setDragging(false);
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, rel]);

  return (
    <div
      className={`absolute rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-shadow duration-200 flex flex-col ${isActive ? 'shadow-2xl ring-1 ring-gray-500/30' : 'shadow-lg opacity-95'}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 28 : position.y,
        width: isMaximized ? '100%' : (app.defaultSize?.w || 600),
        height: isMaximized ? 'calc(100% - 28px)' : (app.defaultSize?.h || 400),
        zIndex: zIndex,
        transition: dragging ? 'none' : 'width 0.3s, height 0.3s, left 0.3s, top 0.3s, opacity 0.2s',
      }}
      onMouseDown={() => onFocus(app.id)}
    >
      <div 
        className="h-9 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 select-none cursor-default justify-between"
        onMouseDown={handleMouseDown}
        onDoubleClick={() => !app.fixedSize && setIsMaximized(!isMaximized)}
      >
        <div className="flex gap-2 window-controls group">
          <button onClick={() => onClose(app.id)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors">
            <X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={() => onMinimize(app.id)} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors">
            <Minimize2 size={8} className="text-yellow-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={() => !app.fixedSize && setIsMaximized(!isMaximized)} 
            className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${app.fixedSize ? 'bg-gray-300 cursor-default' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {!app.fixedSize && <Maximize2 size={8} className="text-green-900 opacity-0 group-hover:opacity-100" />}
          </button>
        </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
           {app.title}
        </div>
        <div className="w-14"></div>
      </div>
      <div className="flex-1 overflow-hidden relative">{children}</div>
    </div>
  );
};

export default WindowFrame;
// import React, { useState, useEffect } from 'react';
// import { X, Minimize2, Maximize2 } from 'lucide-react';

// const WindowFrame = ({ app, onClose, onMinimize, onFocus, isActive, style, zIndex, children }) => {
//   const [isMaximized, setIsMaximized] = useState(false);
//   const [position, setPosition] = useState(style || { x: 50, y: 50 });
//   const [dragging, setDragging] = useState(false);
//   const [rel, setRel] = useState(null);

//   const handleMouseDown = (e) => {
//     if (e.target.closest('.window-controls')) return;
//     setDragging(true);
//     onFocus(app.id);
//     setRel({ x: e.clientX - position.x, y: e.clientY - position.y });
//   };

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!dragging) return;
//       setPosition({ x: e.clientX - rel.x, y: e.clientY - rel.y });
//     };
//     const handleMouseUp = () => setDragging(false);
    
//     if (dragging) {
//       window.addEventListener('mousemove', handleMouseMove);
//       window.addEventListener('mouseup', handleMouseUp);
//     }
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [dragging, rel]);

//   return (
//     <div
//       className={`absolute rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-shadow duration-200 flex flex-col ${isActive ? 'shadow-2xl ring-1 ring-gray-500/30' : 'shadow-lg opacity-95'}`}
//       style={{
//         left: isMaximized ? 0 : position.x,
//         top: isMaximized ? 28 : position.y,
//         width: isMaximized ? '100%' : (app.defaultSize?.w || 600),
//         height: isMaximized ? 'calc(100% - 28px)' : (app.defaultSize?.h || 400),
//         zIndex: zIndex,
//         transition: dragging ? 'none' : 'width 0.3s, height 0.3s, left 0.3s, top 0.3s, opacity 0.2s',
//       }}
//       onMouseDown={() => onFocus(app.id)}
//     >
//       <div 
//         className="h-9 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 select-none cursor-default justify-between"
//         onMouseDown={handleMouseDown}
//         onDoubleClick={() => !app.fixedSize && setIsMaximized(!isMaximized)}
//       >
//         <div className="flex gap-2 window-controls group">
//           <button onClick={() => onClose(app.id)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors">
//             <X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" />
//           </button>
//           <button onClick={() => onMinimize(app.id)} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors">
//             <Minimize2 size={8} className="text-yellow-900 opacity-0 group-hover:opacity-100" />
//           </button>
//           <button 
//             onClick={() => !app.fixedSize && setIsMaximized(!isMaximized)} 
//             className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${app.fixedSize ? 'bg-gray-300 cursor-default' : 'bg-green-500 hover:bg-green-600'}`}
//           >
//             {!app.fixedSize && <Maximize2 size={8} className="text-green-900 opacity-0 group-hover:opacity-100" />}
//           </button>
//         </div>
//         <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
//            {app.title}
//         </div>
//         <div className="w-14"></div>
//       </div>
//       <div className="flex-1 overflow-hidden relative">{children}</div>
//     </div>
//   );
// };

// export default WindowFrame;