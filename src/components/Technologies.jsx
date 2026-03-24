import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SafeLottie from './SafeLottie';

// assets9 confirmed working; fallback to assets7
const LOTTIE_TECH          = 'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json';
const LOTTIE_TECH_FALLBACK = 'https://assets7.lottiefiles.com/packages/lf20_w51pcehl.json';

const tabs = [
  { id: 'web', label: 'Web Development', emoji: '🌐' },
  { id: 'app', label: 'App Development', emoji: '📱' },
  { id: 'db', label: 'Database', emoji: '🗄️' },
  { id: 'cloud', label: 'Cloud Platform', emoji: '☁️' },
];

const techData = {
  web: [
    { name: 'JavaScript', color: '#F7DF1E', bg: '#fffbeb', logo: 'JS' },
    { name: 'Node.js', color: '#339933', bg: '#f0fdf4', logo: '⬡' },
    { name: 'Python', color: '#3776AB', bg: '#eff6ff', logo: '🐍' },
    { name: 'Django', color: '#092E20', bg: '#f0fdf4', logo: 'Dj' },
    { name: 'HTML5', color: '#E34F26', bg: '#fff7ed', logo: '5' },
    { name: 'CSS3', color: '#1572B6', bg: '#eff6ff', logo: '3' },
    { name: 'Next.js', color: '#000000', bg: '#f9fafb', logo: 'N' },
    { name: 'React JS', color: '#61DAFB', bg: '#ecfeff', logo: '⚛' },
    { name: 'PHP', color: '#777BB4', bg: '#f5f3ff', logo: 'PHP' },
    { name: 'Laravel', color: '#FF2D20', bg: '#fff1f2', logo: 'L' },
    { name: 'Figma', color: '#F24E1E', bg: '#fff7ed', logo: 'F' },
    { name: 'WordPress', color: '#21759B', bg: '#eff6ff', logo: 'W' },
  ],
  app: [
    { name: 'Flutter', color: '#02569B', bg: '#eff6ff', logo: 'FL' },
    { name: 'iOS', color: '#000000', bg: '#f9fafb', logo: '' },
    { name: 'Dart', color: '#0175C2', bg: '#eff6ff', logo: 'D' },
    { name: 'Swift', color: '#F05138', bg: '#fff7ed', logo: 'S' },
    { name: 'Kotlin', color: '#7F52FF', bg: '#f5f3ff', logo: 'K' },
    { name: 'React Native', color: '#61DAFB', bg: '#ecfeff', logo: '⚛' },
    { name: 'Android', color: '#3DDC84', bg: '#f0fdf4', logo: 'A' },
    { name: 'Ionic', color: '#3880FF', bg: '#eff6ff', logo: 'I' },
  ],
  db: [
    { name: 'MongoDB', color: '#47A248', bg: '#f0fdf4', logo: 'M' },
    { name: 'MySQL', color: '#4479A1', bg: '#eff6ff', logo: 'MY' },
    { name: 'PostgreSQL', color: '#336791', bg: '#eff6ff', logo: 'PG' },
    { name: 'SQLite', color: '#003B57', bg: '#f0f9ff', logo: 'SQ' },
    { name: 'Redis', color: '#DC382D', bg: '#fff1f2', logo: 'R' },
    { name: 'Firebase', color: '#FFCA28', bg: '#fefce8', logo: '🔥' },
    { name: 'Supabase', color: '#3ECF8E', bg: '#f0fdf4', logo: 'S' },
    { name: 'DynamoDB', color: '#4053D6', bg: '#eef2ff', logo: 'D' },
  ],
  cloud: [
    { name: 'AWS', color: '#FF9900', bg: '#fff7ed', logo: 'A' },
    { name: 'Google Cloud', color: '#4285F4', bg: '#eff6ff', logo: 'G' },
    { name: 'Docker', color: '#2496ED', bg: '#eff6ff', logo: '🐳' },
    { name: 'Kubernetes', color: '#326CE5', bg: '#eff6ff', logo: 'K8s' },
    { name: 'Cloudflare', color: '#F48120', bg: '#fff7ed', logo: 'CF' },
    { name: 'Digital Ocean', color: '#0080FF', bg: '#eff6ff', logo: 'DO' },
    { name: 'Azure', color: '#0078D4', bg: '#eff6ff', logo: 'Az' },
    { name: 'Heroku', color: '#430098', bg: '#f5f3ff', logo: 'H' },
  ],
};

function TechCard({ tech, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-300 cursor-default hover:-translate-y-1"
      style={{ backgroundColor: tech.bg }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform"
        style={{ backgroundColor: tech.color + '20', color: tech.color, border: `2px solid ${tech.color}30` }}
      >
        {tech.logo}
      </div>
      <span className="font-semibold text-gray-700 text-xs text-center leading-tight">{tech.name}</span>
    </motion.div>
  );
}

export default function Technologies() {
  const [activeTab, setActiveTab] = useState('web');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50/80 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle">Our Expertise</p>
            <h2 className="section-title mb-4">
              Technologies We Rely On<br />
              <span className="text-accent">to Achieve Success</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">
              We stay ahead of the curve by mastering the latest technologies 
              and frameworks to deliver cutting-edge solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-end"
          >
            <SafeLottie
              src={LOTTIE_TECH}
              fallbackSrc={LOTTIE_TECH_FALLBACK}
              style={{ height: '240px', width: '240px' }}
            />
          </motion.div>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{tab.emoji}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Tech grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
          >
            {techData[activeTab].map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
