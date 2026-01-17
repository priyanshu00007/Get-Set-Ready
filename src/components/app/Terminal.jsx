import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/config';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Last login: Today on ttys001' },
    { type: 'output', content: 'Welcome to priOS v1.0.0. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: input }];
      
      let response = '';
      switch (cmd) {
        case 'help':
          response = 'Available commands: about, skills, contact, clear, date, whoami, ls, pwd, cat';
          break;
        case 'about':
          response = PORTFOLIO_DATA.about;
          break;
        case 'skills':
          response = PORTFOLIO_DATA.skills.join(', ');
          break;
        case 'contact':
          response = 'Email: priyanshu518@gmail.com | GitHub: @priyanshu00007';
          break;
        case 'date':
          response = new Date().toString();
          break;
        case 'whoami':
          response = 'root';
          break;
        case 'ls':
            response = 'Desktop  Documents  Downloads  Music  Pictures  Public';
            break;
        case 'pwd':
            response = '/Users/priyanshu';
            break;
        case 'cat':
            response = 'usage: cat [filename]';
            break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case '':
          break;
        default:
          response = `zsh: command not found: ${cmd}`;
      }
      
      if (response) newHistory.push({ type: 'output', content: response });
      setHistory(newHistory);
      setInput('');
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="bg-[#1e1e1e] text-green-400 p-4 h-full font-mono text-sm overflow-y-auto" onClick={() => document.getElementById('term-input')?.focus()}>
      {history.map((line, i) => (
        <div key={i} className={`mb-1 ${line.type === 'input' ? 'text-white' : 'opacity-90'}`}>
          {line.type === 'input' && <span className="text-blue-400 mr-2">➜  ~</span>}
          {line.content}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-blue-400 mr-2">➜  ~</span>
        <input 
          id="term-input"
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none outline-none flex-1 text-white"
          autoFocus
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};

export default Terminal;
// import React, { useState, useEffect, useRef } from 'react';
// import { PORTFOLIO_DATA } from '../../data/config';

// const Terminal = () => {
//   const [history, setHistory] = useState([
//     { type: 'output', content: 'Last login: Today on ttys001' },
//     { type: 'output', content: 'Welcome to priOS v1.0.0. Type "help" for commands.' },
//   ]);
//   const [input, setInput] = useState('');
//   const endRef = useRef(null);

//   const handleCommand = (e) => {
//     if (e.key === 'Enter') {
//       const cmd = input.trim().toLowerCase();
//       const newHistory = [...history, { type: 'input', content: input }];
//       let response = '';

//       switch (cmd) {
//         case 'help': response = 'Available commands: about, skills, contact, clear, whoami, ls'; break;
//         case 'about': response = PORTFOLIO_DATA.about; break;
//         case 'skills': response = PORTFOLIO_DATA.skills.join(', '); break;
//         case 'contact': response = 'Email: priyanshu518@gmail.com | GitHub: @priyanshu00007'; break;
//         case 'whoami': response = 'root'; break;
//         case 'ls': response = 'Desktop  Documents  Downloads  Music  Pictures'; break;
//         case 'clear': setHistory([]); setInput(''); return;
//         case '': break;
//         default: response = `zsh: command not found: ${cmd}`;
//       }
      
//       if (response) newHistory.push({ type: 'output', content: response });
//       setHistory(newHistory);
//       setInput('');
//     }
//   };

//   useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

//   return (
//     <div className="bg-[#1e1e1e] text-green-400 p-4 h-full font-mono text-sm overflow-y-auto" onClick={() => document.getElementById('term-input')?.focus()}>
//       {history.map((line, i) => (
//         <div key={i} className={`mb-1 ${line.type === 'input' ? 'text-white' : 'opacity-90'}`}>
//           {line.type === 'input' && <span className="text-blue-400 mr-2">➜  ~</span>}
//           {line.content}
//         </div>
//       ))}
//       <div className="flex items-center">
//         <span className="text-blue-400 mr-2">➜  ~</span>
//         <input id="term-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="bg-transparent border-none outline-none flex-1 text-white" autoFocus />
//       </div>
//       <div ref={endRef} />
//     </div>
//   );
// };

// export default Terminal;