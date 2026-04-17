import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SovereignState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isAgentOpen: boolean;
  toggleAgent: () => void;
  isMediaHubOpen: boolean;
  setMediaHubOpen: (v: boolean) => void;
  isVaultUnlocked: boolean;
  unlockVault: (key: string) => boolean;
  isGlobalLoupeActive: boolean;
  toggleGlobalLoupe: () => void;
  isVoiceConsoleActive: boolean;
  setVoiceConsoleActive: (v: boolean) => void;
}

const SovereignContext = createContext<SovereignState | undefined>(undefined);

export function SovereignProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isMediaHubOpen, setMediaHubOpen] = useState(false);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [isGlobalLoupeActive, setIsGlobalLoupeActive] = useState(false);
  const [isVoiceConsoleActive, setVoiceConsoleActive] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleAgent = () => setIsAgentOpen(prev => !prev);
  const toggleGlobalLoupe = () => setIsGlobalLoupeActive(prev => !prev);

  const unlockVault = (key: string) => {
    if (key.toLowerCase() === 'digital key') {
      setIsVaultUnlocked(true);
      return true;
    }
    return false;
  };

  return (
    <SovereignContext.Provider value={{
      isSidebarOpen, toggleSidebar,
      isAgentOpen, toggleAgent,
      isMediaHubOpen, setMediaHubOpen,
      isVaultUnlocked, unlockVault,
      isGlobalLoupeActive, toggleGlobalLoupe,
      isVoiceConsoleActive, setVoiceConsoleActive
    }}>
      {children}
    </SovereignContext.Provider>
  );
}

export function useSovereign() {
  const context = useContext(SovereignContext);
  if (context === undefined) {
    throw new Error('useSovereign must be used within a SovereignProvider');
  }
  return context;
}
