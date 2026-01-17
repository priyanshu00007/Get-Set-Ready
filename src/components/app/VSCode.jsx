import React, { useState } from 'react';
import { FolderOpen, Search, Github, X } from 'lucide-react';

const VSCode = () => {
  const [activeFile, setActiveFile] = useState('Portfolio.tsx');

  const files = {
    'Portfolio.tsx': {
      lang: 'TSX',
      color: 'text-blue-400',
      content: (
        <pre>
            <code>
            <span className="text-pink-400">import</span> React <span className="text-pink-400">from</span> <span className="text-orange-300">'react'</span>;{'\n'}
            {'\n'}
            <span className="text-pink-400">interface</span> <span className="text-green-400">Developer</span> {'{'}{'\n'}
            {'  '}name: <span className="text-green-400">string</span>;{'\n'}
            {'  '}role: <span className="text-green-400">string</span>;{'\n'}
            {'  '}skills: <span className="text-green-400">string</span>[];{'\n'}
            {'  '}isOpenToWork: <span className="text-green-400">boolean</span>;{'\n'}
            {'}'}{'\n'}
            {'\n'}
            <span className="text-pink-400">export const</span> <span className="text-yellow-200">Me</span>: <span className="text-green-400">React.FC</span> = () <span className="text-pink-400">=&gt;</span> {'{'}{'\n'}
            {'  '}<span className="text-pink-400">const</span> <span className="text-blue-300">priyanshu</span>: <span className="text-green-400">Developer</span> = {'{'}{'\n'}
            {'    '}name: <span className="text-orange-300">"Priyanshu Rathod"</span>,{'\n'}
            {'    '}role: <span className="text-orange-300">"Mern Stack Engineer"</span>,{'\n'}
            {'    '}skills: [<span className="text-orange-300">"React"</span>, <span className="text-orange-300">"Node"</span>, <span className="text-orange-300">"AWS"</span>],{'\n'}
            {'    '}isOpenToWork: <span className="text-blue-300">true</span>{'\n'}
            {'  '}{'}'};{'\n'}
            {'\n'}
            {'  '}<span className="text-pink-400">return</span> ({'\n'}
            {'    '}&lt;<span className="text-green-400">div</span> className=<span className="text-orange-300">"portfolio-container"</span>&gt;{'\n'}
            {'      '}&lt;<span className="text-green-400">Header</span> title={<span className="text-blue-300">Priyanshu</span>.name} /&gt;{'\n'}
            {'      '}&lt;<span className="text-green-400">Hero</span> {'\n'}
            {'        '}tagline=<span className="text-orange-300">"Building digital experiences"</span>{'\n'}
            {'        '}status={<span className="text-blue-300">priyanshu</span>.isOpenToWork ? <span className="text-orange-300">"Hiring!"</span> : <span className="text-orange-300">"Busy"</span>}{'\n'}
            {'      '}/&gt;{'\n'}
            {'      '}&lt;<span className="text-green-400">Skills</span> data={<span className="text-blue-300">priyanshu</span>.skills} /&gt;{'\n'}
            {'      '}{'{/* TODO: Add more awesome projects */}'}{'\n'}
            {'    '}&lt;/<span className="text-green-400">div</span>&gt;{'\n'}
            {'  '});{'\n'}
            {'}'};
            </code>
        </pre>
      )
    },
    'globals.css': {
      lang: 'CSS',
      color: 'text-blue-300',
      content: (
        <pre>
          <code>
            <span className="text-yellow-200">@tailwind</span> base;{'\n'}
            <span className="text-yellow-200">@tailwind</span> components;{'\n'}
            <span className="text-yellow-200">@tailwind</span> utilities;{'\n'}
            {'\n'}
            <span className="text-orange-300">:root</span> {'{'}{'\n'}
            {'  '}<span className="text-blue-300">--foreground-rgb</span>: <span className="text-green-300">0</span>, <span className="text-green-300">0</span>, <span className="text-green-300">0</span>;{'\n'}
            {'  '}<span className="text-blue-300">--background-start-rgb</span>: <span className="text-green-300">214</span>, <span className="text-green-300">219</span>, <span className="text-green-300">220</span>;{'\n'}
            {'  '}<span className="text-blue-300">--background-end-rgb</span>: <span className="text-green-300">255</span>, <span className="text-green-300">255</span>, <span className="text-green-300">255</span>;{'\n'}
            {'}'}{'\n'}
            {'\n'}
            <span className="text-orange-300">body</span> {'{'}{'\n'}
            {'  '}<span className="text-blue-300">color</span>: <span className="text-yellow-200">rgb</span>(<span className="text-blue-300">var</span>(--foreground-rgb));{'\n'}
            {'  '}<span className="text-blue-300">background</span>: <span className="text-yellow-200">linear-gradient</span>({'\n'}
            {'      '}<span className="text-orange-300">to bottom</span>,{'\n'}
            {'      '}<span className="text-orange-300">transparent</span>,{'\n'}
            {'      '}<span className="text-yellow-200">rgb</span>(<span className="text-blue-300">var</span>(--background-end-rgb)){'\n'}
            {'    '}){'\n'}
            {'    '}<span className="text-yellow-200">rgb</span>(<span className="text-blue-300">var</span>(--background-start-rgb));{'\n'}
            {'}'}
          </code>
        </pre>
      )
    },
    'package.json': {
      lang: 'JSON',
      color: 'text-yellow-400',
      content: (
        <pre>
          <code>
            {'{'}{'\n'}
            {'  '}<span className="text-blue-300">"name"</span>: <span className="text-orange-300">"Priyanshu-portfolio"</span>,{'\n'}
            {'  '}<span className="text-blue-300">"version"</span>: <span className="text-orange-300">"1.0.0"</span>,{'\n'}
            {'  '}<span className="text-blue-300">"private"</span>: <span className="text-blue-400">true</span>,{'\n'}
            {'  '}<span className="text-blue-300">"scripts"</span>: {'{'}{'\n'}
            {'    '}<span className="text-blue-300">"dev"</span>: <span className="text-orange-300">"next dev"</span>,{'\n'}
            {'    '}<span className="text-blue-300">"build"</span>: <span className="text-orange-300">"next build"</span>,{'\n'}
            {'    '}<span className="text-blue-300">"start"</span>: <span className="text-orange-300">"next start"</span>{'\n'}
            {'  '}{'}'},{'\n'}
            {'  '}<span className="text-blue-300">"dependencies"</span>: {'{'}{'\n'}
            {'    '}<span className="text-blue-300">"react"</span>: <span className="text-orange-300">"^18.2.0"</span>,{'\n'}
            {'    '}<span className="text-blue-300">"react-dom"</span>: <span className="text-orange-300">"^18.2.0"</span>,{'\n'}
            {'    '}<span className="text-blue-300">"next"</span>: <span className="text-orange-300">"14.0.0"</span>,{'\n'}
            {'    '}<span className="text-blue-300">"lucide-react"</span>: <span className="text-orange-300">"^0.294.0"</span>{'\n'}
            {'  '}{'}'}{'\n'}
            {'}'}
          </code>
        </pre>
      )
    }
  };

  return (
  <div className="flex h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm">
    {/* Sidebar */}
    <div className="w-12 border-r border-[#333] flex flex-col items-center py-4 gap-4 text-gray-500">
      <div className="text-white border-l-2 border-blue-500 pl-3 -ml-4"><FolderOpen size={24} /></div>
      <Search size={24} />
      <Github size={24} />
    </div>
    {/* File Tree */}
    <div className="w-48 bg-[#252526] p-2 hidden md:block border-r border-[#333]">
      <div className="uppercase text-xs font-bold mb-2 pl-2 tracking-wider">Explorer</div>
      <div 
        className={`pl-2 flex items-center gap-2 py-1 cursor-pointer hover:bg-[#2a2d2e] ${activeFile === 'Portfolio.tsx' ? 'bg-[#37373d] text-white' : 'opacity-70'}`}
        onClick={() => setActiveFile('Portfolio.tsx')}
      >
        <span className="text-blue-400">TSX</span> Portfolio.tsx
      </div>
      <div 
        className={`pl-2 flex items-center gap-2 py-1 cursor-pointer hover:bg-[#2a2d2e] ${activeFile === 'globals.css' ? 'bg-[#37373d] text-white' : 'opacity-70'}`}
        onClick={() => setActiveFile('globals.css')}
      >
        <span className="text-blue-300">#</span> globals.css
      </div>
      <div 
        className={`pl-2 flex items-center gap-2 py-1 cursor-pointer hover:bg-[#2a2d2e] ${activeFile === 'package.json' ? 'bg-[#37373d] text-white' : 'opacity-70'}`}
        onClick={() => setActiveFile('package.json')}
      >
        <span className="text-yellow-400">{}</span> package.json
      </div>
    </div>
    {/* Editor */}
    <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex bg-[#252526] h-9 overflow-x-auto">
            <div className="flex items-center gap-2 px-3 bg-[#1e1e1e] text-white text-xs border-t border-blue-500 min-w-[120px]">
                <span className={files[activeFile].color}>{files[activeFile].lang}</span> {activeFile} <X size={12} className="ml-auto hover:bg-gray-700 rounded p-0.5" />
            </div>
        </div>
        {/* Code Area */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm leading-6">
            <div className="flex gap-4 mb-2 text-xs text-gray-500">
                <span>src &gt; {activeFile === 'package.json' ? '' : 'components >'} {activeFile}</span>
            </div>
            {files[activeFile].content}
        </div>
    </div>
  </div>
  );
};

export default VSCode;
// import React, { useState } from 'react';
// import { Search, Github, FolderOpen, X } from 'lucide-react';

// const VSCode = () => {
//   const [activeFile, setActiveFile] = useState('Portfolio.tsx');

//   const files = {
//     'Portfolio.tsx': {
//       lang: 'TSX', color: 'text-blue-400',
//       content: (
//         <pre><code>
//           <span className="text-pink-400">import</span> React <span className="text-pink-400">from</span> <span className="text-orange-300">'react'</span>;{'\n\n'}
//           <span className="text-pink-400">export const</span> <span className="text-yellow-200">Me</span> = () <span className="text-pink-400">=&gt;</span> {'{'}{'\n'}
//           {'  '}name: <span className="text-orange-300">"Priyanshu Rathod"</span>,{'\n'}
//           {'  '}role: <span className="text-orange-300">"Mern Stack Engineer"</span>{'\n'}
//           {'}'};
//         </code></pre>
//       )
//     },
//     'globals.css': {
//       lang: 'CSS', color: 'text-blue-300',
//       content: <pre><code><span className="text-yellow-200">@tailwind</span> base;{'\n'}body {'{'} background: <span className="text-orange-300">#000</span>; {'}'}</code></pre>
//     },
//     'package.json': {
//         lang: 'JSON', color: 'text-yellow-400',
//         content: <pre><code>{'{'} "name": "priyanshu-portfolio", "version": "1.0.0" {'}'}</code></pre>
//     }
//   };

//   return (
//     <div className="flex h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm">
//       <div className="w-12 border-r border-[#333] flex flex-col items-center py-4 gap-4 text-gray-500">
//         <div className="text-white border-l-2 border-blue-500 pl-3 -ml-4"><FolderOpen size={24} /></div>
//         <Search size={24} /><Github size={24} />
//       </div>
//       <div className="w-48 bg-[#252526] p-2 hidden md:block border-r border-[#333]">
//         <div className="uppercase text-xs font-bold mb-2 pl-2 tracking-wider">Explorer</div>
//         {Object.keys(files).map(file => (
//             <div key={file} onClick={() => setActiveFile(file)} className={`pl-2 flex items-center gap-2 py-1 cursor-pointer hover:bg-[#2a2d2e] ${activeFile === file ? 'bg-[#37373d] text-white' : 'opacity-70'}`}>
//                 <span className={files[file].color}>{files[file].lang}</span> {file}
//             </div>
//         ))}
//       </div>
//       <div className="flex-1 flex flex-col min-w-0">
//         <div className="flex bg-[#252526] h-9 overflow-x-auto">
//             <div className="flex items-center gap-2 px-3 bg-[#1e1e1e] text-white text-xs border-t border-blue-500 min-w-[120px]">
//                 <span className={files[activeFile].color}>{files[activeFile].lang}</span> {activeFile} <X size={12} className="ml-auto hover:bg-gray-700 rounded p-0.5" />
//             </div>
//         </div>
//         <div className="flex-1 p-4 overflow-y-auto leading-6">
//             <div className="text-xs text-gray-500 mb-2">src &gt; components &gt; {activeFile}</div>
//             {files[activeFile].content}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VSCode;