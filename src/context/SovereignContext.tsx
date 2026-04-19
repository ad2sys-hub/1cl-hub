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
  // Accessibility & Compliance
  accessibilityMode: boolean;
  toggleAccessibility: () => void;
  cookieConsent: boolean | null;
  setCookieConsent: (v: boolean) => void;
}

export const SovereignContext = createContext<SovereignState | undefined>(undefined);

export function SovereignProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isMediaHubOpen, setMediaHubOpen] = useState(false);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [isGlobalLoupeActive, setIsGlobalLoupeActive] = useState(false);
  const [isVoiceConsoleActive, setVoiceConsoleActive] = useState(false);
  
  // Compliance & Accessibility States
  const [accessibilityMode, setAccessibilityMode] = useState<boolean>(() => {
    return localStorage.getItem('sovereign_access') === 'true';
  });
  const [cookieConsent, setCookieConsentState] = useState<boolean | null>(() => {
    const saved = localStorage.getItem('sovereign_cookies');
    return saved === null ? null : saved === 'true';
  });

  // Real Auth Flags
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminSession, setAdminSession] = useState<Session | null>(null);

  // Language State with persistence
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('sovereign_lang');
    return (saved === 'fr' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('sovereign_lang', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('sovereign_access', accessibilityMode.toString());
    if (accessibilityMode) {
      document.documentElement.classList.add('cl-accessibility-mode');
    } else {
      document.documentElement.classList.remove('cl-accessibility-mode');
    }
  }, [accessibilityMode]);

  const setCookieConsent = (v: boolean) => {
    localStorage.setItem('sovereign_cookies', v.toString());
    setCookieConsentState(v);
  };

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAdminSession(session);
      if (session) setAdminAuthenticated(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminSession(session);
      setAdminAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleAgent = () => setIsAgentOpen(prev => !prev);
  const toggleGlobalLoupe = () => setIsGlobalLoupeActive(prev => !prev);
  const toggleAccessibility = () => setAccessibilityMode(prev => !prev);

  // Robust Translation Helper
  const t = (path: string): string => {
    const keys = path.split('.');
    let result: any = translations[language];
    
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path; 
      }
    }
    
    return typeof result === 'string' ? result : path;
  };

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
      isVoiceConsoleActive, setVoiceConsoleActive,
      isAdminAuthenticated, setAdminAuthenticated, adminSession,
      language, setLanguage, t,
      accessibilityMode, toggleAccessibility,
      cookieConsent, setCookieConsent
    }}>
      {children}
    </SovereignContext.Provider>
  );
}
