import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SafeLottie from './SafeLottie';
import { fetchSiteStats } from '../api';

// assets9 & assets2 are confirmed working CDN subdomains
const LOTTIE_TECH_PRIMARY  = 'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json';
const LOTTIE_TECH_FALLBACK = 'https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json';

const highlights = [
  'Website & App Development',
  'Digital Marketing & SEO',
  'UI/UX Design & Branding',
];

export default function Hero() {
  const [stats, setStats] = useState({
    years: '5+',
    projects: '150+',
    satisfaction: '98%',
    rating: '5.0',
    team: '25+'
  });

  useEffect(() => {
    fetchSiteStats().then((res) => {
      const d = res.data;
      if (d) {
        setStats({
          years: d.years_experience ? `${d.years_experience}+` : '5+',
          projects: d.projects_completed ? `${d.projects_completed}+` : '150+',
          satisfaction: d.client_satisfaction ? `${d.client_satisfaction}%` : '98%',
          rating: d.client_rating ? String(d.client_rating) : '5.0',
          team: d.team_members ? `${d.team_members}+` : '25+'
        });
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-24 lg:pt-[104px]">
      {/* Layered background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(230,57,70,0.15) 0%, transparent 60%)',
        }}
      />
      {/* Animated dots grid */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glowing orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute bottom-20 left-1/4 w-96 h-96 bg-primary-light/30 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container-custom relative z-10 pt-10 pb-28 lg:pt-16 lg:pb-36 xl:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-7"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              #1 IT Solutions Company in Nepal
            </motion.div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.1] mb-6">
              Transform Your Vision Into a{' '}
              <span className="relative">
                <span className="text-accent">Digital Reality</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 9C50 3 150 1 298 9" stroke="#e63946" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-lg">
              We build stunning websites, powerful mobile apps, and run result-driven 
              digital marketing campaigns that grow your business.
            </p>

            {/* Feature list */}
            <ul className="space-y-2 mb-9">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-blue-100 text-sm">
                  <FaCheckCircle className="text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10 lg:mb-12">
              <Link
                to="/contact"
                className="group relative overflow-hidden bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl font-bold text-base flex items-center gap-2 shadow-lg shadow-accent/30 transition-all duration-300"
              >
                Let's Get Started
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/portfolio"
                className="flex items-center gap-3 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                <span className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <FaPlay className="text-xs ml-0.5" />
                </span>
                Discover Our Work
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/15">
              {[
                { value: stats.years, label: 'Years Experience', color: 'text-yellow-400' },
                { value: stats.projects, label: 'Projects Done', color: 'text-green-400' },
                { value: stats.satisfaction, label: 'Client Satisfaction', color: 'text-accent' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-blue-200 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Lottie + floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex justify-center items-center relative"
          >
            {/* Main lottie container */}
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10" />
              <SafeLottie
                src={LOTTIE_TECH_PRIMARY}
                fallbackSrc={LOTTIE_TECH_FALLBACK}
                style={{ height: 'clamp(220px, 40vw, 420px)', width: '100%' }}
              />

              {/* Floating cards — hidden on very small screens to avoid overflow */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-4 hidden sm:flex bg-white rounded-2xl shadow-2xl p-3 sm:p-4 items-center gap-2 sm:gap-3 min-w-32 sm:min-w-40"
              >
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🚀</div>
                <div>
                  <div className="text-xl font-black text-dark">{stats.projects}</div>
                  <div className="text-xs text-gray-500">Projects Done</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-5 -left-4 hidden sm:flex bg-white rounded-2xl shadow-2xl p-3 sm:p-4 items-center gap-2 sm:gap-3 min-w-32 sm:min-w-40"
              >
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-xl">⭐</div>
                <div>
                  <div className="text-xl font-black text-dark">{stats.rating}</div>
                  <div className="text-xs text-gray-500">Client Rating</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-1/2 -left-8 -translate-y-1/2 hidden md:block bg-primary rounded-2xl shadow-2xl p-4 text-white text-center"
              >
                <div className="text-2xl font-black">{stats.team}</div>
                <div className="text-xs text-blue-200">Team</div>
              </motion.div>

              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute top-8 -right-8 hidden md:block bg-accent rounded-2xl shadow-2xl p-3 text-white text-center"
              >
                <div className="text-2xl">🏆</div>
                <div className="text-xs font-semibold mt-1">Award<br/>Winner</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24 lg:h-32 block">
          <path d="M0 100 L0 60 Q360 0 720 30 Q1080 60 1440 20 L1440 100 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
