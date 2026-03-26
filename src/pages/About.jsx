import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaCheckCircle, FaUsers, FaLightbulb, FaHandshake,
  FaArrowRight, FaRocket, FaStar, FaCode, FaGlobe,
  FaAward, FaHistory, FaLinkedin, FaTwitter, FaGithub,
} from 'react-icons/fa';
import SafeLottie from '../components/SafeLottie';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import { fetchTeam } from '../api';

const LOTTIE_TEAM = 'https://assets7.lottiefiles.com/packages/lf20_w51pcehl.json';
const LOTTIE_MISSION = 'https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json';
const LOTTIE_FALLBACK = 'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json';

const values = [
  {
    icon: FaLightbulb, title: 'Innovation', emoji: '💡',
    desc: 'We push boundaries and embrace new technologies to deliver cutting-edge digital solutions.',
    gradient: 'from-yellow-400 to-orange-500', glow: 'shadow-yellow-400/20'
  },
  {
    icon: FaUsers, title: 'Collaboration', emoji: '🤝',
    desc: 'We work closely with clients as true partners, ensuring transparent communication throughout.',
    gradient: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/20'
  },
  {
    icon: FaHandshake, title: 'Integrity', emoji: '🛡️',
    desc: 'We build long-term relationships based on trust, honesty, and delivering on every promise.',
    gradient: 'from-green-500 to-emerald-600', glow: 'shadow-green-500/20'
  },
  {
    icon: FaCheckCircle, title: 'Quality', emoji: '⭐',
    desc: 'We maintain the highest standards in everything we do, from code to client service.',
    gradient: 'from-purple-500 to-pink-600', glow: 'shadow-purple-500/20'
  },
];

const milestones = [
  { year: '2019', event: 'Founded', desc: 'Reviral Technology was established with a vision to transform businesses digitally.', icon: FaRocket, color: 'bg-blue-500' },
  { year: '2020', event: 'First 25 Clients', desc: 'Delivered impactful web and marketing solutions reaching our first milestone.', icon: FaStar, color: 'bg-yellow-500' },
  { year: '2022', event: '100+ Projects', desc: 'Expanded our team and crossed 100 successful project deliveries across South Asia.', icon: FaCode, color: 'bg-green-500' },
  { year: '2024', event: 'Regional Leader', desc: 'Recognized as a leading IT services provider in Bhairahawa and surrounding regions.', icon: FaAward, color: 'bg-purple-500' },
  { year: '2025', event: 'Global Reach', desc: 'Serving clients across Nepal, India, and beyond with a team of 25+ specialists.', icon: FaGlobe, color: 'bg-red-500' },
];

const heroStats = [
  { value: '5+', label: 'Years Experience', icon: '📅' },
  { value: '20+', label: 'Projects Done', icon: '🚀' },
  { value: '2+', label: 'Team Members', icon: '👥' },
  { value: '98%', label: 'Satisfaction Rate', icon: '⭐' },
];

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const [team, setTeam] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  useEffect(() => {
    fetchTeam()
      .then((res) => {
        const data = res.data?.results || res.data;
        if (Array.isArray(data)) setTeam(data);
      })
      .catch((err) => console.error("Error fetching team:", err))
      .finally(() => setLoadingTeam(false));
  }, []);

  return (
    <div className="pt-24 overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#060e2b]">
        {/* Animated gradient orbs */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
          <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
        </motion.div>

        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.04]"
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
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              About Reviral Technology
            </motion.span>

            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              We Turn{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Ideas
                </span>
              </span>
              {' '}Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Digital Reality
              </span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              Based in Bhairahawa, Nepal — we are a passionate team of developers, designers,
              and marketers dedicated to helping businesses grow through technology.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Start a Project <FaArrowRight />
              </Link>
              <Link to="/services" className="glass text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2">
                Our Services
              </Link>
            </div>
          </motion.div>

          {/* Lottie + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
              <SafeLottie
                src={LOTTIE_TEAM}
                fallbackSrc={LOTTIE_FALLBACK}
                style={{ width: '420px', maxWidth: '100%', height: '380px' }}
              />
            </div>

            {/* Floating tags */}
            {[
              { label: 'Bhairahawa, Nepal 🇳🇵', top: '5%', left: '-5%', delay: 0.5 },
              { label: '5 Star Rated ⭐', top: '15%', right: '-5%', delay: 0.7 },
              { label: '20+ Projects 🚀', bottom: '15%', left: '-8%', delay: 0.9 },
            ].map((tag) => (
              <motion.div
                key={tag.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tag.delay, type: 'spring' }}
                style={{ top: tag.top, bottom: tag.bottom, left: tag.left, right: tag.right }}
                className="absolute glass text-white text-xs font-semibold px-3 py-2 rounded-full whitespace-nowrap"
              >
                {tag.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Hero stats strip */}
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
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-white/50 text-xs">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="section-subtitle">Our Mission</p>
              <h2 className="section-title mb-6">Driving Digital Success<br />For Every Business</h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                Reviral Technology was founded with a simple but powerful mission: to help businesses
                of all sizes harness the power of technology and digital marketing to achieve their goals.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Our team of experienced professionals specializes in web development, mobile applications,
                digital marketing, and creative design — delivering results that exceed expectations.
              </p>

              <div className="space-y-3">
                {[
                  '🏆 Expert team with 5+ years of industry experience',
                  '📦 Over 20+ successful projects delivered',
                  '😊 Client satisfaction rate of 98%',
                  '🔔 Round-the-clock support and maintenance',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Glass stats card with Lottie accent */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-[#0a1f5c] via-[#1a3c8f] to-[#1e4db7] rounded-3xl p-8 overflow-hidden glow-blue">
                {/* Noise overlay */}
                <div className="absolute inset-0 opacity-5 rounded-3xl"
                  style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <SafeLottie
                  src={LOTTIE_MISSION}
                  fallbackSrc={LOTTIE_FALLBACK}
                  style={{ height: '200px', width: '100%' }}
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[
                    { value: '5+', label: 'Years Experience', emoji: '📅' },
                    { value: '20+', label: 'Projects Done', emoji: '🚀' },
                    { value: '25+', label: 'Team Members', emoji: '👥' },
                    { value: '98%', label: 'Satisfaction', emoji: '⭐' },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-2xl p-4 text-center">
                      <div className="text-2xl mb-1">{stat.emoji}</div>
                      <div className="text-3xl font-black text-white">{stat.value}</div>
                      <div className="text-blue-200 text-xs mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section id="how-we-work" className="py-24 relative overflow-hidden bg-[#060e2b]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.25em] mb-3 flex items-center justify-center gap-2">
              <span className="w-5 h-0.5 bg-cyan-400 rounded-full" /> Core Values <span className="w-5 h-0.5 bg-cyan-400 rounded-full" />
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">What Drives Us</h2>
            <p className="text-white/50 max-w-xl mx-auto">The principles that guide every decision we make and every solution we build.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className={`glass-card p-7 text-center group cursor-default shadow-xl ${v.glow}`}
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-16 h-16 bg-gradient-to-br ${v.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}
                  >
                    <Icon className="text-white text-2xl" />
                  </motion.div>
                  <div className="text-3xl mb-3">{v.emoji}</div>
                  <h3 className="font-bold text-white text-lg mb-3">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPANY JOURNEY TIMELINE ── */}
      <section id="journey" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-subtitle justify-center">Our Journey</p>
            <h2 className="section-title">How We Got Here</h2>
          </motion.div>

          <div className="relative">
            {/* vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary to-accent/30 -translate-x-1/2 rounded-full" />

            <div className="space-y-12">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
                  >
                    {/* Card */}
                    <div className="md:w-[45%] w-full">
                      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className="text-white text-sm" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{m.year}</span>
                            <h3 className="font-bold text-dark text-base group-hover:text-primary transition-colors">{m.event}</h3>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                      </div>
                    </div>

                    {/* Year bubble (center) */}
                    <div className="hidden md:flex w-[10%] justify-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-primary/30 z-10">
                        {m.year}
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:w-[45%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* History icon decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <FaHistory className="text-primary/20 text-8xl mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* ── OUR TEAM ── */}
      <section id="team" className="py-24 bg-gray-50 relative overflow-hidden border-b border-gray-100">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3 flex items-center justify-center gap-2">
              <span className="w-5 h-0.5 bg-primary rounded-full" /> Meet the Experts <span className="w-5 h-0.5 bg-primary rounded-full" />
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">Our Brilliant <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Team</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Driven by passion and expertise, we are dedicated to transforming your digital vision into reality.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {loadingTeam ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </motion.div>
            ) : team.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-500">
                No team members found. Check back soon!
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {team.map((member) => (
                  <motion.div
                    key={member.id}
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-primary/10 to-accent/10">
                          <FaUsers className="text-5xl text-primary/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f5c]/90 via-[#0a1f5c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-blue-600 flex items-center justify-center backdrop-blur-md transition-colors">
                              <FaLinkedin className="text-lg" />
                            </a>
                          )}
                          {member.twitter && (
                            <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-blue-400 flex items-center justify-center backdrop-blur-md transition-colors">
                              <FaTwitter className="text-lg" />
                            </a>
                          )}
                          {member.github && (
                            <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-gray-900 flex items-center justify-center backdrop-blur-md transition-colors">
                              <FaGithub className="text-lg" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">{member.name}</h3>
                      <p className="text-sm font-semibold text-accent mb-3">{member.designation || member.role || 'Team Member'}</p>
                      {member.bio && (
                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{member.bio}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Stats />
      <Testimonials />

      {/* ── CTA ── */}
      <section className="py-20 relative overflow-hidden bg-[#060e2b]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">Let's Build Together</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
              Ready to Start<br />Your Digital Journey?
            </h2>
            <p className="text-white/50 mb-10 max-w-xl mx-auto text-lg">
              Let's build something amazing together. Get in touch with our team in Bhairahawa today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary px-8 py-4 text-base">
                Get in Touch <FaArrowRight />
              </Link>
              <Link to="/portfolio" className="glass text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all inline-flex items-center gap-2">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
