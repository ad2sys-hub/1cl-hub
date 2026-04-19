import { motion } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';

export default function LegalPage() {
  const { t } = useSovereign();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-clBlack">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-clGold tracking-[0.2em] glitch-text uppercase">
            {t('legalPage.title')}
          </h1>
          <div className="h-px w-24 bg-clGold/50 mx-auto" />
          <p className="text-gray-400 font-light max-w-2xl mx-auto leading-relaxed italic">
            {t('legalPage.intro')}
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-8"
        >
          <section className="p-8 border border-white/5 bg-white/5 rounded-2xl backdrop-blur-sm hover:border-clGold/20 transition-all group">
            <h2 className="text-clChrome font-serif text-xl tracking-widest mb-6 uppercase flex items-center gap-4">
              <span className="w-8 h-px bg-clChrome/30" />
              {t('legalPage.terms')}
            </h2>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              <p>{t('legalPage.article1')}</p>
              <p className="opacity-50">Section 1.1: EMS Distribution logic ensures that every phygital artifact is tracked via the Sovereign network.</p>
            </div>
          </section>

          <section className="p-8 border border-white/5 bg-white/5 rounded-2xl backdrop-blur-sm hover:border-clGold/20 transition-all">
            <h2 className="text-clChrome font-serif text-xl tracking-widest mb-6 uppercase flex items-center gap-4">
              <span className="w-8 h-px bg-clChrome/30" />
              {t('legalPage.privacy')}
            </h2>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              <p>{t('legalPage.article2')}</p>
              <p className="opacity-50">Section 2.2: Cryptographic hashing of user credentials prevents unauthorized identity matching.</p>
            </div>
          </section>

          <section className="p-8 border border-clGold/20 bg-clGold/5 rounded-2xl backdrop-blur-sm">
            <h2 className="text-clGold font-serif text-xl tracking-widest mb-6 uppercase flex items-center gap-4">
              <span className="w-8 h-px bg-clGold/30" />
              {t('legalPage.sovereignty')}
            </h2>
            <p className="text-gray-300 font-light leading-relaxed italic">
              "To enter the 1CL ecosystem is to acknowledge the fusion of digital existence and physical artifact. The Sovereign Protocol is the bond."
            </p>
          </section>
        </motion.div>

        {/* Footer Signature */}
        <div className="pt-20 text-center opacity-30 select-none">
          <p className="text-clChrome tracking-[0.3em] uppercase text-[10px]">1CL-SOVEREIGN-CERTIFIED</p>
        </div>

      </div>
    </div>
  );
}
