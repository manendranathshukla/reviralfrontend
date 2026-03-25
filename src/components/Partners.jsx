import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Partners() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch('https://api.reviraltechnology.com/api/partners/')
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setPartners(data.results);
        }
      })
      .catch((error) => console.error('Error fetching partners:', error));
  }, []);

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="section-subtitle">Our Valued Partners</p>
          <h2 className="text-2xl font-bold text-dark">Trusted by Top-Rated Companies</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {partners.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex flex-col items-center gap-3 group"
            >
              <a
                href={p.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-24 h-24 rounded-2xl flex items-center justify-center p-3 font-bold text-xl group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 border border-gray-100 bg-white"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </a>
              <span className="text-xs text-gray-500 font-medium group-hover:text-gray-900 transition-colors text-center leading-tight">
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
