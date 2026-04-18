import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

export default function IntelligentAgent() {
  const { isAgentOpen, toggleAgent, toggleSidebar, language, t } = useSovereign();
  const { playSound } = useSound();
  const [messages, setMessages] = useState<{ text: string; sender: 'ai' | 'user' }[]>(() => [
    { text: t('agent.welcome'), sender: 'ai' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputVal.trim()) return;
    playSound('click');
    const txt = inputVal.trim();
    setMessages(prev => [...prev, { text: txt, sender: 'user' }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let found = false;
      const lower = txt.toLowerCase();
      
      // Keywords mapping for both languages
      const mapping = {
          vault: { en: "vault", fr: "vault" },
          logistics: { en: "logistics", fr: "logistique" },
          map: { en: "map", fr: "carte" },
          iam: { en: "iam", fr: "iam" },
          link: { en: "sovereign", fr: "sovereign" },
          who: { en: "who", fr: "qui" },
          brand: { en: "1cl", fr: "1cl" },
          lock: { en: "lock", fr: "déconnecter" },
          collection: { en: "collection", fr: "collection" },
          clothes: { en: "clothes", fr: "vêtement" }
      };

      if (lower.includes(mapping.lock[language])) {
          setMessages(prev => [...prev, { text: t('agent.deconnect'), sender: 'ai' }]);
          found = true;
      } else if (lower.includes(mapping.vault[language])) {
          setMessages(prev => [...prev, { text: language === 'en' ? "Accessing the Vault digital gate..." : "Accès au portail digital du Vault...", sender: 'ai' }]);
          navigate('/');
          setTimeout(() => document.getElementById("vaultPortal")?.scrollIntoView({ behavior: 'smooth' }), 500);
          found = true;
      } else if (lower.includes(mapping.logistics[language])) {
          setMessages(prev => [...prev, { text: language === 'en' ? "Opening EMS Logistics center." : "Ouverture du centre logistique EMS.", sender: 'ai' }]);
          toggleSidebar();
          found = true;
      } else if (lower.includes(mapping.map[language])) {
          setMessages(prev => [...prev, { text: language === 'en' ? "Initializing 4D Path Map..." : "Initialisation de la carte 4D...", sender: 'ai' }]);
          navigate('/map');
          found = true;
      } else if (lower.includes(mapping.link[language])) {
          setMessages(prev => [...prev, { text: t('agent.sovereignLink'), sender: 'ai' }]);
          found = true;
      } else if (lower.includes(mapping.iam[language])) {
          setMessages(prev => [...prev, { text: t('agent.iam'), sender: 'ai' }]);
          found = true;
      } else if (lower.includes(mapping.who[language])) {
          setMessages(prev => [...prev, { text: t('agent.whoAreYou'), sender: 'ai' }]);
          found = true;
      } else if (lower.includes(mapping.brand[language])) {
          setMessages(prev => [...prev, { text: t('agent.whatIs1CL'), sender: 'ai' }]);
          found = true;
      } else if (lower.includes(mapping.collection[language]) || lower.includes("archive") || lower.includes(mapping.clothes[language])) {
          setMessages(prev => [...prev, { text: language === 'en' 
            ? "The 1CL Archive is structured into three paradigms: Essentials (Core), Heritage (Legacy), and Workshop Edition (Technical). Redirecting to the catalog..." 
            : "L'Archive 1CL est structurée en trois paradigmes : Essentials (Base), Heritage (Héritage), et Workshop Edition (Technique). Redirection vers le catalogue...", sender: 'ai' }]);
          setTimeout(() => navigate('/collections'), 2000);
          found = true;
      }
      
      if (!found) {
        setMessages(prev => [...prev, { text: t('agent.unknown'), sender: 'ai' }]);
      }
    }, 1500);
  };

  return (
    <>
      {/* Floating Bubble */}
      <motion.div
        className="fixed bottom-6 right-6 w-16 h-16 bg-clDarkGrey/80 backdrop-blur-md rounded-full border border-clGold/50 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center cursor-pointer z-50 hover:bg-clGold/20 transition-colors hologram-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => playSound('hover')}
        onClick={() => {
          playSound('click');
          toggleAgent();
        }}
      >
        <span className="text-xl font-serif text-clGold glitch-text">IA</span>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isAgentOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 bg-clDarkGrey/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col hologram-container"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Sync Scanline for Agent */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-clGold/30 animate-pulse scanline h-10 opacity-10" />

            {/* Header */}
            <div className="bg-black/50 p-4 border-b border-clGold/30 flex justify-between items-center relative z-10">
              <div>
                <h4 className="text-clGold font-serif text-sm glitch-text">SOVEREIGN IA</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{language === 'en' ? 'CONNECTED TO EMS NET' : 'CONNECTÉ AU RÉSEAU EMS'}</p>
              </div>
              <button 
                onClick={() => {
                  playSound('click');
                  toggleAgent();
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >✕</button>
            </div>

            {/* Body */}
            <div ref={chatBodyRef} className="p-4 h-64 overflow-y-auto space-y-4 relative z-10">
              {messages.map((m, i) => (
                <div key={i} className={`text-sm p-3 rounded-lg max-w-[85%] ${m.sender === 'ai' ? 'bg-clGold/5 text-gray-300 border border-clGold/20 self-start mr-auto relative after:content-[""] after:w-1 after:h-full after:bg-clGold after:absolute after:left-0 after:top-0 h-auto' : 'bg-white/5 text-white self-end ml-auto text-right border border-white/5'}`}>
                  {m.text}
                </div>
              ))}
              {isTyping && (
                <div className="bg-clGold/5 text-gray-300 border border-clGold/20 p-3 rounded-lg self-start mr-auto flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-clGold rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-clGold rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-clGold rounded-full animate-bounce"></span>
                </div>
              )}
            </div>

            {/* Footer / Input */}
            <div className="p-3 border-t border-white/10 bg-black flex gap-2 relative z-10">
              <input 
                type="text" 
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t('agent.placeholder')}
                className="flex-grow bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none px-2"
              />
              <button 
                onClick={handleSend}
                className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-clGold/20 rounded-lg text-clGold transition-colors"
                onMouseEnter={() => playSound('hover')}
              >
                ➢
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
