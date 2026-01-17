import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { SONGS } from '../../data/config';

const MusicPlayer = ({ isWidget }) => {
    const [playing, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        if (playing) {
            audioRef.current?.play();
            const timer = setInterval(() => {
                setProgress(p => p < 100 ? p + 0.5 : 0);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            audioRef.current?.pause();
        }
    }, [playing, currentSong]);

    const skip = (dir) => {
        setCurrentSong(curr => {
            if (dir === 'next') return (curr + 1) % SONGS.length;
            return (curr - 1 + SONGS.length) % SONGS.length;
        });
        setProgress(0);
        setPlaying(true);
    };

    if (isWidget) {
        return (
            <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-400 rounded-md flex items-center justify-center animate-pulse">
               <Music className="text-white" size={24} />
             </div>
             <div className="flex-1 min-w-0">
               <div className="text-white text-sm font-semibold truncate">{SONGS[currentSong].title}</div>
               <div className="text-white/60 text-xs truncate">{SONGS[currentSong].artist}</div>
             </div>
             <div className="flex gap-2">
                 <button onClick={() => setPlaying(!playing)}>
                     {playing ? <Pause className="text-white" size={20} /> : <Play className="text-white" size={20} />}
                 </button>
             </div>
             <audio ref={audioRef} src={SONGS[currentSong].url} onEnded={() => skip('next')} />
            </div>
        );
    }

    return (
        <div className="h-full bg-gray-900 text-white flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-800 to-black">
            <div className="w-48 h-48 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-8 flex items-center justify-center">
                <Music size={64} className="text-white opacity-80" />
            </div>
            <h2 className="text-2xl font-bold mb-1">{SONGS[currentSong].title}</h2>
            <p className="text-gray-400 mb-8">{SONGS[currentSong].artist}</p>
            
            <div className="w-full max-w-md bg-gray-700 h-1 rounded-full mb-8 overflow-hidden">
                <div className="bg-white h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="flex items-center gap-8">
                <SkipBack size={32} className="cursor-pointer hover:text-gray-300" onClick={() => skip('prev')} />
                <div 
                    onClick={() => setPlaying(!playing)}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black cursor-pointer hover:scale-105 transition-transform"
                >
                    {playing ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                </div>
                <SkipForward size={32} className="cursor-pointer hover:text-gray-300" onClick={() => skip('next')} />
            </div>
            <audio ref={audioRef} src={SONGS[currentSong].url} />
        </div>
    );
};

export default MusicPlayer;
// import React, { useState, useRef, useEffect } from 'react';
// import { Music, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
// import { SONGS } from '../../data/config';

// const MusicPlayer = () => {
//     const [playing, setPlaying] = useState(false);
//     const [currentSong, setCurrentSong] = useState(0);
//     const [progress, setProgress] = useState(0);
//     const audioRef = useRef(null);

//     useEffect(() => {
//         if (playing) {
//             audioRef.current?.play();
//             const timer = setInterval(() => setProgress(p => p < 100 ? p + 0.5 : 0), 1000);
//             return () => clearInterval(timer);
//         } else {
//             audioRef.current?.pause();
//         }
//     }, [playing, currentSong]);

//     const skip = (dir) => {
//         setCurrentSong(curr => (dir === 'next' ? (curr + 1) : (curr - 1 + SONGS.length)) % SONGS.length);
//         setProgress(0);
//         setPlaying(true);
//     };

//     return (
//         <div className="h-full bg-gray-900 text-white flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-800 to-black">
//             <div className="w-48 h-48 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-8 flex items-center justify-center">
//                 <Music size={64} className="text-white opacity-80" />
//             </div>
//             <h2 className="text-2xl font-bold mb-1 text-center">{SONGS[currentSong].title}</h2>
//             <p className="text-gray-400 mb-8">{SONGS[currentSong].artist}</p>
            
//             <div className="w-full max-w-md bg-gray-700 h-1 rounded-full mb-8 overflow-hidden">
//                 <div className="bg-white h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
//             </div>

//             <div className="flex items-center gap-8">
//                 <SkipBack size={32} className="cursor-pointer hover:text-gray-300" onClick={() => skip('prev')} />
//                 <div onClick={() => setPlaying(!playing)} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black cursor-pointer hover:scale-105 transition-transform">
//                     {playing ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
//                 </div>
//                 <SkipForward size={32} className="cursor-pointer hover:text-gray-300" onClick={() => skip('next')} />
//             </div>
//             <audio ref={audioRef} src={SONGS[currentSong].url} />
//         </div>
//     );
// };

// export default MusicPlayer;