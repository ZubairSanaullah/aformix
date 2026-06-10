import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_ARTICLES } from '../../constants/blogData';

interface HeroSectionProps {
  onExplore: () => void;
  onSubscribe: () => void;
  isDark: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onSubscribe, isDark }) => {
  const featuredArticles = BLOG_ARTICLES.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden py-12 md:py-20 ${
        isDark ? 'bg-gray-950' : 'bg-white'
      }`}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 opacity-5 ${isDark ? 'bg-white' : 'bg-black'}`}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(49, 185, 143, 0.1) 25%, rgba(49, 185, 143, 0.1) 26%, transparent 27%, transparent 74%, rgba(49, 185, 143, 0.1) 75%, rgba(49, 185, 143, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(49, 185, 143, 0.1) 25%, rgba(49, 185, 143, 0.1) 26%, transparent 27%, transparent 74%, rgba(49, 185, 143, 0.1) 75%, rgba(49, 185, 143, 0.1) 76%, transparent 77%, transparent)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Aurora Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/5 to-cyan-500/10 blur-3xl" />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              x: Math.random() * 300 - 150,
              y: Math.random() * 300 - 150,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Side - Text Content */}
          <motion.div className="flex flex-col justify-center" variants={itemVariants}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 w-fit mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span
                className={`text-sm font-medium tracking-wide ${
                  isDark
                    ? 'text-emerald-400'
                    : 'text-emerald-600'
                }`}
              >
                INSIGHTS & INNOVATION
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              variants={itemVariants}
            >
              Insights,{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Innovation
              </span>
              {' '}& Digital Growth
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className={`text-lg md:text-xl mb-8 leading-relaxed ${
                isDark
                  ? 'text-gray-300'
                  : 'text-gray-600'
              }`}
              variants={itemVariants}
            >
              Expert insights on AI, automation, web development, SaaS, SEO, business growth, and emerging technologies
              that shape the future of digital innovation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4 mb-8" variants={itemVariants}>
              <motion.button
                onClick={onExplore}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Articles
              </motion.button>
              <motion.button
                onClick={onSubscribe}
                className={`px-8 py-4 border-2 font-semibold rounded-xl transition-all duration-300 ${
                  isDark
                    ? 'border-emerald-400 text-emerald-400 hover:bg-emerald-400/10'
                    : 'border-emerald-600 text-emerald-600 hover:bg-emerald-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex items-center gap-8 pt-8 border-t"
              style={{
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }}
              variants={itemVariants}
            >
              {[
                { label: 'Articles', value: '50+' },
                { label: 'Authors', value: '20+' },
                { label: 'Readers', value: '10K+' },
              ].map((stat, i) => (
                <div key={i}>
                  <div
                    className={`text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Floating Cards */}
          <motion.div
            className="relative h-96 md:h-full"
            variants={containerVariants}
          >
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                className={`absolute w-72 rounded-2xl shadow-xl overflow-hidden cursor-pointer group ${
                  isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100'
                }`}
                style={{
                  left: `${index * 30}%`,
                  top: `${index * 40}px`,
                  zIndex: index,
                }}
                variants={floatingVariants}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.05, y: -20, zIndex: 50 }}
              >
                {/* Card Image */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-emerald-400 to-purple-600">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3
                    className={`font-bold text-sm line-clamp-2 mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {article.title}
                  </h3>

                  {/* Meta Info */}
                  <div
                    className={`text-xs space-y-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{article.author.name}</span>
                      <span>{article.readingTime}</span>
                    </div>
                    <div>{article.publishDate}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
