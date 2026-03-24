import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaShare } from 'react-icons/fa';
import { fetchBlogPost } from '../api';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPost(slug)
      .then((r) => setPost(r.data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold text-dark mb-3">Post Not Found</h2>
        <p className="text-gray-500 mb-6">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="page-top">
      <section className="hero-gradient py-16">
        <div className="container-custom">
          <Link to="/blog" className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 text-sm">
            <FaArrowLeft /> Back to Blog
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black text-white max-w-3xl"
          >
            {post.title}
          </motion.h1>
          <div className="flex flex-wrap gap-4 mt-4 text-blue-200 text-sm">
            <span className="flex items-center gap-1.5"><FaCalendarAlt />{post.published_at}</span>
            <span className="flex items-center gap-1.5"><FaUser />{post.author}</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            {post.image && (
              <img src={post.image} alt={post.title} className="w-full rounded-xl mb-8 object-cover max-h-96" />
            )}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
              ) : (
                <p>{post.excerpt}</p>
              )}
            </div>

            <div className="flex items-center gap-4 mt-10 pt-6 border-t border-gray-100">
              <span className="text-sm text-gray-500">Share this post:</span>
              <button className="flex items-center gap-2 text-primary text-sm font-semibold hover:underline">
                <FaShare /> Share
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/blog" className="btn-outline">
              <FaArrowLeft /> Back to All Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
