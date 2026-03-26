import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SafeLottie from './SafeLottie';
import { FaCheckCircle, FaArrowRight, FaUsers, FaLightbulb, FaTrophy } from 'react-icons/fa';

const LOTTIE_TEAM = 'https://assets7.lottiefiles.com/packages/lf20_w51pcehl.json';

const highlights = [
  'Expert team of developers and marketers',
  'Customized solutions for every business',
  'Transparent communication throughout',
  'Post-delivery support & maintenance',
];

const badges = [
  { icon: FaTrophy, value: '20+', label: 'Projects Done', color: 'bg-yellow-400' },
  { icon: FaUsers, value: '2+', label: 'Team Members', color: 'bg-blue-500' },
  { icon: FaLightbulb, value: '5+', label: 'Years Exp.', color: 'bg-accent' },
];

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Lottie + badges */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Background blob */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/5 rounded-3xl" />

            {/* Lottie */}
            <div className="relative z-10 p-4">
              <SafeLottie
                src={LOTTIE_TEAM}
                fallbackSrc="https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json"
                style={{ height: '380px', width: '100%' }}
              />
            </div>

            {/* Floating stat badges */}
            {badges.map((b, i) => {
              const Icon = b.icon;
              const positions = [
                'absolute -top-4 left-4',
                'absolute top-1/2 -right-4 -translate-y-1/2',
                'absolute -bottom-4 left-1/4',
              ];
              return (
                <motion.div
                  key={b.label}
                  animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className={`${positions[i]} bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100 z-20`}
                >
                  <div className={`w-9 h-9 ${b.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="font-black text-dark text-lg leading-none">{b.value}</div>
                    <div className="text-xs text-gray-500">{b.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-subtitle">Who we are</p>
            <h2 className="section-title mb-6">
              We are a Top IT Company,<br />
              <span className="text-accent">Committed to Excellence</span>
            </h2>
            <p className="text-gray-600 mb-5 leading-relaxed text-lg">
              We are committed to providing comprehensive digital solutions to enhance your
              online presence. Let's join hands and work together to take your brand to the
              next level with the best IT services.
            </p>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Our team of experienced professionals specializes in web development, mobile
              applications, digital marketing, and creative design — delivering results
              that exceed expectations every time.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="text-primary text-xs" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Mini stats row */}
            <div className="flex gap-6 mb-10 pb-8 border-b border-gray-100">
              {[
                { value: '98%', label: 'Client Satisfaction' },
                { value: '5★', label: 'Average Rating' },
                { value: '24/7', label: 'Support Available' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-primary">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <Link to="/about" className="btn-primary text-base px-8 py-4">
              About Us <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
