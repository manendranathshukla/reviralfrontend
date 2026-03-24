import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { fetchBlogPosts } from '../api';

const defaultPosts = [
  { id: 1, title: 'Best Website Design and Development Cost in 2026', slug: 'best-website-development-cost-2026', excerpt: 'You must be wondering what may be the cost of Website design. Website development especially the business owners and those who want to bring their business to the digital world.', author: 'Reviral Technology', published_at: '2024-06-12' },
  { id: 2, title: 'Best IT Company for Digital Transformation in 2026', slug: 'best-it-company-digital-transformation-2026', excerpt: 'Choosing the right IT partner for your digital transformation journey is one of the most important decisions for success in the digital age.', author: 'Reviral Technology', published_at: '2024-06-12' },
  { id: 3, title: 'Top Digital Marketing Strategies for Business Growth', slug: 'digital-marketing-strategies-2026', excerpt: 'Digital marketing has evolved rapidly. Learn the most effective strategies to grow your business online and reach your target audience.', author: 'Reviral Technology', published_at: '2024-05-20' },
  { id: 4, title: 'How to Choose the Right Mobile App Development Company', slug: 'choosing-mobile-app-development-company', excerpt: 'Selecting the right mobile app development partner is crucial for your project\'s success. Here\'s a comprehensive guide to help you make the right choice.', author: 'Reviral Technology', published_at: '2024-04-15' },
  { id: 5, title: 'SEO Trends to Watch in 2026', slug: 'seo-trends-2026', excerpt: 'Search engine optimization is constantly evolving. Stay ahead of the competition with these top SEO trends that will dominate in 2026.', author: 'Reviral Technology', published_at: '2024-03-10' },
  { id: 6, title: 'The Importance of UI/UX Design for Business Success', slug: 'importance-of-ui-ux-design', excerpt: 'Good design is not just about aesthetics. It\'s about creating experiences that drive business results and customer satisfaction.', author: 'Reviral Technology', published_at: '2024-02-20' },
];

const cardGradients = [
  'from-blue-500 to-blue-700', 'from-purple-500 to-purple-700', 'from-green-500 to-teal-600',
  'from-orange-500 to-red-500', 'from-pink-500 to-purple-600', 'from-teal-500 to-cyan-600',
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Blog() {
  const [posts, setPosts] = useState(defaultPosts);

  useEffect(() => {
    fetchBlogPosts()
      .then((r) => {
        const d = r.data?.results || r.data;
        if (d?.length) setPosts(d);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="page-top">
      <section className="hero-gradient py-20">
        <div className="container-custom text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">Our Blog</p>
            <h1 className="text-4xl md:text-5xl font-black mb-5">Latest Insights & News</h1>
            <p className="text-blue-100 max-w-xl mx-auto">
              Stay updated with the latest trends and insights in technology and digital marketing.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/blog/${post.slug}`} className="card group block overflow-hidden h-full flex flex-col">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className={`h-52 bg-gradient-to-br ${cardGradients[i % cardGradients.length]} flex items-center justify-center`}>
                      <span className="text-white text-8xl font-black opacity-20">{post.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><FaCalendarAlt /> {formatDate(post.published_at)}</span>
                      <span className="flex items-center gap-1"><FaUser /> {post.author}</span>
                    </div>
                    <h3 className="font-bold text-dark text-xl mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm mt-auto">
                      read more <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
