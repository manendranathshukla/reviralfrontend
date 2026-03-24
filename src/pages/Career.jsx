import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { fetchCareers } from '../api';
import { Link } from 'react-router-dom';

const defaultCareers = [
  { id: 1, title: 'React Developer', department: 'Development', location: 'Remote/Hybrid', job_type: 'Full Time', description: 'We are looking for an experienced React Developer to join our growing team.', requirements: '2+ years of React experience\nStrong JavaScript skills\nExperience with REST APIs\nGit version control' },
  { id: 2, title: 'Digital Marketing Executive', department: 'Marketing', location: 'Remote/Hybrid', job_type: 'Full Time', description: 'Join our marketing team to drive digital campaigns and grow brand presence.', requirements: '1+ years of digital marketing experience\nSEO/SEM knowledge\nSocial media expertise\nAnalytical mindset' },
  { id: 3, title: 'UI/UX Designer', department: 'Design', location: 'Remote/Hybrid', job_type: 'Full Time', description: 'We are seeking a creative UI/UX Designer to craft beautiful digital experiences.', requirements: 'Proficiency in Figma\n2+ years experience\nStrong portfolio\nKnowledge of design principles' },
];

const deptColors = {
  Development: 'bg-blue-100 text-blue-700',
  Marketing: 'bg-orange-100 text-orange-700',
  Design: 'bg-purple-100 text-purple-700',
  default: 'bg-gray-100 text-gray-700',
};

function CareerCard({ job }) {
  const [open, setOpen] = useState(false);
  const reqs = (job.requirements || '').split('\n').filter(Boolean);
  const colorClass = deptColors[job.department] || deptColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="card border border-gray-100 overflow-hidden"
    >
      <div
        className="p-6 cursor-pointer flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="font-bold text-dark text-xl">{job.title}</h3>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colorClass}`}>
              {job.department}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-primary" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock className="text-primary" /> {job.job_type}
            </span>
            <span className="flex items-center gap-1.5">
              <FaBriefcase className="text-primary" /> {job.department}
            </span>
          </div>
        </div>
        <FaChevronDown className={`text-gray-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>
              {reqs.length > 0 && (
                <div className="mb-5">
                  <p className="font-semibold text-dark mb-2">Requirements:</p>
                  <ul className="space-y-1.5">
                    {reqs.map((r) => (
                      <li key={r} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link to="/contact" className="btn-primary text-sm py-2.5">
                Apply Now <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Career() {
  const [jobs, setJobs] = useState(defaultCareers);

  useEffect(() => {
    fetchCareers()
      .then((r) => {
        const d = r.data?.results || r.data;
        if (d?.length) setJobs(d);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="page-top">
      <section className="hero-gradient py-20">
        <div className="container-custom text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">Join Our Team</p>
            <h1 className="text-4xl md:text-5xl font-black mb-5">Career Opportunities</h1>
            <p className="text-blue-100 max-w-xl mx-auto">
              Be part of a dynamic team that's shaping the future of digital technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why join us */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="section-subtitle">Why Us</p>
            <h2 className="section-title">Why Work With Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🚀', title: 'Growth Opportunities', desc: 'Continuous learning and career advancement paths.' },
              { emoji: '🌍', title: 'Remote Friendly', desc: 'Flexible work arrangements for a better work-life balance.' },
              { emoji: '💰', title: 'Competitive Salary', desc: 'Market-competitive compensation and performance bonuses.' },
              { emoji: '🤝', title: 'Great Culture', desc: 'Collaborative and inclusive work environment.' },
            ].map((benefit) => (
              <div key={benefit.title} className="card p-6 text-center hover:-translate-y-1">
                <div className="text-4xl mb-4">{benefit.emoji}</div>
                <h3 className="font-bold text-dark text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section className="py-16 bg-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="section-subtitle">Open Positions</p>
            <h2 className="section-title">Current Openings</h2>
          </div>
          {jobs.length > 0 ? (
            <div className="space-y-4 max-w-4xl mx-auto">
              {jobs.map((job) => (
                <CareerCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">😔</div>
              <h3 className="text-xl font-bold text-dark mb-2">No Openings Right Now</h3>
              <p className="text-gray-500 mb-6">We don't have any open positions at the moment, but we're always looking for talented people.</p>
              <Link to="/contact" className="btn-primary">Send Your Resume</Link>
            </div>
          )}

          <div className="text-center mt-12 bg-white rounded-2xl p-10 shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-dark mb-3">Don't See Your Role?</h3>
            <p className="text-gray-500 mb-6">
              We're always looking for talented people. Send us your resume and we'll keep you in mind.
            </p>
            <Link to="/contact" className="btn-primary">
              Send Resume <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
