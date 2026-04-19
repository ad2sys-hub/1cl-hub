import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

export default function IntelligentAgent() {
  const { isAgentOpen, toggleAgent, toggleSidebar, language, t } = useSovereign();
  const { playSound } = useSound();
  const [sizeMode, setSizeMode] = useState<'small' | 'medium' | 'middle' | 'full'>('medium');
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

  // Size Configuration Mapping
  const sizeStyles = {
    small: "bottom-44 right-10 w-[350px] h-[500px]",
    medium: "bottom-44 right-10 w-[550px] max-h-[min(750px,82vh)] h-[750px]",
    middle: "bottom-10 right-10 w-[900px] h-[85vh]",
    full: "top-[2vh] right-[1vw] w-[98vw] h-[96vh]"
  };

  const handleSend = () => {
    // ... same logic ...
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
          setMessages(prev => [...prev, { text: t('agent.accessVault'), sender: 'ai' }]);
          navigate('/');
          setTimeout(() => document.getElementById("vaultPortal")?.scrollIntoView({ behavior: 'smooth' }), 500);
          found = true;
      } else if (lower.includes(mapping.logistics[language])) {
          setMessages(prev => [...prev, { text: t('agent.openLogistics'), sender: 'ai' }]);
          toggleSidebar();
          found = true;
      } else if (lower.includes(mapping.map[language])) {
          setMessages(prev => [...prev, { text: t('agent.initMap'), sender: 'ai' }]);
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
          setMessages(prev => [...prev, { text: t('agent.redirectArchive'), sender: 'ai' }]);
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
        className="fixed bottom-24 right-10 px-6 h-12 bg-clDarkGrey/90 backdrop-blur-md rounded-full border-2 border-clGold shadow-[0_0_40px_rgba(212,175,55,0.5)] flex items-center justify-center cursor-pointer z-[100] hover:bg-clGold/30 transition-all hologram-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => playSound('hover')}
        onClick={() => {
          playSound('click');
          toggleAgent();
        }}
      >
        <span className="text-xs font-serif text-clGold tracking-[0.2em] glitch-text">1CL-AGENT</span>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isAgentOpen && (
          <motion.div
            layout
            className={`fixed ${sizeStyles[sizeMode]} bg-clBlack/95 backdrop-blur-3xl border border-clGold/30 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.9)] z-[110] overflow-hidden flex flex-col hologram-container ring-1 ring-clGold/20 transition-all duration-300 ease-in-out`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            {/* Sync Scanline for Agent */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-clGold/30 animate-pulse scanline h-10 opacity-10" />

            {/* Header */}
            <div className="bg-black/50 p-4 border-b border-clGold/30 flex justify-between items-center relative z-10">
              <div className="flex flex-col">
                <h4 className="text-clGold font-serif text-sm glitch-text tracking-widest">1CL SOVEREIGN AGENT</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{t('agent.connectedEMS')}</p>
              </div>

              <div className="flex items-center gap-3">
                {/* Size Controls */}
                <div className="flex bg-white/5 rounded-lg border border-white/10 p-1 mr-2">
                  {(['small', 'medium', 'middle', 'full'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => { playSound('hover'); setSizeMode(m); }}
                      className={`text-[10px] px-2 py-1 rounded transition-colors ${sizeMode === m ? 'bg-clGold text-black font-bold' : 'text-gray-500 hover:text-white'}`}
                    >
                      {m.toUpperCase().charAt(0)}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    playSound('click');
                    toggleAgent();
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-lg"
                >✕</button>
              </div>
            </div>

            {/* Body */}
            <div ref={chatBodyRef} className="p-8 h-full overflow-y-auto space-y-6 relative z-10 scrollbar-thin scrollbar-thumb-clGold/40 flex-grow font-light">
              {messages.map((m, i) => (
                <div key={i} className={`text-sm p-4 rounded-lg max-w-[85%] ${m.sender === 'ai' ? 'bg-clGold/5 text-gray-300 border border-clGold/20 self-start mr-auto relative after:content-[""] after:w-1 after:h-full after:bg-clGold after:absolute after:left-0 after:top-0' : 'bg-white/5 text-white self-end ml-auto text-right border border-white/5'}`}>
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
            <div className="p-4 border-t border-white/10 bg-black flex gap-3 relative z-10">
              <input 
                type="text" 
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t('agent.placeholder')}
                className="flex-grow bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none px-4 py-2 focus:border-clGold/50 transition-colors"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-clGold/30 rounded-xl text-clGold transition-all border border-white/10"
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
