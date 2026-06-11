import React from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import {
  Target, Eye, Code, Smartphone, Globe, Search,
  Settings, Layout, Shield, Zap, CheckCircle,
  TrendingUp, Award, Star, Lightbulb, Cpu, Cloud,
  Layers, ArrowRight, Quote, Building2, Users
} from 'lucide-react';

const AboutUs: React.FC = () => {
  const { scrollYProgress } = useScroll();
  useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // --- Animation Variants ---
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const scaleVariant: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen font-['Outfit',sans-serif] overflow-hidden selection:bg-[#31B98F] selection:text-white transition-colors duration-500">

      {/* SECTION 1 — PREMIUM HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-6 lg:px-20 overflow-hidden">
        {/* Animated Background Gradients */}
        {/* <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#684B9E] rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#31B98F] rounded-full mix-blend-screen filter blur-[150px] opacity-20" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00BFDE] rounded-full mix-blend-screen filter blur-[200px] opacity-10"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div> */}
        {/* ── Background Design Layers ── */}
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-bg-glow hero-bg-glow--1" aria-hidden="true" />
        <div className="hero-bg-glow hero-bg-glow--2" aria-hidden="true" />
        <div className="hero-bg-glow hero-bg-glow--3" aria-hidden="true" />
        <div className="hero-bg-streak hero-bg-streak--1" aria-hidden="true" />
        <div className="hero-bg-streak hero-bg-streak--2" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-start space-y-8"
          >

            <motion.h1 variants={fadeUpVariant} className="text-5xl lg:text-7xl font-bold leading-tight text-[var(--color-text)]">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#31B98F] to-[#00BFDE]">Intelligent</span> Digital Solutions for the Future
            </motion.h1>

            <motion.p variants={fadeUpVariant} className="text-xl text-[var(--color-text-muted)] leading-relaxed max-w-xl">
              We engineer enterprise-grade software, harness the power of AI, and craft award-winning digital experiences that transform businesses and accelerate growth.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="btn-primary flex items-center justify-center group">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a className="btn-outline flex items-center justify-center"
                href="https://calendly.com/aformixtech/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Consultation
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Orbit Mascot Video Area */}
            <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden flex items-center justify-center bg-[var(--color-surface-elevated)] border border-[var(--color-border)] shadow-2xl">
              <video
                src="/vid/orbit-2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — OUR STORY */}
      <section className="py-24 px-6 lg:px-20 bg-[var(--color-surface)] relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-text)]">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#684B9E] to-[#00BFDE]">Story</span></h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">A journey of innovation, relentless problem-solving, and a commitment to engineering excellence.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="space-y-6"
            >
              <div className="p-8 rounded-3xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[#31B98F]/30 transition-colors">
                <h3 className="text-2xl font-semibold mb-4 text-[var(--color-text)] flex items-center">
                  <Building2 className="w-6 h-6 text-[#31B98F] mr-3" />
                  The Genesis
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Aformix was founded with a singular vision: to bridge the gap between complex enterprise challenges and elegant, scalable technological solutions. We saw an industry cluttered with generic templates and inefficient workflows, and we set out to build a different kind of agency.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[#684B9E]/30 transition-colors">
                <h3 className="text-2xl font-semibold mb-4 text-[var(--color-text)] flex items-center">
                  <Target className="w-6 h-6 text-[#684B9E] mr-3" />
                  The Problem We Solve
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Today's businesses struggle to integrate AI, automate processes, and build software that truly scales. We act as your elite engineering and design task force, transforming chaotic requirements into streamlined, visually stunning, and intelligent digital products.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleVariant}
              className="relative h-full min-h-[400px] rounded-3xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#684B9E] to-[#31B98F] opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-10"></div>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Team Collaboration" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — COMPANY MISSION & VISION */}
      <section className="py-24 px-6 lg:px-20 relative bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="group relative p-10 rounded-3xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[#31B98F]/50 overflow-hidden transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 pointer-events-none">
              <Target className="w-32 h-32 text-[#31B98F]" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#31B98F]/20 flex items-center justify-center mb-6 border border-[#31B98F]/30">
                <Target className="w-7 h-7 text-[#31B98F]" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Our Mission</h3>
              <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                To empower businesses with cutting-edge AI automation and bespoke software solutions that drive unprecedented efficiency, growth, and digital transformation.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="group relative p-10 rounded-3xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[#00BFDE]/50 overflow-hidden transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 pointer-events-none">
              <Eye className="w-32 h-32 text-[#00BFDE]" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#00BFDE]/20 flex items-center justify-center mb-6 border border-[#00BFDE]/30">
                <Eye className="w-7 h-7 text-[#00BFDE]" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Our Vision</h3>
              <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                To be the global vanguard of intelligent technology, where every digital product we create sets a new standard for performance, aesthetics, and user experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — WHAT WE DO */}
      <section className="py-24 px-6 lg:px-20 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-text)]">What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#31B98F] to-[#00BFDE]">Do</span></h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">Comprehensive technology solutions designed to architect the future of your business.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, title: "AI Automation", desc: "Intelligent workflows that save thousands of hours.", color: "#684B9E" },
              { icon: Code, title: "Custom Development", desc: "Bespoke software tailored to your exact needs.", color: "#31B98F" },
              { icon: Cloud, title: "SaaS Platforms", desc: "Scalable, secure, and multi-tenant architectures.", color: "#00BFDE" },
              { icon: Globe, title: "Web Applications", desc: "High-performance, modern web experiences.", color: "#684B9E" },
              { icon: Smartphone, title: "Mobile Applications", desc: "Native-feeling apps for iOS and Android.", color: "#31B98F" },
              { icon: Search, title: "SEO Solutions", desc: "Data-driven strategies for organic dominance.", color: "#00BFDE" },
              { icon: Zap, title: "Business Automation", desc: "Streamlining operations for maximum efficiency.", color: "#684B9E" },
              { icon: Layout, title: "UI/UX Design", desc: "Award-winning interfaces that convert.", color: "#31B98F" }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${service.color}20`, color: service.color }}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-[var(--color-text)]">{service.title}</h4>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY CHOOSE AFORMIX */}
      <section className="py-24 px-6 lg:px-20 relative overflow-hidden bg-[var(--color-bg)]">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#684B9E] rounded-full mix-blend-screen filter blur-[200px] opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="lg:w-1/3"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-[var(--color-text)]">Why Choose <br /><span className="text-[#31B98F]">Aformix?</span></h2>
            <p className="text-[var(--color-text-muted)] text-lg mb-8">We don't just write code; we engineer scalable businesses. Partner with a team that treats your product as their own.</p>
            <button className="flex items-center space-x-2 text-[var(--color-accent)] font-semibold hover:text-[var(--color-text)] transition-colors group">
              <span>View Our Portfolio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 relative z-10">
            {[
              { title: "Custom Solutions", desc: "No cookie-cutter templates. Everything is built specifically for your business logic." },
              { title: "Modern Technologies", desc: "We utilize the latest bleeding-edge stacks including React, Node, Python, and AWS." },
              { title: "Scalable Architecture", desc: "Built to handle 10 users or 10 million users without rewriting the codebase." },
              { title: "Dedicated Support", desc: "Direct access to lead engineers, not a tiered ticketing system." },
              { title: "Security First", desc: "Enterprise-grade encryption and security protocols implemented from day one." },
              { title: "Fast Delivery", desc: "Agile methodologies ensuring rapid iterations and faster time-to-market." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start space-x-4 p-6 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]"
              >
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#31B98F]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--color-text)]">{feature.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)]">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — COMPANY VALUES */}
      <section className="py-24 px-6 lg:px-20 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-text)]">Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#684B9E] to-[#31B98F]">Values</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: "Innovation", text: "Constantly pushing boundaries and exploring new technological frontiers." },
              { icon: Award, title: "Quality", text: "Refusing to compromise on code quality, design aesthetics, or performance." },
              { icon: Shield, title: "Transparency", text: "Clear communication, honest timelines, and completely transparent pricing." },
              { icon: Settings, title: "Reliability", text: "Systems that work flawlessly, and a team you can always depend on." },
              { icon: TrendingUp, title: "Growth", text: "Committed to the continuous growth of our clients and our engineers." },
              { icon: Star, title: "Excellence", text: "Delivering nothing short of world-class, enterprise-grade digital products." }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-3xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#31B98F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <value.icon className="w-10 h-10 text-[#00BFDE] mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-2xl font-bold mb-3 text-[var(--color-text)]">{value.title}</h4>
                <p className="text-[var(--color-text-muted)]">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — PROCESS */}
      <section className="py-24 px-6 lg:px-20 relative bg-[var(--color-bg)]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-text)]">How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFDE] to-[#31B98F]">Build</span></h2>
            <p className="text-[var(--color-text-muted)] text-lg">A refined, battle-tested methodology for delivering software success.</p>
          </motion.div>

          <div className="relative border-l border-[var(--color-border)] md:border-none">
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] -translate-x-1/2"></div>

            {[
              { num: "01", title: "Discovery", desc: "Deep diving into your business logic, requirements, and market positioning." },
              { num: "02", title: "Planning", desc: "Architecting the technical stack, database schemas, and project timelines." },
              { num: "03", title: "Design", desc: "Crafting pixel-perfect, highly intuitive UI/UX that delights users." },
              { num: "04", title: "Development", desc: "Writing clean, scalable code in iterative sprints with regular updates." },
              { num: "05", title: "Testing", desc: "Rigorous QA, security audits, and performance optimization." },
              { num: "06", title: "Launch", desc: "Seamless deployment to production with zero downtime." },
              { num: "07", title: "Support", desc: "Ongoing maintenance, feature additions, and scaling infrastructure." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-12 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Node */}
                <div className="absolute left-[-5px] md:left-1/2 top-2 md:top-1/2 w-3 h-3 bg-[#31B98F] rounded-full md:-translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_15px_#31B98F] z-10"></div>

                <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-surface-elevated)] text-sm font-mono text-[#00BFDE] mb-3 border border-[var(--color-border)]">Step {step.num}</div>
                  <h4 className="text-2xl font-bold mb-2 text-[var(--color-text)]">{step.title}</h4>
                  <p className="text-[var(--color-text-muted)]">{step.desc}</p>
                </div>
                <div className="hidden md:block md:w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — STATS SECTION */}
      <section className="py-20 px-6 border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "10+", label: "Projects Delivered", color: "text-[#31B98F]" },
            { num: "98%", label: "Client Satisfaction", color: "text-[#00BFDE]" },
            { num: "8+", label: "Industries Served", color: "text-[#684B9E]" },
            { num: "1M+", label: "Lines of Code", color: "text-[var(--color-text)]" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              className="space-y-2"
            >
              <h3 className={`text-5xl lg:text-6xl font-bold ${stat.color} drop-shadow-lg`}>{stat.num}</h3>
              <p className="text-[var(--color-text-muted)] font-medium tracking-wide uppercase text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 9 — TECHNOLOGY STACK */}
      <section className="py-24 px-6 lg:px-20 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-text)]">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#31B98F] to-[#00BFDE]">Arsenal</span></h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">We use the most modern, robust, and scalable technologies available today.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { category: "Frontend", tools: "React, Next.js, Vue, Tailwind" },
              { category: "Backend", tools: "Node.js, Python, Go, Java" },
              { category: "Mobile", tools: "React Native, Flutter, Swift" },
              { category: "Cloud", tools: "AWS, GCP, Azure, Vercel" },
              { category: "Databases", tools: "PostgreSQL, MongoDB, Redis" },
              { category: "AI Tools", tools: "OpenAI, PyTorch, TensorFlow" }
            ].map((stack, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[#31B98F]/50 transition-all duration-300 text-center group"
              >
                <Layers className="w-8 h-8 mx-auto mb-4 text-[var(--color-text-muted)] group-hover:text-[#31B98F] transition-colors" />
                <h4 className="text-lg font-bold mb-2 text-[var(--color-text)]">{stack.category}</h4>
                <p className="text-xs text-[var(--color-text-muted)]">{stack.tools}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — TESTIMONIALS */}
      <section className="py-24 px-6 lg:px-20 relative bg-[var(--color-surface)] overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00BFDE] rounded-full mix-blend-screen filter blur-[200px] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-text)]">Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#684B9E] to-[#31B98F]">Success</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins", role: "CTO, TechFlow",
                text: "Aformix didn't just build our SaaS platform; they architected our entire digital future. The code quality is immaculate, and the design is breathtaking."
              },
              {
                name: "David Chen", role: "Founder, DataSync AI",
                text: "Their understanding of AI integration is unmatched. They automated workflows that saved our company thousands of manual hours within the first month."
              },
              {
                name: "Elena Rodriguez", role: "VP of Product, Elevate",
                text: "Working with Aformix feels like having an elite internal engineering team. Their communication, transparency, and execution speed are phenomenal."
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] relative"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-[var(--color-border)]" />
                <div className="flex text-[#31B98F] mb-6 space-x-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-[var(--color-text)] text-lg mb-8 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#684B9E] to-[#31B98F] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[var(--color-surface)] flex items-center justify-center border-2 border-transparent">
                      <Users className="w-5 h-5 text-[var(--color-text-muted)]" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-[var(--color-text)]">{testimonial.name}</h5>
                    <p className="text-sm text-[var(--color-text-muted)]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11 — CTA SECTION */}
      <section className="py-32 px-6 lg:px-20 relative overflow-hidden bg-[var(--color-bg)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#31B98F]/10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#684B9E] rounded-t-full filter blur-[150px] opacity-20 pointer-events-none"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleVariant}
          className="relative z-10 max-w-4xl mx-auto text-center p-12 lg:p-20 rounded-[3rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight text-[var(--color-text)]">Ready to Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#31B98F] to-[#00BFDE]">Extraordinary?</span></h2>
          <p className="text-xl text-[var(--color-text-muted)] mb-12 max-w-2xl mx-auto">
            Stop settling for mediocre software. Partner with Aformix and let's engineer a digital solution that dominates your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-primary text-lg">
              Start Your Project
            </button>
            <a
              className="btn-outline text-lg flex items-center justify-center"
              href="https://wa.me/+923019170936"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutUs;
