import { motion } from 'framer-motion';

export default function PhilosophyPage() {
  const pillars = [
    { title: "Authenticity", text: "We do not follow trends. In the studio or the atelier, the process is pure. Every stitch, every beat, is born from a raw desire to create something real." },
    { title: "Connection", text: "The physical garment is 'The Real Link'. It bridges the gap between the music we create and the community that lives it. A wearable extension of the Chawblick universe." },
    { title: "Legacy", text: "One Link, All Legacy. Clothes that age with you. Music that stays with you. We are building the sovereign archives of tomorrow." }
  ];

  return (
    <div className="pt-28 pb-32 px-4">
      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.h1 
          className="text-4xl md:text-6xl font-serif text-shadow-gold mb-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          1CL — 1st Class Obsession
        </motion.h1>
        <motion.p 
          className="text-gray-400 text-lg md:text-xl font-light leading-relaxed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
        >
          We are not just a clothing brand. We are an ecosystem. A sovereign physical manifestation of auditory art.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="space-y-32">
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={pillar.title}
              className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="md:w-1/2 relative aspect-square flex items-center justify-center p-8 bg-clDarkGrey/30 border border-white/5">
                <div className="absolute inset-0 bg-clGold/5 mix-blend-overlay" />
                <h2 className="text-6xl md:text-8xl font-serif text-white/5 absolute font-black tracking-tighter mix-blend-overlay">0{idx + 1}</h2>
                <img src="/1cl-hub/images/Logos/logo CL v.1.gold.png" alt="1CL Icon" className="w-32 h-32 object-contain filter drop-shadow-2xl" />
              </div>
              
              <div className="md:w-1/2 space-y-6">
                <h3 className="text-3xl font-serif text-clGold">{pillar.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{pillar.text}</p>
                <div className="h-[1px] w-24 bg-clChrome/30" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
