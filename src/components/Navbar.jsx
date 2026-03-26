import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBars, FaTimes, FaChevronDown, FaPhone,
  FaGlobe, FaMobileAlt, FaServer, FaPalette,
  FaSearch, FaShareAlt, FaPaintBrush, FaPen,
  FaMousePointer, FaBullhorn, FaEnvelope,
  FaWhatsapp, FaChevronRight, FaArrowRight,
  FaUsers, FaInfoCircle, FaTasks, FaCalendarAlt,
  FaTags, FaFacebook, FaInstagram, FaTiktok,
} from 'react-icons/fa';

/* ── Data ──────────────────────────────────────────────────── */
const devServices = [
  { to: '/services/website-development', label: 'Website Development', icon: FaGlobe, desc: 'Custom, high-performance websites', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { to: '/services/app-development', label: 'App Development', icon: FaMobileAlt, desc: 'iOS & Android mobile apps', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { to: '/services/software-development', label: 'System/Software Development', icon: FaServer, desc: 'Enterprise-grade software solutions', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { to: '/services/ui-ux-design', label: 'UI/UX Design', icon: FaPalette, desc: 'Intuitive interfaces & experiences', color: 'text-violet-400', bg: 'bg-violet-500/10' },
];

const mktServices = [
  { to: '/services/seo', label: 'Search Engine Optimization', icon: FaSearch, desc: 'Rank higher, grow organically', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { to: '/services/social-media-marketing', label: 'Social Media Marketing', icon: FaShareAlt, desc: 'Engage your target audience', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { to: '/services/graphic-design', label: 'Graphic Design', icon: FaPaintBrush, desc: 'Visual storytelling for your brand', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { to: '/services/content-writing', label: 'Content Writing', icon: FaPen, desc: 'Content that converts & connects', color: 'text-green-400', bg: 'bg-green-500/10' },
  { to: '/services/pay-per-click', label: 'Pay Per Click', icon: FaMousePointer, desc: 'Optimized PPC campaigns', color: 'text-red-400', bg: 'bg-red-500/10' },
  { to: '/services/digital-marketing', label: 'Digital Marketing', icon: FaBullhorn, desc: 'Full-funnel digital strategy', color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

const aboutLinks = [
  { to: '/about', label: 'Introduction', icon: FaInfoCircle, desc: 'Who we are & our story' },
  { to: '/about#how-we-work', label: 'How We Work', icon: FaTasks, desc: 'Our proven process' },
  { to: '/about#journey', label: 'Our Journey', icon: FaCalendarAlt, desc: 'Milestones & achievements' },
  { to: '/about#team', label: 'Our Team', icon: FaUsers, desc: 'Meet the experts' },
];

const pricingLinks = [
  { to: '/pricing/seo', label: 'SEO Package', icon: FaSearch, desc: 'Boost your search rankings' },
  { to: '/pricing/social-media', label: 'Social Media Package', icon: FaShareAlt, desc: 'Grow your social presence' },
];

/* ── Animation variants ────────────────────────────────────── */
const megaVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.98, x: '-50%' },
  visible: { opacity: 1, y: 0, scale: 1, x: '-50%', transition: { duration: 0.22, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, scale: 0.98, x: '-50%', transition: { duration: 0.15 } },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.12 } },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);
  const timerRef = useRef(null);

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close on route change */
  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  /* lock body when drawer open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* click outside */
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveDropdown(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openMenu = (key) => { clearTimeout(timerRef.current); setActiveDropdown(key); };
  const closeMenu = () => { timerRef.current = setTimeout(() => setActiveDropdown(null), 120); };
  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-xl shadow-black/5'
          : 'bg-white'
          }`}
      >
        {/* ── Top bar ─────────────────────────── */}
        <div className="hidden md:block bg-gradient-to-r from-[#0a1f5c] to-[#1a3c8f] text-white py-1.5 sm:py-2">
          <div className="container-custom flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs gap-1.5 md:gap-0">
            <span className="text-blue-200/80 font-medium text-center flex items-center justify-center gap-1.5">
              <img src="https://flagcdn.com/w20/np.png" alt="Nepal Flag" className="w-3.5 h-auto rounded-[1px]" /> Welcome to Reviral Technology — Bhairahawa, Nepal
            </span>
            <div className="flex items-center flex-wrap justify-center gap-x-3 gap-y-1 sm:gap-4">
              <a href="tel:+9779811418243" className="flex items-center gap-1.5 hover:text-accent transition-colors font-semibold">
                <FaPhone className="text-[9px] sm:text-[10px]" /> <span className="tracking-wider">+977-9811418243</span>
              </a>
              <span className="text-white/30 hidden sm:inline">|</span>
              <a href="mailto:info@reviraltechnology.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <FaEnvelope className="text-[9px] sm:text-[10px]" /> <span className="tracking-wide">info@reviraltechnology.com</span>
              </a>
              <span className="text-white/30 hidden sm:inline">|</span>
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/reviraltechnology" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Facebook">
                  <FaFacebook className="text-[11px] sm:text-xs" />
                </a>
                <a href="https://www.instagram.com/reviraltechnology/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram">
                  <FaInstagram className="text-[11px] sm:text-xs" />
                </a>
                <a href="https://www.tiktok.com/@reviraltech?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="TikTok">
                  <FaTiktok className="text-[11px] sm:text-xs" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main nav ────────────────────────── */}
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 relative">

            {/* Mobile Center Title */}
            <span className="absolute left-1/2 -translate-x-1/2 lg:hidden font-black text-primary text-xl sm:text-2xl tracking-tight whitespace-nowrap">
              Reviral Technology
            </span>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src="https://res.cloudinary.com/duhouukqs/image/upload/v1774392570/cropped-reviral_Logo_gyd70h.webp"
                alt="Reviral Technology"
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-black text-sm">R</span>
                </div>
                <div className="leading-tight">
                  <div className="font-black text-primary text-base tracking-tight">Reviral</div>
                  <div className="text-[10px] text-gray-400 font-medium -mt-0.5">Technology</div>
                </div>
              </div>
            </Link>

            {/* ── Desktop links ─────────────── */}
            <div className="hidden lg:flex items-center gap-0.5">

              {/* Home */}
              <NavItem to="/" label="Home" isActive={isActive('/')} exact />

              {/* About dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openMenu('about')}
                onMouseLeave={closeMenu}
              >
                <NavItemBtn
                  label="About"
                  open={activeDropdown === 'about'}
                  active={isActive('/about')}
                />
                <AnimatePresence>
                  {activeDropdown === 'about' && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden" animate="visible" exit="exit"
                      onMouseEnter={() => openMenu('about')}
                      onMouseLeave={closeMenu}
                      className="absolute top-[calc(100%+4px)] left-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100/80 py-3 z-50 overflow-hidden"
                      style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)' }}
                    >
                      {/* header stripe */}
                      <div className="px-4 pb-3 mb-1 border-b border-gray-50">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">About Reviral</p>
                      </div>
                      {aboutLinks.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.to}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <Link
                              to={item.to}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/5 group transition-colors"
                            >
                              <div className="w-8 h-8 bg-primary/8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                <Icon className="text-primary text-xs group-hover:text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">{item.label}</p>
                                <p className="text-[11px] text-gray-400">{item.desc}</p>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services mega dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openMenu('services')}
                onMouseLeave={closeMenu}
              >
                <NavItemBtn
                  label="Service"
                  open={activeDropdown === 'services'}
                  active={isActive('/services')}
                />
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div
                      variants={megaVariants}
                      initial="hidden" animate="visible" exit="exit"
                      onMouseEnter={() => openMenu('services')}
                      onMouseLeave={closeMenu}
                      className="fixed left-1/2 mt-1 z-50 overflow-hidden"
                      style={{
                        top: 'calc(var(--nav-height, 104px))',
                        width: 'min(860px, 95vw)',
                        boxShadow: '0 24px 80px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)',
                        borderRadius: '20px',
                      }}
                    >
                      <div className="bg-white rounded-[20px] overflow-hidden">

                        {/* Mega header */}
                        <div className="bg-gradient-to-r from-[#0a1f5c] to-[#1a3c8f] px-8 py-5 flex items-center justify-between">
                          <div>
                            <p className="text-white font-black text-lg">Our Services</p>
                            <p className="text-blue-200/70 text-xs mt-0.5">Full-stack digital solutions for your business</p>
                          </div>
                          <Link
                            to="/services"
                            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all border border-white/20"
                          >
                            See All Services <FaArrowRight className="text-[10px]" />
                          </Link>
                        </div>

                        {/* Two columns */}
                        <div className="grid grid-cols-2 gap-0 divide-x divide-gray-100">
                          {/* Development */}
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                                <FaServer className="text-white text-[10px]" />
                              </div>
                              <p className="text-xs font-black text-blue-600 uppercase tracking-[0.15em]">Development</p>
                            </div>
                            <div className="space-y-1">
                              {devServices.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                  <motion.div
                                    key={item.to}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                  >
                                    <Link
                                      to={item.to}
                                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 group transition-all"
                                    >
                                      <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                        <Icon className={`${item.color} text-sm`} />
                                      </div>
                                      <div>
                                        <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors leading-tight">{item.label}</p>
                                        <p className="text-[11px] text-gray-400 leading-tight">{item.desc}</p>
                                      </div>
                                      <FaChevronRight className="text-gray-300 text-[10px] ml-auto group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Marketing */}
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center">
                                <FaBullhorn className="text-white text-[10px]" />
                              </div>
                              <p className="text-xs font-black text-red-500 uppercase tracking-[0.15em]">Marketing</p>
                            </div>
                            <div className="space-y-1">
                              {mktServices.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                  <motion.div
                                    key={item.to}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                  >
                                    <Link
                                      to={item.to}
                                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 group transition-all"
                                    >
                                      <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                        <Icon className={`${item.color} text-sm`} />
                                      </div>
                                      <div>
                                        <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors leading-tight">{item.label}</p>
                                        <p className="text-[11px] text-gray-400 leading-tight">{item.desc}</p>
                                      </div>
                                      <FaChevronRight className="text-gray-300 text-[10px] ml-auto group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Mega footer */}
                        <div className="bg-gray-50/80 border-t border-gray-100 px-8 py-3 flex items-center justify-between">
                          <p className="text-xs text-gray-400">💡 Not sure what you need?</p>
                          <Link
                            to="/contact"
                            className="text-xs font-bold text-primary hover:text-blue-700 flex items-center gap-1 transition-colors"
                          >
                            Talk to our experts <FaArrowRight className="text-[9px]" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pricing dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openMenu('pricing')}
                onMouseLeave={closeMenu}
              >
                <NavItemBtn
                  label="Pricing"
                  open={activeDropdown === 'pricing'}
                  active={isActive('/pricing')}
                />
                <AnimatePresence>
                  {activeDropdown === 'pricing' && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden" animate="visible" exit="exit"
                      onMouseEnter={() => openMenu('pricing')}
                      onMouseLeave={closeMenu}
                      className="absolute top-[calc(100%+4px)] left-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50"
                      style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
                    >
                      <div className="px-4 pb-3 mb-1 border-b border-gray-50">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Pricing Plans</p>
                      </div>
                      {pricingLinks.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <motion.div key={item.to} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                            <Link
                              to={item.to}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/5 group transition-colors"
                            >
                              <div className="w-8 h-8 bg-primary/8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all">
                                <Icon className="text-primary text-xs group-hover:text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">{item.label}</p>
                                <p className="text-[11px] text-gray-400">{item.desc}</p>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavItem to="/portfolio" label="Our Work" isActive={isActive('/portfolio')} />
              <NavItem to="/career" label="Career" isActive={isActive('/career')} />
              <NavItem to="/contact" label="Contact" isActive={isActive('/contact')} />
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+9779811418243"
                className="hidden md:flex items-center gap-2 text-primary font-semibold text-sm hover:text-blue-700 transition-colors"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                  <FaPhone className="text-primary text-xs" />
                </div>
                <span className="hidden xl:inline">+977-9811418243</span>
              </a>

              <Link
                to="/contact"
                className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-accent to-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Quick Enquiry
              </Link>

              {/* Hamburger */}
              <button
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-primary/8 hover:bg-primary/15 text-primary transition-all"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <FaTimes className="text-lg" />
                    </motion.span>
                  ) : (
                    <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <FaBars className="text-lg" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden" animate="visible" exit="exit"
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="hidden" animate="visible" exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-[88vw] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="bg-gradient-to-r from-[#0a1f5c] to-[#1a3c8f] px-5 pt-8 pb-6 flex-shrink-0">
                <div className="flex items-center justify-between mb-6">
                  <img
                    src="https://res.cloudinary.com/duhouukqs/image/upload/v1774392570/cropped-reviral_Logo_gyd70h.webp"
                    alt="Reviral Technology"
                    className="h-9 object-contain brightness-0 invert"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="hidden text-white font-black text-lg">Reviral</span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center text-white hover:bg-white/25 transition-all"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Quick contacts in drawer header */}
                <div className="space-y-2">
                  <a href="tel:+9779811418243" className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-medium hover:bg-white/20 transition-all">
                    <FaPhone className="text-xs text-blue-300" /> +977-9811418243
                  </a>
                  <a href="https://wa.me/9779811418243" className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-medium hover:bg-white/20 transition-all">
                    <FaWhatsapp className="text-xs text-green-400" /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Drawer nav items */}
              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">

                <DrawerLink to="/" label="🏠 Home" isActive={isActive('/')} exact />

                {/* About accordion */}
                <DrawerAccordion
                  label="👋 About"
                  id="about"
                  expanded={mobileExpanded}
                  setExpanded={setMobileExpanded}
                >
                  {aboutLinks.map((item) => (
                    <Link key={item.to} to={item.to} className="flex items-center gap-2 py-2.5 px-3 text-sm text-gray-600 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors">
                      <FaChevronRight className="text-[10px] text-gray-300" /> {item.label}
                    </Link>
                  ))}
                </DrawerAccordion>

                {/* Services accordion */}
                <DrawerAccordion
                  label="⚙️ Services"
                  id="services"
                  expanded={mobileExpanded}
                  setExpanded={setMobileExpanded}
                >
                  <div className="pt-1 pb-1">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider px-3 py-1">💻 Development</p>
                    {devServices.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.to} to={item.to} className="flex items-center gap-2.5 py-2 px-3 text-sm text-gray-700 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors group">
                          <Icon className={`${item.color} text-xs flex-shrink-0`} />
                          <span className="group-hover:text-primary transition-colors">{item.label}</span>
                        </Link>
                      );
                    })}
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-wider px-3 py-1 mt-2">📣 Marketing</p>
                    {mktServices.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.to} to={item.to} className="flex items-center gap-2.5 py-2 px-3 text-sm text-gray-700 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors group">
                          <Icon className={`${item.color} text-xs flex-shrink-0`} />
                          <span className="group-hover:text-primary transition-colors">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </DrawerAccordion>

                {/* Pricing accordion */}
                <DrawerAccordion
                  label="🏷️ Pricing"
                  id="pricing"
                  expanded={mobileExpanded}
                  setExpanded={setMobileExpanded}
                >
                  {pricingLinks.map((item) => (
                    <Link key={item.to} to={item.to} className="flex items-center gap-2 py-2.5 px-3 text-sm text-gray-600 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors">
                      <FaChevronRight className="text-[10px] text-gray-300" /> {item.label}
                    </Link>
                  ))}
                </DrawerAccordion>

                <DrawerLink to="/portfolio" label="🖼️ Our Work" isActive={isActive('/portfolio')} />
                <DrawerLink to="/career" label="💼 Career" isActive={isActive('/career')} />
                <DrawerLink to="/blog" label="📝 Blog" isActive={isActive('/blog')} />
                <DrawerLink to="/contact" label="📩 Contact" isActive={isActive('/contact')} />
              </div>

              {/* Drawer footer CTA */}
              <div className="flex-shrink-0 p-4 border-t border-gray-100 space-y-2">
                <Link
                  to="/contact"
                  className="w-full bg-gradient-to-r from-accent to-red-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/30 transition-all text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Quick Enquiry <FaArrowRight className="text-xs" />
                </Link>
                <p className="text-center text-gray-400 text-xs">© 2026 Reviral Technology</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Sub-components ────────────────────────────────────────── */

function NavItem({ to, label, isActive, exact }) {
  const active = exact ? isActive : isActive;
  return (
    <Link
      to={to}
      className={`relative px-3.5 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg group ${active ? 'text-primary' : 'text-gray-600 hover:text-primary'
        }`}
    >
      {label}
      <span className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary transition-all duration-300 ${active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'}`} />
    </Link>
  );
}

function NavItemBtn({ label, open, active }) {
  return (
    <button
      className={`relative px-3.5 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg flex items-center gap-1 group ${open || active ? 'text-primary' : 'text-gray-600 hover:text-primary'
        }`}
    >
      {label}
      <FaChevronDown className={`text-[10px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      <span className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary transition-all duration-300 ${open || active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'}`} />
    </button>
  );
}

function DrawerLink({ to, label, isActive }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
        }`}
    >
      {label}
    </Link>
  );
}

function DrawerAccordion({ label, id, expanded, setExpanded, children }) {
  const isOpen = expanded === id;
  return (
    <div className="rounded-xl overflow-hidden">
      <button
        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-all ${isOpen ? 'text-primary bg-primary/8' : 'text-gray-700 hover:bg-gray-50'}`}
        onClick={() => setExpanded(isOpen ? null : id)}
      >
        <span>{label}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FaChevronDown className="text-xs" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden bg-gray-50/80 border-t border-gray-100"
          >
            <div className="px-2 py-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
