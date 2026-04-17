import { motion } from 'framer-motion';

export default function AnimatedLine() {
  return (
    <div className="fixed top-20 left-0 w-full h-[1px] bg-white/5 z-40 pointer-events-none">
      <motion.div
        className="h-full w-[20vw] bg-gradient-to-r from-transparent via-clGold to-transparent opacity-70"
        animate={{
          x: ['-100vw', '100vw'],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "linear",
        }}
      />
    </div>
  );
}
