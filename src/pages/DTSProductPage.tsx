import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { ChevronLeft, Shield, Zap, Target, Package, Cpu, Layers, Radio } from 'lucide-react';

export default function DTSProductPage() {
  const { id } = useParams();
  const { t } = useSovereign();

  const universeData: Record<string, any> = {
    civilian: {
      name: t('dts.modules.civilian.name'),
      tag: t('dts.modules.civilian.tag'),
      mvp: t('dts.modules.civilian.mvp'),
      color: 'from-gray-700/20 to-clBlack',
      accent: 'text-gray-400',
      icon: Package,
      image: '/1cl-hub/images/PNG/1CL-VST-BLK.png',
      filter: 'contrast(1.2) brightness(0.8)',
      details: [t('mvp.product.materialDesc'), t('mvp.product.detailsDesc')]
    },
    iyason: {
      name: t('dts.modules.iyason.name'),
      tag: t('dts.modules.iyason.tag'),
      mvp: t('dts.modules.iyason.mvp'),
      color: 'from-blue-900/20 to-clBlack',
      accent: 'text-blue-400',
      icon: Shield,
      image: '/1cl-hub/images/PNG/1CL-PUL-BLK.png',
      filter: 'blur(2px) grayscale(0.5)',
      details: [t('mvp.product.materialDesc'), 'Thermoregulation Active Technology']
    },
    echo: {
      name: t('dts.modules.echo.name'),
      tag: t('dts.modules.echo.tag'),
      mvp: t('dts.modules.echo.mvp'),
      color: 'from-purple-900/20 to-clBlack',
      accent: 'text-purple-400',
      icon: Zap,
      image: '/1cl-hub/images/PNG/1CL-VST-GLD.png',
      filter: 'hue-rotate(270deg) contrast(1.5)',
      details: ['3M Reflective High-Vis', 'Matrix Data Connect Ready']
    },
    cinephile: {
      name: t('dts.modules.cinephile.name'),
      tag: t('dts.modules.cinephile.tag'),
      mvp: t('dts.modules.cinephile.mvp'),
      color: 'from-clGold/20 to-clBlack',
      accent: 'text-clGold',
      icon: Target,
      image: '/1cl-hub/images/PNG/1CL-JOG-BLK.png',
      filter: 'sepia(0.3) contrast(1.1)',
      details: ['Premium Cinematic Cut', 'Studio-Grade Finish']
    }
  };

  const data = universeData[id || ''] || universeData.civilian;

  return (
    <div className={`min-h-screen bg-clBlack text-white pt-24 pb-32 bg-gradient-to-b ${data.color}`}>
      
      {/* 1. Immersive Header */}
      <section className="max-w-7xl mx-auto px-8 relative">
        <Link to="/dts" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-[10px] tracking-[0.4em] uppercase">
          <ChevronLeft size={16} /> Matrix Command
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Visual Block with Filter */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-3xl overflow-hidden glass-panel border border-white/5 flex items-center justify-center p-12"
          >
            <div className={`absolute inset-0 opacity-20 ${data.accent.replace('text', 'bg')}`} />
            <img 
              src={data.image} 
              alt={data.name} 
              className={`w-full h-full object-contain relative z-10 transition-all duration-1000 group-hover:scale-105 dts-filter-${id || 'civilian'}`}
            />
            
            {/* Holographic Overlays */}
            <div className="absolute top-8 right-8 space-y-4 text-right">
               <div className="flex items-center justify-end gap-2 text-[8px] tracking-widest text-clChrome/40">
                  <Cpu size={12} /> SYNC: STABLE
               </div>
               <div className="flex items-center justify-end gap-2 text-[8px] tracking-widest text-clChrome/40">
                  <Layers size={12} /> LAYER: DTS-01
               </div>
            </div>
          </motion.div>

          {/* Text Content Block */}
          <div className="space-y-12">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-4 ${data.accent} mb-4`}
              >
                <data.icon size={24} />
                <span className="tracking-[0.5em] text-xs font-bold uppercase">{data.tag}</span>
              </motion.div>
              <h1 className="text-4xl md:text-7xl font-serif text-shadow-gold mb-6 italic leading-tight">
                {data.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/40 font-serif italic max-w-xl">
                {data.mvp}
              </p>
            </div>

            <div className="space-y-6">
               <h3 className="text-clChrome tracking-[0.4em] text-[10px] uppercase font-bold border-b border-white/10 pb-4">
                 Technical Pipeline Data
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.details.map((detail: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 glass-panel border border-white/5 rounded-sm">
                       <Radio size={14} className="text-clGold mt-0.5" />
                       <span className="text-xs text-gray-400 font-light lowercase leading-relaxed">
                          {detail}
                       </span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-8">
               <button className="px-12 py-5 bg-clGold text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:-translate-y-1">
                 Initialize Connection — 120€
               </button>
               <button className="px-12 py-5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                 Download Manifest
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Philosophy Deep Dive */}
      <section className="mt-48 max-w-5xl mx-auto text-center px-8 relative">
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
            <h2 className="text-[30vw] font-serif italic text-white leading-none">DTS</h2>
         </div>
         <div className="relative z-10 space-y-8">
            <span className="text-clGold tracking-[0.8em] text-[10px] uppercase font-bold">The Sovereign Frequency</span>
            <p className="text-2xl md:text-4xl font-serif italic leading-relaxed text-shadow-gold">
               "Le destin n'est pas ce qui vous arrive, c'est ce que vous décidez de porter dans l'arène de l'existence. Dominez votre fréquence."
            </p>
            <div className="w-20 h-px bg-clGold/40 mx-auto mt-12" />
         </div>
      </section>
    </div>
  );
}
