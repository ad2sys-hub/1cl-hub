import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../hooks/useSound';
import { useSovereign } from '../hooks/useSovereign';

export default function Map4DPage() {
  const navigate = useNavigate();
  const { playSound, stopSound } = useSound();
  const { t } = useSovereign();

  // Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    playSound('drone');
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 50;
      const y = (e.clientY / innerHeight - 0.5) * 50;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      stopSound('drone');
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [playSound, stopSound, mouseX, mouseY]);

  const nodes = [
    { id: 1, title: t('map4d.nodes.collections'), path: '/collections', x: 20, y: 30, size: 80, desc: t('catalog.subtitle'), depth: 1.5 },
    { id: 2, title: t('map4d.nodes.philosophy'), path: '/philosophy', x: 70, y: 20, size: 100, desc: '1st Class Obsession', depth: 2 },
    { id: 3, title: t('map4d.nodes.workshop'), path: '/collections', x: 80, y: 70, size: 70, desc: 'Atelier Mode', depth: 1.2 },
    { id: 4, title: t('map4d.nodes.sponsors'), path: '/sponsors', x: 30, y: 80, size: 90, desc: 'Partner Hub', depth: 1.8 },
    { id: 5, title: t('map4d.nodes.matrixCore'), path: '/dts', x: 50, y: 50, size: 120, desc: 'DTS GLOBAL MATRIX', depth: 0.5 },
    // DTS Pipelines
    { id: 6, title: 'Civilian', path: '/dts/civilian', x: 15, y: 60, size: 60, desc: 'Tactical Utility', depth: 1 },
    { id: 7, title: 'Iyason', path: '/dts/iyason', x: 85, y: 35, size: 60, desc: 'Healing Sanctuary', depth: 1 },
    { id: 8, title: 'Echo', path: '/dts/echo', x: 75, y: 85, size: 60, desc: 'Echo Future', depth: 1 },
    { id: 9, title: 'Cinéphile', path: '/dts/cinephile', x: 35, y: 15, size: 60, desc: 'Story Script', depth: 1 },
  ];

  return (
    <div className="relative min-h-screen bg-clBlack overflow-hidden pt-20 hologram-container">
      
      {/* Dynamic Scanline Effect */}
      <div className="scanline" />

      {/* Background Starfield / Constellation Ambient */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute inset-[-10%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-clDarkGrey/40 via-clBlack to-clBlack pointer-events-none opacity-50" 
      />
      
      <div className="absolute top-8 left-8 z-20">
         <h1 className="text-clChrome tracking-[0.4em] uppercase text-xs glitch-text">{t('map4d.nav')}</h1>
         <p className="font-serif text-3xl text-clGold mt-2">{t('map4d.matrix')}</p>
         <div className="flex items-center gap-2 mt-4">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[8px] uppercase tracking-widest text-clChrome/60">{t('map4d.status')}</span>
         </div>
      </div>

      <motion.div 
        className="relative w-full h-[80vh] mt-12 mx-auto max-w-6xl"
        style={{ x: useSpring(mouseX, {stiffness: 20}), y: useSpring(mouseY, {stiffness: 20}) }}
      >
        
        {/* Draw lines between nodes to create a graph look */}
        <svg className="absolute inset-[-50%] w-[200%] h-[200%] pointer-events-none opacity-20">
          <motion.line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#D4AF37" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
          <motion.line x1="70%" y1="20%" x2="50%" y2="50%" stroke="#D4AF37" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
          <motion.line x1="80%" y1="70%" x2="50%" y2="50%" stroke="#D4AF37" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
          <motion.line x1="30%" y1="80%" x2="50%" y2="50%" stroke="#D4AF37" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
          
          {/* Animated Data Pulses */}
          <motion.circle r="2" fill="#D4AF37" cx="50%" cy="50%">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 0,0 L -30vw,-20vh" />
          </motion.circle>
          <motion.circle r="2" fill="#D4AF37" cx="50%" cy="50%">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 0,0 L 20vw,-30vh" />
          </motion.circle>
          
          {/* DTS Pipelines Visualized */}
          <motion.line x1="15%" y1="60%" x2="50%" y2="50%" stroke="#6B7280" strokeWidth="0.5" strokeDasharray="4,4" animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.line x1="85%" y1="35%" x2="50%" y2="50%" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="4,4" animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.line x1="75%" y1="85%" x2="50%" y2="50%" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="4,4" animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.line x1="35%" y1="15%" x2="50%" y2="50%" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4,4" animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
        </svg>

        {/* Render interactive nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className="absolute rounded-full cursor-pointer flex flex-col items-center justify-center group"
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              width: node.size,
              height: node.size,
              x: useSpring(mouseX, { stiffness: 30 * node.depth, damping: 20 }),
              y: useSpring(mouseY, { stiffness: 30 * node.depth, damping: 20 })
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            onHoverStart={() => playSound('hover')}
            onClick={() => {
              playSound('click');
              setTimeout(() => navigate(node.path), 300);
            }}
          >
            {/* Core glowing sphere */}
            <div className="absolute inset-0 bg-clGold/10 rounded-full blur-md group-hover:bg-clGold/40 transition-colors duration-500" />
            <div className="absolute inset-1 bg-clDarkGrey/80 border border-clGold/50 rounded-full hologram-glow group-hover:border-white transition-all flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
               <span className="text-white font-serif text-sm px-2 text-center group-hover:text-clGold transition-colors tracking-tighter uppercase">{node.title}</span>
            </div>

            {/* Hover tooltip label */}
            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] uppercase tracking-[0.3em] text-clChrome">
              {node.desc}
            </div>
          </motion.div>
        ))}

      </motion.div>

      <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
        <p className="text-gray-600 text-[8px] tracking-[0.5em] uppercase glitch-text">{t('map4d.layer')}</p>
      </div>

    </div>
  );
}
