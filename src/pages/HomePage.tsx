import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSovereign } from '../context/SovereignContext';

export default function HomePage() {
  const { isVaultUnlocked, unlockVault } = useSovereign();
  const [vaultKey, setVaultKey] = useState('');
  
  // Parallax Mechanics
  const { scrollY } = useScroll();
  const yLogo = useTransform(scrollY, [0, 800], [0, -150]);
  const yText = useTransform(scrollY, [0, 800], [0, 300]);
  const opacityBg = useTransform(scrollY, [0, 500], [0.2, 0]);

  const handleUnlock = () => {
    const success = unlockVault(vaultKey);
    if (!success) {
      alert("ACCESS DENIED: Invalid Digital Key. (Try 'Digital Key')");
    }
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Background ambient glow with dynamic fade */}
        <motion.div 
           className="absolute inset-0 flex items-center justify-center pointer-events-none"
           style={{ opacity: opacityBg }}
        >
          <div className="w-[60vw] h-[60vw] bg-clGold rounded-full blur-[150px] mix-blend-screen" />
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 w-48 h-48 md:w-64 md:h-64 mb-8"
          style={{ y: yLogo }}
        >
          {/* Logo Morph Hack via Opacity animation in loop */}
          <motion.img 
            src="/1cl-hub/images/Logos/logo CL v.1.gold.png" 
            alt="1CL Gold"
            className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img 
            src="/1cl-hub/images/Logos/logo CL v.1.chrome.png" 
            alt="1CL Chrome"
            className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(192,192,192,0.6)]"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center z-10"
          style={{ y: yText }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-widest text-shadow-gold mb-4">ABSOLUTE ELEGANCE</h1>
          <p className="text-gray-400 tracking-[0.3em] uppercase text-sm md:text-base mb-12">The Real Link</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/collections" className="px-8 py-4 bg-transparent border border-clGold text-clGold hover:bg-clGold hover:text-black transition-all duration-300 rounded-sm tracking-widest uppercase text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]">
              Explore Collections
            </Link>
            <Link to="/map" className="px-8 py-4 bg-white/5 border border-white/10 hover:border-clChrome hover:bg-white/10 transition-all duration-300 rounded-sm tracking-widest uppercase text-sm backdrop-blur-sm">
              Enter 1CL Hub
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. Highlight Block: "There Is Just a Simple Thing" */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-clBlack via-clDarkGrey to-clBlack border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Cover Art Style Image */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative aspect-square md:aspect-[4/5] bg-clBlack p-4 border border-clGold/20 shadow-2xl group"
          >
            <img src="/1cl-hub/images/JacketSongs/Jacket_there-is-one thing-.png" alt="Simple Thing Jacket" className="w-full h-full object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="font-serif text-3xl text-white drop-shadow-lg">There Is Just a Simple Thing</h3>
              <p className="text-clGold tracking-widest text-xs mt-2 uppercase">Official Artist Collectible</p>
            </div>
            {/* PARENTAL ADVISORY Tweak for album feel */}
            <div className="absolute top-8 left-8 border border-white px-2 py-1 text-[10px] font-bold tracking-widest bg-black/50 backdrop-blur-sm">
              1CL EXPLICIT LUXURY
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            <h2 className="font-serif text-4xl text-clGold">The Masterpiece</h2>
            <p className="text-gray-400 font-sans leading-relaxed text-lg">
              Merging auditory brilliance with physical woven reality. The <span className="text-white">"Simple Thing"</span> jacket is not just clothing; it's a wearable exhibition of the Chawblick music universe.
            </p>
            <div className="pt-6">
              <Link to="/product/ART-SIMP1" className="inline-flex items-center gap-2 text-clChrome hover:text-white border-b border-clChrome/30 hover:border-white pb-1 transition-colors tracking-wider uppercase text-sm">
                View Specification <span className="text-clGold">→</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 1CL Cinema Experience */}
      <section className="py-24 px-4 border-b border-white/5 bg-clDarkGrey/50">
         <div className="max-w-6xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl font-serif text-white mb-2">1CL Cinema</h2>
            <p className="text-gray-500 tracking-widest uppercase text-sm mb-12">The Campaign Experience</p>
            <div className="w-full aspect-video border border-clGold/30 p-2 glass-panel shadow-[0_0_30px_rgba(212,175,55,0.1)]">
               <video className="w-full h-full object-cover" controls poster="/1cl-hub/images/Logos/logo CL v.1.gold.png">
                  <source src="/1cl-hub/video/Descriptions_de_vidéos_publicitaires_CL.mp4" type="video/mp4" />
               </video>
            </div>
         </div>
      </section>

      {/* THE VAULT */}
      <section id="vaultPortal" className="py-32 px-4 relative overflow-hidden flex flex-col items-center border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-clGold/10 via-clBlack to-clBlack pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-serif tracking-widest text-clGold mb-12 relative z-10 text-shadow-gold">THE VAULT</h2>
        
        {!isVaultUnlocked ? (
          <motion.div 
             className="glass-panel p-10 max-w-md w-full flex flex-col items-center text-center relative z-10"
             initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
          >
             <span className="text-6xl mb-6 text-clChrome">🔒</span>
             <p className="text-gray-400 text-sm mb-8">Access restricted to Sovereign NFT holders and Official Partners.</p>
             <input 
               type="password" 
               placeholder="ENTER DIGITAL KEY" 
               value={vaultKey}
               onChange={(e) => setVaultKey(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
               className="w-full bg-black border border-clGold/50 text-white p-4 text-center tracking-widest uppercase focus:outline-none focus:border-white transition-colors mb-4"
             />
             <button onClick={handleUnlock} className="w-full py-4 bg-clGold text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">
               ACCESS PORTAL
             </button>
          </motion.div>
        ) : (
          <motion.div 
             className="w-full max-w-5xl relative z-10"
             initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
          >
             <div className="glass-panel p-10 border-clGold/50">
                <h3 className="text-2xl font-serif text-white mb-6 border-b border-white/10 pb-4">EXCLUSIVE ARCHIVES</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {/* Vault Card */}
                   <div className="border border-white/10 hover:border-clGold/50 transition-colors bg-black p-6 text-center group cursor-pointer">
                      <img src="/1cl-hub/images/Logos/logo CL v.1.gold.png" className="w-16 h-16 mx-auto mb-4 opacity-70 group-hover:opacity-100 transition-opacity" alt="Ticket" />
                      <h4 className="text-clGold text-sm font-bold tracking-widest uppercase mb-2">NFT ACCESS TICKET</h4>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Early Drop Access</p>
                   </div>
                   <div className="border border-white/10 hover:border-clGold/50 transition-colors bg-black p-6 text-center group cursor-pointer">
                      <img src="/1cl-hub/images/PNG/1CL-VST-GLD.png" className="w-16 h-16 mx-auto mb-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity" alt="Secret Jacket" />
                      <h4 className="text-clGold text-sm font-bold tracking-widest uppercase mb-2">PROTOTYPE ZERO</h4>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Not For Sale</p>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </section>

      {/* 3. Product By Signature Zone */}
      <section className="py-24 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <p className="text-clGold uppercase tracking-[0.4em] text-xs mb-8">Concept Executed By</p>
          <img src="/1cl-hub/images/Logos/logo CL v.1.gold.png" alt="Chawblick Music" className="w-48 h-auto mx-auto invert opacity-80 mix-blend-screen" style={{ filter: 'brightness(0) invert(1)'}} />
        </motion.div>
      </section>
    </div>
  );
}
