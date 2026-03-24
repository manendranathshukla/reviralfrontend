import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SafeLottie from './SafeLottie';
import {
  FaGlobe, FaMobileAlt, FaCode, FaPalette, FaSearch,
  FaShareAlt, FaPaintBrush, FaPen, FaMousePointer, FaBullhorn, FaArrowRight
} from 'react-icons/fa';
import { fetchServices } from '../api';

const LOTTIE_SERVICES          = 'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json';
const LOTTIE_SERVICES_FALLBACK = 'https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json';

const iconMap = {
  FaGlobe, FaMobile: FaMobileAlt, FaCode, FaPalette, FaSearch,
  FaShareAlt, FaPaintBrush, FaPen, FaMousePointer, FaBullhorn,
};

const cardThemes = [
  { gradient: 'from-blue-500 to-blue-700', light: 'bg-blue-50', text: 'text-blue-600', ring: 'group-hover:ring-blue-200' },
  { gradient: 'from-violet-500 to-violet-700', light: 'bg-violet-50', text: 'text-violet-600', ring: 'group-hover:ring-violet-200' },
  { gradient: 'from-emerald-500 to-emerald-700', light: 'bg-emerald-50', text: 'text-emerald-600', ring: 'group-hover:ring-emerald-200' },
  { gradient: 'from-orange-500 to-orange-700', light: 'bg-orange-50', text: 'text-orange-600', ring: 'group-hover:ring-orange-200' },
  { gradient: 'from-rose-500 to-rose-700', light: 'bg-rose-50', text: 'text-rose-600', ring: 'group-hover:ring-rose-200' },
  { gradient: 'from-pink-500 to-pink-700', light: 'bg-pink-50', text: 'text-pink-600', ring: 'group-hover:ring-pink-200' },
  { gradient: 'from-indigo-500 to-indigo-700', light: 'bg-indigo-50', text: 'text-indigo-600', ring: 'group-hover:ring-indigo-200' },
  { gradient: 'from-amber-500 to-amber-600', light: 'bg-amber-50', text: 'text-amber-600', ring: 'group-hover:ring-amber-200' },
];

const defaultServices = [
  { id: 1, title: 'Website Development', slug: 'website-development', category: 'development', short_description: 'Highly functional & visually appealing website designed to meet your need.', icon: 'FaGlobe' },
  { id: 2, title: 'App Development', slug: 'app-development', category: 'development', short_description: 'Innovative and user-friendly mobile application designed to engage users.', icon: 'FaMobile' },
  { id: 3, title: 'System/Software Development', slug: 'software-development', category: 'development', short_description: 'System/software developed according to your business needs.', icon: 'FaCode' },
  { id: 4, title: 'UI/UX Design', slug: 'ui-ux-design', category: 'development', short_description: 'Eye-catching UI/UX interfaces for effortless user interaction.', icon: 'FaPalette' },
  { id: 5, title: 'Search Engine Optimization', slug: 'seo', category: 'marketing', short_description: 'Custom SEO solutions for enhanced search engine visibility and growth.', icon: 'FaSearch' },
  { id: 6, title: 'Social Media Marketing', slug: 'social-media-marketing', category: 'marketing', short_description: 'Build a strong online presence and engage with your targeted audience.', icon: 'FaShareAlt' },
  { id: 7, title: 'Graphic Design', slug: 'graphic-design', category: 'marketing', short_description: "Designs that Speak Your Brand's Narrative and Connect with Your Audience.", icon: 'FaPaintBrush' },
  { id: 8, title: 'Content Writing', slug: 'content-writing', category: 'marketing', short_description: 'Engaging and meaningful content to connect with your audience.', icon: 'FaPen' },
];

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[service.icon] || FaCode;
  const theme = cardThemes[index % cardThemes.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
    >
      <Link
        to={`/services/${service.slug}`}
        className={`group block bg-white rounded-2xl p-6 h-full border border-gray-100 hover:border-transparent hover:shadow-2xl ring-4 ring-transparent ${theme.ring} transition-all duration-400 hover:-translate-y-2 relative overflow-hidden`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="text-white text-2xl" />
        </div>

        {/* Category badge */}
        <span className={`text-xs font-bold uppercase tracking-wider ${theme.text} ${theme.light} px-2 py-1 rounded-md mb-3 inline-block`}>
          {service.category}
        </span>

        <h3 className="font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
          {service.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          {service.short_description}
        </p>

        {/* Bottom arrow */}
        <div className={`flex items-center gap-2 text-sm font-semibold ${theme.text} transition-all duration-300`}>
          Learn More
          <span className="w-7 h-7 rounded-full bg-current/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <FaArrowRight className="text-xs" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const [services, setServices] = useState(defaultServices);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    fetchServices()
      .then((r) => {
        const d = r.data?.results || r.data;
        if (d?.length) setServices(d);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle">our services</p>
            <h2 className="section-title mb-5">
              Exceptional Services For<br />Your Business Growth
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Discover our wide range of digital solutions to enhance your online presence 
              and drive real business results.
            </p>
            <Link to="/services" className="btn-primary">
              See All Services <FaArrowRight />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <SafeLottie
              src={LOTTIE_SERVICES}
              fallbackSrc={LOTTIE_SERVICES_FALLBACK}
              style={{ height: '280px', width: '280px' }}
            />
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.slice(0, 8).map((service, i) => (
            <ServiceCard key={service.id || i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
