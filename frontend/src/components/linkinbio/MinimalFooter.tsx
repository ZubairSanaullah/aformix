import React from "react";
import { ArrowUp } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaFacebook, FaGithub } from "react-icons/fa";

const MinimalFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="links-footer w-full pb-8 pt-4 px-6 text-center">
      <div className="max-w-3xl mx-auto border-t border-slate-200 pt-8 flex flex-col items-center">

        {/* Social Icons */}
        <div className="flex items-center gap-4 mb-6">
          <a href="https://www.instagram.com/aformixtech/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/company/aformix/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors">
            <FaLinkedinIn className="w-5 h-5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors">
            <FaFacebook className="w-5 h-5" />
          </a>
          <a href="https://github.com/aformix" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors">
            <FaGithub className="w-5 h-5" />
          </a>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-6 text-sm links-footer-text text-slate-500 mb-6">
          <a href="/" className="hover:text-primary transition-colors">Website</a>
          <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy</a>
          <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms</a>
        </div>

        {/* Copyright */}
        <p className="text-sm links-footer-text text-slate-400 mb-8">
          © {currentYear} Aformix. All rights reserved.
        </p>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-sm font-medium links-footer-text text-slate-500 hover:text-primary transition-colors group"
        >
          <div className="links-back-top-icon p-2 rounded-full bg-slate-100 group-hover:bg-primary/10 transition-colors">
            <ArrowUp className="w-4 h-4" />
          </div>
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default MinimalFooter;
