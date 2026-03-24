import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SafeLottie from './SafeLottie';
import { FaQuoteLeft, FaStar, FaGoogle } from 'react-icons/fa';
import { fetchTestimonials } from '../api';
import 'swiper/css';
import 'swiper/css/pagination';

const LOTTIE_REVIEW = 'https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json';

const defaultTestimonials = [
  { id: 1, name: 'Rahul Sharma', designation: 'CEO', company: 'TechVentures India', message: 'Reviral Technology is one of the best IT companies. They carried out my website design and development perfectly by solving all queries instantly. I would choose Reviral for any development needs.', rating: 5, source: 'Google Review' },
  { id: 2, name: 'Priya Kapoor', designation: 'MD', company: 'Kapoor Enterprises', message: 'This IT Company is highly professional and provides customized solutions to all business problems at a very reasonable price. The team members are here to turn your problems into possibilities.', rating: 5, source: 'Google Review' },
  { id: 3, name: 'Arjun Mehta', designation: 'Founder/CEO', company: 'StartupHub', message: 'My experience with Reviral Technology has exceeded all expectations. The team is always a pleasure to work with and incredibly flexible in meeting ever-changing needs.', rating: 5, source: 'Google Review' },
  { id: 4, name: 'Sneha Patel', designation: 'Managing Director', company: 'Patel Solutions', message: 'Reviral Technology is the best website design and development company with highly qualified IT staff having an amazing sense of understanding and support to clients.', rating: 5, source: 'Google Review' },
  { id: 5, name: 'Vikram Singh', designation: 'Chairman', company: 'Singh Healthcare', message: 'Reviral Technology has been a game-changer for us. Their Social Media Marketing and Website Development services have transformed our online presence significantly.', rating: 5, source: 'Google Review' },
  { id: 6, name: 'Anjali Gupta', designation: 'CEO', company: 'EduNet Services', message: 'Reviral Technology has a very unique team, works professionally and understands the need of customers very well. Very thankful for their reliable support and time-relevant services.', rating: 5, source: 'Google Review' },
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

const avatarGradients = [
  'from-blue-500 to-blue-700', 'from-violet-500 to-violet-700',
  'from-emerald-500 to-emerald-700', 'from-orange-500 to-orange-700',
  'from-rose-500 to-rose-700', 'from-teal-500 to-teal-700',
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    fetchTestimonials()
      .then((res) => {
        const data = res.data?.results || res.data;
        if (data?.length) setTestimonials(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #fff5f5 100%)' }}>
      {/* Top border accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Background decoration */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle">Testimonials</p>
            <h2 className="section-title mb-4">
              What Our Clients<br />
              <span className="text-accent">Say About Us</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Don't take our word for it — here's what our clients say about 
              working with us.
            </p>

            {/* Rating summary */}
            <div className="flex items-center gap-4 mt-6 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 inline-flex w-fit">
              <div className="text-center">
                <div className="text-4xl font-black text-dark">5.0</div>
                <div className="flex gap-0.5 mt-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-1">Average Rating</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="flex items-center gap-2 text-gray-600">
                <FaGoogle className="text-blue-500 text-xl" />
                <div>
                  <div className="font-bold text-dark text-sm">Google Reviews</div>
                  <div className="text-xs text-gray-400">Verified ratings</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <SafeLottie
              src={LOTTIE_REVIEW}
              fallbackSrc="https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json"
              style={{ height: '260px', width: '260px' }}
            />
          </motion.div>
        </div>

        {/* Swiper carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={testimonials.length > 3}
            className="pb-14"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={t.id || i}>
                <div className="bg-white rounded-2xl p-6 h-full flex flex-col border border-gray-100 hover:shadow-xl hover:border-primary/10 transition-all duration-300 group">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(t.rating || 5)].map((_, si) => (
                      <FaStar key={si} className="text-yellow-400 text-sm" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative flex-1 mb-5">
                    <FaQuoteLeft className="text-primary/10 text-6xl absolute -top-2 -left-2 pointer-events-none" />
                    <p className="text-gray-600 text-sm leading-relaxed relative z-10 italic">
                      "{t.message}"
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                    ) : (
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ring-2 ring-white shadow-md`}>
                        {getInitials(t.name)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-dark text-sm">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.designation}, {t.company}</div>
                    </div>
                    <div className="ml-auto">
                      <FaGoogle className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
