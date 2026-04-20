import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { useSound } from '../hooks/useSound';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { 
    toggleSidebar, 
    isVoiceConsoleActive, 
    setVoiceConsoleActive, 
    language, 
    setLanguage, 
    t,
    accessibilityMode,
    toggleAccessibility
  } = useSovereign();
  const { playSound } = useSound();
  
  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.collections'), path: '/collections' },
    { name: t('nav.philosophy'), path: '/philosophy' },
    { name: t('nav.sponsors'), path: '/sponsors' },
    { name: t('nav.map'), path: '/map' },
    { name: 'EMS@DTS MATRIX', path: '/dts' },
    { name: t('nav.faq'), path: '/faq' }
  ];



  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <img src="/1cl-hub/images/Logos/logo CL v.1.gold.png" className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 group-hover:opacity-0" alt="1CL Gold" />
              <img src="/1cl-hub/images/Logos/logo CL v.1.chrome.png" className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100" alt="1CL Chrome" />
            </div>
            <span className="font-serif text-xl tracking-widest text-[#D4AF37] group-hover:text-[#C0C0C0] transition-colors">1CL</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-[10px] lg:text-xs tracking-widest uppercase transition-all duration-300 ${location.pathname === link.path ? 'text-clGold text-shadow-gold font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1 gap-4">
              {/* Accessibility Toggle */}
              <button 
                onClick={() => { playSound('click'); toggleAccessibility(); }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${accessibilityMode ? 'bg-clGold text-black' : 'text-gray-500 hover:text-white border border-white/5'}`}
                title="Toggle Accessibility Protocol"
                aria-label="Toggle Accessibility Protocol"
              >
                [A]
              </button>

              <div className="flex gap-2 border-l border-white/10 pl-4">
                <button 
                  onClick={() => { playSound('click'); setLanguage('en'); }}
                  className={`text-[10px] tracking-widest transition-all ${language === 'en' ? 'text-clGold font-bold' : 'text-gray-400 hover:text-white'}`}
                  aria-label="Switch to English"
                >EN</button>
                <button 
                  onClick={() => { playSound('click'); setLanguage('fr'); }}
                  className={`text-[10px] tracking-widest transition-all ${language === 'fr' ? 'text-clGold font-bold' : 'text-gray-400 hover:text-white'}`}
                  aria-label="Passer en Français"
                >FR</button>
              </div>
            </div>

            <button 
               onClick={() => { playSound('click'); toggleSidebar(); }} 
               className="border border-clGold/50 text-clGold hover:bg-clGold hover:text-black transition-all duration-300 px-4 py-1 text-[10px] tracking-widest uppercase font-bold hologram-glow"
               aria-label="Open Admin Portal"
            >
              {t('nav.admin')}
            </button>
            <button 
               onClick={() => { playSound('click'); setVoiceConsoleActive(!isVoiceConsoleActive); }} 
               className={`text-lg transition-colors ${isVoiceConsoleActive ? 'text-clGold animate-pulse' : 'text-gray-500 hover:text-white'}`}
               title="Toggle Voice Commands"
               aria-label="Toggle Voice Commands"
            >
              🎙
            </button>
          </div>

          {/* Mobile Menu Button & Action Group */}
            <div className="flex items-center gap-3">


            <div className="flex items-center bg-black/30 border border-white/10 rounded-sm overflow-hidden text-[9px]">
               <button onClick={() => { playSound('click'); setLanguage('en'); }} className={`px-2 py-1 ${language === 'en' ? 'bg-clGold text-black' : 'text-gray-500'}`}>EN</button>
               <button onClick={() => { playSound('click'); setLanguage('fr'); }} className={`px-2 py-1 ${language === 'fr' ? 'bg-clGold text-black' : 'text-gray-500'}`}>FR</button>
            </div>
            
            <button onClick={() => { playSound('click'); setIsOpen(!isOpen); }} className="text-gray-300 hover:text-white focus:outline-none ml-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-clDarkGrey/95 backdrop-blur-xl border-t border-clChrome/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-base uppercase tracking-widest text-center py-3 border-b border-white/5 active:bg-white/5"
                >
                  <span className={location.pathname === link.path ? 'text-clGold font-bold' : 'text-gray-300'}>{link.name}</span>
                </Link>
              ))}
              <div className="flex flex-col gap-3 py-4">
                <button 
                  onClick={() => { playSound('click'); toggleSidebar(); setIsOpen(false); }}
                  className="text-clGold uppercase tracking-[0.2em] text-sm py-3 font-bold border border-clGold/30 rounded-lg bg-clGold/5"
                >
                  {t('nav.admin')}
                </button>
                <div className="flex justify-center gap-6 text-gray-400">
                    <button onClick={() => { playSound('click'); setVoiceConsoleActive(!isVoiceConsoleActive); }} className={isVoiceConsoleActive ? 'text-clGold' : ''}>🎙 {t('nav.voice') || 'Voice'}</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
