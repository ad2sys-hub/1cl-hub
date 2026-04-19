import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { 
  ChevronDown, Shield, Database, Zap, UserCheck, 
  Navigation, GitBranch, Layers, Lock, CreditCard, Accessibility, Box,
  type LucideIcon 
} from 'lucide-react';

interface FAQEntry {
  id: string;
  icon: LucideIcon;
  category: { en: string; fr: string };
  question: { en: string; fr: string };
  answer: { en: string; fr: string };
}

const faqData: FAQEntry[] = [
  {
    id: 'nav-1',
    icon: Navigation,
    category: { en: 'Navigation', fr: 'Navigation' },
    question: { en: 'How to navigate the 4D Ecosystem?', fr: 'Comment naviguer dans l\'Écosystème 4D ?' },
    answer: { 
      en: 'Use voice commands like "1CL, open the dashboard" or "show modules". You can also use the holographic Map4D to jump between collection nodes and factory centers.',
      fr: 'Utilisez les commandes vocales comme "1CL, ouvre le tableau de bord" ou "montre les modules". Vous pouvez aussi utiliser la Carte 4D holographique pour naviguer entre les nœuds de collection.'
    }
  },
  {
    id: 'workflow-1',
    icon: GitBranch,
    category: { en: 'Workflows', fr: 'Workflows' },
    question: { en: 'How to orchestrate a new workflow?', fr: 'Comment orchestrer un nouveau workflow ?' },
    answer: { 
      en: 'Command 1CL-bot: "1CL, create a workflow". The orchestrator (MPC-ANES) will open, allowing you to connect Supabase, MongoDB, and Stripe nodes into a seamless logic chain.',
      fr: 'Commandez au bot : "1CL, crée un workflow". L\'orchestrateur (MPC-ANES) s\'ouvrira, vous permettant de connecter les nœuds Supabase, MongoDB et Stripe.'
    }
  },
  {
    id: 'ems-1',
    icon: Layers,
    category: { en: 'EMS@ Modules', fr: 'Modules EMS@' },
    question: { en: 'What are the available EMS@ modules?', fr: 'Quels sont les modules EMS@ disponibles ?' },
    answer: { 
      en: 'Primary modules include Iyason-1CL (Data Flow), MyCarriere (Professional Profiling), ChawblickMusic (Ticketing/Events), and CyberSec (Safety Audit).',
      fr: 'Les modules principaux incluent Iyason-1CL (Flux de données), MyCarrière (Profilage Pro), ChawblickMusic (Billetterie/Événements) et CyberSec (Audit de Sécurité).'
    }
  },
  {
    id: 'access-1',
    icon: Lock,
    category: { en: 'Access & IAM', fr: 'Accès & Autorisations' },
    question: { en: 'How to manage user roles?', fr: 'Comment gérer les rôles utilisateur ?' },
    answer: { 
      en: 'Use the "IAM Portal" in the admin dashboard. You can add roles, modify access levels, or revoke cryptographic keys in real-time through the Sovereign Link.',
      fr: 'Utilisez le "Portail IAM" dans le dashboard admin. Vous pouvez ajouter des rôles, modifier les niveaux d\'accès ou révoquer des clés cryptographiques en temps réel.'
    }
  },
  {
    id: 'payment-1',
    icon: CreditCard,
    category: { en: 'Payments', fr: 'Paiements' },
    question: { en: 'Is the payment gateway secure?', fr: 'Le portail de paiement est-il sécurisé ?' },
    answer: { 
      en: 'Yes. 1CL utilizes verified Stripe and PayPal redirections. No sensitive financial data is stored on our local nodes, ensuring maximum sovereignty.',
      fr: 'Oui. 1CL utilise des redirections Stripe et PayPal certifiées. Aucune donnée financière sensible n\'est stockée sur nos nœuds locaux.'
    }
  },
  {
    id: 'w3c-1',
    icon: Accessibility,
    category: { en: 'Accessibility', fr: 'Accessibilité' },
    question: { en: 'How to activate assistive modes?', fr: 'Comment activer les modes d\'assistance ?' },
    answer: { 
      en: 'System protocols: "Mode Guide" (interactive aid), "Mode Assist" (full accessibility), and "Mode Moovie" (vocal narration). Use the [A] header toggle for immediate contrast.',
      fr: 'Protocoles système : "Mode Guide" (aide interactive), "Mode Assist" (accessibilité totale) et "Mode Moovie" (narration vocale).'
    }
  },
  {
    id: 'infra-1',
    icon: Box,
    category: { en: 'Terraform / Infra', fr: 'Terraform / Infrastructure' },
    question: { en: 'How is the infrastructure deployed?', fr: 'Comment l\'infrastructure est-elle déployée ?' },
    answer: { 
      en: 'Our global architecture is defined via Terraform. 1CL-bot can check environment status, verify plan compliance, and trigger state updates via secure orchestration jobs.',
      fr: 'Notre architecture globale est définie via Terraform. 1CL-bot peut vérifier l\'état de l\'environnement et déclencher des mises à jour via des jobs d\'orchestration.'
    }
  }
];

export default function FAQPage() {
  const { t, language } = useSovereign();
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
            {t('faq.title')}
          </h1>
          <p className="text-gray-500 uppercase tracking-[0.4em] text-xs">
            {t('faq.subtitle')}
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
                           <span className="text-[9px] text-clGold font-mono uppercase tracking-widest">{t('common.verified')}</span>
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
            <strong>{t('faq.helpTitle')}</strong> — {t('faq.helpText')}
          </p>
          <div className="flex justify-center gap-8">
             <div className="text-center">
                <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2 justify-center">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                   <span className="text-[10px] text-white font-mono uppercase">{t('faq.nodeActive')}</span>
                </div>
             </div>
             <div className="text-center">
                <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">{t('faq.latency')}</p>
                <span className="text-[10px] text-white font-mono uppercase">22ms</span>
             </div>
             <div className="text-center">
                <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">{t('faq.sync')}</p>
                <span className="text-[10px] text-white font-mono uppercase">{t('faq.nominal')}</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
