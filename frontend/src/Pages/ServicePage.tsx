import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { servicesData } from "../constants/servicesData";
import { serviceHeroConfig } from "../constants/serviceNav";

import ServicePageSEO from "../components/services/ServicePageSEO";
import ServiceHero from "../components/services/ServiceHero";
import ProblemSection from "../components/services/ProblemSection";
import SolutionSection from "../components/services/SolutionSection";
import FeatureGrid from "../components/services/FeatureGrid";
import BenefitsSection from "../components/services/BenefitsSection";
import ProcessTimeline from "../components/services/ProcessTimeline";
import TechnologyStack from "../components/services/TechnologyStack";
import CaseStudies from "../components/services/CaseStudies";
import ServiceTestimonials from "../components/services/ServiceTestimonials";
import ServicePricing from "../components/services/ServicePricing";
import ServiceFAQ from "../components/services/ServiceFAQ";
import ServiceCTA from "../components/services/ServiceCTA";

const ServicePage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const service = serviceId ? servicesData[serviceId] : null;
  const heroConfig = serviceId ? serviceHeroConfig[serviceId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center section-padding">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="text-text-muted mb-8">The service you are looking for does not exist.</p>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg relative">
      <ServicePageSEO service={service} />

      <ServiceHero
        badge={service.badge}
        headline={service.heroHeadline}
        valueProposition={heroConfig?.valueProposition}
        description={service.heroDescription}
        heroVariant={heroConfig?.variant}
      />

      <ProblemSection problems={service.problems} />
      <SolutionSection solution={service.solution} />
      <FeatureGrid features={service.features} />
      <BenefitsSection benefits={service.benefits} />
      <ProcessTimeline process={service.process} />
      <TechnologyStack techStack={service.techStack} />
      <CaseStudies caseStudies={service.caseStudies} />
      
      {service.testimonials && service.testimonials.length > 0 && (
        <ServiceTestimonials testimonials={service.testimonials} />
      )}
      
      {service.pricingPlans && service.pricingPlans.length > 0 && (
        <ServicePricing pricingPlans={service.pricingPlans} />
      )}

      <ServiceFAQ faqs={service.faqs} />

      <ServiceCTA
        headline={service.ctaHeadline}
        description={service.ctaDescription}
      />
    </div>
  );
};

export default ServicePage;
