import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight, FaStar } from 'react-icons/fa';
import { fetchPricing } from '../api';

const defaultSEO = [
  { id: 1, name: 'Basic SEO', price: 9999, duration: 'per month', is_popular: false, features_list: ['Keyword Research', '5 Target Keywords', 'On-Page Optimization', 'Monthly Report', 'Google My Business Setup'] },
  { id: 2, name: 'Standard SEO', price: 19999, duration: 'per month', is_popular: true, features_list: ['Keyword Research', '15 Target Keywords', 'On-Page Optimization', 'Off-Page Optimization', 'Link Building', 'Monthly Report', 'Google Analytics Setup'] },
  { id: 3, name: 'Premium SEO', price: 34999, duration: 'per month', is_popular: false, features_list: ['Keyword Research', '30 Target Keywords', 'On-Page Optimization', 'Off-Page Optimization', 'Advanced Link Building', 'Content Creation', 'Monthly Report', 'Dedicated Account Manager'] },
];

const defaultSMM = [
  { id: 4, name: 'Basic SMM', price: 7999, duration: 'per month', is_popular: false, features_list: ['2 Social Platforms', '8 Posts/Month', 'Basic Graphic Design', 'Monthly Report'] },
  { id: 5, name: 'Standard SMM', price: 14999, duration: 'per month', is_popular: true, features_list: ['3 Social Platforms', '15 Posts/Month', 'Custom Graphics', 'Story Creation', 'Monthly Report', 'Audience Growth'] },
  { id: 6, name: 'Premium SMM', price: 24999, duration: 'per month', is_popular: false, features_list: ['5 Social Platforms', '25 Posts/Month', 'Custom Graphics', 'Video Creation', 'Paid Campaign', 'Monthly Report', 'Dedicated Manager'] },
];

function PlanCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative card p-8 flex flex-col ${plan.is_popular ? 'border-2 border-primary ring-4 ring-primary/10 scale-105' : 'border border-gray-100'}`}
    >
      {plan.is_popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap">
          <FaStar className="text-yellow-300" /> Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-dark mb-1">{plan.name}</h3>
        <div className="flex items-baseline gap-1 mt-3">
          <span className="text-4xl font-black text-primary">
            ₹{plan.price?.toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm">/{plan.duration?.replace('per ', '')}</span>
        </div>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {(plan.features_list || []).map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
            <FaCheckCircle className="text-primary flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        to="/contact"
        className={`w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
          plan.is_popular
            ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/30'
            : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
        }`}
      >
        Get Started
      </Link>
    </motion.div>
  );
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('seo');
  const [seoPlans, setSeoPlans] = useState(defaultSEO);
  const [smmPlans, setSmmPlans] = useState(defaultSMM);

  useEffect(() => {
    fetchPricing('seo').then(r => {
      const d = r.data?.results || r.data;
      if (d?.length) setSeoPlans(d);
    }).catch(() => {});
    fetchPricing('social').then(r => {
      const d = r.data?.results || r.data;
      if (d?.length) setSmmPlans(d);
    }).catch(() => {});
  }, []);

  const plans = activeTab === 'seo' ? seoPlans : smmPlans;

  return (
    <div className="page-top">
      {/* Hero */}
      <section className="hero-gradient py-20">
        <div className="container-custom text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">Transparent Pricing</p>
            <h1 className="text-4xl md:text-5xl font-black mb-5">Pricing Plans</h1>
            <p className="text-blue-100 max-w-xl mx-auto">
              Choose the right plan for your business. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light">
        <div className="container-custom">
          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-14">
            {[
              { id: 'seo', label: 'SEO Package' },
              { id: 'social', label: 'Social Media Package' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          <div className="text-center mt-16 bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-dark mb-3">Need a Custom Plan?</h3>
            <p className="text-gray-500 mb-6">
              We offer custom pricing for enterprise clients. Contact us to discuss your specific needs.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Us <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
