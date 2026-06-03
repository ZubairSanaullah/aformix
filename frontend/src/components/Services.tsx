import React, { useRef, useState } from "react";
import { services } from "../constants";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Divider from "./Divider";

const Services: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(event.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleDragMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    event.preventDefault();
    const x = event.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(event.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    const x = event.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const serviceImages: Record<number, string> = {
    1: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    2: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    3: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    4: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    5: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    6: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80",
    7: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    8: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const distance = sliderRef.current.clientWidth * 0.85;
    sliderRef.current.scrollBy({ left: direction === "left" ? -distance : distance, behavior: "smooth" });
  };

  return (
    <section id="services" className="reveal section-padding relative overflow-hidden w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-12 lg:px-24">
        <div className="mb-12 flex flex-col gap-6 lg:gap-0 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="heading-2">World-Class Solutions</h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl text-lg">
              From custom architectures to enterprise-scale systems, we deliver technology that empowers your business to scale effortlessly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollSlider("left")}
              className="slider-nav-btn"
              aria-label="Scroll left"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollSlider("right")}
              className="slider-nav-btn"
              aria-label="Scroll right"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="services-slider-wrapper">
          <div
            ref={sliderRef}
            className={`services-slider-container ${isDragging ? "dragging" : ""}`}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {services.map((service) => {
              return (
                <div key={service.id} className="service-card card-premium min-w-[300px] sm:min-w-[380px] max-w-[380px] h-[480px] sm:h-[520px] flex-shrink-0 group">
                  <div className="service-card-image-wrapper">
                    <img
                      src={serviceImages[service.id]}
                      alt={service.title}
                      className="service-card-image"
                      draggable={false}
                      onDragStart={(event) => event.preventDefault()}
                    />
                  </div>

                  <div className="service-card-bottom">
                    <span>{service.title}</span>
                  </div>

                  <div className="service-card-description-panel">
                    <p>{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Divider />
    </section>
  );
};

export default Services;
