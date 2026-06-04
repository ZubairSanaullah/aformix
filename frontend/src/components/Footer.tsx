import React from "react";
import { FaLinkedin, FaInstagram, FaFacebookF, FaDiscord, FaTiktok, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import logoImg from "../assets/logo.png";

const socialLinks = [
  { name: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/in/aformix-tech-173393413/" },
  { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/aformixtech/" },
  { name: "Facebook", icon: FaFacebookF, href: "#" },
  { name: "Discord", icon: FaDiscord, href: "https://discord.com/channels/1510971122164699237/1510971123288899607" },
  { name: "TikTok", icon: FaTiktok, href: "https://www.tiktok.com/@aformixtech" },
  { name: "X", icon: FaXTwitter, href: "https://x.com/Afromixtech" },
  { name: "Email", icon: FaEnvelope, href: "mailto:aformixtech@gmail.com" },
];

const Footer: React.FC = () => {
  return (
    <footer className="reveal pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 border-t border-[var(--color-border)] relative overflow-hidden w-full flex justify-center" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
        {/* Mobile Logo - centered on top */}
        <div className="flex flex-col items-center mb-10 lg:hidden">
          <img src={logoImg} alt="Aformix logo" className="w-8 mb-3 object-contain hover:scale-90 transition-all duration-300" />
          <p className="text-base font-light text-[var(--color-text)] tracking-wide">Aformix</p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent mt-4 opacity-50"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_0.8fr] gap-6 sm:gap-8 lg:gap-8 mb-16 sm:mb-24">
          <div className="flex flex-col items-start text-left">
            <h4 className="text-[var(--color-text)] font-black uppercase tracking-widest text-xs mb-6 sm:mb-10">Products</h4>
            <ul className="space-y-3 sm:space-y-5 text-left">
              {[
                { label: "SaaS Platforms", href: "#" },
                { label: "E-commerce", href: "#" },
                { label: "Mobile Apps", href: "#" },
                { label: "Design Systems", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link text-[var(--color-text-muted)] hover:text-primary font-bold transition-all block text-sm sm:text-base">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start text-left">
            <h4 className="text-[var(--color-text)] font-black uppercase tracking-widest text-xs mb-6 sm:mb-10">Solutions</h4>
            <ul className="space-y-3 sm:space-y-5 text-left">
              {[
                { label: "Enterprise", href: "#" },
                { label: "SaaS Templates", href: "#" },
                { label: "System Architecture", href: "#" },
                { label: "Analytics", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link text-[var(--color-text-muted)] hover:text-primary font-bold transition-all block text-sm sm:text-base">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start text-left">
            <h4 className="text-[var(--color-text)] font-black uppercase tracking-widest text-xs mb-6 sm:mb-10">Company</h4>
            <ul className="space-y-3 sm:space-y-5">
              {[
                { label: "About Us", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link text-[var(--color-text-muted)] hover:text-primary font-bold transition-all text-sm sm:text-base">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Logo - hidden on mobile */}
          <div className="hidden lg:flex col-span-1 flex-col items-end text-right">
            <img src={logoImg} alt="Aformix logo" className="w-6 sm:w-8 mb-6 sm:mb-10 object-contain hover:scale-90 transition-all duration-300" />
          </div>
        </div>

        <div className="pt-8 sm:pt-12 border-t border-[var(--color-border)] flex flex-col gap-6 sm:gap-8 md:gap-6 text-[var(--color-text-muted)] font-bold text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-8">
            <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} AFORMIX ALL RIGHTS RESERVED.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="/privacy-policy" className="hover:text-[var(--color-text)] transition-colors text-xs sm:text-sm">PRIVACY POLICY</a>
              <a href="/terms-of-service" className="hover:text-[var(--color-text)] transition-colors text-xs sm:text-sm">TERMS OF SERVICE</a>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 relative flex-wrap">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-primary transition-all duration-300 relative group border border-[var(--color-border)] rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon size={16} className="sm:size-5 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
