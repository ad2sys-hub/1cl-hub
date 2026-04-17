import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hexagon } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'Philosophy', path: '/philosophy' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'EMS@Path 4D', path: '/map' }
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
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`text-sm tracking-widest uppercase transition-all duration-300 ${location.pathname === link.path ? 'text-clGold text-shadow-gold' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-base uppercase tracking-widest text-center py-3 border-b border-white/5 active:bg-white/5"
                >
                  <span className={location.pathname === link.path ? 'text-clGold' : 'text-gray-300'}>{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
