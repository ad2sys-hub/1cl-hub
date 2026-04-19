import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { useSound } from '../hooks/useSound';

export default function CookieConsent() {
  const { t, cookieConsent, setCookieConsent } = useSovereign();
  const { playSound } = useSound();
  const [showSettings, setShowSettings] = useState(false);

  if (cookieConsent !== null && !showSettings) return null;

  return (
    <AnimatePresence>
      {(cookieConsent === null || showSettings) && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center pointer-events-none p-4 sm:p-8">
          
          {/* Backdrop for Settings */}
          {showSettings && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
              onClick={() => setShowSettings(false)}
            />
          )}

          {/* Banner / Modal */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={`w-full max-w-4xl bg-clBlack border border-clGold/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] pointer-events-auto overflow-hidden relative ${showSettings ? 'mb-auto mt-20' : ''}`}
          >
            {/* Scanline Effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-clGold/20 animate-pulse" />

            {!showSettings ? (
              /* Simple Banner Layout */
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-grow space-y-2">
                  <h4 className="text-clGold font-serif tracking-[0.2em] text-sm uppercase">SOVEREIGN SYNC PROTOCOL</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {t('cookies.banner')}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <button 
                    onClick={() => { playSound('click'); setShowSettings(true); }}
                    className="px-4 py-2 border border-clGold/30 text-clGold text-[10px] tracking-widest uppercase rounded-full hover:bg-clGold/10 transition-all font-bold"
                  >
                    {t('cookies.settings')}
                  </button>
                  <button 
                    onClick={() => { playSound('click'); setCookieConsent(true); }}
                    className="px-6 py-2 bg-clGold text-black text-[10px] tracking-widest uppercase rounded-full hover:bg-white transition-all font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    {t('cookies.accept')}
                  </button>
                </div>
                <button 
                  onClick={() => { playSound('click'); setCookieConsent(false); }}
                  className="text-gray-600 hover:text-white transition-colors"
                >✕</button>
              </div>
            ) : (
              /* Detailed Settings Modal Layout */
              <div className="flex flex-col h-full max-h-[80vh]">
                <div className="p-8 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-clGold font-serif text-xl tracking-[0.3em] uppercase">{t('cookies.modalTitle')}</h3>
                  <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-white">✕</button>
                </div>

                <div className="p-8 overflow-y-auto space-y-8 scrollbar-thin">
                  {[
                    { id: 'essential', label: t('cookies.essential'), desc: t('cookies.essentialDesc'), required: true },
                    { id: 'experience', label: t('cookies.experience'), desc: t('cookies.experienceDesc'), required: false },
                    { id: 'analytics', label: t('cookies.analytics'), desc: t('cookies.analyticsDesc'), required: false }
                  ].map(c => (
                    <div key={c.id} className="flex items-start justify-between gap-6 p-6 border border-white/5 bg-white/5 rounded-xl">
                      <div className="space-y-1">
                        <h5 className="text-clChrome tracking-widest text-sm uppercase">{c.label}</h5>
                        <p className="text-xs text-gray-500 font-light">{c.desc}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-all ${c.required ? 'bg-clGold/50 cursor-not-allowed' : 'bg-white/10 cursor-pointer'}`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all ${c.required ? 'translate-x-6 bg-clGold shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-8 border-t border-white/10 bg-black/40 flex justify-end gap-4">
                   <button 
                    onClick={() => { playSound('click'); setCookieConsent(true); setShowSettings(false); }}
                    className="px-8 py-3 bg-clGold text-black text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all font-bold"
                  >
                    {t('cookies.save')}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
