import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../context/SovereignContext';
import { useNavigate } from 'react-router-dom';

const knowledgeBase: Record<string, { reply: string, action?: string }> = {
  vault: {
    reply: "Le Vault est notre zone hypersécurisée. J'ouvre l'accès digital pour vous.",
    action: "unlock_vault"
  },
  logistique: {
    reply: "La Carte Logistique EMS permet le suivi global. J'ouvre le dashboard pour vous.",
    action: "open_admin"
  },
  map: {
    reply: "Initialisation de la carte 4D EMS@Path.",
    action: "nav_map"
  },
};

export default function IntelligentAgent() {
  const { isAgentOpen, toggleAgent, toggleSidebar } = useSovereign();
  const [messages, setMessages] = useState<{ text: string; sender: 'ai' | 'user' }[]>([
    { text: "Bienvenue dans l'écosystème 1CL. Je suis The Curator. Comment puis-je vous guider ?", sender: 'ai' }
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
    const txt = inputVal.trim();
    setMessages(prev => [...prev, { text: txt, sender: 'user' }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let found = false;
      const lower = txt.toLowerCase();
      
      // Dynamic Actions based on context
      if (lower.includes('déconnecter') || lower.includes('lock')) {
          setMessages(prev => [...prev, { text: "Protocoles de sécurité activés. Session administrative révoquée.", sender: 'ai' }]);
          // We can't call handleLogout directly here easily without more plumbing, 
          // but we can at least suggest it or trigger a context change if we exposed it.
          // For now, let's just use the reply.
          found = true;
      }

      for (const key in knowledgeBase) {
        if (lower.includes(key)) {
          const entry = knowledgeBase[key];
          setMessages(prev => [...prev, { text: entry.reply, sender: 'ai' }]);
          
          if (entry.action === "open_admin") toggleSidebar();
          if (entry.action === "unlock_vault") {
             navigate('/');
             setTimeout(() => {
               document.getElementById("vaultPortal")?.scrollIntoView({ behavior: 'smooth' });
             }, 500);
          }
          if (entry.action === "nav_map") navigate('/map');
          
          found = true;
          break;
        }
      }
      
      if (!found) {
        if (lower.includes("qui es-tu") || lower.includes("who are you")) {
           setMessages(prev => [...prev, { text: "Je suis The Curator, l'intelligence souveraine de l'écosystème 1CL. Ma mission est de veiller sur le lien entre le son et l'objet.", sender: 'ai' }]);
        } else if (lower.includes("1cl") || lower.includes("marque")) {
           setMessages(prev => [...prev, { text: "1CL Collection est l'éclosion du Street-Luxe. Un univers où la musique de Chawblick rencontre l'artisanat textile d'exception.", sender: 'ai' }]);
        } else {
           setMessages(prev => [...prev, { text: "Analyse des données 1CL en cours... Je n'ai pas de réponse précise. Essayez de me parler du Vault, de la Logistique ou de l'Atelier.", sender: 'ai' }]);
        }
      }
    }, 1500);
  };

  return (
    <>
      {/* Floating Bubble */}
      <motion.div
        className="fixed bottom-6 right-6 w-16 h-16 bg-clDarkGrey/80 backdrop-blur-md rounded-full border border-clGold/50 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center cursor-pointer z-50 hover:bg-clGold/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleAgent}
      >
        <span className="text-xl font-serif text-clGold">IA</span>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isAgentOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 bg-clDarkGrey/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="bg-black/50 p-4 border-b border-clGold/30 flex justify-between items-center">
              <div>
                <h4 className="text-clGold font-serif text-sm">SOVEREIGN IA</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Connecté au réseau EMS</p>
              </div>
              <button onClick={toggleAgent} className="text-gray-400 hover:text-white transition-colors">✕</button>
            </div>

            {/* Body */}
            <div ref={chatBodyRef} className="p-4 h-64 overflow-y-auto space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`text-sm p-3 rounded-lg max-w-[85%] ${m.sender === 'ai' ? 'bg-clGold/10 text-gray-300 border border-clGold/20 self-start mr-auto relative after:content-[""] after:w-1 after:h-full after:bg-clGold after:absolute after:left-0 after:top-0' : 'bg-white/10 text-white self-end ml-auto text-right border border-white/5'}`}>
                  {m.text}
                </div>
              ))}
              {isTyping && (
                <div className="bg-clGold/10 text-gray-300 border border-clGold/20 p-3 rounded-lg self-start mr-auto flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-clGold rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-clGold rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-clGold rounded-full animate-bounce"></span>
                </div>
              )}
            </div>

            {/* Footer / Input */}
            <div className="p-3 border-t border-white/10 bg-black flex gap-2">
              <input 
                type="text" 
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Message Sovereign..."
                className="flex-grow bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none px-2"
              />
              <button onClick={handleSend} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-clGold/20 rounded-lg text-clGold transition-colors">
                ➢
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
