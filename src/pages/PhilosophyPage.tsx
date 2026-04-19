import { motion } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { Shield, Accessibility, Zap } from 'lucide-react';

export default function PhilosophyPage() {
  const { t } = useSovereign();

  const pillars = [
    { title: t('philosophy.pillar1Title'), text: t('philosophy.pillar1Text'), icon: Shield },
    { title: t('philosophy.pillar2Title'), text: t('philosophy.pillar2Text'), icon: Accessibility },
    { title: t('philosophy.pillar3Title'), text: t('philosophy.pillar3Text'), icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-black pt-28 pb-32 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-clGold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-clGold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-block px-4 py-1 border border-clGold/30 rounded-full mb-6"
        >
          <span className="text-[10px] text-clGold uppercase tracking-[0.5em] font-mono">EMS@DOCTRINE</span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-7xl font-serif text-shadow-gold mb-8 tracking-tighter uppercase italic text-white"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          {t('philosophy.title')}
        </motion.h1>
        <motion.p 
          className="text-gray-400 text-lg md:text-xl font-light leading-relaxed font-sans max-w-2xl mx-auto border-l-2 border-clGold/20 pl-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
        >
          {t('philosophy.subtitle')}
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div 
                key={pillar.title}
                className="group p-8 bg-clDarkGrey/20 border border-white/5 hover:border-clGold/40 transition-all duration-500 rounded-2xl relative overflow-hidden backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                   <Icon size={120} className="text-clGold" />
                </div>
                
                <div className="w-12 h-12 bg-clGold/10 flex items-center justify-center rounded-xl mb-8 border border-clGold/20 group-hover:bg-clGold group-hover:text-black transition-all">
                  <Icon size={24} />
                </div>

                <h3 className="text-xl font-serif text-white uppercase tracking-widest mb-4 group-hover:text-clGold transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm font-light font-sans tracking-wide">
                  {pillar.text}
                </p>
                <div className="mt-8 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-clGold to-transparent transition-all duration-700" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Philosophy Footer */}
      <div className="max-w-4xl mx-auto mt-32 text-center">
         <div className="h-px w-full bg-gradient-to-r from-transparent via-clGold/20 to-transparent mb-12" />
         <p className="text-[10px] text-gray-600 uppercase tracking-[0.6em]">
            1CL — One Link, All Legacy.
         </p>
      </div>
    </div>
  );
}

