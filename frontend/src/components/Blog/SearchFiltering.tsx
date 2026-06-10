import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { BLOG_CATEGORIES, TRENDING_TOPICS } from '../../constants/blogData';

interface SearchFilteringProps {
  isDark: boolean;
  onCategoryChange: (category: string | null) => void;
  onTagChange: (tag: string | null) => void;
  onSearchChange: (query: string) => void;
  currentCategory: string | null;
  currentTag: string | null;
  searchQuery: string;
}

const SearchFiltering: React.FC<SearchFilteringProps> = ({
  isDark,
  onCategoryChange,
  onTagChange,
  onSearchChange,
  currentCategory,
  currentTag,
  searchQuery,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      className={`py-12 border-y ${
        isDark
          ? 'bg-gray-900 border-gray-800'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`relative group ${
              isDark
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            } border-2 rounded-2xl transition-all duration-300 ${
              isSearchFocused
                ? `${isDark ? 'border-emerald-500' : 'border-emerald-500'} shadow-lg`
                : ''
            }`}
          >
            <div className="flex items-center px-6 py-4">
              <Search
                size={20}
                className={isSearchFocused ? 'text-emerald-500' : isDark ? 'text-gray-400' : 'text-gray-400'}
              />
              <input
                type="text"
                placeholder="Search articles by title, keyword, or author..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`ml-4 flex-1 outline-none text-lg font-medium placeholder-gray-400 ${
                  isDark
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-900'
                }`}
              />
              {searchQuery && (
                <motion.button
                  onClick={() => onSearchChange('')}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <X size={20} />
                </motion.button>
              )}
            </div>

            {/* Search Suggestions Dropdown */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  className={`absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl shadow-2xl border ${
                    isDark
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Popular Searches
                  </div>
                  <motion.div className="space-y-2" variants={containerVariants}>
                    {TRENDING_TOPICS.slice(0, 5).map((topic) => (
                      <motion.button
                        key={topic}
                        onClick={() => onSearchChange(topic)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          isDark
                            ? 'hover:bg-gray-700 text-gray-300'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        variants={itemVariants}
                      >
                        {topic}
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Filters Toggle */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className={`mb-6 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
            isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          } border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showFilters ? '✕ Hide Filters' : '+ Show Filters'}
        </motion.button>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Filters */}
              <div>
                <motion.h3
                  className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  variants={itemVariants}
                >
                  Categories
                </motion.h3>
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {BLOG_CATEGORIES.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() =>
                        onCategoryChange(currentCategory === category ? null : category)
                      }
                      className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 border-2 ${
                        currentCategory === category
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500'
                          : isDark
                          ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-emerald-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-500'
                      }`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Tag Filters */}
              <div>
                <motion.h3
                  className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  variants={itemVariants}
                >
                  Topics
                </motion.h3>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {TRENDING_TOPICS.map((topic) => (
                    <motion.button
                      key={topic}
                      onClick={() =>
                        onTagChange(currentTag === topic ? null : topic)
                      }
                      className={`px-3 py-1 rounded-full font-medium text-xs transition-all duration-300 border-2 ${
                        currentTag === topic
                          ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border-cyan-500'
                          : isDark
                          ? 'bg-gray-800 text-gray-400 border-gray-700 hover:border-cyan-500'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-cyan-500'
                      }`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {topic}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Active Filters Display */}
              {(currentCategory || currentTag || searchQuery) && (
                <motion.div
                  className="flex flex-wrap items-center gap-2 pt-4 border-t"
                  style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span
                    className={`text-xs font-semibold uppercase ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Active Filters:
                  </span>
                  {searchQuery && (
                    <motion.div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                        isDark
                          ? 'bg-gray-800 text-emerald-400'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      {searchQuery}
                      <button onClick={() => onSearchChange('')} className="hover:opacity-70">
                        ✕
                      </button>
                    </motion.div>
                  )}
                  {currentCategory && (
                    <motion.div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                        isDark
                          ? 'bg-gray-800 text-emerald-400'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      {currentCategory}
                      <button onClick={() => onCategoryChange(null)} className="hover:opacity-70">
                        ✕
                      </button>
                    </motion.div>
                  )}
                  {currentTag && (
                    <motion.div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                        isDark
                          ? 'bg-gray-800 text-cyan-400'
                          : 'bg-cyan-100 text-cyan-700'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      {currentTag}
                      <button onClick={() => onTagChange(null)} className="hover:opacity-70">
                        ✕
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SearchFiltering;
