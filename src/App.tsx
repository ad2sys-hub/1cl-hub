import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context
import { SovereignProvider } from './context/SovereignContext';

// Pages
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductPage from './pages/ProductPage';
import PhilosophyPage from './pages/PhilosophyPage';
import SponsorsPage from './pages/SponsorsPage';
import Map4DPage from './pages/Map4DPage';
import FAQPage from './pages/FAQPage';
import LegalPage from './pages/LegalPage';
import ContactPage from './pages/ContactPage';
import MVPExperience from './pages/MVPExperience';
import MVPProductPage from './pages/MVPProductPage';
import DTSMatrixPage from './pages/DTSMatrixPage';
import DTSProductPage from './pages/DTSProductPage';
import CheckoutPage from './pages/CheckoutPage';
import LookbookPage from './pages/LookbookPage';

// Layout
import MainLayout from './layouts/MainLayout';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/map" element={<Map4DPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mvp" element={<MVPExperience />} />
          <Route path="/mvp/product/:id" element={<MVPProductPage />} />
          <Route path="/dts" element={<DTSMatrixPage />} />
          <Route path="/dts/:id" element={<DTSProductPage />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <SovereignProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </SovereignProvider>
  );
}

export default App;
