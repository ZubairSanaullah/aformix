import React, { useEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Target, Eye, Code, Smartphone, Globe, Search,
  Settings, Layout, Shield, Zap, CheckCircle,
  TrendingUp, Award, Star, Lightbulb, Cpu, Cloud,
  Layers, ArrowRight, Quote, Building2, Users,
  ChartNoAxesCombined, ShieldCheck,
  Send, MapPin, Mail, Phone, Clock
} from 'lucide-react';
import { BsRobot } from "react-icons/bs";
import { CiMobile1 } from "react-icons/ci";
import Divider from '../components/Divider';
import TechMarquee from '../components/TechMarquee';
import Swal from 'sweetalert2';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_SERVICES = [
  "Web Development",
  "E-Commerce Website",
  "Custom Software",
  "Business Automation",
  "UI/UX Design",
  "Maintenance & Support",
  "Other",
];

const ABOUT_CONTACT_INFO = [
  { icon: MapPin, label: "Our Location", value: "Pakistan" },
  { icon: Mail, label: "Email Us", value: "hello@aformix.com", href: "mailto:hello@aformix.com" },
  { icon: Phone, label: "Call Us", value: "+92 301 9170936", href: "tel:+923019170936" },
  { icon: Clock, label: "Response Time", value: "Within 24 hours" },
];

const AboutUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal();

  const [ctaForm, setCtaForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [ctaErrors, setCtaErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [ctaSubmitting, setCtaSubmitting] = useState(false);

  const ctaValidate = () => {
    const e: { name?: string; email?: string; message?: string } = {};
    if (!ctaForm.name.trim()) e.name = 'Full name is required.';
    if (!ctaForm.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctaForm.email)) e.email = 'Enter a valid email address.';
    if (!ctaForm.message.trim()) e.message = 'Please tell us about your project.';
    else if (ctaForm.message.trim().length < 20) e.message = 'Message must be at least 20 characters.';
    setCtaErrors(e);
    return Object.keys(e).length === 0;
  };

  const ctaHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCtaForm(prev => ({ ...prev, [name]: value }));
    if (ctaErrors[name as keyof typeof ctaErrors]) setCtaErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const ctaHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ctaValidate()) return;
    setCtaSubmitting(true);
    const data = new FormData();
    data.append('access_key', import.meta.env.VITE_ACCESS_KEY);
    data.append('from_name', 'Aformix About Us CTA');
    data.append('subject', `New Lead — ${ctaForm.name}`);
    data.append('name', ctaForm.name);
    data.append('email', ctaForm.email);
    data.append('phone', ctaForm.phone);
    data.append('service', ctaForm.service || 'Not specified');
    data.append('message', ctaForm.message);
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      const json = await res.json();
      if (json.success) {
        setCtaForm({ name: '', email: '', phone: '', service: '', message: '' });
        await Swal.fire({ title: 'Message Sent!', text: "We'll get back to you within 24 hours.", icon: 'success', confirmButtonText: 'Great!', confirmButtonColor: '#27b990', background: 'var(--color-surface)', color: 'var(--color-text)' });
      } else {
        Swal.fire({ title: 'Oops!', text: json.message || 'Something went wrong.', icon: 'error', confirmButtonColor: '#27b990', background: 'var(--color-surface)', color: 'var(--color-text)' });
      }
    } catch {
      Swal.fire({ title: 'Network Error', text: 'Please check your connection and try again.', icon: 'error', confirmButtonColor: '#27b990', background: 'var(--color-surface)', color: 'var(--color-text)' });
    } finally {
      setCtaSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General animations for elements
      gsap.utils.toArray<HTMLElement>('.about-animate').forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          }
        );
      });

      // Staggered animations for cards in grids
      gsap.utils.toArray<HTMLElement>('.about-grid').forEach((grid) => {
        gsap.fromTo(grid.children,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: grid,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      });

      // Stats counters
      const statsTargets = [10, 98, 8, 1];
      const formatStat = (value: number, index: number) => {
        if (index === 0) return `${Math.round(value)}+`;
        if (index === 1) return `${Math.round(value)}%`;
        if (index === 2) return `${Math.round(value)}+`;
        if (index === 3) return `${Math.round(value)}M+`;
        return `${Math.round(value)}`;
      };

      gsap.utils.toArray<HTMLParagraphElement>(".stat-number").forEach((el, index) => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: statsTargets[index],
          duration: 2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = formatStat(counter.value, index);
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative">
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[var(--color-bg)] to-transparent pointer-events-none z-10"></div>

      {/* SECTION 1 — HERO */}
      <section className="reveal section-padding relative overflow-hidden w-full pt-32 lg:pt-40">
        {/* ── Background Design Layers ── */}
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-bg-glow hero-bg-glow--1" aria-hidden="true" />
        <div className="hero-bg-glow hero-bg-glow--2" aria-hidden="true" />
        <div className="hero-bg-glow hero-bg-glow--3" aria-hidden="true" />
        <div className="hero-bg-streak hero-bg-streak--1" aria-hidden="true" />
        <div className="hero-bg-streak hero-bg-streak--2" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start space-y-8 about-animate">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-[var(--color-text)]">
              Building <span className="text-primary">Intelligent</span> Digital Solutions for the Future
            </h1>
            <p className="text-xl text-[var(--color-text-muted)] leading-relaxed max-w-xl">
              We engineer enterprise-grade software, harness the power of AI, and craft award-winning digital experiences that transform businesses and accelerate growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-8 py-4 font-semibold transition hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/20">
                Start Your Project
                <ArrowRight size={20} />
              </button>
              <a
                href="https://calendly.com/aformixtech/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-glass-border)] glass-effect px-8 py-4 font-semibold text-[var(--color-text)] transition hover:bg-white/5"
              >
                Book a Consultation
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block about-animate">
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
          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR STORY & ORBIT AI */}
      <section className="reveal section-padding relative w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16 about-animate">
            <span className="text-primary font-black tracking-[0.35em] uppercase">Origins</span>
            <h2 className="heading-2 mt-6">A smarter agency for ambitious digital teams.</h2>
            <p className="mx-auto mt-6 max-w-3xl text-[var(--color-text-muted)] text-xl leading-relaxed">
              We build premium web products that combine beautiful design, technical precision, and measurable business impact. Our process is collaborative, transparent, and engineered to accelerate your next major digital move.
            </p>
          </div>

          <div className="grid gap-14 xl:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="space-y-8 about-animate">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-[var(--color-glass-border)] glass-effect">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#04040d] via-[#080c1a] to-[#04040d]">
                  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/15 rounded-full blur-[60px] pointer-events-none" />
                  <img
                    src="/img/banner.png"
                    alt="Orbit — Aformix AI Mascot"
                    className="w-full aspect-[4/5] object-cover object-center scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/95 via-[var(--color-bg)]/20 to-transparent"></div>
                </div>

                <div className="absolute left-8 right-8 bottom-8 rounded-[2.5rem] border border-[var(--color-glass-border)] glass-effect p-8 shadow-2xl">
                  <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm text-primary font-semibold mb-4">
                    <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    Meet Orbit — Your AI Assistant
                  </div>
                  <h3 className="text-3xl font-black text-[var(--color-text)] mb-4">Crafting distinctive digital products that scale.</h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                    Orbit is our AI mascot that represents our commitment to intelligent automation and modern digital craftsmanship.
                  </p>
                  <button
                    onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-orbit-ai')); }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-6 py-3 font-semibold transition hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    <BsRobot size={18} />
                    Open Orbit AI
                  </button>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  {
                    icon: ChartNoAxesCombined,
                    title: "SEO Optimized",
                    description: "Search-Engine Optimized websites that rank higher and drive traffic.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Security Guarded",
                    description: "High-end security features to protect your website from malware.",
                  },
                  {
                    icon: CiMobile1,
                    title: "Mobile Responsive",
                    description: "Perfectly optimized for desktops, tablets, and smartphones.",
                  },
                  {
                    icon: Globe,
                    title: "Worldwide Clients",
                    description: "Delivering intelligent digital solutions to clients globally.",
                  },
                ].map((item, index) => (
                  <div key={index} className="glass-effect rounded-3xl border border-[var(--color-glass-border)] p-6 shadow-xl hover:-translate-y-1 transition-transform">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                      <item.icon size={24} />
                    </div>
                    <h4 className="text-xl font-semibold text-[var(--color-text)] mb-2">{item.title}</h4>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 about-animate">
              {/* Genesis & Problem from AboutUs */}
              <div className="rounded-[3rem] border border-[var(--color-glass-border)] bg-[var(--color-surface)]/40 p-10 shadow-2xl glass-effect">
                <span className="text-primary uppercase tracking-[0.35em] font-black text-sm">The Genesis</span>
                <h3 className="mt-6 text-3xl font-black text-[var(--color-text)] leading-tight">
                  Bridging the gap between enterprise challenges and scalable tech.
                </h3>
                <p className="mt-6 text-[var(--color-text-muted)] text-lg leading-relaxed">
                  Aformix was founded with a singular vision: to bridge the gap between complex enterprise challenges and elegant, scalable technological solutions. We saw an industry cluttered with generic templates and inefficient workflows, and we set out to build a different kind of agency.
                </p>
              </div>

              <div className="grid gap-6 rounded-[3rem] border border-[var(--color-glass-border)] bg-[var(--color-surface)]/20 p-8 shadow-2xl glass-effect">
                <div className="flex items-start gap-4">
                  <div className="min-w-[3rem] h-12 rounded-2xl bg-primary/10 text-primary grid place-items-center font-bold">1</div>
                  <div>
                    <h4 className="text-xl font-semibold text-[var(--color-text)]">Design with clarity</h4>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">Research-led interfaces that make complex products feel intuitive.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="min-w-[3rem] h-12 rounded-2xl bg-primary/10 text-primary grid place-items-center font-bold">2</div>
                  <div>
                    <h4 className="text-xl font-semibold text-[var(--color-text)]">Develop with precision</h4>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">Robust, scalable architecture built for performance and stability.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="min-w-[3rem] h-12 rounded-2xl bg-primary/10 text-primary grid place-items-center font-bold">3</div>
                  <div>
                    <h4 className="text-xl font-semibold text-[var(--color-text)]">Grow with confidence</h4>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">Continuous improvement and strategic support beyond launch.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* SECTION 4 — COMPANY MISSION & VISION */}
      <section className="reveal section-padding relative w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 gap-8 about-grid">
            <div className="group relative p-10 rounded-[3rem] glass-effect border border-[var(--color-glass-border)] hover:border-primary/50 overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                <Target className="w-32 h-32 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[1.25rem] bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Our Mission</h3>
                <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                  To empower businesses with cutting-edge AI automation and bespoke software solutions that drive unprecedented efficiency, growth, and digital transformation.
                </p>
              </div>
            </div>

            <div className="group relative p-10 rounded-[3rem] glass-effect border border-[var(--color-glass-border)] hover:border-primary/50 overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                <Eye className="w-32 h-32 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[1.25rem] bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-[var(--color-text)]">Our Vision</h3>
                <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                  To be the global vanguard of intelligent technology, where every digital product we create sets a new standard for performance, aesthetics, and user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* SECTION 5 — WHAT WE DO */}
      <section className="reveal section-padding relative w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-20 about-animate">
            <span className="text-primary font-black tracking-[0.35em] uppercase">Services</span>
            <h2 className="heading-2 mt-6">What We Do</h2>
            <p className="mx-auto mt-6 max-w-2xl text-[var(--color-text-muted)] text-xl leading-relaxed">
              Comprehensive technology solutions designed to architect the future of your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 about-grid">
            {[
              { icon: Cpu, title: "AI Automation", desc: "Intelligent workflows that save thousands of hours." },
              { icon: Code, title: "Custom Development", desc: "Bespoke software tailored to your exact needs." },
              { icon: Cloud, title: "SaaS Platforms", desc: "Scalable, secure, and multi-tenant architectures." },
              { icon: Globe, title: "Web Applications", desc: "High-performance, modern web experiences." },
              { icon: Smartphone, title: "Mobile Applications", desc: "Native-feeling apps for iOS and Android." },
              { icon: Search, title: "SEO Solutions", desc: "Data-driven strategies for organic dominance." },
              { icon: Zap, title: "Business Automation", desc: "Streamlining operations for maximum efficiency." },
              { icon: Layout, title: "UI/UX Design", desc: "Award-winning interfaces that convert." }
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-[2rem] glass-effect border border-[var(--color-glass-border)] hover:border-primary/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 bg-primary/10 text-primary border border-primary/20">
                  <service.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-[var(--color-text)]">{service.title}</h4>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* SECTION 6 — WHY CHOOSE AFORMIX */}
      <section className="reveal section-padding relative w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div className="about-animate lg:sticky lg:top-32">
            <span className="text-primary font-black tracking-[0.35em] uppercase">Value</span>
            <h2 className="heading-2 mt-6">Why Choose <br />Aformix?</h2>
            <p className="text-[var(--color-text-muted)] text-xl mt-6 mb-8 leading-relaxed">
              We don't just write code; we engineer scalable businesses. Partner with a team that treats your product as their own.
            </p>
            <button className="inline-flex items-center gap-2 rounded-full border border-[var(--color-glass-border)] glass-effect px-6 py-3 font-semibold text-[var(--color-text)] transition hover:bg-white/5 group">
              <span>View Our Portfolio</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 about-grid">
            {[
              { title: "Custom Solutions", desc: "No cookie-cutter templates. Everything is built specifically for your business logic." },
              { title: "Modern Technologies", desc: "We utilize the latest bleeding-edge stacks including React, Node, Python, and AWS." },
              { title: "Scalable Architecture", desc: "Built to handle 10 users or 10 million users without rewriting the codebase." },
              { title: "Dedicated Support", desc: "Direct access to lead engineers, not a tiered ticketing system." },
              { title: "Security First", desc: "Enterprise-grade encryption and security protocols implemented from day one." },
              { title: "Fast Delivery", desc: "Agile methodologies ensuring rapid iterations and faster time-to-market." }
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-[2rem] glass-effect border border-[var(--color-glass-border)] shadow-xl"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-3 text-[var(--color-text)]">{feature.title}</h4>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* SECTION 7 — COMPANY VALUES */}
      <section className="reveal section-padding relative w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16 about-animate">
            <span className="text-primary font-black tracking-[0.35em] uppercase">Principles</span>
            <h2 className="heading-2 mt-6">Our Core Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 about-grid">
            {[
              { icon: Lightbulb, title: "Innovation", text: "Constantly pushing boundaries and exploring new technological frontiers." },
              { icon: Award, title: "Quality", text: "Refusing to compromise on code quality, design aesthetics, or performance." },
              { icon: Shield, title: "Transparency", text: "Clear communication, honest timelines, and completely transparent pricing." },
              { icon: Settings, title: "Reliability", text: "Systems that work flawlessly, and a team you can always depend on." },
              { icon: TrendingUp, title: "Growth", text: "Committed to the continuous growth of our clients and our engineers." },
              { icon: Star, title: "Excellence", text: "Delivering nothing short of world-class, enterprise-grade digital products." }
            ].map((value, i) => (
              <div
                key={i}
                className="p-10 rounded-[2.5rem] glass-effect border border-[var(--color-glass-border)] group overflow-hidden shadow-xl hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-[1.25rem] bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-[var(--color-text)]">{value.title}</h4>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* SECTION 8 — PROCESS */}
      <section className="reveal section-padding relative w-full">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-20 about-animate">
            <span className="text-primary font-black tracking-[0.35em] uppercase">Methodology</span>
            <h2 className="heading-2 mt-6">How We Build</h2>
            <p className="mx-auto mt-6 text-[var(--color-text-muted)] text-xl">
              A refined, battle-tested methodology for delivering software success.
            </p>
          </div>

          <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-glass-border)] before:to-transparent">
            {[
              { num: "01", title: "Discovery", desc: "Deep diving into your business logic, requirements, and market positioning." },
              { num: "02", title: "Planning", desc: "Architecting the technical stack, database schemas, and project timelines." },
              { num: "03", title: "Design", desc: "Crafting pixel-perfect, highly intuitive UI/UX that delights users." },
              { num: "04", title: "Development", desc: "Writing clean, scalable code in iterative sprints with regular updates." },
              { num: "05", title: "Testing", desc: "Rigorous QA, security audits, and performance optimization." },
              { num: "06", title: "Launch", desc: "Seamless deployment to production with zero downtime." },
              { num: "07", title: "Support", desc: "Ongoing maintenance, feature additions, and scaling infrastructure." }
            ].map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-12 about-animate">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--color-bg)] bg-primary text-white shadow shadow-primary/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-effect p-8 rounded-[2rem] border border-[var(--color-glass-border)] shadow-xl hover:border-primary/30 transition-colors">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-xs font-bold text-primary mb-4 uppercase tracking-wider">Step {step.num}</div>
                  <h4 className="text-2xl font-bold mb-3 text-[var(--color-text)]">{step.title}</h4>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* SECTION 9 — STATS SECTION */}
      <section className="reveal section-padding relative w-full bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 about-grid">
            {[
              { label: "Projects Delivered" },
              { label: "Client Satisfaction" },
              { label: "Industries Served" },
              { label: "Lines of Code" }
            ].map((stat, i) => (
              <div key={i} className="glass-effect rounded-[2rem] border border-[var(--color-glass-border)] p-8 text-center shadow-2xl">
                <p className="stat-number text-5xl lg:text-6xl font-black text-primary mb-4">0</p>
                <p className="text-[var(--color-text)] font-medium tracking-wide uppercase text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* SECTION 10 — TECHNOLOGY STACK */}
      <section className="reveal section-padding relative w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16 about-animate">
            <span className="text-primary font-black tracking-[0.35em] uppercase">Arsenal</span>
            <h2 className="heading-2 mt-6">Technology Stack</h2>
            <p className="mx-auto mt-6 max-w-2xl text-[var(--color-text-muted)] text-xl leading-relaxed">
              We use the most modern, robust, and scalable technologies available today.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 about-grid">
            {[
              { category: "Frontend", tools: "React, Next.js, Vue, Tailwind" },
              { category: "Backend", tools: "Node.js, Python, Go, Java" },
              { category: "Mobile", tools: "React Native, Flutter, Swift" },
              { category: "Cloud", tools: "AWS, GCP, Azure, Vercel" },
              { category: "Databases", tools: "PostgreSQL, MongoDB, Redis" },
              { category: "AI Tools", tools: "OpenAI, PyTorch, TensorFlow" }
            ].map((stack, i) => (
              <div
                key={i}
                className="p-6 rounded-[2rem] glass-effect border border-[var(--color-glass-border)] hover:border-primary/50 transition-all duration-300 text-center group shadow-xl"
              >
                <Layers className="w-8 h-8 mx-auto mb-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-lg font-bold mb-2 text-[var(--color-text)]">{stack.category}</h4>
                <p className="text-xs text-[var(--color-text-muted)]">{stack.tools}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* SECTION 11 — TESTIMONIALS */}
      <section className="reveal section-padding relative w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16 about-animate">
            <span className="text-primary font-black tracking-[0.35em] uppercase">Testimonials</span>
            <h2 className="heading-2 mt-6">Client Success</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 about-grid">
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
              <div
                key={i}
                className="p-8 rounded-[2.5rem] glass-effect border border-[var(--color-glass-border)] relative shadow-xl hover:-translate-y-1 transition-transform duration-300"
              >
                <Quote className="absolute top-8 right-8 w-8 h-8 text-[var(--color-glass-border)]" />
                <div className="flex text-primary mb-6 space-x-1">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-[var(--color-text)] text-lg mb-8 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full glass-effect border border-[var(--color-glass-border)] flex items-center justify-center">
                    <Users className="w-5 h-5 text-[var(--color-text-muted)]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[var(--color-text)]">{testimonial.name}</h5>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* SECTION 12 — CTA / CONTACT SECTION */}
      <section className="reveal section-padding relative overflow-hidden w-full mb-20">
        {/* Background glows — matches main page Contact */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/6 rounded-full blur-[150px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Header */}
          <div className="text-center mb-20 about-animate">
            <span className="inline-block text-primary font-black tracking-[0.35em] uppercase text-sm mb-6">
              Get in Touch
            </span>
            <h2 className="heading-2 !mb-6">
              Ready to Build Something <span className="text-primary">Extraordinary?</span>
            </h2>
            <p className="text-[var(--color-text-muted)] text-xl leading-relaxed max-w-2xl mx-auto">
              Stop settling for mediocre software. Partner with Aformix and let's engineer a digital solution that dominates your market.
            </p>
          </div>

          {/* Grid */}
          <div className="grid lg:grid-cols-5 gap-12 items-start about-animate">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              {ABOUT_CONTACT_INFO.map((item, i) => (
                <div
                  key={i}
                  className="glass-effect rounded-3xl border border-[var(--color-glass-border)] p-6 flex items-center gap-5 group hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-md">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs font-black uppercase tracking-widest mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[var(--color-text)] font-semibold text-base hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-[var(--color-text)] font-semibold text-base">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Trust badge */}
              <div className="glass-effect rounded-3xl border border-[var(--color-glass-border)] p-6 mt-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex -space-x-2">
                    {(['#27b990', '#684b9e', '#f43f5e'] as const).map((c, i) => (
                      <div key={i} className="w-9 h-9 rounded-full border-2 border-[var(--color-surface)] flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c }}>
                        {['J', 'S', 'M'][i]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <p className="text-[var(--color-text-muted)] text-xs">Trusted by 45+ clients</p>
                  </div>
                </div>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                  "Aformix delivered our platform on time and exceeded all our expectations. Highly recommend!"
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="glass-effect rounded-[2.5rem] border border-[var(--color-glass-border)] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

                <h3 className="text-2xl font-black text-[var(--color-text)] mb-8">Send us a message</h3>

                <form onSubmit={ctaHandleSubmit} noValidate className="space-y-6">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="about-cta-name" className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="about-cta-name" type="text" name="name" value={ctaForm.name} onChange={ctaHandleChange}
                        placeholder="John Doe"
                        className={`input-field w-full ${ctaErrors.name ? '!border-red-500 !shadow-[0_0_0_2px_rgba(239,68,68,0.15)]' : ''}`}
                      />
                      {ctaErrors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{ctaErrors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="about-cta-email" className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        id="about-cta-email" type="email" name="email" value={ctaForm.email} onChange={ctaHandleChange}
                        placeholder="john@example.com"
                        className={`input-field w-full ${ctaErrors.email ? '!border-red-500 !shadow-[0_0_0_2px_rgba(239,68,68,0.15)]' : ''}`}
                      />
                      {ctaErrors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{ctaErrors.email}</p>}
                    </div>
                  </div>

                  {/* Phone + Service */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="about-cta-phone" className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Phone Number
                      </label>
                      <input
                        id="about-cta-phone" type="tel" name="phone" value={ctaForm.phone} onChange={ctaHandleChange}
                        placeholder="+92 300 0000000"
                        className="input-field w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="about-cta-service" className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                        Service Needed
                      </label>
                      <select
                        id="about-cta-service" name="service" value={ctaForm.service} onChange={ctaHandleChange}
                        className="input-field w-full appearance-none cursor-pointer"
                      >
                        <option value="">Select a service…</option>
                        {ABOUT_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="about-cta-message" className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                      Your Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="about-cta-message" name="message" value={ctaForm.message} onChange={ctaHandleChange}
                      placeholder="Tell us about your project, goals, and timeline…"
                      rows={5}
                      className={`input-field w-full resize-none ${ctaErrors.message ? '!border-red-500 !shadow-[0_0_0_2px_rgba(239,68,68,0.15)]' : ''}`}
                    />
                    {ctaErrors.message
                      ? <p className="text-red-500 text-xs mt-1.5 font-medium">{ctaErrors.message}</p>
                      : <p className="text-[var(--color-text-muted)] text-xs mt-1.5">Minimum 20 characters</p>
                    }
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={ctaSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-base group disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {ctaSubmitting ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Sending…</span></>
                    ) : (
                      <><span>Send Message</span><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                    )}
                  </button>

                  <p className="text-center text-[var(--color-text-muted)] text-xs">
                    We respect your privacy. Your information is never shared.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
