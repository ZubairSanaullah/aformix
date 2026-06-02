import React, { useState, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppBtn from "./components/WhatsAppBtn";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
          <FAQ />
          {/* <Contact /> */}
        </main>
        <Footer />
        <WhatsAppBtn />
      </div>
    </>
  );
};

export default App;
