import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';

const playlist = [
  { title: "YOUR ACTIONS KILL ME", artist: "Chawblick", file: "mp3/YOUR ACTIONS KILL ME.mp3", image: "images/JacketSongs/your actions kill me _instru_jacket.png" },
  { title: "There Is Just a Simple Thing", artist: "Chawblick", file: "mp3/There Is Just a Simple Thing.mp3", image: "images/JacketSongs/Jacket_there-is-one thing-.png" },
  { title: "I See In Her Eyes", artist: "Chawblick", file: "mp3/i see in her eyes.mp3", image: "images/JacketSongs/i see in yer eyes_jacket.png" },
  { title: "She Is My Boo", artist: "Chawblick", file: "mp3/she is my boo.mp3", image: "images/JacketSongs/she is my boo_jacket1.png" },
  { title: "When I See This", artist: "Chawblick", file: "mp3/when i see this.mp3", image: "images/JacketSongs/when i see this _jacket.png" },
  { title: "Civilian Service", artist: "Chawblick", file: "mp3/Civilian Service-mp3_reg.mp3", image: "images/JacketSongs/civilian service_jacket.png" }
];

const eliteAssets = [
  { title: "Sovereign Gold Blueprint", type: "IMAGE", file: "images/Collection_Gold-Logo_Veste.png" },
  { title: "Chrome Matrix Schematic", type: "IMAGE", file: "images/Collection_Chrome-Logo_Veste.png" },
  { title: "ANES Protocol Tunnel", type: "PREVIEW", file: "video/1CL_CHAWBLICK_MUSIC_PROMO.mp4" }
];

export default function MediaHub() {
  const { isMediaHubOpen, setMediaHubOpen, language } = useSovereign();
  const { playSound } = useSound();
  const [activeTab, setActiveTab] = useState<'mp3' | 'spotify' | 'assets'>('spotify');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Trigger unlocking sequence when opened
  useEffect(() => {
    if (isMediaHubOpen) {
      setIsUnlocking(true);
      playSound('drone');
      const timer = setTimeout(() => setIsUnlocking(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isMediaHubOpen, playSound]);

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


      {/* Draggable Media Hub */}
      <AnimatePresence>
        {isMediaHubOpen && (
          <motion.div
            drag
            dragConstraints={{ left: 0, right: window.innerWidth - 350, top: 0, bottom: window.innerHeight - 400 }}
            dragMomentum={false}
            className={`fixed z-50 bg-clDarkGrey/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] media-hub-initial ${isMinimized ? 'w-64 h-16' : 'w-80 h-auto'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header / Drag Handle */}
            <div className="bg-black/80 p-2 flex justify-between items-center cursor-move border-b border-clGold/20 backdrop-blur-3xl">
              <div className="flex gap-1.5">
                {[
                  { id: 'spotify', label: 'Spotify' },
                  { id: 'mp3', label: 'Elite MP3' },
                  { id: 'assets', label: language === 'fr' ? 'Coffre' : 'Assets' }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onPointerDown={(e) => e.stopPropagation()} 
                    onClick={() => { playSound('click'); setActiveTab(tab.id as any); }} 
                    className={`text-[8px] px-2 py-1 rounded transition-all uppercase tracking-widest ${activeTab === tab.id ? 'bg-clGold text-black font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 text-gray-500 px-2">
                <button onPointerDown={(e) => e.stopPropagation()} onClick={() => setIsMinimized(!isMinimized)} className="hover:text-clGold transition-colors text-xs">—</button>
                <button onPointerDown={(e) => e.stopPropagation()} onClick={() => setMediaHubOpen(false)} className="hover:text-red-500 transition-colors text-xs">✕</button>
              </div>
            </div>

            {/* Unlocking Sequence */}
            {isUnlocking && !isMinimized && (
              <div className="h-[280px] flex flex-col items-center justify-center p-8 text-center space-y-4">
                 <div className="w-16 h-16 border-2 border-clGold/30 border-t-clGold rounded-full animate-spin flex items-center justify-center">
                    <Zap className="text-clGold animate-pulse" size={24} />
                 </div>
                 <div>
                    <h5 className="text-clGold text-[9px] font-black uppercase tracking-[0.3em]">MPC Auth</h5>
                    <p className="text-gray-500 text-[8px] uppercase tracking-widest italic mt-1 font-serif">Handshake in progress...</p>
                 </div>
              </div>
            )}

            {/* Content */}
            {!isMinimized && !isUnlocking && (
              <div className="p-0 bg-clDarkGrey relative overflow-hidden">
                <div className="scanline pointer-events-none opacity-30" />
                
                {activeTab === 'spotify' && (
                   <motion.iframe 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src="https://open.spotify.com/embed/album/10lhlXRUFrbC09tuhuxjy6?utm_source=generator&theme=0" 
                      width="100%" height="280" frameBorder="0" 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy" title="Spotify"
                   />
                )}

                {activeTab === 'mp3' && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="p-6 flex flex-col items-center relative overflow-hidden h-[280px]"
                   >
                      <motion.div 
                         className="absolute inset-0 opacity-20 blur-xl scale-150 animate-pulse bg-cover bg-center" 
                         animate={{ backgroundImage: `url('/1cl-hub/${playlist[trackIdx].image}')` }}
                      />

                      <motion.div
                        key={trackIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-[0_0_30px_rgba(212,175,55,0.4)] border-2 border-clGold/50 relative z-10"
                      >
                        <img 
                          src={"/1cl-hub/" + playlist[trackIdx].image} 
                          alt={playlist[trackIdx].title}
                          className={`w-full h-full object-cover animate-[spin_10s_linear_infinite] ${isPlaying ? 'play-state-running' : 'play-state-paused'}`} 
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black/80 rounded-full border border-clGold/30" />
                      </motion.div>

                      <h4 className="text-white text-center font-serif truncate w-full px-4 relative z-10 text-sm tracking-wide">{playlist[trackIdx].title}</h4>
                      <p className="text-[9px] text-clGold tracking-[0.3em] uppercase mb-6 relative z-10">{playlist[trackIdx].artist}</p>
                      
                      <div className="flex items-center gap-6 relative z-10">
                        <button onClick={prevTrack} className="text-gray-500 hover:text-white transition-colors">⏮</button>
                        <button onClick={togglePlay} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-xl hover:bg-clGold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                          {isPlaying ? '⏸' : '▶'}
                        </button>
                        <button onClick={nextTrack} className="text-gray-500 hover:text-white transition-colors">⏭</button>
                      </div>
                   </motion.div>
                )}

                {activeTab === 'assets' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 grid grid-cols-2 gap-3 h-[280px] overflow-y-auto custom-scrollbar bg-black/20"
                  >
                    {eliteAssets.map((asset, i) => (
                      <div key={i} className="group relative aspect-square bg-white/5 border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-clGold/50 transition-all">
                        {asset.type === 'IMAGE' ? (
                           <img src={`/1cl-hub/${asset.file}`} alt="" className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center">
                              <Zap className="text-clGold opacity-30 group-hover:opacity-100 animate-pulse" size={24} />
                           </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-2 left-2 right-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                           <p className="text-[7px] text-clGold font-black uppercase tracking-widest truncate">{asset.title}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
