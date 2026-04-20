import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../hooks/useSound';
import { GripHorizontal, Zap, Settings, Type, ChevronDown, Layers, Box, CreditCard } from 'lucide-react';

export default function IntelligentAgent() {
  const { isAgentOpen, toggleAgent, toggleSidebar, language, t, accessibilityMode, toggleAccessibility, userData, updateUserData, isProfileConfigured, setProfileConfigured, agentMode, setAgentMode } = useSovereign();
  const { playSound } = useSound();
  const dragControls = useDragControls();
  const [sizeMode, setSizeMode] = useState<'small' | 'medium' | 'middle' | 'full'>('medium');
  const [isModeMenuOpen, setModeMenuOpen] = useState(false);
  const [isSubModeMenuOpen, setSubModeMenuOpen] = useState(false);
  const [profilingStep, setProfilingStep] = useState(0);
  const [interactions, setInteractions] = useState(userData.interactions || 0);
  const [subMode, setSubMode] = useState<'normal' | 'moovie' | 'mute' | 'guide'>('normal');

  const [messages, setMessages] = useState<{ text: string; sender: 'ai' | 'user' }[]>(() => [
    { text: t('dts.agent.welcome'), sender: 'ai' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // TTS Helper
  const speak = useCallback((text: string) => {
    if (subMode === 'mute') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }, [language, subMode]);

  // Size Configuration Mapping
  const sizeStyles = {
    small: "bottom-40 right-4 md:right-10 w-[min(90vw,350px)] h-[min(500px,70vh)]",
    medium: "bottom-40 right-4 md:right-10 w-[min(90vw,550px)] h-[min(750px,80vh)]",
    middle: "bottom-40 right-4 md:right-10 w-[min(95vw,900px)] h-[85vh]",
    full: "top-0 left-0 w-full h-full rounded-none"
  };

  // Initial Profiling Trigger
  useEffect(() => {
    if (isAgentOpen && !isProfileConfigured && profilingStep === 0) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const welcomeMsg = t('agent.profile.welcome');
          setMessages(prev => [...prev, { text: welcomeMsg, sender: 'ai' }]);
          setMessages(prev => [...prev, { text: t('agent.profile.q1'), sender: 'ai' }]);
          speak(welcomeMsg);
          setProfilingStep(1);
        }, 1500);
      }, 1000);
    }
  }, [isAgentOpen, isProfileConfigured, profilingStep, speak, t]);

  // Handle Command Logic
  const handleCommand = (text: string) => {
    const lower = text.toLowerCase().trim();
    let response = "";

    // 1. Modes de fonctionnement
    if (lower.includes('moovie')) {
        setSubMode('moovie');
        response = t('agent.responses.modeMoovie');
    } else if (lower.includes('mute')) {
        setSubMode('mute');
        response = t('agent.responses.modeMute');
    } else if (lower.includes('guide moi')) {
        setSubMode('guide');
        response = t('agent.responses.modeGuide');
    } else if (lower.includes('assiste') || lower.includes('w3c')) {
        toggleAccessibility();
        response = t('agent.responses.modeAssist');
    }

    // 2. Commandes Générales
    else if (lower.includes('tableau de bord')) {
        toggleSidebar();
        response = "Accès au Dashboard EMS accordé.";
    } else if (lower.includes('modules')) {
        navigate('/collections');
        response = "Analyse des modules du catalogue 1CL.";
    } else if (lower.includes('synchronise')) {
        response = "Synchronisation avec le lien souverain Supabase/Mongo...";
    }

    // 3. Workflow Orchestration
    else if (lower.includes('crée un workflow')) {
        response = t('agent.responses.workflowStart');
    } else if (lower.includes('ajoute une étape')) {
        response = t('agent.responses.workflowStep');
    } else if (lower.includes('connecte ce workflow')) {
        response = t('agent.responses.workflowConnect');
    }

    // 4. Modules EMS@
    else if (lower.includes('iyason')) {
        navigate('/admin');
        response = t('agent.responses.emsIyason');
    } else if (lower.includes('carrière') || lower.includes('studiopro')) {
        navigate('/contact');
        response = t('agent.responses.emsCareer');
    } else if (lower.includes('chawblickmusic') || lower.includes('billetterie')) {
        navigate('/collections');
        response = t('agent.responses.emsMusic');
    }

    // 5. Paiements
    else if (lower.includes('stripe')) {
        response = t('agent.responses.paymentStripe');
        setTimeout(() => window.open('https://stripe.com', '_blank'), 2000);
    } else if (lower.includes('paypal')) {
        response = t('agent.responses.paymentPaypal');
        setTimeout(() => window.open('https://paypal.com', '_blank'), 2000);
    }

    if (response) {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
            speak(response);
        }, 800);
        return true;
    }
    return false;
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;
    playSound('click');
    const txt = inputVal.trim();

    setMessages(prev => [...prev, { text: txt, sender: 'user' }]);
    setInputVal('');

    // Try Command First
    if (handleCommand(txt)) return;

    // Profiling Flow Logic
    if (profilingStep > 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        if (profilingStep === 1) {
          updateUserData({ codeName: txt });
          setMessages(prev => [...prev, { text: t('agent.profile.q2'), sender: 'ai' }]);
          setProfilingStep(2);
        } else if (profilingStep === 2) {
          updateUserData({ role: txt.includes('A') ? 'Access' : 'Creative' });
          if (txt.includes('A')) toggleAccessibility();
          setMessages(prev => [...prev, { text: t('agent.profile.q3'), sender: 'ai' }]);
          setProfilingStep(3);
        } else if (profilingStep === 3) {
          if (txt.includes('T')) setAgentMode('text');
          setMessages(prev => [...prev, { text: t('agent.profile.complete'), sender: 'ai' }]);
          setProfileConfigured(true);
          setProfilingStep(0);
        }
      }, 1000);
      return;
    }

    // Standard Logic Fallback
    updateUserData({ interactions: interactions + 1 });
    setInteractions(prev => prev + 1);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = t('agent.unknown');
      setMessages(prev => [...prev, { text: reply, sender: 'ai' }]);
      speak(reply);
    }, 1200);
  };

  return (
    <>
      {/* Floating Bubble */}
      <motion.div
        className={`fixed bottom-24 right-10 px-6 h-12 bg-clDarkGrey/90 backdrop-blur-md rounded-full border-2 border-clGold shadow-[0_0_40px_rgba(212,175,55,0.5)] flex items-center justify-center cursor-pointer z-[100] hover:bg-clGold/30 transition-all hologram-glow ${accessibilityMode ? 'border-white bg-black' : ''}`}
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
            drag={sizeMode !== 'full'}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            className={`fixed ${sizeStyles[sizeMode]} bg-clBlack/95 backdrop-blur-3xl border border-clGold/30 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.9)] z-[110] overflow-hidden flex flex-col hologram-container ring-1 ring-clGold/20 transition-all duration-300 ease-in-out max-h-[85vh]`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            {/* Sync Scanline for Agent */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-clGold/30 animate-pulse scanline h-10 opacity-10" />

            {/* Header / Drag Handle */}
            <div 
              onPointerDown={(e) => dragControls.start(e)}
              className={`bg-black/50 p-4 border-b border-clGold/30 flex justify-between items-center relative z-10 ${sizeMode !== 'full' ? 'cursor-move' : ''}`}
            >
              <div className="flex items-center gap-3">
                {sizeMode !== 'full' && (
                  <div className="text-clGold/30">
                    <GripHorizontal size={16} />
                  </div>
                )}
                <div className="flex flex-col">
                  <h4 className="text-clGold font-serif text-sm glitch-text tracking-widest uppercase">1CL SOVEREIGN AGENT</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest">{t('agent.connectedEMS')}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* 1. Sub-Mode Selector (Normal, Moovie, etc.) */}
                <div className="relative">
                  <button 
                    onClick={() => { playSound('click'); setSubModeMenuOpen(!isSubModeMenuOpen); }}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] text-clChrome hover:bg-white/10 transition-all"
                  >
                    <span className="font-bold tracking-widest uppercase">{subMode}</span>
                    <ChevronDown size={10} className={`transition-transform duration-300 ${isSubModeMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isSubModeMenuOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute left-0 top-full mt-2 w-40 bg-clBlack/95 border border-clGold/30 rounded-xl overflow-hidden shadow-2xl z-[120] backdrop-blur-3xl"
                      >
                        {(['normal', 'moovie', 'mute', 'guide'] as const).map(mode => (
                          <button
                            key={mode}
                            onClick={() => {
                              playSound('click');
                              setSubMode(mode);
                              setSubModeMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-start gap-3 px-4 py-3 text-[10px] tracking-widest transition-colors ${subMode === mode ? 'bg-clGold/20 text-clGold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                          >
                            {mode.toUpperCase()}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Agent Mode Selector (Auto, Manual, etc.) */}
                <div className="relative">
                  <button 
                    onClick={() => { playSound('click'); setModeMenuOpen(!isModeMenuOpen); }}
                    className="flex items-center gap-2 bg-clGold/10 border border-clGold/30 rounded-lg px-3 py-1.5 text-[10px] text-clGold hover:bg-clGold/20 transition-all"
                  >
                    {agentMode === 'auto' && <Zap size={12} className="animate-pulse" />}
                    {agentMode === 'manual' && <Settings size={12} />}
                    {agentMode === 'text' && <Type size={12} />}
                    <span className="font-bold tracking-widest">{t(`agent.modes.${agentMode}`)}</span>
                    <ChevronDown size={10} className={`transition-transform duration-300 ${isModeMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
...

                  <AnimatePresence>
                    {isModeMenuOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-40 bg-clBlack/95 border border-clGold/30 rounded-xl overflow-hidden shadow-2xl z-[120] backdrop-blur-3xl"
                      >
                        {(['auto', 'manual', 'text'] as const).map(mode => (
                          <button
                            key={mode}
                            onClick={() => {
                              playSound('click');
                              setAgentMode(mode);
                              setModeMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-widest transition-colors ${agentMode === mode ? 'bg-clGold/20 text-clGold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                          >
                            {mode === 'auto' && <Zap size={12} />}
                            {mode === 'manual' && <Settings size={12} />}
                            {mode === 'text' && <Type size={12} />}
                            {t(`agent.modes.${mode}`)}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Size Controls */}
                <div className="flex bg-white/5 rounded-lg border border-white/10 p-1 mr-2" role="group" aria-label="Agent Resizing Controls">
                  {(['small', 'medium', 'middle', 'full'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => { playSound('hover'); setSizeMode(m); }}
                      className={`text-[10px] px-2 py-1 rounded transition-colors ${sizeMode === m ? 'bg-clGold text-black font-bold' : 'text-gray-500 hover:text-white'}`}
                      aria-label={`Switch to ${m} size`}
                      aria-current={sizeMode === m ? "page" : undefined}
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
                  aria-label="Close 1CL Agent"
                >✕</button>
              </div>
            </div>

            {/* Body */}
            <div ref={chatBodyRef} className="p-8 h-full overflow-y-auto space-y-6 relative z-10 scrollbar-thin scrollbar-thumb-clGold/40 flex-grow font-light">
              
              {/* Immersive MVP Background Reel */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="w-full h-full object-cover scale-110 blur-[1.5px]"
                >
                  <source src="/1cl-hub/video/In alliance with Chawblick Music.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-clBlack via-transparent to-clBlack opacity-80" />
              </div>

              <div className="relative z-10 space-y-6">
                {messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.sender === 'ai' ? 'items-start mr-auto' : 'items-end ml-auto'} w-full`}>
                    <div className={`text-sm p-4 rounded-lg max-w-[85%] ${m.sender === 'ai' ? 'bg-clGold/10 text-gray-200 border border-clGold/20 relative after:content-[""] after:w-1 after:h-full after:bg-clGold after:absolute after:left-0 after:top-0' : 'bg-white/5 text-white text-right border border-white/5'}`}>
                      {m.text}
                    </div>
                    
                    {/* Workflow Visualizer */}
                    {m.text.includes('MPC-ANES') && m.sender === 'ai' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-black/60 border border-clGold/30 rounded-xl w-full max-w-[300px] space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-clGold/20 pb-2 mb-2">
                          <span className="text-[10px] text-clGold font-mono uppercase tracking-widest">Job Node: ANES-PROD</span>
                          <Zap size={10} className="text-clGold animate-pulse" />
                        </div>
                        <div className="space-y-2">
                          {[
                            { icon: Layers, label: 'Iyason-1CL Link', status: 'connected' },
                            { icon: Box, label: 'Terraform State', status: 'ready' },
                            { icon: CreditCard, label: 'Stripe API', status: 'pending' }
                          ].map((job, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-[10px] text-gray-400 group hover:text-white transition-colors">
                              <job.icon size={12} className="group-hover:text-clGold" />
                              <span>{job.label}</span>
                              <div className={`ml-auto w-1.5 h-1.5 rounded-full ${job.status === 'connected' ? 'bg-green-500' : job.status === 'ready' ? 'bg-clGold' : 'bg-gray-600 animate-pulse'}`} />
                            </div>
                          ))}
                        </div>
                        <button className="w-full py-2 mt-2 bg-clGold/10 hover:bg-clGold text-clGold hover:text-black text-[9px] uppercase tracking-widest font-bold border border-clGold/30 transition-all rounded">
                          Publish to Network
                        </button>
                      </motion.div>
                    )}
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
            </div>

            {/* Footer / Input */}
            <div className={`p-4 border-t border-white/10 flex gap-3 relative z-10 ${accessibilityMode ? 'bg-black border-white border-2' : 'bg-black'}`}>
              <input 
                type="text" 
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t('agent.placeholder')}
                aria-label="Agent Message Input"
                className="flex-grow bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none px-4 py-2 focus:border-clGold/50 transition-colors"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-clGold/30 rounded-xl text-clGold transition-all border border-white/10"
                onMouseEnter={() => playSound('hover')}
                aria-label="Send Message"
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
