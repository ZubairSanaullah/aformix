import React from 'react';
import { motion } from 'framer-motion';
import { TRENDING_TOPICS } from '../../constants/blogData';

interface TrendingTopicsProps {
  onTopicClick: (topic: string) => void;
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ onTopicClick }) => {

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
  const topicsWithMetrics = TRENDING_TOPICS.map((topic, _index) => ({
    topic,
    views: 2000 + Math.random() * 8000,
    trend: Math.random() > 0.5 ? 'up' : 'down',
    icon: ['🤖', '🛠️', '💡', '📱', '🔍', '📈', '🚀', '🔐', '⚙️', '💻'][_index % 10],
  }));

  return (
    <section
      className="py-20 bg-[var(--color-surface-elevated)]"
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
            className="text-sm font-semibold tracking-widest uppercase text-accent"
          >
            What's Hot
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-[var(--color-text)]"
          >
            Trending Topics
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto text-[var(--color-text-muted)]"
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
              className="relative group p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden cursor-pointer bg-[var(--color-surface)] border-[var(--color-border)] hover:border-accent"
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
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-orange-500/20 text-orange-400'
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
                  className="text-lg font-bold mb-2 text-left text-[var(--color-text)]"
                >
                  {item.topic}
                </h3>

                {/* Views */}
                <p
                  className="text-xs font-medium mb-3 text-[var(--color-text-muted)] text-left"
                >
                  {Math.round(item.views / 100)} articles
                </p>

                {/* Progress Bar */}
                <div
                  className="h-1.5 rounded-full overflow-hidden bg-[var(--color-bg)]"
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
          className="mt-20 pt-20 border-t border-[var(--color-border)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3
            className="text-2xl font-bold mb-8 text-center text-[var(--color-text)]"
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
            {TRENDING_TOPICS.map((topic) => (
              <motion.button
                key={topic}
                onClick={() => onTopicClick(topic)}
                className="px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-cyan-500 hover:text-accent cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 20px rgba(0, 191, 222, 0.2)',
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
