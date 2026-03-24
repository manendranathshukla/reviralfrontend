import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaGlobe, FaMobileAlt, FaCode, FaPalette, FaSearch,
  FaShareAlt, FaPaintBrush, FaPen, FaMousePointer, FaBullhorn, FaArrowRight
} from 'react-icons/fa';
import { fetchServices } from '../api';

const iconMap = {
  FaGlobe, FaMobile: FaMobileAlt, FaCode, FaPalette, FaSearch,
  FaShareAlt, FaPaintBrush, FaPen, FaMousePointer, FaBullhorn,
};

const defaultServices = [
  { id: 1, title: 'Website Development', slug: 'website-development', category: 'development', short_description: 'Highly functional & visually appealing website designed to meet your need.', icon: 'FaGlobe' },
  { id: 2, title: 'App Development', slug: 'app-development', category: 'development', short_description: 'Innovative and user-friendly mobile application designed to engage users.', icon: 'FaMobile' },
  { id: 3, title: 'System/Software Development', slug: 'software-development', category: 'development', short_description: 'System/software developed according to your business needs.', icon: 'FaCode' },
  { id: 4, title: 'UI/UX Design', slug: 'ui-ux-design', category: 'development', short_description: 'Eye-catching UI/UX interfaces for effortless user interaction.', icon: 'FaPalette' },
  { id: 5, title: 'Search Engine Optimization (SEO)', slug: 'seo', category: 'marketing', short_description: 'Custom SEO solutions for enhanced search engine visibility and growth.', icon: 'FaSearch' },
  { id: 6, title: 'Social Media Marketing (SMM)', slug: 'social-media-marketing', category: 'marketing', short_description: 'Build a strong online presence and engage with your targeted audience.', icon: 'FaShareAlt' },
  { id: 7, title: 'Graphic Design', slug: 'graphic-design', category: 'marketing', short_description: "Designs that Speak Your Brand's Narrative and Connect with Your Audience.", icon: 'FaPaintBrush' },
  { id: 8, title: 'Content Writing', slug: 'content-writing', category: 'marketing', short_description: 'Engaging and meaningful content to connect with your audience.', icon: 'FaPen' },
  { id: 9, title: 'Pay Per Click', slug: 'pay-per-click', category: 'marketing', short_description: 'Optimized Pay-Per-Click Campaigns for maximum ROI.', icon: 'FaMousePointer' },
  { id: 10, title: 'Digital Marketing', slug: 'digital-marketing', category: 'marketing', short_description: "Designing Digital Paths That Echo with Audiences.", icon: 'FaBullhorn' },
];

const colorMap = [
  'from-blue-500 to-blue-700', 'from-purple-500 to-purple-700',
  'from-green-500 to-green-700', 'from-orange-500 to-orange-700',
  'from-red-500 to-red-700', 'from-pink-500 to-pink-700',
  'from-indigo-500 to-indigo-700', 'from-yellow-500 to-yellow-600',
  'from-teal-500 to-teal-700', 'from-cyan-500 to-cyan-700',
];

export default function Services() {
  const [services, setServices] = useState(defaultServices);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchServices()
      .then((res) => {
        const data = res.data?.results || res.data;
        if (data?.length) setServices(data);
      })
      .catch(() => {});
  }, []);

  const filtered = filter === 'all' ? services : services.filter(s => s.category === filter);

  return (
    <div className="page-top">
      {/* Hero */}
      <section className="hero-gradient py-20">
        <div className="container-custom text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">What We Offer</p>
            <h1 className="text-4xl md:text-5xl font-black mb-5">Our Services</h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Comprehensive digital solutions to help your business grow and thrive in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-light">
        <div className="container-custom">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'development', label: 'Development' },
              { id: 'marketing', label: 'Marketing' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === tab.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((service, i) => {
              const Icon = iconMap[service.icon] || FaCode;
              const gradient = colorMap[i % colorMap.length];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/services/${service.slug}`} className="card group block p-6 h-full hover:-translate-y-1">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white text-2xl" />
                    </div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 capitalize">
                      {service.category}
                    </div>
                    <h3 className="font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {service.short_description}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <FaArrowRight className="text-xs" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-dark mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-gray-500 mb-8">Contact our experts and we'll help you find the right solution for your business.</p>
          <Link to="/contact" className="btn-primary">
            Get Free Consultation <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
