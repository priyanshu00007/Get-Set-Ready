import React, { useState } from 'react';
import { FileText, Send, X } from 'lucide-react';

const Mail = () => {
  const [selectedMail, setSelectedMail] = useState(0);
  const [showCompose, setShowCompose] = useState(false);
  
  const emails = [
    { id: 0, from: "HR Dept", subject: "Interview Invitation", time: "10:30 AM", body: "Hi priyanshu, we were impressed by your portfolio and would like to schedule an interview for the Senior React Developer role. Are you available next Tuesday?" },
    { id: 1, from: "GitHub", subject: "New Security Alert", time: "Yesterday", body: "We noticed a new login to your account from a Mac device. If this was you, you can ignore this email." },
    { id: 2, from: "Newsletter", subject: "React 19 is coming!", time: "2 days ago", body: "The new React compiler is set to change how we write components forever. Here is what you need to know..." }
  ];

  return (
    <div className="flex h-full bg-white dark:bg-gray-900 relative">
        {showCompose && (
            <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-10">
                <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
                        <span className="font-semibold">New Message</span>
                        <X size={16} className="cursor-pointer hover:text-red-500" onClick={() => setShowCompose(false)} />
                    </div>
                    <div className="p-4 flex flex-col gap-3 flex-1">
                        <input type="text" placeholder="To: Recruiter" className="border-b border-gray-200 dark:border-gray-600 p-2 bg-transparent outline-none" />
                        <input type="text" placeholder="Subject: Job Application - Priyanshu" className="border-b border-gray-200 dark:border-gray-600 p-2 bg-transparent outline-none" />
                        <textarea className="flex-1 p-2 bg-transparent outline-none resize-none h-40" placeholder="Dear Hiring Manager..."></textarea>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600 flex justify-end">
                        <button onClick={() => { alert("Email sent!"); setShowCompose(false); }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md flex items-center gap-2">
                            <Send size={14} /> Send
                        </button>
                    </div>
                </div>
            </div>
        )}

      <div className="w-72 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <span className="font-semibold text-sm">Inbox</span>
          <button onClick={() => setShowCompose(true)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><FileText size={16} /></button>
        </div>
        <div className="overflow-y-auto flex-1">
            {emails.map((mail, idx) => (
                <div key={idx} onClick={() => setSelectedMail(idx)} className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer ${selectedMail === idx ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <div className="flex justify-between mb-1">
                        <span className="font-bold text-sm text-gray-800 dark:text-gray-100">{mail.from}</span>
                        <span className="text-xs text-gray-500">{mail.time}</span>
                    </div>
                    <div className="text-xs font-semibold mb-1 truncate">{mail.subject}</div>
                    <div className="text-xs text-gray-500 truncate">{mail.body}</div>
                </div>
            ))}
        </div>
      </div>
      <div className="flex-1 p-8 flex flex-col">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
            <h2 className="text-xl font-bold mb-2">{emails[selectedMail].subject}</h2>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span>From: <span className="font-medium text-gray-800 dark:text-gray-200">{emails[selectedMail].from}</span></span>
                <span>{emails[selectedMail].time}</span>
            </div>
          </div>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
            {emails[selectedMail].body}
            <br /><br />
            <div className="text-gray-400 italic">Sent from my iPhone</div>
          </div>
      </div>
    </div>
  );
};

export default Mail;
// import React, { useState } from 'react';
// import { FileText, Send, X } from 'lucide-react';

// const Mail = () => {
//   const [selectedMail, setSelectedMail] = useState(0);
//   const [showCompose, setShowCompose] = useState(false);
  
//   const emails = [
//     { id: 0, from: "HR Dept", subject: "Interview Invitation", time: "10:30 AM", body: "Hi priyanshu, we'd like to schedule an interview..." },
//     { id: 1, from: "GitHub", subject: "New Security Alert", time: "Yesterday", body: "New login to your account from Mac OS..." },
//     { id: 2, from: "Newsletter", subject: "React 19 Updates", time: "2 days ago", body: "The new React compiler is set to change everything..." }
//   ];

//   return (
//     <div className="flex h-full bg-white dark:bg-gray-900 relative">
//       {showCompose && (
//         <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-10">
//             <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-xl shadow-2xl flex flex-col overflow-hidden">
//                 <div className="bg-gray-100 dark:bg-gray-700 p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-600">
//                     <span className="font-semibold">New Message</span>
//                     <X size={16} className="cursor-pointer" onClick={() => setShowCompose(false)} />
//                 </div>
//                 <div className="p-4 flex flex-col gap-3 flex-1">
//                     <input type="text" placeholder="To:" className="border-b dark:border-gray-600 p-2 bg-transparent outline-none" />
//                     <textarea className="flex-1 p-2 bg-transparent outline-none resize-none h-40" placeholder="Message..."></textarea>
//                     <button onClick={() => setShowCompose(false)} className="bg-blue-500 text-white px-4 py-1.5 rounded-md self-end flex gap-2 items-center"><Send size={14}/> Send</button>
//                 </div>
//             </div>
//         </div>
//       )}
//       <div className="w-72 border-r border-gray-200 dark:border-gray-800 flex flex-col">
//         <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex justify-between bg-gray-50 dark:bg-gray-800/50">
//           <span className="font-semibold text-sm">Inbox</span>
//           <button onClick={() => setShowCompose(true)}><FileText size={16} /></button>
//         </div>
//         <div className="overflow-y-auto flex-1">
//             {emails.map((mail, idx) => (
//                 <div key={idx} onClick={() => setSelectedMail(idx)} className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer ${selectedMail === idx ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
//                     <div className="flex justify-between mb-1"><span className="font-bold text-sm">{mail.from}</span><span className="text-xs text-gray-500">{mail.time}</span></div>
//                     <div className="text-xs font-semibold truncate">{mail.subject}</div>
//                     <div className="text-xs text-gray-500 truncate">{mail.body}</div>
//                 </div>
//             ))}
//         </div>
//       </div>
//       <div className="flex-1 p-8">
//           <h2 className="text-xl font-bold mb-2">{emails[selectedMail].subject}</h2>
//           <div className="text-sm text-gray-500 mb-4">From: {emails[selectedMail].from}</div>
//           <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{emails[selectedMail].body}</p>
//       </div>
//     </div>
//   );
// };

// export default Mail;    