import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import QuickEnquiryModal from './components/QuickEnquiryModal';
import UnderMaintenance from './pages/UnderMaintenance';

// === TOGGLE THIS FOR MAINTENANCE MODE ===
const IS_UNDER_MAINTENANCE = false;
// ========================================

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Career = lazy(() => import('./pages/Career'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));

function PageLoader() {
  return (
    <div className="page-top min-h-[60vh] flex flex-col items-center justify-center w-full">
      <div className="relative flex flex-col items-center justify-center gap-6 sm:gap-8 mt-10">
        {/* Animated Rings */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center drop-shadow-xl">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-y-[3px] sm:border-y-4 border-primary border-x-[3px] sm:border-x-4 border-transparent opacity-80"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[6px] sm:inset-2 rounded-full border-x-[3px] sm:border-x-4 border-accent border-y-[3px] sm:border-y-4 border-transparent opacity-90"
          />
          {/* Pulsing center core */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_15px_rgba(230,57,70,0.6)]"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <motion.span 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] sm:text-xs font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
          >
            Loading
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page-top min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-9xl font-black text-gray-100 mb-4">404</div>
      <h2 className="text-3xl font-bold text-dark mb-3">Page Not Found</h2>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary">Go Home</a>
    </div>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  if (IS_UNDER_MAINTENANCE) {
    return <UnderMaintenance />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar onEnquiry={() => setModalOpen(true)} />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/:section" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/pricing/:category" element={<Pricing />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/career" element={<Career />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
        <QuickEnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
