import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { ChevronLeft, Info, Maximize2, ShieldCheck } from 'lucide-react';

export default function MVPProductPage() {
  const { id } = useParams();
  const { t } = useSovereign();

  const productData: Record<string, any> = {
    'MVP-ARMURE': {
      title: t('mvp.lookbook.look1'),
      image: '/1cl-hub/images/PNG/1CL-VST-GLD.png',
      color: 'bg-clGold',
      tag: 'Urban Armor'
    },
    'MVP-CHILL': {
      title: t('mvp.lookbook.look2'),
      image: '/1cl-hub/images/PNG/1CL-PUL-BLK.png',
      color: 'bg-clChrome',
      tag: 'Dynamic Chill'
    },
    'MVP-LAYER': {
      title: t('mvp.lookbook.look3'),
      image: '/1cl-hub/images/PNG/1CL-JOG-BLK.png',
      color: 'bg-white',
      tag: 'Alpha Layering'
    }
  };

  const product = productData[id || ''] || productData['MVP-ARMURE'];

  return (
    <div className="min-h-screen bg-clBlack text-white pt-20">
      {/* 1. Immersive Header */}
      <section className="relative h-screen flex flex-col justify-end p-8 md:p-20 overflow-hidden">
        {/* Background Artwork */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div className={`absolute inset-0 opacity-10 blur-[100px] ${product.color}`} />
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-contain p-24 md:p-48 mix-blend-lighten filter drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]" 
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-clBlack via-clBlack/40 to-transparent z-[1]" />

        {/* Text Content */}
        <div className="relative z-10 max-w-4xl">
          <Link to="/mvp" className="inline-flex items-center gap-2 text-gray-500 hover:text-clGold transition-colors mb-8 text-xs tracking-[0.3em] uppercase">
            <ChevronLeft size={16} /> {t('product.backToCatalog')}
          </Link>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-clGold tracking-[0.5em] text-[10px] uppercase font-bold mb-4 block">1CL MVP COLLECTION — {product.tag}</span>
            <h1 className="text-5xl md:text-8xl font-serif text-shadow-gold mb-8 italic">{product.title}</h1>
            <div className="flex gap-4">
               <button className="px-12 py-5 bg-clGold text-black font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl">
                 {t('mvp.product.cta')}
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Technical Details Grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           className="space-y-6 group"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-clGold transition-colors">
            <ShieldCheck className="text-clGold" size={20} />
          </div>
          <h3 className="text-sm tracking-[0.3em] uppercase text-clGold font-bold">{t('mvp.product.material')}</h3>
          <p className="text-gray-400 font-light leading-relaxed">
            {t('mvp.product.materialDesc')}
          </p>
        </motion.div>

        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="space-y-6 group"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-clGold transition-colors">
            <Maximize2 className="text-clGold" size={20} />
          </div>
          <h3 className="text-sm tracking-[0.3em] uppercase text-clGold font-bold">{t('mvp.product.cut')}</h3>
          <p className="text-gray-400 font-light leading-relaxed">
            {t('mvp.product.cutDesc')}
          </p>
        </motion.div>

        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           className="space-y-6 group"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-clGold transition-colors">
            <Info className="text-clGold" size={20} />
          </div>
          <h3 className="text-sm tracking-[0.3em] uppercase text-clGold font-bold">{t('mvp.product.details')}</h3>
          <p className="text-gray-400 font-light leading-relaxed">
            {t('mvp.product.detailsDesc')}
          </p>
        </motion.div>
      </section>

      {/* 3. The Experience Block */}
      <section className="py-48 px-8 bg-white/[0.01] border-y border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.05, scale: 1.2 }}
            className="absolute inset-0 flex items-center justify-center -z-0 pointer-events-none select-none"
          >
             <h2 className="text-[20vw] font-serif text-white tracking-tighter italic">MVP</h2>
          </motion.div>
          
          <div className="relative z-10">
            <span className="text-clGold tracking-[0.5em] text-[10px] uppercase font-bold mb-12 block">{t('mvp.product.experience')}</span>
            <blockquote className="text-3xl md:text-5xl font-serif italic text-shadow-gold leading-tight mb-8">
              {t('mvp.product.experienceQuote')}
            </blockquote>
            <div className="w-24 h-px bg-clGold/50 mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
}
