import React from 'react';
import { Trash2 } from 'lucide-react';

const Trash = () => (
    <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-gray-900 text-gray-400">
        <Trash2 size={64} className="mb-4 opacity-50" />
        <h2 className="text-xl font-medium">Trash is Empty</h2>
        <p className="text-sm">No items to display</p>
    </div>
);

export default Trash;