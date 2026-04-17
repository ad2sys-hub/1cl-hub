import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../context/SovereignContext';

export default function SidebarEMS({ openContractForge }: { openContractForge: () => void }) {
  const { isSidebarOpen, toggleSidebar, toggleGlobalLoupe, setMediaHubOpen } = useSovereign();
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Overlay mask */}
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />

          {/* Sidebar Panel */}
          <motion.aside 
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-clDarkGrey/95 border-l border-clGold/30 z-50 p-6 overflow-y-auto"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
               <div>
                  <h3 className="text-clGold text-sm tracking-widest font-bold uppercase">EMS DASHBOARD</h3>
                  <span className="text-[10px] text-gray-500 font-mono">{clock}</span>
               </div>
               <button onClick={toggleSidebar} className="text-gray-400 hover:text-white transition-colors text-xl">✕</button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="bg-black/50 border border-white/5 p-3 rounded">
                <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Global Stock</span>
                <b className="text-white text-sm">12,450 pcs</b>
              </div>
              <div className="bg-black/50 border border-white/5 p-3 rounded">
                <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Forecast Q2</span>
                <b className="text-clGold text-sm">+28% ROI</b>
              </div>
              <div className="bg-black/50 border border-white/5 p-3 rounded">
                <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Active Flows</span>
                <b className="text-white text-sm">14 Synced</b>
              </div>
              <div className="bg-black/50 border border-white/5 p-3 rounded">
                <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Lead Time</span>
                <b className="text-white text-sm">22 Days</b>
              </div>
            </div>

            {/* Contract Forge */}
            <div className="mb-6 bg-black/30 border border-white/10 p-4 rounded">
               <h4 className="text-xs text-clChrome uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Forge Contracts (PDF)</h4>
               <input type="text" placeholder="Partie B (Client/Fournisseur)" className="w-full bg-black/50 border border-white/10 text-white text-xs p-2 mb-2 focus:outline-none focus:border-clGold/50" />
               <select className="w-full bg-black/50 border border-white/10 text-white text-xs p-2 mb-3 focus:outline-none focus:border-clGold/50">
                  <option value="client">Contrat Client Final</option>
                  <option value="supplier">Contrat Fournisseur</option>
                  <option value="transporter">Contrat Transporteur</option>
               </select>
               <button onClick={() => { toggleSidebar(); openContractForge(); }} className="w-full bg-clGold text-black text-[10px] font-bold py-2 uppercase tracking-widest hover:bg-white transition-colors">
                  Generer Contrat
               </button>
            </div>

            {/* Logistics Map SVG */}
            <div className="mb-6 bg-black/30 border border-white/10 p-4 rounded">
               <h4 className="text-xs text-clChrome uppercase tracking-widest mb-3">Live Logistics Flow</h4>
               <svg viewBox="0 0 800 400" className="w-full h-auto bg-black rounded border border-white/5 p-2">
                    <path d="M150,150 Q400,100 650,150" fill="none" stroke="rgba(212,175,55,0.8)" strokeWidth="2" strokeDasharray="5,5" />
                    <circle cx="150" cy="150" r="10" fill="#C0C0C0" />
                    <circle cx="650" cy="150" r="10" fill="#D4AF37" />
                    <text x="130" y="180" fill="white" fontSize="24">Milan</text>
                    <text x="630" y="180" fill="white" fontSize="24">Hub 1CL</text>
               </svg>
               <div className="mt-2 text-[10px] text-clGold tracking-widest uppercase">BATCH #102: IN TRANSIT (92%)</div>
            </div>

            {/* Visual Overrides */}
            <div className="mb-6">
               <h4 className="text-xs text-clChrome uppercase tracking-widest mb-3">Visual Overrides</h4>
               <div className="grid grid-cols-1 gap-2">
                  <button onClick={toggleGlobalLoupe} className="border border-clGold/30 text-clGold text-[10px] uppercase tracking-widest py-2 hover:bg-clGold/10 transition-colors">
                    Master Magnifier (x3)
                  </button>
                  <button onClick={() => setMediaHubOpen(true)} className="border border-white/10 text-gray-400 text-[10px] uppercase tracking-widest py-2 hover:bg-white/10 hover:text-white transition-colors">
                    Compact Media HUD
                  </button>
               </div>
            </div>

            <button className="w-full bg-white/5 border border-white/10 text-white text-[10px] font-bold py-3 uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                Force Global Sync
            </button>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
