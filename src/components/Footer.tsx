import React from "react";
import { FaLinkedin, FaInstagram, FaFacebookF, FaDiscord, FaTiktok, FaXTwitter, FaEnvelope } from "react-icons/fa6";

const socialLinks = [
  { name: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/in/aformix-tech-173393413/" },
  { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/aformixtech/" },
  { name: "Facebook", icon: FaFacebookF, href: "#" },
  { name: "Discord", icon: FaDiscord, href: "https://discord.com/channels/1510971122164699237/1510971123288899607" },
  { name: "TikTok", icon: FaTiktok, href: "https://www.tiktok.com/@aformixtech" },
  { name: "X", icon: FaXTwitter, href: "https://x.com/Afromixtech" },
  { name: "Email", icon: FaEnvelope, href: "aformixtech@gmail.com" },
];

const Footer: React.FC = () => {
  return (
    <footer className="reveal bg-slate-950 pt-32 pb-16 border-t border-white/5 relative overflow-hidden w-full flex justify-center">
      {/* Footer Aurora */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div> */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="grid lg:grid-cols-[1.1fr_1fr_1fr_0.8fr] gap-12 lg:gap-8 mb-24">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10">Products</h4>
            <ul className="space-y-5 text-left">
              {[
                { label: "SaaS Platforms", href: "#" },
                { label: "E-commerce", href: "#" },
                { label: "Mobile Apps", href: "#" },
                { label: "Design Systems", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link text-slate-500 hover:text-primary font-bold transition-all block">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10">Solutions</h4>
            <ul className="space-y-5 text-left">
              {[
                { label: "Enterprise", href: "#" },
                { label: "SaaS Templates", href: "#" },
                { label: "System Architecture", href: "#" },
                { label: "Analytics", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link text-slate-500 hover:text-primary font-bold transition-all block">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10">Company</h4>
            <ul className="space-y-5">
              {[
                { label: "About Us", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link text-slate-500 hover:text-primary font-bold transition-all">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
            <img src="/src/assets/logo.png" alt="Aformix logo" className="w-8 mb-10 object-contain hover:scale-90 transition-all duration-300" />
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-600 font-bold text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} AFORMIX ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-3 relative">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary transition-all duration-300 relative group border border-white/5 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon size={20} className="group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

      </div>
      {/* <Divider /> */}
    </footer>
  );
};

export default Footer;
