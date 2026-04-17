import { motion } from 'framer-motion';

export default function SponsorsPage() {
  return (
    <div className="pt-28 pb-32 px-4 flex-grow flex items-center justify-center min-h-[80vh]">
      <div className="max-w-4xl mx-auto w-full">
        
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
          <div className="glass-panel p-8 space-y-4">
            <h3 className="text-clGold text-2xl font-serif">Brand Placement</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Integrate your brand natively into our 4D ecosystem, runway drops, and highly-anticipated music video releases by Chawblick Music.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 space-y-4">
            <h3 className="text-clGold text-2xl font-serif">Textile & Tech Innovation</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We collaborate with advanced material suppliers and Web3/phygital innovators to embed digital ownership (NFT/NFC) into our premium Workshop Edition jackets.
            </p>
          </div>

          {/* Contact Box */}
          <div className="md:col-span-2 glass-panel p-8 md:p-12 text-center border-t border-clGold/50 mt-8 relative overflow-hidden">
             {/* Background flare */}
             <div className="absolute inset-0 bg-clGold/10 mix-blend-overlay pointer-events-none" />
             <h2 className="text-3xl font-serif mb-4 relative z-10">Initiate Dialogue</h2>
             <p className="text-gray-400 mb-8 relative z-10">Exclusive partnership inquiries handled directly via our administrative hub.</p>
             <a href="mailto:randymcmillan29@gmail.com" className="relative z-10 inline-block px-10 py-4 bg-clGold text-black font-semibold uppercase tracking-widest text-sm hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)]">
               CONTACT 1CL HUB
             </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
