import { motion } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';

export default function PhilosophyPage() {
  const { t } = useSovereign();

  const pillars = [
    { title: t('philosophy.pillar1Title'), text: t('philosophy.pillar1Text') },
    { title: t('philosophy.pillar2Title'), text: t('philosophy.pillar2Text') },
    { title: t('philosophy.pillar3Title'), text: t('philosophy.pillar3Text') }
  ];

  return (
    <div className="pt-28 pb-32 px-4">
      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.h1 
          className="text-4xl md:text-6xl font-serif text-shadow-gold mb-6 tracking-tighter uppercase italic"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          {t('philosophy.title')}
        </motion.h1>
        <motion.p 
          className="text-gray-400 text-lg md:text-xl font-light leading-relaxed font-sans"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
        >
          {t('philosophy.subtitle')}
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="space-y-32">
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={pillar.title}
              className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="md:w-1/2 relative aspect-square flex items-center justify-center p-8 bg-clDarkGrey/30 border border-white/5">
                <div className="absolute inset-0 bg-clGold/5 mix-blend-overlay" />
                <h2 className="text-6xl md:text-8xl font-serif text-white/5 absolute font-black tracking-tighter mix-blend-overlay">0{idx + 1}</h2>
                <img src="/1cl-hub/images/Logos/logo CL v.1.gold.png" alt="1CL Icon" className="w-32 h-32 object-contain filter drop-shadow-2xl" />
              </div>
              
              <div className="md:w-1/2 space-y-6">
                <h3 className="text-3xl font-serif text-clGold uppercase tracking-widest">{pillar.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg font-light">{pillar.text}</p>
                <div className="h-[1px] w-24 bg-clChrome/30" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
