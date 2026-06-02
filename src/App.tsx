import React, { useState, useEffect } from "react";
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
import { ArrowUp } from "lucide-react";
import useReveal from "./hooks/useReveal";

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useReveal();

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"} overflow-x-hidden relative w-full flex flex-col items-center`}>
        <Navbar />
        <main className="relative w-full">
          <Hero />
          <TechMarquee />
          <About />
          <Portfolio />
          <Services />
          <WhyChooseUs />
          <Testimonials />
          <Pricing />
          <FAQ />
          {/* <Contact /> */}
        </main>
        <Footer />
        <WhatsAppBtn />
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`fixed right-8 bottom-25 z-[100] w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
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
