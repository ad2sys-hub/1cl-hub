import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContractModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#D4AF37'; // Gold ink
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
      }
    }
  }, [isOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.beginPath(); // Reset path so next dot doesn't connect
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="relative bg-[#f4f1ea] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 border border-gray-300"
            initial={{ opacity: 0, y: 50, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl">✕</button>
            
            {/* Header */}
            <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-6">
              <div>
                <h2 className="text-2xl font-serif text-black uppercase tracking-widest">CONTRAT DE PARTENARIAT</h2>
                <p className="text-sm font-mono text-gray-600">Date: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-serif text-black m-0">1CL COLLECTION</h3>
                <p className="text-xs text-gray-500 tracking-wider">Ecosystème EMS@Path</p>
              </div>
            </div>

            {/* Body */}
            <div className="text-black text-sm space-y-4 mb-8 font-serif leading-relaxed">
              <p>
                Entre les soussignés :<br/>
                <b>1CL Collection</b>, représenté par Chawblick Music, d'une part,<br/>
                Et <b>Partie B</b>, d'autre part.
              </p>
              <p>Il a été convenu et arrêté ce qui suit :</p>
              <ul className="list-disc pl-5 space-y-2">
                 <li>Article 1: Objet du contrat de production Sovereign.</li>
                 <li>Article 2: SLA Logistique et tolérances d'usine (Hub Milan).</li>
                 <li>Article 3: Propriété Intellectuelle (Logo Or/Chrome).</li>
              </ul>
              <p>Fait pour valoir ce que de droit.</p>
            </div>

            {/* Signature Area */}
            <div className="bg-white border border-gray-300 p-4 relative">
               <p className="absolute top-2 left-4 text-[10px] text-gray-400 font-mono tracking-widest">SIGNATURE ÉLECTRONIQUE (SOVEREIGN PAD)</p>
               <canvas 
                 ref={canvasRef}
                 width={500} 
                 height={150} 
                 className="w-full h-[150px] mt-4 cursor-crosshair touch-none"
                 onMouseDown={startDrawing}
                 onMouseUp={stopDrawing}
                 onMouseOut={stopDrawing}
                 onMouseMove={draw}
                 onTouchStart={startDrawing}
                 onTouchEnd={stopDrawing}
                 onTouchMove={draw}
               />
            </div>
            
            {/* Actions */}
            <div className="flex justify-between items-center mt-6">
              <button onClick={clearSignature} className="text-xs px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors uppercase tracking-widest font-bold">
                 Effacer
              </button>
              <div className="flex gap-4">
                <button onClick={() => window.print()} className="text-xs px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 transition-colors uppercase tracking-widest font-bold">
                   Imprimer PDF
                </button>
                <button onClick={() => { alert("Contrat certifié et envoyé (Mock n8n webhook)."); onClose(); }} className="text-xs px-6 py-2 bg-black text-clGold hover:text-white transition-colors uppercase tracking-widest font-bold">
                   Certifier & Envoyer
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
