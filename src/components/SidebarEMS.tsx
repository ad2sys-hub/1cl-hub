import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../context/SovereignContext';
import { supabase } from '../lib/supabaseClient';

export default function SidebarEMS({ openContractForge }: { openContractForge: () => void }) {
  const { isSidebarOpen, toggleSidebar, toggleGlobalLoupe, setMediaHubOpen, isAdminAuthenticated } = useSovereign();
  const [clock, setClock] = useState("--:--:--");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [auditLogs, setAuditLogs] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');
    
    if (isSignUp) {
       const { error } = await supabase.auth.signUp({
          email,
          password,
       });
       if (error) {
          setAuthError(error.message);
       } else {
          alert("Registration request sent! Check your email for verification.");
          setIsSignUp(false);
       }
    } else {
       const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
       });
       if (error) {
          setAuthError(error.message);
       }
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleForceSync = async () => {
    setIsLoading(true);
    const addLog = (msg: string) => setAuditLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));
    
    addLog("INITIALIZING SOVEREIGN LINK...");
    try {
      addLog("CONTACTING SUPABASE EDGE...");
      const { data, error } = await supabase.functions.invoke('mongodb-bridge', {
         body: { collection: "AdminSync", document: { action: "sync_request", initiator: email } }
      });
      
      if (error) {
        addLog(`ERROR: ${error.message}`);
        throw error;
      }
      
      addLog("MONGODB HANDSHAKE SUCCESSFUL.");
      addLog(`RECORD_ID: ${data.mongodb_record?.insertedId || 'SIMULATED_SUCCESS'}`);
    } catch (e: any) {
      addLog(`SYNC FAILED: ${e.message}`);
    }
    setIsLoading(false);
  };

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
                  <h3 className="text-clGold text-sm tracking-widest font-bold uppercase">{isAdminAuthenticated ? 'EMS DASHBOARD' : 'IAM SECURITY PORTAL'}</h3>
                  <span className="text-[10px] text-gray-500 font-mono">{clock}</span>
               </div>
               <button onClick={toggleSidebar} className="text-gray-400 hover:text-white transition-colors text-xl">✕</button>
            </div>

            {!isAdminAuthenticated ? (
              /* Authentication Stage */
              <div className="flex flex-col h-[70vh] justify-center relative">
                 {isLoading && (
                   <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                      <div className="w-10 h-10 border-2 border-clGold border-t-transparent rounded-full animate-spin" />
                   </div>
                 )}
                 <h2 className="text-2xl font-serif text-white mb-2 text-center">ACCESS RESTRICTED</h2>
                 <p className="text-gray-500 text-xs tracking-widest uppercase text-center mb-8">Identify context via Supabase IAM</p>
                 
                 {authError && (
                   <div className="bg-red-500/10 border border-red-500/50 p-3 mb-6 text-red-500 text-xs text-center uppercase tracking-widest">
                     {authError}
                   </div>
                 )}
                 
                 <form onSubmit={handleAuth} className="space-y-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-[10px] text-clGold uppercase tracking-widest font-bold">Identity (Email)</label>
                       <input 
                         type="email" 
                         required
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="w-full bg-black/50 border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-clGold/50 transition-colors"
                         placeholder="admin@1cl.com"
                       />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-[10px] text-clGold uppercase tracking-widest font-bold">KeyPhrase (Password)</label>
                       <input 
                         type="password" 
                         required
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="w-full bg-black/50 border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-clGold/50 transition-colors"
                         placeholder="••••••••"
                       />
                    </div>
                    <button type="submit" className="w-full bg-clGold text-black font-bold py-4 uppercase tracking-widest text-sm hover:bg-white transition-colors mt-4 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                      {isSignUp ? "INITIALIZE SECURITY CONTEXT" : "VERIFY PROTOCOL"}
                    </button>
                    <button 
                       type="button"
                       onClick={() => setIsSignUp(!isSignUp)}
                       className="w-full text-[10px] text-gray-500 hover:text-clGold transition-colors tracking-widest uppercase mt-2"
                    >
                       {isSignUp ? "Already identified? Back to Login" : "No Identity? Create Admin Portal"}
                    </button>
                 </form>
              </div>
            ) : (
              /* Administrative Dashboard (Only visible if isAdminAuthenticated is true) */
              <AnimatePresence>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                  {isLoading && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded">
                       <div className="w-10 h-10 border-2 border-clGold border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
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

                  <button onClick={handleForceSync} className="w-full bg-white/5 border border-white/10 text-white text-[10px] font-bold py-3 mb-2 uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                      Force Global Sync (MongoDB)
                  </button>

                  {/* Audit Log Terminal */}
                  {auditLogs.length > 0 && (
                    <div className="mt-4 bg-black p-3 border border-clGold/20 font-mono text-[9px] text-clGold/80 max-h-32 overflow-y-auto space-y-1">
                       <p className="text-clChrome mb-2 border-b border-white/5 pb-1">-- SYSTEM AUDIT LOG --</p>
                       {auditLogs.map((log, i) => (
                         <p key={i} className={log.includes('ERROR') || log.includes('FAILED') ? 'text-red-500' : ''}>
                           {log}
                         </p>
                       ))}
                    </div>
                  )}

                  <button onClick={handleLogout} className="w-full bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-bold py-3 mt-4 uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors">
                      Disconnect Session
                  </button>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
