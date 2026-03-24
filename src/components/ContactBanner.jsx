import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SafeLottie from './SafeLottie';
import { FaArrowRight, FaPhone, FaEnvelope } from 'react-icons/fa';

const LOTTIE_CONTACT          = 'https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json';
const LOTTIE_CONTACT_FALLBACK = 'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json';

export default function ContactBanner() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(230,57,70,0.25) 0%, transparent 60%)',
            }}
          />
          <div className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '25px 25px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-10 md:px-16 py-14">
            {/* Text side */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">
                  Let's Work Together
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  Let's Connect and Turn<br />
                  <span className="text-accent">Your Vision Into Reality</span>
                </h2>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  We are available from 9:00 AM to 6:00 PM, Monday to Saturday.
                  Reach out now and let's build something amazing together!
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="btn-accent text-base px-8 py-4 shadow-lg shadow-accent/30">
                    Get in Touch <FaArrowRight />
                  </Link>
                  <a
                    href="tel:+9779811418243"
                    className="flex items-center gap-3 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 px-6 py-4 rounded-xl font-semibold transition-all duration-300"
                  >
                    <FaPhone /> +977-9811418243
                  </a>
                </div>

                {/* Email */}
                <a
                  href="mailto:info@reviraltechnology.com"
                  className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm mt-5"
                >
                  <FaEnvelope /> info@reviraltechnology.com
                </a>
              </motion.div>
            </div>

            {/* Lottie side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <SafeLottie
                src={LOTTIE_CONTACT}
                fallbackSrc={LOTTIE_CONTACT_FALLBACK}
                style={{ height: '300px', width: '300px' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
