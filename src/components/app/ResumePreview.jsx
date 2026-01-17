import React from 'react';
import { Download, FileText, AlertCircle } from 'lucide-react';

const ResumePreview = () => {
  const resumeUrl = "resume_data.pdf"; 

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      
      {/* Toolbar */}
      <div className="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
           <FileText size={16} className="text-blue-500" />
           <span className="font-semibold text-sm">Resume.pdf</span>
        </div>
        
        <a 
          href={resumeUrl} 
          download="Resume.pdf"
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md transition-colors shadow-sm"
        >
          <Download size={14} /> 
          <span>Download</span>
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 bg-gray-200 dark:bg-gray-900 overflow-hidden relative flex items-center justify-center">
        <object
          data={resumeUrl}
          type="application/pdf"
          className="w-full h-full block"
        >
          {/* Fallback if browser doesn't support embedding */}
          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 gap-4 p-8 text-center">
             <AlertCircle size={48} className="opacity-50" />
             <div>
               <p className="font-medium">Unable to preview PDF</p>
               <p className="text-sm opacity-70 mb-4">Your browser may not support embedding PDFs.</p>
             </div>
             <a 
              href={resumeUrl} 
              download 
              className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors"
             >
               Download PDF Directly
             </a>
          </div>
        </object>
      </div>
    </div>
  );
};

export default ResumePreview;