import React from "react";
import { Helmet } from "react-helmet-async";
import type { ServiceData } from "../../types/service";
import { getServicePath } from "../../constants/serviceNav";

const SITE_URL = "https://aformix.com";
const SITE_NAME = "Aformix";
const DEFAULT_OG_IMAGE = `${SITE_URL}/img/og-default.jpg`;

interface ServicePageSEOProps {
  service: ServiceData;
}

const ServicePageSEO: React.FC<ServicePageSEOProps> = ({ service }) => {
  const canonicalUrl = `${SITE_URL}${getServicePath(service.id)}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seo.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "Worldwide",
    serviceType: service.title,
    url: canonicalUrl,
  };

  const faqSchema =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <Helmet>
      <title>{service.seo.title}</title>
      <meta name="description" content={service.seo.description} />
      <meta name="keywords" content={service.seo.keywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={service.seo.title} />
      <meta property="og:description" content={service.seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={service.heroImage ?? DEFAULT_OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={service.seo.title} />
      <meta name="twitter:description" content={service.seo.description} />
      <meta name="twitter:image" content={service.heroImage ?? DEFAULT_OG_IMAGE} />

      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  );
};

export default ServicePageSEO;
