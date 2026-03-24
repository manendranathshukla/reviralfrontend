import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle,
  FaClock, FaWhatsapp, FaFacebook, FaLinkedin, FaArrowRight,
  FaPaperPlane,
} from 'react-icons/fa';
import SafeLottie from '../components/SafeLottie';
import { submitContact } from '../api';

const LOTTIE_CONTACT  = 'https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json';
const LOTTIE_FALLBACK = 'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json';

const serviceOptions = [
  { value: 'website', label: 'Website Development' },
  { value: 'app', label: 'App Development' },
  { value: 'software', label: 'System/Software Development' },
  { value: 'uiux', label: 'UI/UX Design' },
  { value: 'seo', label: 'Search Engine Optimization (SEO)' },
  { value: 'smm', label: 'Social Media Marketing (SMM)' },
  { value: 'graphic', label: 'Graphic Design' },
  { value: 'content', label: 'Content Writing' },
  { value: 'ppc', label: 'Pay Per Click' },
  { value: 'digital', label: 'Digital Marketing' },
  { value: 'other', label: 'Other' },
];

const contactInfo = [
  { icon: FaPhone, title: 'Phone', info: '+977-9811418243', sub: '9807433130', href: 'tel:+9779811418243', gradient: 'from-blue-500 to-cyan-500', emoji: '📞' },
  { icon: FaEnvelope, title: 'Email', info: 'info@reviraltechnology.com', sub: 'Typically replies in 2h', href: 'mailto:info@reviraltechnology.com', gradient: 'from-purple-500 to-pink-500', emoji: '✉️' },
  { icon: FaMapMarkerAlt, title: 'Location', info: 'Narayanpath, Bhairahawa', sub: 'Rupandehi, Nepal', href: '#', gradient: 'from-red-500 to-orange-500', emoji: '📍' },
  { icon: FaClock, title: 'Working Hours', info: 'Mon – Sat: 9AM – 6PM', sub: 'Sunday: Closed', href: '#', gradient: 'from-green-500 to-emerald-600', emoji: '🕐' },
];

const socials = [
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/9779811418243', color: 'hover:text-green-400 hover:border-green-400/40' },
  { icon: FaFacebook, label: 'Facebook', href: '#', color: 'hover:text-blue-400 hover:border-blue-400/40' },
  { icon: FaLinkedin, label: 'LinkedIn', href: '#', color: 'hover:text-sky-400 hover:border-sky-400/40' },
];

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-all duration-300';
const labelCls = 'block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError('Name and phone number are required.');
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch {
      setError('Failed to submit. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[72vh] flex items-center bg-[#060e2b] overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />

        <div className="container-custom relative z-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text + info cards */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              We're Available Now
            </motion.span>

            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-5">
              Let's Start a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Conversation
              </span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
              Have a project in mind? We'd love to hear about it. Drop us a message and 
              our team will get back to you within 2 hours.
            </p>

            {/* Quick contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="glass-card p-4 flex items-start gap-3 group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center flex-shrink-0 text-base group-hover:scale-110 transition-transform`}>
                      {item.emoji}
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">{item.title}</p>
                      <p className="text-white text-sm font-semibold">{item.info}</p>
                      <p className="text-white/40 text-xs">{item.sub}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-white/30 text-xs font-semibold uppercase tracking-wider">Follow us:</span>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 border border-white/10 transition-all duration-300 ${s.color}`}
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Lottie side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
              <SafeLottie
                src={LOTTIE_CONTACT}
                fallbackSrc={LOTTIE_FALLBACK}
                style={{ width: '420px', height: '420px' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-24 bg-[#060e2b] relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
                <span className="w-5 h-0.5 bg-cyan-400 rounded-full" /> Send a Message <span className="w-5 h-0.5 bg-cyan-400 rounded-full" />
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white">We Would Love to<br />Hear From You</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10"
            >
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                    >
                      <FaCheckCircle className="text-white text-4xl" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-white mb-3">Message Sent! 🎉</h3>
                    <p className="text-white/50 mb-8 max-w-sm mx-auto">
                      Thank you for reaching out. Our team will get back to you within 2 hours.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="btn-primary px-8"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused('')}
                          placeholder="Your full name"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          onFocus={() => setFocused('phone')}
                          onBlur={() => setFocused('')}
                          placeholder="+977 XXXXXXXXXX"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused('')}
                        placeholder="your@email.com"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Service Required</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={`${inputCls} cursor-pointer`}
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                      >
                        <option value="" style={{ background: '#0a1f5c' }}>— Select a Service —</option>
                        {serviceOptions.map((s) => (
                          <option key={s.value} value={s.value} style={{ background: '#0a1f5c' }}>{s.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelCls}>Your Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused('')}
                        placeholder="Tell us about your project, goals, and timeline..."
                        rows={5}
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl"
                      >
                        ⚠️ {error}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-base"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Send Message
                          <FaArrowRight className="ml-1" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-white/30 text-xs">
                      Or reach us directly on{' '}
                      <a href="https://wa.me/9779811418243" className="text-green-400 hover:underline font-semibold">WhatsApp</a>
                      {' '}·{' '}
                      <a href="tel:+9779811418243" className="text-blue-400 hover:underline font-semibold">+977-9811418243</a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ── */}
      <section className="h-72 relative overflow-hidden bg-gradient-to-br from-[#0a1228] to-[#0a1f5c]">
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 animate-bounce">
            <FaMapMarkerAlt className="text-white text-2xl" />
          </div>
          <p className="text-white font-bold text-lg">Narayanpath, Bhairahawa, Rupandehi, Nepal</p>
          <p className="text-white/40 text-sm">Come visit our office</p>
        </div>
        {/* decorative rings */}
        {[1, 2, 3].map((r) => (
          <motion.div
            key={r}
            animate={{ scale: [1, 1 + r * 0.3], opacity: [0.3, 0] }}
            transition={{ duration: 2, delay: r * 0.5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-400/40"
            style={{ width: r * 80, height: r * 80 }}
          />
        ))}
      </section>
    </div>
  );
}
