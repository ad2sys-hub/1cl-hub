import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedLine from '../components/AnimatedLine';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-clBlack text-white w-full">
      <AnimatedLine />
      <Header />
      
      <main className="flex-grow w-full relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <Outlet />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
