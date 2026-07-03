import React from "react";
import { motion } from "framer-motion";
import { Globe, MessageCircle, Briefcase, CalendarDays, Mail, ArrowRight } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

interface LinkItem {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  primary?: boolean;
}

const links: LinkItem[] = [
  {
    title: "Visit Website",
    description: "Explore our full range of digital solutions",
    url: "https://aformix.com",
    icon: <Globe className="w-6 h-6" />,
    primary: true,
  },
  {
    title: "WhatsApp",
    description: "Chat directly with our team",
    url: "https://wa.me/+923019170936",
    icon: <MessageCircle className="w-6 h-6" />,
  },
  {
    title: "Portfolio",
    description: "View our recent success stories",
    url: "https://aformix.com/#portfolio",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    title: "Book Consultation",
    description: "Schedule a free strategy call",
    url: "https://calendly.com/aformixtech/30min",
    icon: <CalendarDays className="w-6 h-6" />,
  },
  {
    title: "LinkedIn",
    description: "Connect with us professionally",
    url: "https://www.linkedin.com/company/aformix/",
    icon: <FaLinkedinIn className="w-6 h-6" />,
  },
  {
    title: "Instagram",
    description: "Follow our daily updates",
    url: "https://www.instagram.com/aformixtech/",
    icon: <FaInstagram className="w-6 h-6" />,
  },
  {
    title: "GitHub",
    description: "Check out our open source work",
    url: "https://github.com/aformix",
    icon: <FaGithub className="w-6 h-6" />,
  },
  {
    title: "Email",
    description: "Send us a direct message",
    url: "mailto:hello@aformix.com",
    icon: <Mail className="w-6 h-6" />,
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const LinkCards: React.FC = () => {
  return (
    <section className="px-6 pb-16 w-full max-w-3xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col gap-4"
      >
        {links.map((link, index) => (
          <motion.a
            key={index}
            variants={itemVariants}
            href={link.url}
            target={link.url.startsWith("/") ? "_self" : "_blank"}
            rel={link.url.startsWith("/") ? "" : "noopener noreferrer"}
            className={`group relative flex items-center p-4 sm:p-5 rounded-2xl transition-all duration-300 ease-out overflow-hidden
              ${link.primary
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 border border-transparent hover:-translate-y-1"
                : "link-card-default bg-white/60 backdrop-blur-xl border border-slate-200 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
              }
            `}
          >
            {/* Subtle Gradient Hover background for non-primary cards */}
            {!link.primary && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}

            <div
              className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl mr-4
                ${link.primary
                  ? "bg-white/20 text-white"
                  : "link-card-icon bg-slate-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                }
              `}
            >
              {link.icon}
            </div>

            <div className="flex-1 min-w-0 pr-4">
              <h3
                className={`font-bold text-lg mb-0.5 truncate ${link.primary
                  ? "text-white"
                  : "link-card-title text-slate-900 group-hover:text-primary transition-colors"
                  }`}
              >
                {link.title}
              </h3>
              <p
                className={`text-sm truncate ${link.primary
                  ? "text-white/80"
                  : "link-card-desc text-slate-500"
                  }`}
              >
                {link.description}
              </p>
            </div>

            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300
                ${link.primary
                  ? "bg-white/20 text-white group-hover:translate-x-1"
                  : "link-card-arrow bg-slate-100 text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:translate-x-1"
                }
              `}
            >
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default LinkCards;
