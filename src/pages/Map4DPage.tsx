import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../hooks/useSound';
import { useSovereign } from '../hooks/useSovereign';

export default function Map4DPage() {
  const navigate = useNavigate();
  const { playSound, stopSound } = useSound();
  const { t } = useSovereign();

  useEffect(() => {
    playSound('drone');
    return () => stopSound('drone');
  }, [playSound, stopSound]);

  const nodes = [
    { id: 1, title: t('map4d.nodes.collections'), path: '/collections', x: 20, y: 30, size: 80, desc: t('catalog.subtitle') },
    { id: 2, title: t('map4d.nodes.philosophy'), path: '/philosophy', x: 70, y: 20, size: 100, desc: '1st Class Obsession' },
    { id: 3, title: t('map4d.nodes.workshop'), path: '/collections', x: 80, y: 70, size: 70, desc: 'Atelier Mode' },
    { id: 4, title: t('map4d.nodes.sponsors'), path: '/sponsors', x: 30, y: 80, size: 90, desc: 'Partner Hub' },
    { id: 5, title: t('map4d.nodes.matrixCore'), path: '/', x: 50, y: 50, size: 120, desc: 'The Core' },
  ];

  return (
    <div className="relative min-h-screen bg-clBlack overflow-hidden pt-20 hologram-container">
      
      {/* Dynamic Scanline Effect */}
      <div className="scanline" />

      {/* Background Starfield / Constellation Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-clDarkGrey/40 via-clBlack to-clBlack pointer-events-none" />
      
      <div className="absolute top-8 left-8 z-20">
         <h1 className="text-clChrome tracking-[0.4em] uppercase text-xs glitch-text">{t('map4d.nav')}</h1>
         <p className="font-serif text-3xl text-clGold mt-2">{t('map4d.matrix')}</p>
         <div className="flex items-center gap-2 mt-4">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[8px] uppercase tracking-widest text-clChrome/60">{t('map4d.status')}</span>
         </div>
      </div>

      <div className="relative w-full h-[80vh] mt-12 mx-auto max-w-6xl">
        
        {/* Draw lines between nodes to create a graph look */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <motion.line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#D4AF37" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
          <motion.line x1="70%" y1="20%" x2="50%" y2="50%" stroke="#D4AF37" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
          <motion.line x1="80%" y1="70%" x2="50%" y2="50%" stroke="#D4AF37" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
          <motion.line x1="30%" y1="80%" x2="50%" y2="50%" stroke="#D4AF37" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
          <motion.line x1="20%" y1="30%" x2="30%" y2="80%" stroke="#C0C0C0" strokeWidth="1" strokeDasharray="5,5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
          <motion.line x1="70%" y1="20%" x2="80%" y2="70%" stroke="#C0C0C0" strokeWidth="1" strokeDasharray="5,5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
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
              height: node.size
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            onHoverStart={() => playSound('hover')}
            onClick={() => {
              playSound('click');
              setTimeout(() => navigate(node.path), 300);
            }}
          >
            {/* Core glowing sphere */}
            <div className="absolute inset-0 bg-clGold/10 rounded-full blur-md group-hover:bg-clGold/40 transition-colors duration-500" />
            <div className="absolute inset-1 bg-clDarkGrey/80 border border-clGold/50 rounded-full hologram-glow group-hover:border-white transition-all flex items-center justify-center">
               <span className="text-white font-serif text-sm px-2 text-center group-hover:text-clGold transition-colors tracking-tighter">{node.title}</span>
            </div>

            {/* Hover tooltip label */}
            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] uppercase tracking-[0.3em] text-clChrome">
              {node.desc}
            </div>
          </motion.div>
        ))}

      </div>

      <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
        <p className="text-gray-600 text-[8px] tracking-[0.5em] uppercase glitch-text">{t('map4d.layer')}</p>
      </div>

    </div>
  );
}
