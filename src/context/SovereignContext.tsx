import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';
import { translations, type Language } from '../translations';

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
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

export const SovereignContext = createContext<SovereignState | undefined>(undefined);

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

  // Language State (Defaults to English as per user request)
  const [language, setLanguage] = useState<Language>('en');

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

  // Sync language with DOM for SEO and Browser Auto-Translate prevention
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleAgent = () => setIsAgentOpen(prev => !prev);
  const toggleGlobalLoupe = () => setIsGlobalLoupeActive(prev => !prev);

  // Simple Translation Helper
  const t = (path: string): string => {
    const keys = path.split('.');
    let result: any = translations[language];
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path; // Fallback to path string if not found
      }
    }
    return typeof result === 'string' ? result : path;
  };

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
      isAdminAuthenticated, setAdminAuthenticated, adminSession,
      language, setLanguage, t
    }}>
      {children}
    </SovereignContext.Provider>
  );
}
