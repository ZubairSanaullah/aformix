import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TRENDING_TOPICS } from '../../constants/blogData';

interface TrendingTopicsProps {
  isDark: boolean;
  onTopicClick: (topic: string) => void;
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ isDark, onTopicClick }) => {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  // Add view counts and icons to trending topics
  const topicsWithMetrics = TRENDING_TOPICS.map((topic, index) => ({
    topic,
    views: 2000 + Math.random() * 8000,
    trend: Math.random() > 0.5 ? 'up' : 'down',
    icon: ['🤖', '🛠️', '💡', '📱', '🔍', '📈', '🚀', '🔐', '⚙️', '💻'][index % 10],
  }));

  return (
    <section
      className={`py-20 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 to-gray-950'
          : 'bg-gradient-to-br from-emerald-50 to-cyan-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className={`text-sm font-semibold tracking-widest uppercase ${
              isDark ? 'text-cyan-400' : 'text-cyan-600'
            }`}
          >
            What's Hot
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold mt-3 mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Trending Topics
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Explore the most talked-about topics in technology, business, and innovation
          </p>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {topicsWithMetrics.map((item) => (
            <motion.button
              key={item.topic}
              onClick={() => onTopicClick(item.topic)}
              onMouseEnter={() => setHoveredTopic(item.topic)}
              onMouseLeave={() => setHoveredTopic(null)}
              className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden cursor-pointer ${
                isDark
                  ? 'bg-gray-800 border-gray-700 hover:border-cyan-500'
                  : 'bg-white border-gray-200 hover:border-cyan-500'
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-emerald-500/0 group-hover:from-cyan-500/10 group-hover:to-emerald-500/10 transition-all duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon & Trend */}
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <motion.span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      item.trend === 'up'
                        ? isDark
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-emerald-100 text-emerald-700'
                        : isDark
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.trend === 'up' ? '↑ Trending' : '→ Hot'}
                  </motion.span>
                </div>

                {/* Topic Name */}
                <h3
                  className={`text-lg font-bold mb-2 text-left ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {item.topic}
                </h3>

                {/* Views */}
                <p
                  className={`text-xs font-medium mb-3 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {Math.round(item.views / 100)} articles
                </p>

                {/* Progress Bar */}
                <div
                  className={`h-1.5 rounded-full overflow-hidden ${
                    isDark ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${30 + Math.random() * 70}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />
                </div>
              </div>

              {/* Hover CTA */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-2xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white font-semibold">Explore</span>
              </motion.div>
            </motion.button>
          ))}
        </motion.div>

        {/* Tags Cloud Alternative View */}
        <motion.div
          className="mt-20 pt-20 border-t"
          style={{
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3
            className={`text-2xl font-bold mb-8 text-center ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            All Topics
          </h3>

          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TRENDING_TOPICS.map((topic, index) => (
              <motion.button
                key={topic}
                onClick={() => onTopicClick(topic)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 ${
                  isDark
                    ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-cyan-500 hover:text-cyan-400'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-cyan-500 hover:text-cyan-600'
                }`}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  boxShadow:
                    isDark
                      ? '0 0 20px rgba(0, 191, 222, 0.3)'
                      : '0 0 20px rgba(0, 191, 222, 0.2)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {topic}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingTopics;
