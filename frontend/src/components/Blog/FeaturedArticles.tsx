import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import type { BlogArticle } from '../../constants/blogData';
import { BLOG_ARTICLES } from '../../constants/blogData';

interface FeaturedArticlesProps {
  onArticleClick: (article: BlogArticle) => void;
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ onArticleClick }) => {
  const featured = BLOG_ARTICLES.filter(a => a.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      className="py-20 bg-[var(--color-bg)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.span
            className="text-sm font-semibold tracking-widest uppercase text-primary"
            variants={itemVariants}
          >
            Featured Stories
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mt-3 text-[var(--color-text)]"
            variants={itemVariants}
          >
            Magazine-Style Selection
          </motion.h2>
          <motion.p
            className="text-lg mt-4 text-[var(--color-text-muted)]"
            variants={itemVariants}
          >
            Our carefully curated selection of premium articles on technology, business, and innovation
          </motion.p>
        </motion.div>

        {/* Featured Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Large Featured Article */}
          {featured[0] && (
            <motion.div
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <div
                className="group relative rounded-3xl overflow-hidden cursor-pointer h-full bg-[var(--color-surface)] border border-[var(--color-border)]"
                onClick={() => onArticleClick(featured[0])}
              >
                {/* Image Container */}
                <div className="relative h-96 md:h-full overflow-hidden bg-gradient-to-br from-emerald-400 to-purple-600">
                  <img
                    src={featured[0].image}
                    alt={featured[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                    <div className="flex items-start justify-between">
                      <motion.span
                        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        {featured[0].category}
                      </motion.span>
                      <motion.span
                        className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-medium rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        {featured[0].readingTime} read
                      </motion.span>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                        {featured[0].title}
                      </h3>

                      <p className="text-gray-200 text-lg">
                        {featured[0].description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/20">
                        <div className="flex items-center gap-3">
                          <img
                            src={featured[0].author.avatar}
                            alt={featured[0].author.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                          />
                          <div>
                            <div className="text-white font-semibold text-sm">
                              {featured[0].author.name}
                            </div>
                            <div className="text-gray-300 text-xs">
                              {featured[0].publishDate}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Eye size={16} />
                            <span className="text-sm">{featured[0].views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Smaller Featured Articles Stack */}
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
          >
            {featured.slice(1, 4).map((article) => (
              <motion.div
                key={article.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer p-6 border transition-all duration-300 bg-[var(--color-surface)] border-[var(--color-border)] hover:border-primary"
                onClick={() => onArticleClick(article)}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                {/* Small Image */}
                <div className="relative h-32 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-purple-400 to-cyan-500">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {article.category}
                    </span>
                    <span
                      className="text-xs font-medium text-[var(--color-text-muted)]"
                    >
                      {article.readingTime}
                    </span>
                  </div>

                  <h4
                    className="font-bold line-clamp-2 text-[var(--color-text)]"
                  >
                    {article.title}
                  </h4>

                  <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-2">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span
                        className="text-xs font-medium text-[var(--color-text-muted)]"
                      >
                        {article.author.name.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-500">
                      <Eye size={14} />
                      <span className="text-xs">{article.views}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Featured Articles
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
