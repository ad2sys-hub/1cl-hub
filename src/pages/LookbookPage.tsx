import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { useSound } from '../hooks/useSound';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Sparkles, ShieldCheck, Zap, ArrowLeft, Layers, UserCircle } from 'lucide-react';

export default function LookbookPage() {
  const navigate = useNavigate();
  const { userData, lookbookItems, language, t } = useSovereign();
  const { playSound } = useSound();
  const [catalog, setCatalog] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);
  const [showIdentityCard, setShowIdentityCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Access Control
  useEffect(() => {
    const allowedRoles = ['Iyason', 'Chawblick', 'Admin'];
    if (!allowedRoles.includes(userData.role || '')) {
      navigate('/collections');
    }
  }, [userData.role, navigate]);

  useEffect(() => {
    fetch('/1cl-hub/data/catalog.json')
      .then(res => res.json())
      .then(setCatalog);
  }, []);

  const savedPieces = catalog.filter(p => lookbookItems.includes(p.id));

  const handleGenerateIdentity = () => {
    setGenerating(true);
    playSound('scan');
    setTimeout(() => {
      setGenerating(false);
      setShowIdentityCard(true);
      playSound('success');
    }, 2500);
  };

  const downloadIdentity = async () => {
    if (cardRef.current === null) return;
    playSound('click');
    const dataUrl = await toPng(cardRef.current, { cacheBust: true });
    const link = document.createElement('a');
    link.download = `Sovereign_ID_${userData.codeName || 'GUEST'}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-clBlack pt-24 pb-20 px-4 relative overflow-hidden">
      
      {/* Cinematic Backdrop Loop */}
      <div className="absolute inset-0 z-0">
         <video 
           autoPlay muted loop playsInline 
           className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
         >
           <source src="/1cl-hub/video/1CL_CHAWBLICK_MUSIC_PROMO.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-clBlack/40 backdrop-blur-[2px]" />
         <div className="scanline" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex justify-between items-center mb-12">
           <button 
             onClick={() => navigate('/collections')}
             className="flex items-center gap-2 text-gray-500 hover:text-clGold transition-colors uppercase tracking-[0.3em] text-[10px]"
           >
              <ArrowLeft size={14} /> {language === 'fr' ? 'Retour' : 'Return'}
           </button>
           <div className="text-right">
              <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase">
                {language === 'fr' ? 'Le Forge' : 'The Forge'}
              </h1>
              <p className="text-clGold text-[9px] tracking-[0.5em] uppercase font-black">Sovereign Lookbook Generator</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           
           {/* Section 1: The Selected Items */}
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-black/60 border border-white/5 p-8 rounded-3xl backdrop-blur-2xl">
                 <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                    <h3 className="text-xl font-serif flex items-center gap-3">
                       <Layers className="text-clGold" size={20} />
                       {language === 'fr' ? 'Pièces Sélectionnées' : 'Curated Pieces'}
                    </h3>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">{savedPieces.length} Modules</span>
                 </div>

                 {savedPieces.length === 0 ? (
                   <div className="py-20 text-center space-y-4">
                      <p className="text-gray-500 uppercase tracking-widest text-xs">No assets detected in the lookbook tunnel.</p>
                      <button onClick={() => navigate('/collections')} className="text-clGold text-[10px] font-bold border-b border-clGold pb-1">Browse Catalog</button>
                   </div>
                 ) : (
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {savedPieces.map(p => (
                        <motion.div 
                          key={p.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="group relative aspect-[3/4] bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-clGold/50 transition-all"
                        >
                           <img src={`/1cl-hub${p.variants[0].image}`} alt="" className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                           <div className="absolute bottom-3 left-3 right-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <p className="text-[8px] text-clGold font-black uppercase tracking-widest">{p.id}</p>
                              <h4 className="text-[10px] text-white font-serif truncate">{language === 'fr' ? p.name_fr : p.name}</h4>
                           </div>
                        </motion.div>
                      ))}
                   </div>
                 )}
              </div>

              {/* Generate Trigger Card */}
              <div className="bg-clGold/10 border border-clGold/30 p-8 rounded-3xl backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="space-y-2">
                    <h4 className="text-2xl font-serif text-white tracking-widest">SOVEREIGN_AUTH_01</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed max-w-sm">
                      Establish your digital identity within the 1CL ecosystem. This process fragments your selections into a singular styling ID.
                    </p>
                 </div>
                 <button 
                   onClick={handleGenerateIdentity}
                   disabled={savedPieces.length === 0 || generating}
                   className="group relative px-12 py-5 bg-clGold text-black font-black text-sm uppercase tracking-[0.3em] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:grayscale transition-all"
                 >
                    <span className="relative z-10">{generating ? 'Scanning Matrix...' : 'Generate Sovereign ID'}</span>
                    <motion.div 
                      className="absolute inset-0 bg-white/40"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                 </button>
              </div>
           </div>

           {/* Section 2: Maya Stylist Panel */}
           <div className="space-y-8">
              <div className="bg-black/80 border border-clGold/20 p-8 rounded-3xl backdrop-blur-3xl relative overflow-hidden h-full">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-clGold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                       <Sparkles className="text-black" size={24} />
                    </div>
                    <div>
                       <h3 className="text-white font-serif tracking-widest">MAYA_STYLIST</h3>
                       <p className="text-clGold text-[8px] uppercase tracking-widest">Sub-Mode: Intelligence Forge</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                       <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 opacity-60">Handshake Status</p>
                       <div className="flex items-center gap-3">
                          <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: '85%' }}
                               className="h-full bg-clGold shadow-[0_0_10px_rgba(212,175,55,1)]" 
                             />
                          </div>
                          <span className="text-clGold font-mono text-[9px]">Verified</span>
                       </div>
                    </div>

                    <p className="text-xs text-gray-300 italic leading-relaxed">
                      "I've analyzed your curated path. Your selection of the {savedPieces[0]?.id || '...'} demonstrates a strong alignment with the {userData.role === 'Iyason' ? 'Iyason Shadow' : 'Sovereign Core'} aesthetic. 
                      Generating a Style ID will finalize your synchronization with the ANES network."
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                          <Zap size={16} className="text-clGold mb-2" />
                          <p className="text-[10px] font-black uppercase text-white">Flow Density</p>
                          <p className="text-[9px] text-gray-500 uppercase mt-1">High fidelity (A+)</p>
                       </div>
                       <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                          <ShieldCheck size={16} className="text-clGold mb-2" />
                          <p className="text-[10px] font-black uppercase text-white">MPC Security</p>
                          <p className="text-[9px] text-gray-500 uppercase mt-1">Matrix Armored</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* ID Card Modal & Animation Layer */}
      <AnimatePresence>
         {generating && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] bg-clBlack flex flex-col items-center justify-center p-8 text-center"
            >
               <div className="scanline" />
               <motion.div 
                 animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="relative w-64 h-64 flex items-center justify-center"
               >
                  <div className="absolute inset-0 border-t-2 border-clGold rounded-full animate-spin" />
                  <div className="absolute inset-4 border-b-2 border-clChrome rounded-full animate-[spin_3s_linear_infinite]" />
                  <Zap className="text-clGold" size={64} />
               </motion.div>
               <h2 className="text-3xl font-serif text-white tracking-[0.4em] uppercase mt-12">SYNCHRONIZING ID</h2>
               <p className="text-clGold text-[10px] tracking-[0.5em] uppercase mt-4 animate-pulse">Establishing ANES Handshake...</p>
            </motion.div>
         )}

         {showIdentityCard && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-3xl overflow-y-auto"
           >
              <div className="absolute inset-0" onClick={() => setShowIdentityCard(false)} />
              
              <div className="relative w-full max-w-4xl flex flex-col items-center">
                 
                 {/* Cinematic Header for Summary */}
                 <motion.div
                   initial={{ y: -50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   className="text-center mb-12 space-y-4"
                 >
                    <h2 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-widest">Sovereign Established</h2>
                    <p className="text-clGold text-sm tracking-[0.5em] uppercase font-black">Digital Identity Fragmented // Handshake Success</p>
                 </motion.div>

                 {/* THE ID CARD - CAPTURE TARGET */}
                 <div ref={cardRef} className="ID-CARD-CONTAINER p-8 bg-[#000] border-2 border-clGold/50 rounded-[40px] shadow-[0_0_100px_rgba(212,175,55,0.2)] relative overflow-hidden w-full max-w-md aspect-[1.6/1] mb-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-clGold/10 via-transparent to-transparent" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-clGold/5 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                       <div className="flex justify-between items-start">
                          <div className="flex gap-4">
                             <div className="w-16 h-16 rounded-2xl bg-white/5 border border-clGold/30 flex items-center justify-center">
                                <UserCircle className="text-clGold" size={40} />
                             </div>
                             <div>
                                <h3 className="text-xl text-white font-serif tracking-widest uppercase">{userData.codeName || 'GUEST_01'}</h3>
                                <p className="text-[10px] text-clGold font-black uppercase tracking-[0.3em]">{userData.role || 'CIVILIAN'}</p>
                             </div>
                          </div>
                          <QRCodeSVG 
                            value={`https://1cl-hub.com/verify/${userData.codeName}`} 
                            size={40} 
                            fgColor="#D4AF37" 
                            bgColor="transparent" 
                            className="opacity-80"
                          />
                       </div>

                       <div className="grid grid-cols-4 gap-2">
                          {savedPieces.slice(0, 4).map(p => (
                             <div key={p.id} className="aspect-square bg-white/5 border border-white/10 rounded-lg p-1">
                                <img src={`/1cl-hub${p.variants[0].image}`} alt="" className="w-full h-full object-contain" />
                             </div>
                          ))}
                       </div>

                       <div className="flex justify-between items-end border-t border-white/10 pt-4">
                          <div>
                             <p className="text-[8px] text-gray-500 uppercase tracking-widest">Nexus Link State</p>
                             <p className="text-[9px] text-green-500 font-bold uppercase tracking-[0.2em]">Synchronized</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                             <QRCodeSVG 
                               value={`SOVEREIGN_ID_MATRIX_${userData.codeName}`} 
                               size={24} 
                               fgColor="#C0C0C0" 
                               bgColor="transparent" 
                               className="opacity-40"
                             />
                             <p className="text-[7px] text-gray-600 font-mono">ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                          </div>
                       </div>
                    </div>

                    {/* Matrix Overlays */}
                    <div className="absolute top-0 right-0 p-4">
                       <ShieldCheck className="text-clGold/30" size={64} />
                    </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="flex flex-col sm:flex-row gap-6">
                    <button 
                      onClick={downloadIdentity}
                      className="px-8 py-4 bg-clGold text-black font-black uppercase tracking-widest text-xs rounded-full flex items-center gap-3 hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                    >
                       <Download size={18} /> {language === 'fr' ? 'Télécharger ma Carte 1CL' : 'Download My 1CL ID'}
                    </button>
                    <button 
                      onClick={() => setShowIdentityCard(false)}
                      className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/5 transition-all"
                    >
                       {language === 'fr' ? 'Retour au Forge' : 'Return to Forge'}
                    </button>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
}
