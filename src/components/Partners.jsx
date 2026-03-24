import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const partners = [
  { name: 'Google', initial: 'G', color: '#4285F4', bg: '#eff6ff' },
  { name: 'Microsoft', initial: 'M', color: '#00a4ef', bg: '#eff6ff' },
  { name: 'Amazon', initial: 'A', color: '#FF9900', bg: '#fff7ed' },
  { name: 'Meta', initial: 'f', color: '#1877F2', bg: '#eff6ff' },
  { name: 'Shopify', initial: 'S', color: '#96BF48', bg: '#f0fdf4' },
  { name: 'HubSpot', initial: 'H', color: '#FF7A59', bg: '#fff7ed' },
  { name: 'Salesforce', initial: 'S', color: '#00A1E0', bg: '#eff6ff' },
  { name: 'Slack', initial: 'S', color: '#4A154B', bg: '#fdf4ff' },
  { name: 'Zoom', initial: 'Z', color: '#2D8CFF', bg: '#eff6ff' },
  { name: 'Stripe', initial: 'S', color: '#635BFF', bg: '#f5f3ff' },
];

export default function Partners() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

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

        <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 border"
                style={{ backgroundColor: p.bg, color: p.color, borderColor: p.color + '30' }}
              >
                {p.initial}
              </div>
              <span className="text-xs text-gray-400 font-medium group-hover:text-gray-600 transition-colors text-center leading-tight">
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
