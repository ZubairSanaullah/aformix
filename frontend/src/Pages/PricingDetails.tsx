import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ChevronDown, Check, X, Shield } from "lucide-react";
import { pricingData, comparisonTableData } from "../constants/pricingData";
import Divider from "../components/Divider";
import { Link } from "react-router";
import {
  CURRENCIES,
  getSelectedCurrency,
  setSelectedCurrency,
  convertAndFormatPriceString,
  sumAndFormatBonusValues,
} from "../utils/currency";

const PricingDetails: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();

  const pkg = packageId && pricingData[packageId] ? pricingData[packageId] : null;

  useEffect(() => {
    // Scroll to top when loading the page
    window.scrollTo(0, 0);
  }, [packageId]);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-24 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--color-text)]">Package Not Found</h1>
        <p className="text-[var(--color-text-muted)] mb-8 max-w-lg mx-auto">
          The pricing package you are looking for does not exist or has been removed.
        </p>
        <button onClick={() => navigate("/#pricing")} className="btn-primary">
          View All Packages
        </button>
      </div>
    );
  }

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full min-h-screen bg-[var(--color-bg)] pt-24 md:pt-32 pb-12 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* HERO & PRICING CARD SECTION */}
        <motion.section 
          className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            {pkg.popularBadge && (
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
                Most Popular Package
              </span>
            )}
            <div className="mb-4">
              <label className="text-sm text-[var(--color-text-muted)] mr-2">Currency:</label>
              <CurrencySelector />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-[var(--color-text)] mb-6 leading-[1.1]">
              {pkg.title} <span className="text-primary">Package</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-8 leading-relaxed">
              {pkg.shortDescription}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-10">
              <div>
                <p className="text-sm text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Estimated Delivery</p>
                <p className="text-xl font-bold text-[var(--color-text)]">{pkg.deliveryTime}</p>
              </div>
              <div className="w-px bg-[var(--color-border)] hidden sm:block"></div>
              <div>
                <p className="text-sm text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Payment Terms</p>
                <p className="text-xl font-bold text-[var(--color-text)]">{pkg.paymentTerms}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary flex items-center justify-center gap-2 py-4 px-8 text-base">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-outline flex items-center justify-center gap-2 py-4 px-8 text-base">
                Book Free Consultation
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl transform -rotate-6"></div>
            <div className="glass-effect rounded-3xl p-8 md:p-10 border border-[var(--color-glass-border)] relative shadow-2xl backdrop-blur-xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-wider mb-2">Starting at</p>
                  <div className="flex items-end gap-2">
                    <h2 className="text-5xl font-black text-[var(--color-text)]">{convertAndFormatPriceString(pkg.startingPrice)}</h2>
                  </div>
                </div>
                {pkg.discountPercentage && (
                  <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-full text-sm font-bold">
                    {pkg.discountPercentage}
                  </span>
                )}
              </div>

              {pkg.limitedTimeOffer && (
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 mb-8 text-center">
                  <p className="text-primary text-sm font-medium">{pkg.limitedTimeOffer}</p>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 rounded-xl bg-[var(--color-bg)]/50 border border-[var(--color-border)]">
                  <span className="text-[var(--color-text)] font-medium">One-Time Payment</span>
                    <span className="text-[var(--color-text)] font-bold">{convertAndFormatPriceString(pkg.oneTimeOption)}</span>
                </div>
                {pkg.monthlyOption && (
                  <div className="flex justify-between items-center p-4 rounded-xl bg-[var(--color-bg)]/50 border border-[var(--color-border)]">
                    <span className="text-[var(--color-text)] font-medium">Monthly Option</span>
                      <span className="text-[var(--color-text)] font-bold">{convertAndFormatPriceString(pkg.monthlyOption)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider mb-4">Core Benefits</p>
                {pkg.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-[var(--color-text)]">{f.title}</span>
                  </div>
                ))}
              </div>

              {pkg.moneyBackGuarantee && (
                <div className="flex items-center gap-3 p-4 bg-[var(--color-bg)]/30 rounded-xl border border-[var(--color-border)]/50 justify-center mb-6">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm text-[var(--color-text)] font-medium">14-Day Money Back Guarantee</span>
                </div>
              )}

              <Link to="/contact" className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base">
                Select {pkg.title} <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </motion.section>

        <Divider />

        {/* FEATURES SECTION */}
        <motion.section 
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-4">Everything You Need</h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">Comprehensive features included in the {pkg.title} package to ensure your success.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pkg.features.map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-effect p-6 rounded-2xl border border-[var(--color-glass-border)] hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">{feature.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* BONUS OFFERS */}
        {pkg.bonusOffers.length > 0 && (
          <motion.section 
            className="py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="bg-gradient-to-r from-primary/20 via-primary/5 to-transparent rounded-3xl p-1 border border-primary/20 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/30 blur-[80px] rounded-full pointer-events-none"></div>
              <div className="bg-[var(--color-bg)]/90 backdrop-blur-xl rounded-[23px] p-8 md:p-12">
                <div className="text-center mb-10">
                  <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-widest text-xs mb-4">Limited Time Bonus</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">Exclusive Bonus Offers</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {pkg.bonusOffers.map((bonus, i) => (
                    <motion.div key={i} variants={itemVariants} className="bg-primary/5 border border-primary/20 p-6 rounded-2xl text-center relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <h4 className="font-bold text-[var(--color-text)] mb-2">{bonus.title}</h4>
                        <p className="text-primary font-black text-xl">Value: {convertAndFormatPriceString(bonus.value)}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-10 text-center">
                  <p className="text-lg text-[var(--color-text)] font-medium">Total Bonus Value: <span className="text-primary font-bold">{
                    sumAndFormatBonusValues(pkg.bonusOffers.map((b) => b.value))
                  }</span> - Yours FREE!</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        <Divider />

        {/* TIMELINE & PROCESS */}
        <motion.section 
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-4">How We Work</h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">Our proven process ensures high-quality delivery on time, every time.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Process */}
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-8">Step-by-Step Workflow</h3>
              <div className="space-y-6">
                {pkg.process.map((step, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary border border-primary/30 flex items-center justify-center font-bold shrink-0">
                        {step.step}
                      </div>
                      {i !== pkg.process.length - 1 && (
                        <div className="w-px h-full bg-gradient-to-b from-primary/30 to-transparent mt-2"></div>
                      )}
                    </div>
                    <div className="pb-8">
                      <h4 className="text-xl font-bold text-[var(--color-text)] mb-2">{step.title}</h4>
                      <p className="text-[var(--color-text-muted)] text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-8">Project Timeline</h3>
              <div className="glass-effect rounded-3xl p-8 border border-[var(--color-glass-border)]">
                <div className="space-y-4">
                  {pkg.timeline.map((item, i) => (
                    <motion.div key={i} variants={itemVariants} className="flex justify-between items-center p-4 rounded-xl bg-[var(--color-bg)]/40 hover:bg-[var(--color-bg)] border border-transparent hover:border-[var(--color-border)] transition-colors">
                      <span className="font-semibold text-[var(--color-text)]">{item.phase}</span>
                      <span className="text-primary font-medium">{item.duration}</span>
                    </motion.div>
                  ))}
                  <div className="pt-6 mt-6 border-t border-[var(--color-border)] flex justify-between items-center">
                    <span className="font-bold text-[var(--color-text)]">Total Estimated Time</span>
                    <span className="font-black text-xl text-[var(--color-text)]">{pkg.deliveryTime}</span>
                  </div>
                </div>
              </div>

              {/* Ideal For */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">Who is this for?</h3>
                <div className="flex flex-wrap gap-3">
                  {pkg.idealClients.map((client, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-sm text-[var(--color-text-muted)]">
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* TECH STACK */}
        <motion.section 
          className="py-12 border-y border-[var(--color-border)] overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-lg font-medium text-[var(--color-text-muted)] uppercase tracking-widest">Technologies Used</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
            {pkg.techStack.map((tech, i) => (
              <div key={i} className="px-6 py-3 rounded-xl glass-effect border border-[var(--color-glass-border)] text-[var(--color-text)] font-semibold text-sm md:text-base hover:text-primary transition-colors hover:border-primary/50 cursor-default">
                {tech}
              </div>
            ))}
          </div>
        </motion.section>

        {/* COMPARISON TABLE */}
        <motion.section 
          className="py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-4">Compare Packages</h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">See how the {pkg.title} package stacks up against our other offerings.</p>
          </div>

          <div className="w-full overflow-x-auto pb-6 custom-scrollbar">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-medium text-lg w-1/4">Features</th>
                  <th className={`p-4 border-b border-[var(--color-border)] text-xl font-bold ${pkg.id === 'starter' ? 'text-primary bg-primary/5 rounded-t-xl' : 'text-[var(--color-text)]'} text-center w-1/4`}>Starter</th>
                  <th className={`p-4 border-b border-[var(--color-border)] text-xl font-bold ${pkg.id === 'growth' ? 'text-primary bg-primary/5 rounded-t-xl' : 'text-[var(--color-text)]'} text-center w-1/4`}>Growth</th>
                  <th className={`p-4 border-b border-[var(--color-border)] text-xl font-bold ${pkg.id === 'enterprise' ? 'text-primary bg-primary/5 rounded-t-xl' : 'text-[var(--color-text)]'} text-center w-1/4`}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTableData.map((row, i) => (
                  <tr key={i} className="group hover:bg-[var(--color-bg)]/50 transition-colors">
                    <td className="p-4 border-b border-[var(--color-border)] text-[var(--color-text)] font-medium">{row.feature}</td>
                    
                    {['starter', 'growth', 'enterprise'].map((planKey) => {
                      const value = row[planKey as keyof typeof row];
                      const isHighlighted = pkg.id === planKey;
                      return (
                        <td key={planKey} className={`p-4 border-b border-[var(--color-border)] text-center ${isHighlighted ? 'bg-primary/5' : ''}`}>
                          {typeof value === 'boolean' ? (
                            value ? <Check className={`w-5 h-5 mx-auto ${isHighlighted ? 'text-primary' : 'text-[var(--color-text)]'}`} /> : <X className="w-5 h-5 mx-auto text-[var(--color-text-muted)]/30" />
                          ) : (
                            <span className={`text-sm font-medium ${isHighlighted ? 'text-primary' : 'text-[var(--color-text-muted)]'}`}>{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* FAQ SECTION */}
        <motion.section 
          className="py-20 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-4">Package FAQs</h2>
            <p className="text-[var(--color-text-muted)]">Common questions about the {pkg.title} package.</p>
          </div>

          <div className="space-y-4">
            {pkg.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </motion.section>

        {/* CTA SECTION */}
        <motion.section 
          className="py-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-[40px] p-1 border border-primary/20 relative overflow-hidden text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="bg-[var(--color-bg)]/80 backdrop-blur-2xl rounded-[38px] py-20 px-6 md:px-12 relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-[var(--color-text)] mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10">
                Start your journey with the {pkg.title} package today. Let's build something extraordinary together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact" className="btn-primary py-4 px-10 text-lg">
                  Get Started Now
                </Link>
                <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="btn-outline py-4 px-10 text-lg flex items-center justify-center gap-2">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

// Extracted FAQ Item for individual state management
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="glass-effect rounded-2xl border border-[var(--color-glass-border)] overflow-hidden transition-colors hover:border-primary/30">
      <button 
        className="w-full text-left p-6 flex justify-between items-center cursor-pointer focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-[var(--color-text)] pr-8">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-primary transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="p-6 pt-0 text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)]/50 mt-2">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

export default PricingDetails;

// Small currency selector used on the pricing pages
const CurrencySelector = () => {
  const [currency, setCurrencyState] = useState<string>(getSelectedCurrency());

  useEffect(() => {
    setSelectedCurrency(currency);
  }, [currency]);

  return (
    <select
      value={currency}
      onChange={(e) => setCurrencyState(e.target.value)}
      className="bg-transparent border border-[var(--color-border)] px-3 py-1 rounded-md text-[var(--color-text)]"
    >
      {CURRENCIES.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
};
