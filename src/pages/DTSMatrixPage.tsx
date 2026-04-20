import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSovereign } from '../hooks/useSovereign';
import { Activity, Shield, Zap, Target, Package } from 'lucide-react';

export default function DTSMatrixPage() {
  const { t } = useSovereign();
  const navigate = useNavigate();

  const dtsModules = [
    {
      id: 'civilian',
      name: t('dts.modules.civilian.name'),
      tag: t('dts.modules.civilian.tag'),
      mvp: t('dts.modules.civilian.mvp'),
      color: '#6B7280', // Grey/Tactical
      icon: Package,
      angle: 0
    },
    {
      id: 'iyason',
      name: t('dts.modules.iyason.name'),
      tag: t('dts.modules.iyason.tag'),
      mvp: t('dts.modules.iyason.mvp'),
      color: '#3B82F6', // Blue/Healing
      icon: Shield,
      angle: 90
    },
    {
      id: 'echo',
      name: t('dts.modules.echo.name'),
      tag: t('dts.modules.echo.tag'),
      mvp: t('dts.modules.echo.mvp'),
      color: '#A855F7', // Violet/Future
      icon: Zap,
      angle: 180
    },
    {
      id: 'cinephile',
      name: t('dts.modules.cinephile.name'),
      tag: t('dts.modules.cinephile.tag'),
      mvp: t('dts.modules.cinephile.mvp'),
      color: '#D4AF37', // Gold/Storytelling
      icon: Target,
      angle: 270
    }
  ];

  return (
    <div className="relative min-h-screen bg-clBlack overflow-hidden flex items-center justify-center pt-20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-clDarkGrey/30 via-clBlack to-clBlack pointer-events-none" />
      <div className="scanline" />

      {/* Header Info */}
      <div className="absolute top-24 left-10 z-20 space-y-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-clChrome tracking-[0.5em] uppercase text-[10px] font-bold"
        >
          {t('dts.title')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-4xl text-clGold italic"
        >
          {t('dts.subtitle')}
        </motion.p>
        <div className="flex items-center gap-3 pt-4 text-[8px] tracking-widest text-clChrome/50">
          <Activity size={12} className="text-green-500 animate-pulse" />
          <span>{t('dts.agent.status')}</span>
        </div>
      </div>

      {/* Central Matrix Container */}
      <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
        
        {/* Orbital Rings Visualizer */}
        <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.8]" />
        <div className="absolute inset-0 border border-white/5 rounded-full scale-[1.1] opacity-50" />
        
        {/* Central Wireframe Silhouette */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-96 h-96"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <defs>
              <linearGradient id="wireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Holographic Wireframe Silhouette (Simplified Alpha Form) */}
            <motion.path
              d="M100 20 C110 20 120 40 120 60 L130 140 L115 180 L100 170 L85 180 L70 140 L80 60 C80 40 90 20 100 20"
              fill="transparent"
              stroke="url(#wireGrad)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              animate={{
                strokeDashoffset: [0, -10],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* Matrix Pulses */}
            <motion.circle 
              cx="100" cy="100" r="60" 
              fill="transparent" 
              stroke="#D4AF37" 
              strokeWidth="0.2" 
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        {/* Orbiting DTS Orbs */}
        {dtsModules.map((module) => (
          <motion.div
            key={module.id}
            className="absolute z-20 cursor-pointer group"
            animate={{
              rotate: [0, 360],
              transition: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }
            }}
            style={{ 
              width: 0, 
              height: 0, 
              left: '50%', 
              top: '50%'
            }}
          >
            {/* The actual orb (reversing the parent rotation to keep content upright) */}
            <motion.div
              animate={{
                rotate: [0, -360],
                transition: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }
              }}
              className={`absolute dts-pos-${module.angle} dts-color-${module.id}`}
              onClick={() => navigate(`/dts/${module.id}`)}
            >
              <div 
                className="w-16 h-16 rounded-full glass-panel border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-white transition-all shadow-xl bg-[var(--module-color-alpha)]"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity bg-[var(--module-color)]" 
                />
                <module.icon className="relative z-10 text-white group-hover:text-clGold transition-colors" size={24} />
                
                {/* Floating MVP Label on Hover */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10 rounded-sm">
                   <p className="text-[10px] text-clGold font-bold tracking-widest">{module.name}</p>
                </div>
              </div>

              {/* MVP Message Display (appearing when hover) */}
              <div className="absolute left-20 top-0 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                 <p className="text-[8px] tracking-[0.4em] uppercase text-clChrome mb-1 font-bold">{module.tag}</p>
                 <p className="text-[10px] text-white/60 font-serif italic max-w-[200px] leading-tight">
                   {module.mvp}
                 </p>
              </div>

              {/* Data Pipeline Line (to center) */}
              <svg className="absolute top-1/2 right-16 w-[180px] h-px pointer-events-none -translate-y-1/2 opacity-20 group-hover:opacity-60 transition-opacity">
                <motion.line 
                  x1="0" y1="0" x2="180" y2="0" 
                  stroke="var(--module-color)" 
                  strokeWidth="1" 
                  strokeDasharray="4,4" 
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </motion.div>
          </motion.div>
        ))}

      </div>

      {/* Footer Instructions */}
      <div className="absolute bottom-12 left-0 right-0 text-center space-y-2">
        <p className="text-gray-500 text-[8px] tracking-[0.6em] uppercase animate-pulse">
           Initialization Sovereign Matrix Core...
        </p>
        <p className="text-clChrome/40 text-[7px] tracking-widest uppercase">
          {t('system.version')}
        </p>
      </div>
    </div>
  );
}
