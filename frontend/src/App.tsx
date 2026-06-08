import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppBtn from "./components/WhatsAppBtn";
import CookieConsent from "./components/CookieConsent";
import { ArrowUp } from "lucide-react";
import useReveal from "./hooks/useReveal";
import Contact from "./components/Contact";

const PrivacyPolicyPage = lazy(() => import("./Pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./Pages/TermsOfService"));
const LoginPage = lazy(() => import("./Pages/Login"));

const HomeContent: React.FC = () => (
  <>
    <Hero />
    <TechMarquee />
    <About />
    <Portfolio />
    <Services />
    <WhyChooseUs />
    <Testimonials />
    <Pricing />
    <FAQ />
    <Contact />
  </>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll for all anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      
      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useReveal();

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"} relative w-full`}>
        <div className={isLoginPage ? "hidden md:block" : ""}>
          <Navbar />
        </div>
        <main className="relative w-full">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomeContent />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Suspense>
        </main>
        <div className={isLoginPage ? "hidden md:block" : ""}>
          <Footer />
        </div>
        <CookieConsent />
        <WhatsAppBtn />
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`fixed right-8 bottom-28 z-[90] w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/25 transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
            showScrollTop
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </>
  );
};

export default App;
