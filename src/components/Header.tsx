import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { toggleSidebar, isVoiceConsoleActive, setVoiceConsoleActive, language, setLanguage, t } = useSovereign();
  
  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.collections'), path: '/collections' },
    { name: t('nav.philosophy'), path: '/philosophy' },
    { name: t('nav.sponsors'), path: '/sponsors' },
    { name: t('nav.map'), path: '/map' },
    { name: t('nav.faq'), path: '/faq' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-panel">
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
                className={`text-[10px] lg:text-xs tracking-widest uppercase transition-all duration-300 ${location.pathname === link.path ? 'text-clGold text-shadow-gold' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center bg-black/30 border border-white/10 rounded-sm overflow-hidden text-[9px] font-mono tracking-tighter">
               <button 
                 onClick={() => setLanguage('en')}
                 className={`px-2 py-1 transition-colors ${language === 'en' ? 'bg-clGold text-black' : 'text-gray-500 hover:text-white'}`}
               >
                 EN
               </button>
               <button 
                 onClick={() => setLanguage('fr')}
                 className={`px-2 py-1 transition-colors ${language === 'fr' ? 'bg-clGold text-black' : 'text-gray-500 hover:text-white'}`}
               >
                 FR
               </button>
            </div>

            <button 
               onClick={toggleSidebar} 
               className="border border-clGold/50 text-clGold hover:bg-clGold hover:text-black transition-colors px-3 py-1 text-[10px] tracking-widest uppercase font-bold"
            >
              {t('nav.admin')}
            </button>
            <button 
               onClick={() => setVoiceConsoleActive(!isVoiceConsoleActive)} 
               className={`text-lg transition-colors ${isVoiceConsoleActive ? 'text-clGold animate-pulse' : 'text-gray-500 hover:text-white'}`}
               title="Toggle Voice Commands"
            >
              🎙
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center bg-black/30 border border-white/10 rounded-sm overflow-hidden text-[9px]">
               <button onClick={() => setLanguage('en')} className={`px-2 py-1 ${language === 'en' ? 'bg-clGold text-black' : 'text-gray-500'}`}>EN</button>
               <button onClick={() => setLanguage('fr')} className={`px-2 py-1 ${language === 'fr' ? 'bg-clGold text-black' : 'text-gray-500'}`}>FR</button>
            </div>
            <button 
               onClick={() => setVoiceConsoleActive(!isVoiceConsoleActive)} 
               className={`text-xl transition-colors ${isVoiceConsoleActive ? 'text-clGold animate-pulse' : 'text-gray-500 hover:text-white'}`}
            >
              🎙
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
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
                  <span className={location.pathname === link.path ? 'text-clGold' : 'text-gray-300'}>{link.name}</span>
                </Link>
              ))}
              <button 
                onClick={() => { toggleSidebar(); setIsOpen(false); }}
                className="text-clGold uppercase tracking-[0.2em] text-sm py-3 font-bold"
              >
                {t('nav.admin')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
