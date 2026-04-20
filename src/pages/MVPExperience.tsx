import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSovereign } from '../hooks/useSovereign';
import { Play, Shield, Zap, Target } from 'lucide-react';

export default function MVPExperience() {
  const { t } = useSovereign();

  const looks = [
    {
      id: 'MVP-ARMURE',
      title: t('mvp.lookbook.look1'),
      desc: t('mvp.lookbook.look1Desc'),
      image: '/1cl-hub/images/PNG/1CL-VST-GLD.png',
      style: 'from-clGold/20 to-black'
    },
    {
      id: 'MVP-CHILL',
      title: t('mvp.lookbook.look2'),
      desc: t('mvp.lookbook.look2Desc'),
      image: '/1cl-hub/images/PNG/1CL-PUL-BLK.png',
      style: 'from-clChrome/20 to-black'
    },
    {
      id: 'MVP-LAYER',
      title: t('mvp.lookbook.look3'),
      desc: t('mvp.lookbook.look3Desc'),
      image: '/1cl-hub/images/PNG/1CL-JOG-BLK.png',
      style: 'from-white/10 to-black'
    }
  ];

  const philosophy = [
    {
      title: t('mvp.philosophy.item1Title'),
      msg: t('mvp.philosophy.item1Msg'),
      video: '/1cl-hub/video/video2Promo1CL_AZ2iJwp_nZ66tFr7R4ezKg-AZ2iJwp_VIxPFSEwqtJklA.mp4',
      icon: Zap,
      link: 'MVP-ARMURE'
    },
    {
      title: t('mvp.philosophy.item2Title'),
      msg: t('mvp.philosophy.item2Msg'),
      video: '/1cl-hub/video/video3Promo1CL_AZ2iJwp_nZ66tFr7R4ezKg-AZ2iJwp_VIxPFSEwqtJklA.mp4',
      icon: Shield,
      link: 'MVP-CHILL'
    },
    {
      title: t('mvp.philosophy.item3Title'),
      msg: t('mvp.philosophy.item3Msg'),
      video: '/1cl-hub/video/video4Promo1CL_AZ2iJwp_nZ66tFr7R4ezKg-AZ2iJwp_VIxPFSEwqtJklA.mp4',
      icon: Target,
      link: 'MVP-LAYER'
    }
  ];

  return (
    <div className="min-h-screen bg-clBlack text-white overflow-hidden pt-24 pb-32">
      {/* 1. Cinematic Header */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center p-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <img src="/1cl-hub/images/Logos/logo CL v.1.gold.png" alt="1CL" className="w-32 h-32 mx-auto mb-8 filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
          <h1 className="text-5xl md:text-7xl font-serif text-shadow-gold tracking-tighter mb-4 italic">
            {t('mvp.title')}
          </h1>
          <p className="text-clGold tracking-[0.5em] uppercase text-xs md:text-sm font-light">
            {t('mvp.subtitle')}
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-clBlack/50 to-clBlack pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-clGold/30 to-transparent" />
      </section>

      {/* 2. Lookbook Section */}
      <section className="max-w-7xl mx-auto px-6 mb-48">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-sm tracking-[0.4em] uppercase text-gray-500 mb-16 text-center"
        >
          {t('mvp.lookbook.title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {looks.map((look) => (
            <Link key={look.id} to={`/mvp/product/${look.id}`}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel border border-white/5 bg-gradient-to-br ${look.style} group`}
              >
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <span className="text-clGold text-[10px] tracking-widest uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity">0{looks.indexOf(look) + 1}</span>
                  <h3 className="text-2xl font-serif mb-2">{look.title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                    {look.desc}
                  </p>
                </div>
                <motion.img 
                  src={look.image} 
                  alt={look.title}
                  className="absolute inset-0 w-full h-full object-contain p-12 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Philosophy Section */}
      <section className="bg-white/[0.02] border-y border-white/5 py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm tracking-[0.4em] uppercase text-gray-500 mb-24 text-center"
          >
            {t('mvp.philosophy.title')}
          </motion.h2>

          <div className="space-y-48">
            {philosophy.map((item, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-20`}>
                {/* Video Block */}
                <motion.div 
                  initial={{ x: idx % 2 === 0 ? -100 : 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="flex-1 relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 group shadow-2xl"
                >
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                    >
                      <Play fill="white" size={24} className="ml-1" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Text Block */}
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex-1 space-y-8"
                >
                  <div className="flex items-center gap-4 text-clGold">
                    <item.icon size={24} />
                    <span className="tracking-[0.4em] text-xs uppercase font-bold">{item.title}</span>
                  </div>
                  <blockquote className="text-3xl md:text-4xl font-serif italic leading-tight text-shadow-gold">
                    {item.msg}
                  </blockquote>
                  <Link 
                    to={`/mvp/product/${item.link}`}
                    className="inline-flex items-center gap-4 px-8 py-4 border border-clGold/30 text-clGold hover:bg-clGold hover:text-black transition-all group rounded-sm text-xs tracking-[0.2em] uppercase"
                  >
                    {t('hero.explore')}
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
