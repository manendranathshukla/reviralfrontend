import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import QuickEnquiryModal from './components/QuickEnquiryModal';

const Home          = lazy(() => import('./pages/Home'));
const About         = lazy(() => import('./pages/About'));
const Services      = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Pricing       = lazy(() => import('./pages/Pricing'));
const Portfolio     = lazy(() => import('./pages/Portfolio'));
const Career        = lazy(() => import('./pages/Career'));
const Contact       = lazy(() => import('./pages/Contact'));
const Blog          = lazy(() => import('./pages/Blog'));
const BlogDetail    = lazy(() => import('./pages/BlogDetail'));

function PageLoader() {
  return (
    <div className="page-top min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
        <span className="text-sm text-gray-400 font-medium">Loading...</span>
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
