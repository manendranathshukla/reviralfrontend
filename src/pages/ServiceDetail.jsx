import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const serviceDetails = {
  'website-development': {
    title: 'Website Development',
    tagline: 'Highly functional & visually appealing websites',
    description: 'We create stunning, fast, and fully functional websites that drive results for your business. From simple landing pages to complex web applications, our expert team delivers solutions tailored to your needs.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading Speed', 'CMS Integration', 'E-commerce Ready', 'API Integration', 'Security Implementation', '24/7 Support'],
    process: ['Discovery & Planning', 'UI/UX Design', 'Development', 'Testing & QA', 'Launch & Deployment', 'Maintenance'],
  },
  'app-development': {
    title: 'App Development',
    tagline: 'Innovative mobile applications',
    description: 'We build high-quality mobile applications for iOS and Android platforms that provide exceptional user experiences and drive business growth.',
    features: ['Cross-Platform Development', 'Native iOS & Android', 'Push Notifications', 'Offline Functionality', 'App Store Optimization', 'Real-time Features', 'Payment Integration', 'Analytics'],
    process: ['Requirement Analysis', 'UI/UX Prototyping', 'Development', 'Testing & QA', 'App Store Submission', 'Maintenance'],
  },
  'seo': {
    title: 'Search Engine Optimization',
    tagline: 'Dominate search engine rankings',
    description: 'Our comprehensive SEO strategies help your business rank higher on search engines, drive organic traffic, and convert visitors into customers.',
    features: ['Keyword Research', 'On-Page Optimization', 'Technical SEO', 'Link Building', 'Content Strategy', 'Local SEO', 'Google Analytics Setup', 'Monthly Reports'],
    process: ['SEO Audit', 'Keyword Research', 'On-Page Optimization', 'Content Creation', 'Link Building', 'Performance Tracking'],
  },
  'social-media-marketing': {
    title: 'Social Media Marketing',
    tagline: 'Build your brand online',
    description: 'We create and execute data-driven social media strategies that build brand awareness, engage your audience, and drive measurable business results.',
    features: ['Platform Strategy', 'Content Creation', 'Community Management', 'Paid Advertising', 'Influencer Outreach', 'Analytics & Reporting', 'Brand Voice Development', 'Crisis Management'],
    process: ['Social Media Audit', 'Strategy Development', 'Content Calendar', 'Content Creation', 'Publishing & Engagement', 'Analytics Review'],
  },
};

const defaultDetail = {
  title: 'Our Service',
  tagline: 'Professional services tailored for your needs',
  description: 'We provide comprehensive digital solutions to help your business grow and succeed in the digital world. Our expert team delivers high-quality results on time and within budget.',
  features: ['Professional Team', 'Quality Assurance', 'Timely Delivery', 'Post-launch Support', 'Transparent Communication', 'Customized Solutions'],
  process: ['Discovery', 'Planning', 'Execution', 'Testing', 'Launch', 'Support'],
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const detail = serviceDetails[slug] || { ...defaultDetail, title: slug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Service' };

  return (
    <div className="page-top">
      <section className="hero-gradient py-20">
        <div className="container-custom text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link to="/services" className="text-blue-200 hover:text-white text-sm mb-6 inline-flex items-center gap-2 transition-colors">
              ← Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{detail.title}</h1>
            <p className="text-blue-100 text-xl max-w-2xl">{detail.tagline}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="section-subtitle">Overview</p>
              <h2 className="section-title mb-6">What We Offer</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">{detail.description}</p>

              <div>
                <h3 className="font-bold text-dark text-xl mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {detail.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-gray-700">
                      <FaCheckCircle className="text-primary flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/contact" className="btn-primary mt-8">
                Get a Free Quote <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-dark text-xl mb-6">Our Process</h3>
              <div className="space-y-4">
                {detail.process.map((step, i) => (
                  <div key={step} className="flex items-center gap-4 p-4 bg-light rounded-xl">
                    <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className="font-semibold text-dark">{step}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 hero-gradient rounded-2xl p-8 text-white">
                <h4 className="text-xl font-bold mb-3">Ready to Get Started?</h4>
                <p className="text-blue-200 mb-5 text-sm">
                  Contact us today for a free consultation and quote for your project.
                </p>
                <Link to="/contact" className="btn-accent text-sm">
                  Contact Us <FaArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
