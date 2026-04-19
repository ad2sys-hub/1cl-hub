import { useEffect, useState } from 'react';
import { useSovereign } from '../hooks/useSovereign';
import { motion, AnimatePresence } from 'framer-motion';

export default function VoiceConsole() {
  const { isVoiceConsoleActive, toggleAgent, toggleSidebar, setMediaHubOpen, unlockVault, language, t } = useSovereign();
  const [displayText, setDisplayText] = useState(t('voice.listening'));
  
  useEffect(() => {
    // Only initialize if supported and active
    if (!isVoiceConsoleActive) return;

    // Type casting for webkit speech
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setDisplayText(t('voice.notSupported'));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = language === 'fr' ? 'fr-FR' : 'en-US';

    recognition.onresult = (e: any) => {
      const cmd = e.results[e.results.length - 1][0].transcript.toLowerCase() as string;
      setDisplayText(`${t('voice.executing')} ${cmd.toUpperCase()}`);
      
      // Smart Bridge mapping to Context
      if (cmd.includes('aide') || cmd.includes('help')) {
        toggleAgent();
      }
      if (cmd.includes('admin') || cmd.includes('gestion')) {
        toggleSidebar();
      }
      if (cmd.includes('musique') || cmd.includes('media') || cmd.includes('music')) {
        setMediaHubOpen(true);
      }
      if (cmd.includes('vault') || cmd.includes('coffre')) {
        unlockVault("digital key");
      }

      setTimeout(() => {
        setDisplayText(t('voice.listening'));
      }, 3000);
    };

    recognition.onerror = () => {
       setDisplayText(t('voice.signalLost'));
       setTimeout(() => { setDisplayText(t('voice.listening')); }, 1500);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isVoiceConsoleActive, language, toggleAgent, toggleSidebar, setMediaHubOpen, unlockVault, t]);

  return (
    <AnimatePresence>
      {isVoiceConsoleActive && (
        <motion.div 
          className="fixed top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/80 border border-clGold/30 backdrop-blur-sm px-6 py-2 rounded-full z-50 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
           <div className="w-2 h-2 bg-clGold rounded-full animate-ping" />
           <span className="text-[10px] tracking-widest text-clGold font-bold uppercase">{displayText}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
