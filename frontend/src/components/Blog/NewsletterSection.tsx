import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

interface NewsletterSectionProps {
  isDark: boolean;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({ isDark }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setEmail('');
    setIsLoading(false);

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

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
      className={`py-20 ${
        isDark
          ? 'bg-gradient-to-br from-purple-950 via-gray-950 to-emerald-950'
          : 'bg-gradient-to-br from-emerald-50 via-cyan-50 to-purple-50'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
            <motion.div
              className={`absolute inset-0 rounded-3xl blur-3xl ${
                isDark
                  ? 'bg-gradient-to-br from-emerald-500/10 to-cyan-500/10'
                  : 'bg-gradient-to-br from-emerald-400/20 to-cyan-400/20'
              }`}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
          </div>

          {/* Main Container */}
          <div
            className={`relative rounded-3xl border-2 p-12 md:p-16 ${
              isDark
                ? 'bg-gray-900/80 backdrop-blur-xl border-emerald-500/30'
                : 'bg-white/80 backdrop-blur-xl border-emerald-200/50'
            }`}
          >
            {/* Content */}
            <motion.div className="text-center mb-12" variants={containerVariants}>
              {/* Icon */}
              <motion.div
                className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${
                  isDark
                    ? 'bg-gradient-to-br from-emerald-500 to-cyan-500'
                    : 'bg-gradient-to-br from-emerald-500 to-cyan-500'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ rotate: { duration: 0.6 } }}
              >
                <Mail size={32} className="text-white" />
              </motion.div>

              {/* Heading */}
              <motion.h2
                className={`text-4xl md:text-5xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                variants={itemVariants}
              >
                Get Industry Insights Before Everyone Else
              </motion.h2>

              {/* Subheading */}
              <motion.p
                className={`text-lg md:text-xl max-w-2xl mx-auto ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
                variants={itemVariants}
              >
                Join 10,000+ tech professionals and entrepreneurs who receive curated insights on AI, SaaS, and digital transformation every week.
              </motion.p>
            </motion.div>

            {/* Subscription Form */}
            <motion.form
              onSubmit={handleSubscribe}
              className="max-w-md mx-auto mb-8"
              variants={itemVariants}
            >
              <div className="relative flex flex-col sm:flex-row gap-3">
                {/* Email Input */}
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className={`w-full px-6 py-4 rounded-xl border-2 font-medium outline-none transition-all duration-300 ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                    }`}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className={`px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap ${
                    isSubmitted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/50'
                  } disabled:opacity-80`}
                  whileHover={{ scale: isSubmitted ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Subscribed!</span>
                    </>
                  ) : isLoading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </motion.button>
              </div>

              {/* Privacy Message */}
              <motion.p
                className={`text-xs mt-4 text-center ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
                variants={itemVariants}
              >
                We respect your privacy. Unsubscribe anytime.
              </motion.p>
            </motion.form>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t"
              style={{
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }}
              variants={containerVariants}
            >
              {[
                { label: '10K+', value: 'Subscribers' },
                { label: '95%', value: 'Open Rate' },
                { label: '2/week', value: 'Newsletter' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  variants={itemVariants}
                >
                  <div
                    className={`text-2xl font-bold ${
                      isDark
                        ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'
                        : 'bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent'
                    }`}
                  >
                    {stat.label}
                  </div>
                  <div
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Benefits List */}
            <motion.div
              className="mt-12 grid md:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {[
                {
                  icon: '📧',
                  title: 'Curated Content',
                  description: 'Hand-picked articles and insights delivered to your inbox',
                },
                {
                  icon: '⚡',
                  title: 'Weekly Digest',
                  description: 'Stay updated with the latest trends without information overload',
                },
                {
                  icon: '🎁',
                  title: 'Exclusive Offers',
                  description: 'Get early access to webinars, courses, and special deals',
                },
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  className={`p-4 rounded-xl border ${
                    isDark
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-emerald-50 border-emerald-200'
                  }`}
                  variants={itemVariants}
                >
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h4
                    className={`font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {benefit.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
