import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight, FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa';
import { fetchBlogPosts } from '../api';

const defaultPosts = [
  { id: 1, title: 'Best Website Design and Development Cost in 2026', slug: 'best-website-development-cost-2026', excerpt: 'You must be wondering what may be the cost of Website design and development, especially for business owners who want to bring their business to the digital world.', author: 'Reviral Technology', published_at: '2024-06-12' },
  { id: 2, title: 'Best IT Company for Digital Transformation in 2026', slug: 'best-it-company-digital-transformation-2026', excerpt: 'Choosing the right IT partner for your digital transformation journey is one of the most important decisions for success in the digital age.', author: 'Reviral Technology', published_at: '2024-06-12' },
  { id: 3, title: 'Top Digital Marketing Strategies for Business Growth', slug: 'digital-marketing-strategies-2026', excerpt: 'Digital marketing has evolved rapidly. Learn the most effective strategies to grow your business online and reach your target audience in 2026.', author: 'Reviral Technology', published_at: '2024-05-20' },
];

const cardStyles = [
  { accent: '#1a3c8f', bg: 'from-blue-600 to-blue-800', tag: 'bg-blue-100 text-blue-700' },
  { accent: '#7c3aed', bg: 'from-violet-600 to-violet-800', tag: 'bg-violet-100 text-violet-700' },
  { accent: '#059669', bg: 'from-emerald-600 to-teal-700', tag: 'bg-emerald-100 text-emerald-700' },
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BlogSection() {
  const [posts, setPosts] = useState(defaultPosts);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    fetchBlogPosts()
      .then((r) => {
        const d = r.data?.results || r.data;
        if (d?.length) setPosts(d);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute -top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4"
        >
          <div>
            <p className="section-subtitle">Our blogs</p>
            <h2 className="section-title">
              Our Latest &<br />Popular Blogs
            </h2>
          </div>
          <Link to="/blog" className="btn-outline flex-shrink-0">
            See All Posts <FaArrowRight className="text-sm" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {posts.slice(0, 3).map((post, i) => {
            const style = cardStyles[i % cardStyles.length];
            return (
              <motion.div
                key={post.id || i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 border border-gray-100">
                  {/* Image / gradient header */}
                  {post.image ? (
                    <div className="relative overflow-hidden h-52">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                  ) : (
                    <div className={`h-52 bg-gradient-to-br ${style.bg} relative overflow-hidden flex items-end p-6`}>
                      {/* Decorative circles */}
                      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                      <div className="absolute top-4 right-16 w-16 h-16 bg-white/5 rounded-full" />
                      <div className="absolute bottom-4 left-4 w-20 h-20 bg-black/10 rounded-full blur-xl" />
                      <span className="text-white/20 font-black text-8xl absolute -bottom-4 -right-2 select-none">
                        {post.title.charAt(0)}
                      </span>
                      <span className={`relative z-10 text-xs font-bold px-3 py-1.5 rounded-full ${style.tag} backdrop-blur-sm`}>
                        Blog Post
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-primary/60" />
                        {formatDate(post.published_at)}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="flex items-center gap-1.5">
                        <FaClock className="text-primary/60" /> 5 min read
                      </span>
                    </div>

                    <h3 className="font-bold text-dark text-lg mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5">
                      {post.excerpt}
                    </p>

                    {/* Author + read more */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                          <FaUser className="text-primary text-xs" />
                        </div>
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1.5 text-primary text-sm font-bold group-hover:gap-3 transition-all">
                        Read more <FaArrowRight className="text-xs" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
