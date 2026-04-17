import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';

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
  isAdminAuthenticated: boolean;
  setAdminAuthenticated: (v: boolean) => void;
  adminSession: Session | null;
}

const SovereignContext = createContext<SovereignState | undefined>(undefined);

export function SovereignProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isMediaHubOpen, setMediaHubOpen] = useState(false);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [isGlobalLoupeActive, setIsGlobalLoupeActive] = useState(false);
  const [isVoiceConsoleActive, setVoiceConsoleActive] = useState(false);
  
  // Real Auth Flags
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminSession, setAdminSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAdminSession(session);
      if (session) setAdminAuthenticated(true);
    });

    // Listen for Auth events (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminSession(session);
      setAdminAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleAgent = () => setIsAgentOpen(prev => !prev);
  const toggleGlobalLoupe = () => setIsGlobalLoupeActive(prev => !prev);

  const unlockVault = (key: string) => {
    // Fallback logic for the vault (frontend simulation)
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
      isVoiceConsoleActive, setVoiceConsoleActive,
      isAdminAuthenticated, setAdminAuthenticated, adminSession
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
