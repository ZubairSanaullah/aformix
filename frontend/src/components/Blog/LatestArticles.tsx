import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { BlogArticle } from '../../constants/blogData';
import { BLOG_ARTICLES } from '../../constants/blogData';
import BlogCard from './BlogCard';

interface LatestArticlesProps {
  isDark: boolean;
  onArticleClick: (article: BlogArticle) => void;
  searchQuery?: string;
  selectedCategory?: string | null;
  selectedTag?: string | null;
}

const LatestArticles: React.FC<LatestArticlesProps> = ({
  isDark,
  onArticleClick,
  searchQuery = '',
  selectedCategory = null,
  selectedTag = null,
}) => {
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesSearch =
        searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === null || article.category === selectedCategory;

      const matchesTag =
        selectedTag === null || article.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <section className={`py-20 ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className={`text-sm font-semibold tracking-widest uppercase ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}
          >
            Latest Articles
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold mt-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {selectedCategory || selectedTag || searchQuery
              ? `Results for ${selectedCategory || selectedTag || `"${searchQuery}"`}`
              : 'Discover Our Latest Insights'}
          </h2>
          <p
            className={`text-lg mt-4 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
          </p>
        </motion.div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            className={`py-20 text-center rounded-2xl border-2 border-dashed ${
              isDark
                ? 'bg-gray-900 border-gray-800'
                : 'bg-gray-50 border-gray-300'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`text-5xl mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
              📝
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No Articles Found
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your filters or search query
            </p>
          </motion.div>
        )}

        {/* Masonry Grid */}
        {filteredArticles.length > 0 && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
              >
                <BlogCard
                  article={article}
                  isDark={isDark}
                  onArticleClick={onArticleClick}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredArticles.length > 0 && (
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Articles
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LatestArticles;
