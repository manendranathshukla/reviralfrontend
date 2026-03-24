import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import SafeLottie from './SafeLottie';
import { FaTrophy, FaProjectDiagram, FaUsers, FaSmile } from 'react-icons/fa';
import { fetchSiteStats } from '../api';

const LOTTIE_GROWTH          = 'https://assets7.lottiefiles.com/packages/lf20_w51pcehl.json';
const LOTTIE_GROWTH_FALLBACK = 'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json';

const defaultStats = [
  { icon: FaTrophy, label: 'Years of Experience', value: 5, suffix: '+', color: 'bg-yellow-400', glow: 'shadow-yellow-400/30' },
  { icon: FaProjectDiagram, label: 'Projects Completed', value: 150, suffix: '+', color: 'bg-blue-500', glow: 'shadow-blue-500/30' },
  { icon: FaUsers, label: 'Skilled Team Members', value: 25, suffix: '+', color: 'bg-emerald-500', glow: 'shadow-emerald-500/30' },
  { icon: FaSmile, label: 'Happy Clients', value: 120, suffix: '+', color: 'bg-accent', glow: 'shadow-accent/30' },
];

export default function Stats() {
  const [stats, setStats] = useState(defaultStats);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    fetchSiteStats()
      .then((res) => {
        const d = res.data;
        setStats([
          { icon: FaTrophy, label: 'Years of Experience', value: d.years_experience, suffix: '+', color: 'bg-yellow-400', glow: 'shadow-yellow-400/30' },
          { icon: FaProjectDiagram, label: 'Projects Completed', value: d.projects_completed, suffix: '+', color: 'bg-blue-500', glow: 'shadow-blue-500/30' },
          { icon: FaUsers, label: 'Skilled Team Members', value: d.team_members, suffix: '+', color: 'bg-emerald-500', glow: 'shadow-emerald-500/30' },
          { icon: FaSmile, label: 'Happy Clients', value: d.happy_clients, suffix: '+', color: 'bg-accent', glow: 'shadow-accent/30' },
        ]);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(230,57,70,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)',
        }}
      />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: stats */}
          <div>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-3">Our Numbers</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Achievements That<br />Speak for Themselves
              </h2>
              <p className="text-blue-200">
                Numbers that reflect our commitment to excellence and client satisfaction.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors"
                  >
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg ${stat.glow}`}>
                      <Icon className="text-white text-xl" />
                    </div>
                    <div className="text-4xl font-black text-white mb-1">
                      {inView ? (
                        <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                      ) : `0${stat.suffix}`}
                    </div>
                    <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Lottie */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/5 rounded-3xl blur-xl" />
              <SafeLottie
                src={LOTTIE_GROWTH}
                fallbackSrc={LOTTIE_GROWTH_FALLBACK}
                style={{ height: '380px', width: '380px' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
