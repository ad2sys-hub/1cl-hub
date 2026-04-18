import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { ChevronDown, Shield, Database, Zap, UserCheck, type LucideIcon } from 'lucide-react';

interface FAQEntry {
  id: string;
  icon: LucideIcon;
  category: { en: string; fr: string };
  question: { en: string; fr: string };
  answer: { en: string; fr: string };
}

const faqData: FAQEntry[] = [
  {
    id: 'sovereign-link',
    icon: Zap,
    category: { en: 'Infrastructure', fr: 'Infrastructure' },
    question: { en: 'What is the Sovereign Link?', fr: "Qu'est-ce que le Sovereign Link ?" },
    answer: { 
      en: 'The Sovereign Link is a secure bridge between our frontend interface and the MongoDB Data API. It uses Supabase Edge Functions to ensure that sensitive API keys are never exposed to the client browser, maintaining a Zero-Trust architecture.',
      fr: "Le Sovereign Link est un pont sécurisé entre notre interface frontend et l'API MongoDB. Il utilise les Edge Functions de Supabase pour garantir que les clés API sensibles ne sont jamais exposées au navigateur client, maintenant ainsi une architecture Zero-Trust."
    }
  },
  {
    id: 'iam-auth',
    icon: UserCheck,
    category: { en: 'Security', fr: 'Sécurité' },
    question: { en: 'How is administrative access secured?', fr: "Comment l'accès administratif est-il sécurisé ?" },
    answer: { 
      en: 'We utilize Supabase IAM (Identity and Access Management) with optional 2FA. Every administrative session is cryptographically verified against our private database records before the EMS dashboard is unlocked.',
      fr: "Nous utilisons Supabase IAM (Identity and Access Management) avec 2FA optionnelle. Chaque session administrative est vérifiée de manière cryptographique par rapport à nos enregistrements privés avant que le dashboard EMS ne soit déverrouillé."
    }
  },
  {
    id: 'mongodb-sync',
    icon: Database,
    category: { en: 'Data', fr: 'Données' },
    question: { en: 'How does the MongoDB synchronization work?', fr: "Comment fonctionne la synchronisation MongoDB ?" },
    answer: { 
      en: 'When the "Force Sync" is triggered, a payload is sent to our Deno Edge Function. This serverless microservice validates the session, encrypts the log entry, and pushes it to the MongoDB Global Cluster via the Data API bridge.',
      fr: "Lorsque la 'Force Sync' est déclenchée, une charge utile est envoyée à notre Edge Function Deno. Ce microservice serverless valide la session, chiffre l'entrée de log et la pousse vers le Cluster Global MongoDB via le pont Data API."
    }
  },
  {
    id: 'system-audit',
    icon: Shield,
    category: { en: 'Monitoring', fr: 'Monitoring' },
    question: { en: 'Where can I find the system audit logs?', fr: "Où puis-je trouver les logs d'audit du système ?" },
    answer: { 
      en: 'Full audit logs are displayable in the "Admin Sidebar" after a successful sync. For deep forensics, administrators can access the Supabase Management Console directly.',
      fr: "Les logs d'audit complets sont affichables dans la 'Sidebar Admin' après une synchronisation réussie. Pour une analyse médico-légale approfondie, les administrateurs peuvent accéder directement à la Console de Gestion Supabase."
    }
  }
];

export default function FAQPage() {
  const { language } = useSovereign();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-clGold mb-4 tracking-tighter uppercase italic">
            {language === 'en' ? 'Sovereign Knowledge' : 'Savoir Souverain'}
          </h1>
          <p className="text-gray-500 uppercase tracking-[0.4em] text-xs">
            {language === 'en' ? 'Technical Specifications & System Guide' : 'Spécifications Techniques & Guide Système'}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const Icon = item.icon;
            const isOpen = activeTab === item.id;
            
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border border-white/10 overflow-hidden transition-all duration-500 ${isOpen ? 'bg-white/5 border-clGold/30 shadow-[0_0_30px_rgba(212,175,55,0.05)]' : 'bg-transparent'}`}
              >
                <button 
                  onClick={() => setActiveTab(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${isOpen ? 'bg-clGold border-clGold text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-black/40 border-white/10 text-clGold'}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-clChrome/60 mb-1">{item.category[language]}</span>
                      <h3 className={`text-sm md:text-base font-bold uppercase tracking-widest transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                        {item.question[language]}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-gray-500"
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5"
                    >
                      <div className="p-8 text-sm md:text-base text-gray-400 leading-relaxed font-light font-sans tracking-wide">
                        {item.answer[language]}
                        
                        <div className="mt-6 flex gap-4">
                           <div className="h-px flex-grow bg-gradient-to-r from-clGold/40 to-transparent self-center"></div>
                           <span className="text-[9px] text-clGold font-mono uppercase tracking-widest">Sovereign Protocol verified</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 text-center p-8 bg-black/50 border border-white/5 rounded-sm"
        >
          <p className="text-gray-400 text-xs mb-6 italic">
            {language === 'en' 
              ? "Need deeper assistance? Our Sovereign AI Curator is available 24/7 in the bottom-right terminal."
              : "Besoin d'une assistance approfondie ? Notre IA Curator est disponible 24/7 dans le terminal en bas à droite."}
          </p>
          <div className="flex justify-center gap-8">
             <div className="text-center">
                <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2 justify-center">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                   <span className="text-[10px] text-white font-mono uppercase">Node Active</span>
                </div>
             </div>
             <div className="text-center">
                <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">Latency</p>
                <span className="text-[10px] text-white font-mono uppercase">22ms</span>
             </div>
             <div className="text-center">
                <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">Sync</p>
                <span className="text-[10px] text-white font-mono uppercase">Nominal</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
