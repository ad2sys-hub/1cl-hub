import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { useSound } from '../hooks/useSound';

export default function ContactPage() {
  const { t } = useSovereign();
  const { playSound } = useSound();
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-clBlack">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-clGold tracking-[0.2em] glitch-text uppercase">
            {t('contactHub.title')}
          </h1>
          <p className="text-clChrome tracking-widest uppercase text-xs opacity-60">
            {t('contactHub.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="p-8 border border-white/5 bg-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-clGold font-serif tracking-widest mb-4">SOVEREIGN NETWORK</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-6">
                All communications are routed through the 1CL EMS Gateway. Our administrative network monitors all incoming data for phygital integrity.
              </p>
              <div className="space-y-4 text-sm text-clChrome/70 tracking-widest">
                <p>COORD: 45.4642° N, 9.1900° E (MILAN HUB)</p>
                <p>NODE: SOVEREIGN-01</p>
                <p>STATUS: ACTIVE</p>
              </div>
            </div>

            <div className="flex gap-4">
              {['INSTAGRAM', 'TWITTER', 'YOUTUBE'].map(s => (
                <div key={s} className="px-4 py-2 border border-white/5 rounded-full text-[10px] text-gray-500 tracking-widest hover:border-clGold/30 transition-colors">
                  {s}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">{t('contactHub.name')}</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-clGold/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">{t('contactHub.email')}</label>
                    <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-clGold/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">{t('contactHub.subject')}</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-clGold/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">{t('contactHub.message')}</label>
                    <textarea rows={4} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-clGold/50 transition-all resize-none"></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-clGold text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    onMouseEnter={() => playSound('hover')}
                  >
                    {t('contactHub.send')}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 border border-clGold/30 bg-clGold/5 rounded-2xl text-center space-y-6"
                >
                  <div className="w-16 h-16 border-2 border-clGold rounded-full flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h3 className="text-clGold text-xl font-serif tracking-widest">TRANSMISSION SUCCESS</h3>
                  <p className="text-gray-400 font-light">{t('contactHub.success')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
