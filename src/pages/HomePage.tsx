import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 px-4">
        {/* Background ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[60vw] h-[60vw] bg-clGold rounded-full blur-[150px] mix-blend-screen" />
        </div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 w-48 h-48 md:w-64 md:h-64 mb-8"
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
