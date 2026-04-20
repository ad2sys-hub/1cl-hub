import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import { useSound } from '../hooks/useSound';
import { CreditCard, ShieldCheck, Zap, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language, paymentStatus } = useSovereign();
  const { playSound } = useSound();
  const [product, setProduct] = useState<any>(null);
  const [method, setMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [processingProgress, setProcessingProgress] = useState(0);

  useEffect(() => {
    fetch('/1cl-hub/data/catalog.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.id === id);
        if (found) setProduct(found);
      });
  }, [id]);

  const handleProcessOrder = () => {
    setStep('processing');
    playSound('drone');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setStep('success');
          playSound('success');
        }, 1000);
      }
      setProcessingProgress(progress);
    }, 400);
  };

  if (!product) return <div className="min-h-screen flex items-center justify-center text-clGold animate-pulse">BOOTING MPC TUNNEL...</div>;

  return (
    <div className="min-h-screen bg-clBlack pt-24 pb-20 px-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-clGold/10 via-clBlack to-clBlack pointer-events-none" />
      <div className="scanline opacity-20" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* Left Side: Order Review */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-clChrome tracking-[0.4em] uppercase text-xs mb-2 opacity-60">{t('map4d.nav')} // SECURE</h2>
            <h1 className="text-4xl md:text-5xl font-serif text-white">{language === 'fr' ? 'Achat Souverain' : 'Sovereign Purchase'}</h1>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
             <div className="flex gap-6">
                <div className="w-24 h-24 bg-clDarkGrey/50 rounded-xl overflow-hidden border border-clGold/20">
                   <img src={`/1cl-hub${product.variants[0].image}`} alt="" className="w-full h-full object-contain p-2" />
                </div>
                <div className="flex flex-col justify-center">
                   <p className="text-clGold text-[10px] uppercase tracking-widest">{product.collection}</p>
                   <h3 className="text-xl text-white font-serif mt-1">{language === 'fr' ? product.name_fr : product.name}</h3>
                   <p className="text-clChrome/60 text-sm mt-1">{product.price} DTS-Credits</p>
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between text-sm">
                <span className="text-gray-500 uppercase tracking-widest">Protocol Fee</span>
                <span className="text-clGold">0.00 DTS</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-gray-500 uppercase tracking-widest">MPC Shielding</span>
                <span className="text-green-500">INCL.</span>
             </div>
             <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                <span className="text-lg text-white font-serif uppercase tracking-widest">Total Sovereign</span>
                <span className="text-3xl font-serif text-clGold">{product.price} DTS</span>
             </div>
          </div>

          {/* ANES Badge */}
          <div className="flex items-center gap-4 bg-clGold/5 border border-clGold/10 p-4 rounded-xl">
             <div className="w-10 h-10 rounded-full bg-clGold/20 flex items-center justify-center">
                <ShieldCheck className="text-clGold" size={24} />
             </div>
             <div>
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">ANES MPC Handshake Active</p>
                <p className="text-[9px] text-gray-500 italic">Multi-Party Computation secures this transaction path.</p>
             </div>
          </div>
        </motion.div>

        {/* Right Side: Flow */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {step === 'details' && (
              <motion.div 
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-clDarkGrey/20 border border-white/5 rounded-3xl p-8 backdrop-blur-2xl space-y-6"
              >
                <h3 className="text-xl text-white font-serif mb-4 flex items-center gap-3">
                   <div className="w-1.5 h-1.5 bg-clGold rounded-full animate-pulse" />
                   {language === 'fr' ? 'Détails de Livraison' : 'Shipping Matrix'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500">Code Name</label>
                      <input type="text" placeholder="SOVEREIGN_ID" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-clGold/50 outline-none transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500">Destination</label>
                      <input type="text" placeholder="Global Hub" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-clGold/50 outline-none transition-all" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500">Encrypted Email</label>
                   <input type="email" placeholder="alias@sovereign.link" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-clGold/50 outline-none transition-all" />
                </div>
                <button 
                  onClick={() => { playSound('click'); setStep('payment'); }}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl flex items-center justify-center gap-3 group transition-all"
                >
                   <span className="uppercase tracking-[0.3em] font-bold text-xs">{language === 'fr' ? 'Étape Suivante' : 'Proceed to Payment'}</span>
                   <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-clDarkGrey/20 border border-clGold/20 rounded-3xl p-8 backdrop-blur-2xl space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl text-white font-serif flex items-center gap-3">
                    <Lock className="text-clGold" size={18} />
                    {language === 'fr' ? 'Passerelle de Paiement' : 'Payment Gateways'}
                  </h3>
                  <div className="flex gap-2">
                    <div className={`w-2 h-2 rounded-full ${paymentStatus.stripe === 'online' ? 'bg-green-500' : 'bg-clGold animate-pulse'}`} />
                    <span className="text-[8px] uppercase tracking-widest text-clChrome/60">Live Feed</span>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <button 
                    onClick={() => setMethod('stripe')}
                    className={`flex-grow py-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'stripe' ? 'bg-clGold/20 border-clGold text-clGold' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'}`}
                  >
                    <CreditCard size={20} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Stripe MPC</span>
                  </button>
                  <button 
                    onClick={() => setMethod('paypal')}
                    className={`flex-grow py-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'paypal' ? 'bg-clGold/20 border-clGold text-clGold' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'}`}
                  >
                    <Zap size={20} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">PayPal Link</span>
                  </button>
                </div>

                <div className="space-y-4">
                   <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3">
                      <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest">
                         <span>Gateway Identity</span>
                         <span className="text-clGold">ANES_NODE_07</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: '100%' }}
                           transition={{ duration: 1 }}
                           className="h-full bg-clGold"
                         />
                      </div>
                   </div>
                </div>

                <button 
                  onClick={() => { playSound('click'); handleProcessOrder(); }}
                  className="w-full py-5 bg-clGold text-clBlack font-black text-sm uppercase tracking-[0.4em] rounded-xl hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-3"
                >
                   {language === 'fr' ? 'CONFIRMER L\'ACHAT' : 'AUTHENTICATE & PAY'}
                </button>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div 
                key="processing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 text-center space-y-8"
              >
                <div className="relative w-32 h-32">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                     className="absolute inset-0 border-t-2 border-clGold rounded-full"
                   />
                   <motion.div 
                     animate={{ rotate: -360 }}
                     transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                     className="absolute inset-4 border-b-2 border-clChrome rounded-full opacity-40"
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-clGold font-mono text-xl">{Math.round(processingProgress)}%</span>
                   </div>
                </div>
                <div>
                   <h3 className="text-2xl font-serif text-white uppercase tracking-widest">{language === 'fr' ? 'Handshake en cours...' : 'MPC Handshake...'}</h3>
                   <p className="text-xs text-gray-500 mt-2 tracking-widest uppercase italic font-sans">Fragmenting keys across ANES servers</p>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 text-center space-y-8 bg-clGold/10 border border-clGold rounded-3xl backdrop-blur-3xl"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="w-24 h-24 bg-clGold rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.8)]"
                >
                   <CheckCircle2 size={48} className="text-clBlack" />
                </motion.div>
                <div>
                   <h3 className="text-3xl font-serif text-white uppercase tracking-widest">{language === 'fr' ? 'ORDRE SOUVERAIN ÉTABLI' : 'TRANSACTION SUCCESSFUL'}</h3>
                   <p className="text-xs text-clGold mt-4 tracking-[0.2em] leading-relaxed">
                     {language === 'fr' 
                       ? 'Votre pièce 1CL a été sécurisée. Vérifiez votre tunnel MPC pour les détails.' 
                       : 'Your 1CL piece has been secured. Check your MPC tunnel for transaction details.'}
                   </p>
                </div>
                <button 
                  onClick={() => { playSound('click'); navigate('/'); }}
                  className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-clGold transition-colors"
                >
                  {language === 'fr' ? 'Retour au Hub' : 'Return to Hub'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Maya Floating Guidance Over Checkout */}
          {step !== 'success' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute -right-4 -top-4  bg-black/80 border border-clGold/30 p-4 rounded-2xl shadow-2xl backdrop-blur-xl max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-1.5 h-1.5 bg-clGold rounded-full animate-pulse" />
                 <span className="text-[8px] font-bold text-clGold uppercase tracking-tighter">Maya Security Guide</span>
              </div>
              <p className="text-[10px] text-gray-400 italic leading-tight">
                {step === 'details' && (language === 'fr' ? "Initialisation du tunnel... Je surveille votre ID." : "Tunnel initialization... I am monitoring your ID.")}
                {step === 'payment' && (language === 'fr' ? "Passerelle ANES sécurisée. Les clés sont fragmentées." : "ANES Gateway secured. Keys are fragmented.")}
                {step === 'processing' && (language === 'fr' ? "Calcul multi-parties en cours. Presque fini." : "Multi-party computation active. Almost done.")}
              </p>
            </motion.div>
          )}
        </div>

      </div>

    </div>
  );
}
