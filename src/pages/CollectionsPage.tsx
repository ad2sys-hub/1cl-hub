import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../hooks/useSovereign';
import ProductCard from '../components/ProductCard';

export default function CollectionsPage() {
  const { t } = useSovereign();
  const [products, setProducts] = useState<any[]>([]);
  const [activeCollection, setActiveCollection] = useState('All');
  const [activeGender, setActiveGender] = useState('All');
  const [activeType, setActiveType] = useState('all');
  const [loading, setLoading] = useState(true);

  const collections = ['All', 'Essentials', 'Heritage', 'Workshop Edition', 'Artist Exclusive'];
  const genders = [
    { id: 'All', label: t('catalog.all') },
    { id: 'Homme', label: t('catalog.men') },
    { id: 'Femme', label: t('catalog.women') },
    { id: 'Unisex', label: t('catalog.unisex') }
  ];
  const types = ['all', 'tshirt', 'pull', 'jogger', 'jacket'];

  useEffect(() => {
    fetch('/1cl-hub/data/catalog.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching catalog:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p => {
    const matchCol = activeCollection === 'All' || p.collection === activeCollection;
    const matchGender = activeGender === 'All' || p.gender === activeGender;
    const matchType = activeType === 'all' || p.type === activeType;
    return matchCol && matchGender && matchType;
  });

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-shadow-gold mb-2 tracking-tighter uppercase italic">{t('catalog.title')}</h1>
          <p className="text-gray-400 tracking-[0.2em] uppercase text-[10px] md:text-xs">{t('catalog.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8 border-b border-white/10 pb-6">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Collection Tabs */}
            <div className="flex space-x-6 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide">
              {collections.map(col => (
                <button
                  key={col}
                  onClick={() => setActiveCollection(col)}
                  className={`whitespace-nowrap uppercase tracking-widest text-[10px] transition-colors pb-2 border-b-2 ${activeCollection === col ? 'border-clGold text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                  {col === 'All' ? t('catalog.all') : t(`catalog.collections.${col.toLowerCase().replace(' ', '')}`)}
                </button>
              ))}
            </div>

            {/* Gender Filters */}
            <div className="flex space-x-4">
              {genders.map(gender => (
                <button
                  key={gender.id}
                  onClick={() => setActiveGender(gender.id)}
                  className={`uppercase tracking-widest text-[10px] transition-colors ${activeGender === gender.id ? 'text-clGold font-bold' : 'text-gray-500 hover:text-white'}`}
                >
                  {gender.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-3 justify-center border-t border-white/5 pt-6">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`uppercase tracking-widest text-[10px] px-4 py-2 rounded-full border transition-all ${activeType === type ? 'border-clChrome bg-clChrome/10 text-white' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
              >
                {t(`catalog.types.${type}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-t-2 border-clGold rounded-full" />
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-500 tracking-widest uppercase text-xs">
                {t('catalog.noResults')}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
