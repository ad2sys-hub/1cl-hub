import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [activeVariant, setActiveVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [inLookbook, setInLookbook] = useState(false);

  useEffect(() => {
    fetch('/1cl-hub/data/catalog.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.id === id);
        if (found) {
          setProduct(found);
          setActiveVariant(found.variants[0]);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-10 h-10 border-t-2 border-clGold rounded-full" /></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-white font-serif text-2xl">Piece Not Found.</div>;

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24">
        
        {/* Visuals */}
        <motion.div 
          className="w-full md:w-1/2 relative bg-clDarkGrey/30 p-8 border border-white/5 flex items-center justify-center min-h-[50vh] md:min-h-[80vh] rounded-sm group overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Parallax / Shimmer BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-clGold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <motion.img 
            key={activeVariant.id}
            src={`/1cl-hub${activeVariant.image}`} 
            alt={product.name}
            className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
          />

          <div className="absolute top-6 left-6 text-[10px] tracking-widest uppercase text-gray-500">{product.collection}</div>
        </motion.div>

        {/* Details */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-clGold text-xs tracking-[0.3em] uppercase mb-4">{product.collection} // {product.type}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">{product.name}</h1>
          <p className="text-gray-400 text-lg mb-10 italic">"{product.tagline}"</p>

          <div className="space-y-8 border-t border-white/10 pt-8">
            
            {/* Logo Variant Selection */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Hardware Signature</p>
              <div className="flex gap-4">
                {product.variants.map((v: any) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVariant(v)}
                    className={`flex items-center gap-3 px-6 py-3 border transition-all ${activeVariant.id === v.id ? 'border-white bg-white/5' : 'border-gray-800 hover:border-gray-600'}`}
                  >
                    <div className={`w-3 h-3 rounded-full ${v.logo === 'gold' ? 'bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]' : 'bg-[#C0C0C0] shadow-[0_0_10px_#C0C0C0]'}`} />
                    <span className="text-xs uppercase tracking-wider">{v.logo}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slogans & Details */}
            <div>
               <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Specifications</p>
               <ul className="text-sm text-gray-300 space-y-2 opacity-80">
                 <li>• Aesthetic: Street-Luxe / Sovereign</li>
                 <li>• Signature: High-density embroidery</li>
                 <li>• Detail: "The Real Link" / "One Link, All Legacy"</li>
               </ul>
            </div>

            {/* Action */}
            <div className="pt-8">
              <button 
                onClick={() => setInLookbook(!inLookbook)}
                className={`w-full py-5 border text-sm uppercase tracking-widest transition-all duration-300 ${inLookbook ? 'bg-white text-black border-white' : 'bg-transparent border-clGold text-clGold hover:bg-clGold/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]'}`}
              >
                {inLookbook ? '✓ In Lookbook' : 'Add to Lookbook'}
              </button>
            </div>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
}
