import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../components/linkinbio/HeroSection";
import LinkCards from "../components/linkinbio/LinkCards";
import ServicePreview from "../components/linkinbio/ServicePreview";
import TrustSection from "../components/linkinbio/TrustSection";
import SocialProof from "../components/linkinbio/SocialProof";
import CallToAction from "../components/linkinbio/CallToAction";
import MinimalFooter from "../components/linkinbio/MinimalFooter";

const LinkInBio: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aformix",
    "url": "https://www.aformix.com",
    "logo": "https://www.aformix.com/logo.svg",
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com",
      "https://linkedin.com",
      "https://github.com"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Aformix | Digital Products That Move Businesses Forward</title>
        <meta name="description" content="Quick links to Aformix's premium websites, web apps, mobile apps, UI/UX, and SEO solutions. Connect with us on WhatsApp or view our portfolio." />
        <meta name="keywords" content="Aformix, web development, app development, UI/UX, SEO, digital agency, link in bio" />
        <link rel="canonical" href="https://www.aformix.com/links" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aformix.com/links" />
        <meta property="og:title" content="Aformix | Premium Digital Solutions" />
        <meta property="og:description" content="Quick links to Aformix's premium websites, web apps, mobile apps, UI/UX, and SEO solutions." />
        <meta property="og:image" content="https://www.aformix.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.aformix.com/links" />
        <meta property="twitter:title" content="Aformix | Premium Digital Solutions" />
        <meta property="twitter:description" content="Quick links to Aformix's premium websites, web apps, mobile apps, UI/UX, and SEO solutions." />
        <meta property="twitter:image" content="https://www.aformix.com/og-image.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-bg dark:bg-bg selection:bg-primary/30">
        <HeroSection />
        <LinkCards />
        <ServicePreview />
        <TrustSection />
        <SocialProof />
        <CallToAction />
        <MinimalFooter />
      </div>
    </>
  );
};

export default LinkInBio;
