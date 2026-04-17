import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../context/SovereignContext';

const playlist = [
  { title: "YOUR ACTIONS KILL ME", artist: "Chawblick", file: "mp3/YOUR ACTIONS KILL ME.mp3" },
  { title: "There Is Just a Simple Thing", artist: "Chawblick", file: "mp3/There Is Just a Simple Thing.mp3" },
  { title: "I See In Her Eyes", artist: "Chawblick", file: "mp3/i see in her eyes.mp3" },
  { title: "She Is My Boo", artist: "Chawblick", file: "mp3/she is my boo.mp3" }
];

export default function MediaHub() {
  const { isMediaHubOpen, setMediaHubOpen } = useSovereign();
  const [activeTab, setActiveTab] = useState<'mp3' | 'spotify'>('spotify');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/1cl-hub/" + playlist[trackIdx].file);
      audioRef.current.onended = nextTrack;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const nextIdx = (trackIdx + 1) % playlist.length;
    setTrackIdx(nextIdx);
    if (audioRef.current) {
      audioRef.current.src = "/1cl-hub/" + playlist[nextIdx].file;
      if (isPlaying) audioRef.current.play();
    }
  };

  const prevTrack = () => {
    const pIdx = trackIdx === 0 ? playlist.length - 1 : trackIdx - 1;
    setTrackIdx(pIdx);
    if (audioRef.current) {
      audioRef.current.src = "/1cl-hub/" + playlist[pIdx].file;
      if (isPlaying) audioRef.current.play();
    }
  };

  return (
    <>
      {/* Floating Toggle Button (if hidden) */}
      {!isMediaHubOpen && (
        <motion.button
          onClick={() => setMediaHubOpen(true)}
          className="fixed bottom-6 left-6 w-12 h-12 bg-clDarkGrey/80 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center z-50 text-white hover:text-clGold transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ♫
        </motion.button>
      )}

      {/* Draggable Media Hub */}
      <AnimatePresence>
        {isMediaHubOpen && (
          <motion.div
            drag
            dragConstraints={{ left: 0, right: window.innerWidth - 350, top: 0, bottom: window.innerHeight - 400 }}
            dragMomentum={false}
            className={`fixed z-50 bg-clDarkGrey/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${isMinimized ? 'w-64 h-16' : 'w-80 h-auto'}`}
            style={{ bottom: 100, left: 30 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header / Drag Handle */}
            <div className="bg-black/50 p-2 flex justify-between items-center cursor-move border-b border-white/5">
              <div className="flex gap-2">
                <button 
                  onPointerDown={(e) => e.stopPropagation()} 
                  onClick={() => setActiveTab('spotify')} 
                  className={`text-[10px] px-2 py-1 rounded uppercase tracking-widest ${activeTab === 'spotify' ? 'bg-clGold text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  Spotify
                </button>
                <button 
                  onPointerDown={(e) => e.stopPropagation()} 
                  onClick={() => setActiveTab('mp3')} 
                  className={`text-[10px] px-2 py-1 rounded uppercase tracking-widest ${activeTab === 'mp3' ? 'bg-clGold text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  Elite MP3
                </button>
              </div>
              <div className="flex gap-2 text-gray-500">
                <button onPointerDown={(e) => e.stopPropagation()} onClick={() => setIsMinimized(!isMinimized)} className="hover:text-white">—</button>
                <button onPointerDown={(e) => e.stopPropagation()} onClick={() => setMediaHubOpen(false)} className="hover:text-white">✕</button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <div className="p-0 bg-clDarkGrey">
                {activeTab === 'spotify' ? (
                   <iframe 
                      src="https://open.spotify.com/embed/album/10lhlXRUFrbC09tuhuxjy6?utm_source=generator&theme=0" 
                      width="100%" height="280" frameBorder="0" 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy" title="Spotify"
                   />
                ) : (
                   <div className="p-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-clGold to-black mb-4 shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-[spin_4s_linear_infinite]" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                      <h4 className="text-white text-center font-serif truncate w-full px-4">{playlist[trackIdx].title}</h4>
                      <p className="text-xs text-clGold tracking-widest uppercase mb-6">{playlist[trackIdx].artist}</p>
                      
                      <div className="flex items-center gap-6">
                        <button onClick={prevTrack} className="text-gray-400 hover:text-white transition-colors text-xl">⏮</button>
                        <button onClick={togglePlay} className="w-12 h-12 bg-clGold text-black rounded-full flex items-center justify-center text-xl hover:bg-white transition-colors">
                          {isPlaying ? '⏸' : '▶'}
                        </button>
                        <button onClick={nextTrack} className="text-gray-400 hover:text-white transition-colors text-xl">⏭</button>
                      </div>
                   </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
