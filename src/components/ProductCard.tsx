import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Variant {
  id: string;
  logo: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  collection: string;
  type: string;
  color: string;
  variants: Variant[];
  tags: string[];
  tagline: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { t } = useSovereign();
  const [activeVariant, setActiveVariant] = useState(product.variants[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="group relative flex flex-col bg-clDarkGrey/40 border border-white/5 hover:border-clGold/30 transition-colors duration-500 rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Quick View Overlay */}
      <div className={`absolute top-4 right-4 z-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <span className="bg-black/80 backdrop-blur-md text-clGold text-[10px] uppercase tracking-widest px-2 py-1 border border-clGold/20">
          {t('catalog.quickView')}
        </span>
      </div>

      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] bg-black/50 overflow-hidden flex items-center justify-center p-6">
        <motion.img 
          src={`/1cl-hub${activeVariant.image}`}
          alt={product.name}
          className="w-full h-full object-contain filter drop-shadow-2xl"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-gray-500 text-[10px] tracking-widest uppercase mb-1">{product.collection}</p>
            <h3 className="text-white font-serif tracking-wide">{product.name}</h3>
          </div>
        </div>

        {/* Variant Switches */}
        <div className="mt-auto pt-4 flex gap-2">
          {product.variants.map((v) => (
            <button
              key={v.id}
              onClick={(e) => {
                e.preventDefault();
                setActiveVariant(v);
              }}
              className={`w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center transition-all ${activeVariant.id === v.id ? 'border-white scale-110' : 'hover:border-gray-400'}`}
              title={`${v.logo} Logo`}
            >
              <div className={`w-4 h-4 rounded-full ${v.logo === 'gold' ? 'bg-[#D4AF37]' : 'bg-[#C0C0C0]'}`} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
