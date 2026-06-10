import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import HeroSection from '../components/Blog/HeroSection';
import FeaturedArticles from '../components/Blog/FeaturedArticles';
import SearchFiltering from '../components/Blog/SearchFiltering';
import LatestArticles from '../components/Blog/LatestArticles';
import TrendingTopics from '../components/Blog/TrendingTopics';
import NewsletterSection from '../components/Blog/NewsletterSection';
import type { BlogArticle } from '../constants/blogData';
import { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Blog: React.FC = () => {
  const { theme } = useTheme();
  const isDark = useMemo(
    () => theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
    [theme]
  );

  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle article modal
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedArticle]);

  const handleExplore = () => {
    const element = document.getElementById('search-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = () => {
    const element = document.getElementById('newsletter-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTag(topic);
    const element = document.getElementById('search-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Meta Tags for SEO */}
      <head>
        <title>Blog - Aformix | AI, Automation & Digital Growth Insights</title>
        <meta
          name="description"
          content="Expert insights on AI automation, web development, SaaS, SEO, and business growth. Stay updated with Aformix blog."
        />
        <meta
          name="keywords"
          content="AI automation, SaaS development, web development, SEO, digital transformation, business growth"
        />
        <meta property="og:title" content="Blog - Aformix | Insights & Innovation" />
        <meta
          property="og:description"
          content="Expert insights on AI, automation, web development, SaaS, SEO, and business growth."
        />
        <meta property="og:type" content="website" />
      </head>

      <main className={isDark ? 'bg-gray-950' : 'bg-white'}>
        {/* Hero Section */}
        <HeroSection
          onExplore={handleExplore}
          onSubscribe={handleSubscribe}
          isDark={isDark}
        />

        {/* Featured Articles */}
        <FeaturedArticles
          isDark={isDark}
          onArticleClick={setSelectedArticle}
        />

        {/* Search & Filtering */}
        <div id="search-section">
          <SearchFiltering
            isDark={isDark}
            onCategoryChange={setSelectedCategory}
            onTagChange={setSelectedTag}
            onSearchChange={setSearchQuery}
            currentCategory={selectedCategory}
            currentTag={selectedTag}
            searchQuery={searchQuery}
          />
        </div>

        {/* Latest Articles */}
        <LatestArticles
          isDark={isDark}
          onArticleClick={setSelectedArticle}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedTag={selectedTag}
        />

        {/* Trending Topics */}
        <TrendingTopics isDark={isDark} onTopicClick={handleTopicClick} />

        {/* Newsletter Section */}
        <div id="newsletter-section">
          <NewsletterSection isDark={isDark} />
        </div>

        {/* Article Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal Content */}
              <motion.div
                className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
                  isDark
                    ? 'bg-gray-900'
                    : 'bg-white'
                }`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  onClick={() => setSelectedArticle(null)}
                  className={`sticky top-6 right-6 z-10 p-2 rounded-full transition-all ${
                    isDark
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>

                {/* Article Content */}
                <article className="p-8 md:p-12">
                  {/* Featured Image */}
                  <div className="mb-8 rounded-2xl overflow-hidden h-96">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span
                      className={`px-4 py-2 rounded-full font-semibold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 text-white`}
                    >
                      {selectedArticle.category}
                    </span>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedArticle.readingTime} read
                    </span>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedArticle.publishDate}
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {selectedArticle.title}
                  </h1>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 py-6 border-b" style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  }}>
                    <img
                      src={selectedArticle.author.avatar}
                      alt={selectedArticle.author.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                    />
                    <div>
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {selectedArticle.author.name}
                      </div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {selectedArticle.author.bio}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-lg my-8 leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {selectedArticle.description}
                  </p>

                  {/* Full Content */}
                  <div className={`prose prose-lg max-w-none mb-8 ${
                    isDark ? 'prose-invert' : ''
                  }`}>
                    <p className={`leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {selectedArticle.content}
                    </p>

                    {/* Placeholder for more detailed content */}
                    <p className={`leading-relaxed mt-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      This comprehensive article explores key insights and practical strategies to help you succeed in {selectedArticle.category.toLowerCase()}. Whether you're just starting out or looking to optimize your existing approach, you'll find valuable takeaways that you can implement immediately.
                    </p>

                    <p className={`leading-relaxed mt-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Throughout this guide, we'll examine real-world examples, industry trends, and expert recommendations that have proven effective. By the end, you'll have a clear understanding of best practices and actionable steps to take your strategy to the next level.
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mb-8 pt-8 border-t" style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  }}>
                    <div className="flex flex-wrap gap-3">
                      {selectedArticle.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            isDark
                              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 py-8 border-t" style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  }}>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Share this article:</span>
                    <button className={`px-4 py-2 rounded-lg font-medium ${
                      isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      Twitter
                    </button>
                    <button className={`px-4 py-2 rounded-lg font-medium ${
                      isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      LinkedIn
                    </button>
                    <button className={`px-4 py-2 rounded-lg font-medium ${
                      isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      Copy Link
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-8 border-t" style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  }}>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {selectedArticle.views.toLocaleString()}
                      </div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Views</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {selectedArticle.reactions.comments}
                      </div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Comments</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {selectedArticle.reactions.likes}
                      </div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Likes</div>
                    </div>
                  </div>
                </article>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Blog;
