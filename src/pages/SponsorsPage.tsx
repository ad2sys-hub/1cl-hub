import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SponsorsPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate secure network transaction
    setTimeout(() => {
      setFormStatus('success');
    }, 2500);
  };

  return (
    <div className="pt-28 pb-32 px-4 flex-grow flex items-center justify-center min-h-[80vh] relative">
      
      {/* Background Graphic Effects - Particles / Light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-clGold/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-clChrome/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          <div className="inline-block border border-clGold/30 px-4 py-2 mb-6">
            <span className="text-clGold text-xs uppercase tracking-widest font-bold">Partner Portal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 px-2">SYNERGY & SPONSORSHIP</h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            1CL is a nexus between high-end music production and premium physical artifacts. We seek visionary partners to scale the "Sovereign" ecosystem.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
        >
          {/* Card 1 */}
          <div className="glass-panel p-8 space-y-4 hover:border-clGold/50 transition-colors">
            <h3 className="text-clGold text-2xl font-serif">Brand Placement</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Integrate your brand natively into our 4D ecosystem, runway drops, and highly-anticipated music video releases by Chawblick Music.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 space-y-4 hover:border-clChrome/50 transition-colors">
            <h3 className="text-clGold text-2xl font-serif">Textile & Tech Innovation</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We collaborate with advanced material suppliers and Web3/phygital innovators to embed digital ownership (NFT/NFC) into our premium Workshop Edition jackets.
            </p>
          </div>

          {/* Contact Interactive Form */}
          <div className="md:col-span-2 glass-panel p-8 md:p-12 border-t border-clGold/50 mt-8 relative overflow-hidden">
             <div className="absolute inset-0 bg-clGold/5 mix-blend-overlay pointer-events-none" />
             
             <AnimatePresence mode="wait">
               {formStatus === 'idle' && (
                 <motion.form 
                   key="form"
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
                   onSubmit={handleSubmit}
                   className="relative z-10 flex flex-col space-y-6"
                 >
                   <div className="text-center mb-6">
                      <h2 className="text-3xl font-serif mb-2">Initiate Dialogue</h2>
                      <p className="text-gray-400 text-sm">Exclusive partnership inquiries handled securely via the EMS network.</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="flex flex-col space-y-2">
                       <label className="text-[10px] text-clGold uppercase tracking-widest font-bold">Entité / Société</label>
                       <input required type="text" className="bg-black/50 border border-white/10 focus:border-clGold/50 text-white p-3 text-sm focus:outline-none transition-colors" placeholder="Nom de l'entreprise" />
                     </div>
                     <div className="flex flex-col space-y-2">
                       <label className="text-[10px] text-clGold uppercase tracking-widest font-bold">Contact Officiel</label>
                       <input required type="email" className="bg-black/50 border border-white/10 focus:border-clGold/50 text-white p-3 text-sm focus:outline-none transition-colors" placeholder="Email professionnel" />
                     </div>
                   </div>

                   <div className="flex flex-col space-y-2">
                     <label className="text-[10px] text-clGold uppercase tracking-widest font-bold">Secteur de Synergie</label>
                     <select className="bg-black/50 border border-white/10 focus:border-clGold/50 text-white p-3 text-sm focus:outline-none transition-colors appearance-none">
                       <option value="placement">Placement Produit & Clip Vidéo</option>
                       <option value="textile">Fourniture Textile / Manufacturier</option>
                       <option value="tech">Technologie (Web3, NFC, IA)</option>
                       <option value="event">Événementiel & Retail</option>
                     </select>
                   </div>

                   <div className="flex flex-col space-y-2">
                     <label className="text-[10px] text-clGold uppercase tracking-widest font-bold">Proposition de Valeur</label>
                     <textarea required rows={4} className="bg-black/50 border border-white/10 focus:border-clGold/50 text-white p-3 text-sm focus:outline-none transition-colors resize-none" placeholder="Brève description de la synergie envisagée..."></textarea>
                   </div>

                   <button type="submit" className="self-center px-12 py-4 bg-transparent border border-clGold text-clGold font-semibold uppercase tracking-widest text-sm hover:bg-clGold hover:text-black transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                     TRANSMETTRE LA REQUÊTE
                   </button>
                 </motion.form>
               )}

               {formStatus === 'submitting' && (
                 <motion.div 
                   key="loading"
                   initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                   className="relative z-10 flex flex-col items-center justify-center py-20"
                 >
                   <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-clGold animate-spin mb-8" />
                   <h3 className="text-clGold tracking-[0.3em] uppercase text-sm">Chiffrement en cours...</h3>
                   <p className="text-gray-500 font-mono text-xs mt-2">Routage vers le Hub EMS 1CL.</p>
                 </motion.div>
               )}

               {formStatus === 'success' && (
                 <motion.div 
                   key="success"
                   initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                   className="relative z-10 flex flex-col items-center justify-center py-20 text-center"
                 >
                   <div className="w-20 h-20 bg-clGold/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                     <span className="text-4xl text-clGold">✓</span>
                   </div>
                   <h3 className="text-2xl font-serif text-white mb-2">REQUÊTE SÉCURISÉE</h3>
                   <p className="text-gray-400 mb-8">Vos données ont été transmises au réseau administratif 1CL.<br/>Le Curator procède à l'analyse.</p>
                   <button onClick={() => setFormStatus('idle')} className="text-clGold border-b border-clGold/30 pb-1 text-xs uppercase tracking-widest hover:border-clGold transition-colors">
                     Retourner au Portail
                   </button>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
