import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedLine from '../components/AnimatedLine';

// Overlays
import IntelligentAgent from '../components/IntelligentAgent';
import MediaHub from '../components/MediaHub';
import VoiceConsole from '../components/VoiceConsole';
import GlobalLoupe from '../components/GlobalLoupe';
import SidebarEMS from '../components/SidebarEMS';
import ContractModal from '../components/ContractModal';
import CookieConsent from '../components/CookieConsent';
import { useSovereign } from '../hooks/useSovereign';

export default function MainLayout() {
  const { language } = useSovereign();
  const [isContractOpen, setIsContractOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-clBlack text-white w-full">
      <AnimatedLine />
      <Header />
      
      {/* Sovereignty Overlays */}
      <GlobalLoupe />
      <VoiceConsole />
      <IntelligentAgent key={language} />
      <MediaHub />
      <SidebarEMS openContractForge={() => setIsContractOpen(true)} />
      <ContractModal isOpen={isContractOpen} onClose={() => setIsContractOpen(false)} />
      <CookieConsent />

      <main className="flex-grow w-full relative overflow-hidden accessibility-inherit">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <Outlet />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
