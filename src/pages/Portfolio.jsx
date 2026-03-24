import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaExternalLinkAlt, FaCode, FaMobileAlt, FaSearch,
  FaPalette, FaBullhorn, FaGlobe, FaArrowRight, FaFire,
} from 'react-icons/fa';
import SafeLottie from '../components/SafeLottie';
import { fetchPortfolio } from '../api';

const LOTTIE_WORK     = 'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json';
const LOTTIE_FALLBACK = 'https://assets7.lottiefiles.com/packages/lf20_w51pcehl.json';

const defaultPortfolio = [
  {
    id: 1, title: 'E-Commerce Platform', category: 'Web Development',
    description: 'A fully-featured e-commerce platform with product management, cart, payment integration, and real-time inventory tracking.',
    technologies: 'React, Django, PostgreSQL', emoji: '🛒',
    gradient: 'from-blue-600 via-blue-700 to-indigo-800',
    tag: 'Featured',
  },
  {
    id: 2, title: 'Healthcare Mobile App', category: 'App Development',
    description: 'Cross-platform mobile application for healthcare management, patient tracking, appointment booking, and telemedicine.',
    technologies: 'Flutter, Firebase', emoji: '🏥',
    gradient: 'from-emerald-500 via-green-600 to-teal-700',
    tag: 'Popular',
  },
  {
    id: 3, title: 'SEO Campaign — 200% Growth', category: 'SEO',
    description: 'Comprehensive SEO campaign that resulted in 200% organic traffic growth in 6 months through technical SEO and content strategy.',
    technologies: 'SEO, Content Marketing, Google Analytics', emoji: '📈',
    gradient: 'from-orange-500 via-red-500 to-rose-600',
    tag: 'Case Study',
  },
  {
    id: 4, title: 'Corporate Website Redesign', category: 'Web Development',
    description: 'Modern, responsive corporate website with custom CMS, performance optimization, and measurable 3× lead generation increase.',
    technologies: 'Next.js, Tailwind CSS, Strapi', emoji: '🏢',
    gradient: 'from-purple-500 via-purple-600 to-violet-700',
    tag: 'Design',
  },
  {
    id: 5, title: 'Food Delivery Application', category: 'App Development',
    description: 'Real-time food delivery mobile application with live GPS tracking, push notifications, and seamless payment gateway.',
    technologies: 'React Native, Node.js, Redis', emoji: '🍔',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    tag: 'Live',
  },
  {
    id: 6, title: 'Complete Brand Identity', category: 'Graphic Design',
    description: 'Complete brand identity system including logo suite, color palette, typography guide, and comprehensive brand guidelines.',
    technologies: 'Figma, Adobe Illustrator, Photoshop', emoji: '🎨',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    tag: 'Branding',
  },
  {
    id: 7, title: 'Digital Marketing Campaign', category: 'SMM',
    description: 'Multi-channel social media marketing campaign achieving 500% ROI through targeted Facebook and Instagram ads.',
    technologies: 'Facebook Ads, Instagram, Analytics', emoji: '📣',
    gradient: 'from-cyan-500 via-sky-600 to-blue-700',
    tag: 'Marketing',
  },
  {
    id: 8, title: 'School Management System', category: 'Web Development',
    description: 'Comprehensive school ERP system handling students, teachers, attendance, grades, fee management, and parent portal.',
    technologies: 'Django, React, MySQL', emoji: '🏫',
    gradient: 'from-indigo-500 via-blue-600 to-cyan-600',
    tag: 'Enterprise',
  },
  {
    id: 9, title: 'Travel Booking Portal', category: 'Web Development',
    description: 'Nepal travel booking platform with hotel listings, tour packages, real-time availability, and secure payment.',
    technologies: 'Next.js, Prisma, Stripe', emoji: '✈️',
    gradient: 'from-teal-500 via-cyan-600 to-blue-600',
    tag: 'Travel',
  },
];

const categoryConfig = {
  'All': { icon: FaFire, emoji: '🔥' },
  'Web Development': { icon: FaCode, emoji: '💻' },
  'App Development': { icon: FaMobileAlt, emoji: '📱' },
  'SEO': { icon: FaSearch, emoji: '🔍' },
  'Graphic Design': { icon: FaPalette, emoji: '🎨' },
  'SMM': { icon: FaBullhorn, emoji: '📣' },
};

const heroStats = [
  { value: '150+', label: 'Projects Delivered', emoji: '🚀' },
  { value: '8+', label: 'Industries', emoji: '🌐' },
  { value: '98%', label: 'Client Satisfaction', emoji: '⭐' },
  { value: '5+', label: 'Years Experience', emoji: '📅' },
];

export default function Portfolio() {
  const [projects, setProjects] = useState(defaultPortfolio);
  const [filter, setFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetchPortfolio()
      .then((r) => {
        const d = r.data?.results || r.data;
        if (d?.length) setProjects(d);
      })
      .catch(() => {});
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="pt-24 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center bg-[#060e2b] overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-600/15 blur-[100px] pointer-events-none" />
        <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />

        <div className="container-custom relative z-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Our Portfolio
            </motion.span>

            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              Work That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Speaks
              </span>
              {' '}For Itself
            </h1>

            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-lg">
              From e-commerce platforms to mobile apps and digital marketing campaigns — 
              explore how we've helped businesses across Nepal and beyond grow digitally.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Start Your Project <FaArrowRight />
              </Link>
              <a href="#projects" className="glass text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all inline-flex items-center gap-2">
                View Projects
              </a>
            </div>
          </motion.div>

          {/* Lottie + floating stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
              <SafeLottie
                src={LOTTIE_WORK}
                fallbackSrc={LOTTIE_FALLBACK}
                style={{ width: '400px', maxWidth: '100%', height: '360px' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-t-2xl overflow-hidden">
              {heroStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass-dark text-center px-6 py-5"
                >
                  <div className="text-2xl mb-1">{s.emoji}</div>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-white/50 text-xs">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section id="projects" className="py-24 bg-[#060e2b] relative">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.25em] mb-3 flex items-center justify-center gap-2">
              <span className="w-5 h-0.5 bg-cyan-400 rounded-full" /> All Projects <span className="w-5 h-0.5 bg-cyan-400 rounded-full" />
            </p>
            <h2 className="text-4xl font-black text-white mb-4">Our Latest Work</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Browse our curated selection of projects across different industries and technologies.
            </p>
          </motion.div>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => {
              const config = categoryConfig[cat] || { emoji: '📁' };
              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    filter === cat
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/30'
                      : 'glass text-white/60 hover:text-white hover:bg-white/15'
                  }`}
                >
                  <span>{config.emoji}</span>
                  {cat}
                </motion.button>
              );
            })}
          </div>

          {/* Cards */}
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: (i % 3) * 0.07 }}
                  onHoverStart={() => setHoveredId(project.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="group glass-card overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Card header */}
                  <div className={`relative h-48 bg-gradient-to-br ${project.gradient || 'from-blue-600 to-purple-700'} overflow-hidden`}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <>
                        {/* Decorative circles */}
                        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-black/10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-30 select-none">
                          {project.emoji || project.title.charAt(0)}
                        </div>
                        {/* Grid lines */}
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                        />
                      </>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="glass text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Tag badge */}
                    {project.tag && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                          {project.tag}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <AnimatePresence>
                      {hoveredId === project.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center"
                        >
                          <div className="glass px-4 py-2 rounded-xl text-white text-sm font-semibold flex items-center gap-2">
                            <FaGlobe /> View Details
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.split(',').map((tech) => (
                          <span
                            key={tech}
                            className="bg-white/8 border border-white/10 text-white/60 text-xs px-2.5 py-1 rounded-lg font-medium"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors"
                      >
                        View Live Project <FaExternalLinkAlt className="text-xs" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 text-white/20 text-xs font-medium">
                        <FaCode className="text-xs" />
                        Private / Internal Project
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#0a1228] via-[#0f1e4a] to-[#060e2b]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 glass text-white/70 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              🚀 Start Your Project Today
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
              Ready to Be Our<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Next Success Story?
              </span>
            </h2>
            <p className="text-white/40 mb-10 max-w-lg mx-auto text-lg">
              Join 150+ businesses that have trusted Reviral Technology to build their digital presence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary px-8 py-4 text-base">
                Let's Work Together <FaArrowRight />
              </Link>
              <Link to="/services" className="glass text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all inline-flex items-center gap-2">
                See Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
