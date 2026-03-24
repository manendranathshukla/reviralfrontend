import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SafeLottie from './SafeLottie';
import {
  FaClipboardList, FaProjectDiagram, FaLaptopCode,
  FaCheckCircle, FaRocket, FaHeadset, FaArrowRight
} from 'react-icons/fa';

const LOTTIE_PROCESS          = 'https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json';
const LOTTIE_PROCESS_FALLBACK = 'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json';

const steps = [
  {
    number: '01', title: 'Requirement Gathering', icon: FaClipboardList,
    color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-600',
    description: 'We start our collaboration by collecting client requirements, listing and compiling them. This helps us build the process from scratch to deliver results aligned with your goals.',
    emoji: '📋',
  },
  {
    number: '02', title: 'Plan & Resources', icon: FaProjectDiagram,
    color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50', text: 'text-violet-600',
    description: 'After gathering requirements, we devise a strategic path and select resources. We offer clients a roadmap, laying the groundwork for a successful project.',
    emoji: '🗺️',
  },
  {
    number: '03', title: 'Design & Develop', icon: FaLaptopCode,
    color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-600',
    description: 'We turn strategic ideas into digital products that are visually appealing, technically robust, focusing on user experience and functionality.',
    emoji: '💻',
  },
  {
    number: '04', title: 'Quality Assurance', icon: FaCheckCircle,
    color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-600',
    description: 'We rigorously test and validate to ensure all elements work correctly and meet standards, delivering the desired user experience.',
    emoji: '✅',
  },
  {
    number: '05', title: 'Deployment', icon: FaRocket,
    color: 'from-rose-500 to-rose-600', bg: 'bg-rose-50', text: 'text-rose-600',
    description: 'Once the product meets standards, we deploy it, releasing product or updates on servers. This ensures our products are delivered seamlessly and efficiently.',
    emoji: '🚀',
  },
  {
    number: '06', title: 'Support & Maintenance', icon: FaHeadset,
    color: 'from-teal-500 to-teal-600', bg: 'bg-teal-50', text: 'text-teal-600',
    description: 'We maintain systems to ensure smooth operation, security, and reliability. Optimization keeps performance high and client satisfaction focused.',
    emoji: '🎧',
  },
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const active = steps[activeStep];
  const ActiveIcon = active.icon;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary" />
      <div className="absolute -right-20 top-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle">How We Work</p>
            <h2 className="section-title mb-5">
              Enjoy Seamless Service with<br />Our Easy Steps!
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Our efficient workflow from requirements gathering to support and 
              maintenance ensures every project is delivered with precision and care.
            </p>
            <Link to="/about/how-we-work" className="btn-primary">
              Read More <FaArrowRight />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <SafeLottie
              src={LOTTIE_PROCESS}
              fallbackSrc={LOTTIE_PROCESS_FALLBACK}
              style={{ height: '300px', width: '300px' }}
            />
          </motion.div>
        </div>

        {/* Steps grid + detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Steps list */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              return (
                <motion.button
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => setActiveStep(i)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                    isActive
                      ? `border-current ${step.bg} shadow-lg scale-[1.02]`
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <Icon className="text-white text-lg" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold mb-0.5 ${isActive ? step.text : 'text-gray-400'}`}>
                        {step.number}
                      </div>
                      <div className={`font-bold text-sm leading-snug ${isActive ? 'text-dark' : 'text-gray-700'}`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`${active.bg} rounded-3xl p-8 flex flex-col justify-between border-2 border-current/10`}
            >
              <div>
                <div className="text-5xl mb-5">{active.emoji}</div>
                <div className={`text-xs font-bold uppercase tracking-widest ${active.text} mb-2`}>
                  Step {active.number}
                </div>
                <h3 className="text-2xl font-black text-dark mb-4">{active.title}</h3>
                <p className="text-gray-600 leading-relaxed">{active.description}</p>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center`}>
                  <ActiveIcon className="text-white" />
                </div>
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                  <div
                    className={`h-full bg-gradient-to-r ${active.color} rounded-full transition-all duration-500`}
                    style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <span className={`text-xs font-bold ${active.text}`}>
                  {activeStep + 1}/{steps.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
