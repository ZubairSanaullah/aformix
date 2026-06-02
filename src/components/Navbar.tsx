import React, { useState, useEffect, useRef } from "react";
import { navLinks } from "../constants";
import { Menu, X, ArrowRight, Sun, Moon, Monitor, Layout, Briefcase, Activity, Users, ChevronDown, Code, Smartphone } from "lucide-react";

type Theme = "light" | "dark" | "system";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("system");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-transform duration-500 ease-in-out flex justify-center ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "py-4" : "py-8"}`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className={`flex items-center justify-between px-8 py-4 rounded-3xl transition-all duration-500 ${
          isScrolled 
            ? "bg-[var(--color-bg)] shadow-2xl border border-[var(--color-glass-border)]" 
            : "bg-transparent"
        }`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img src="/src/assets/logo.png" alt="logo" className="w-7 cursor-pointer hover:scale-95 transition-transform" />
            <p className="text-xl text-white font-light transition-colors duration-500">Aformix</p>
          </a>

          {/* Desktop Links */}
          <div
            className="hidden md:flex items-center gap-8 group relative"
            onMouseLeave={() => {
              setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
              setHoveredMenu(null);
            }}
          >
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative py-4 flex items-center"
                onMouseEnter={(e) => {
                  setHoverStyle({
                    left: e.currentTarget.offsetLeft,
                    width: e.currentTarget.offsetWidth,
                    opacity: 1,
                  });
                  setHoveredMenu(link.name);
                }}
              >
                <a
                  href={link.href}
                  className="nav-link flex items-center gap-1.5 group-hover:opacity-50 hover:!opacity-100 transition-opacity"
                >
                  {link.name}
                  {['Products', 'Services', 'Company'].includes(link.name) && (
                    <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredMenu === link.name ? 'rotate-180 text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`} />
                  )}
                </a>

                {/* Dropdown Menu */}
                {['Products', 'Services', 'Company'].includes(link.name) && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[340px] transition-all duration-300 ease-out z-50 ${
                      hoveredMenu === link.name
                        ? "opacity-100 translate-y-0 visible pointer-events-auto"
                        : "opacity-0 translate-y-4 invisible pointer-events-none"
                    }`}
                  >
                    <div className="glass-effect rounded-2xl p-2 border border-[var(--color-glass-border)] shadow-2xl relative overflow-hidden backdrop-blur-xl bg-[var(--color-bg)]/95">
                      {/* Glow line at top */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-70" />
                      
                      <div className="flex flex-col gap-1">
                        {link.name === 'Products' && (
                          <>
                            <a href="#" className="p-3 hover:bg-[var(--color-glass)] rounded-xl transition-all duration-300 group/item flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                <Monitor size={20} />
                              </div>
                              <div>
                                <h4 className="text-[var(--color-text)] font-semibold text-sm group-hover/item:text-[var(--color-primary)] transition-colors">Trading Platform</h4>
                                <p className="text-[var(--color-text-muted)] text-xs mt-1 leading-relaxed">Advanced stock tracking & analytics.</p>
                              </div>
                            </a>
                            <a href="#" className="p-3 hover:bg-[var(--color-glass)] rounded-xl transition-all duration-300 group/item flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                <Layout size={20} />
                              </div>
                              <div>
                                <h4 className="text-[var(--color-text)] font-semibold text-sm group-hover/item:text-[var(--color-primary)] transition-colors">SaaS Templates</h4>
                                <p className="text-[var(--color-text-muted)] text-xs mt-1 leading-relaxed">Beautifully designed UI templates.</p>
                              </div>
                            </a>
                            <a href="#" className="p-3 hover:bg-[var(--color-glass)] rounded-xl transition-all duration-300 group/item flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                <Smartphone size={20} />
                              </div>
                              <div>
                                <h4 className="text-[var(--color-text)] font-semibold text-sm group-hover/item:text-[var(--color-primary)] transition-colors">Mobile Toolkit</h4>
                                <p className="text-[var(--color-text-muted)] text-xs mt-1 leading-relaxed">React Native component library.</p>
                              </div>
                            </a>
                          </>
                        )}
                        {link.name === 'Services' && (
                          <>
                            <a href="#" className="p-3 hover:bg-[var(--color-glass)] rounded-xl transition-all duration-300 group/item flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                <Code size={20} />
                              </div>
                              <div>
                                <h4 className="text-[var(--color-text)] font-semibold text-sm group-hover/item:text-[var(--color-primary)] transition-colors">Custom Development</h4>
                                <p className="text-[var(--color-text-muted)] text-xs mt-1 leading-relaxed">End-to-end full stack web solutions.</p>
                              </div>
                            </a>
                            <a href="#" className="p-3 hover:bg-[var(--color-glass)] rounded-xl transition-all duration-300 group/item flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                <Activity size={20} />
                              </div>
                              <div>
                                <h4 className="text-[var(--color-text)] font-semibold text-sm group-hover/item:text-[var(--color-primary)] transition-colors">System Architecture</h4>
                                <p className="text-[var(--color-text-muted)] text-xs mt-1 leading-relaxed">Scalable cloud infrastructures.</p>
                              </div>
                            </a>
                          </>
                        )}
                        {link.name === 'Company' && (
                          <>
                            <a href="#" className="p-3 hover:bg-[var(--color-glass)] rounded-xl transition-all duration-300 group/item flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                <Users size={20} />
                              </div>
                              <div>
                                <h4 className="text-[var(--color-text)] font-semibold text-sm group-hover/item:text-[var(--color-primary)] transition-colors">About Us</h4>
                                <p className="text-[var(--color-text-muted)] text-xs mt-1 leading-relaxed">Learn about our mission and vision.</p>
                              </div>
                            </a>
                            <a href="#" className="p-3 hover:bg-[var(--color-glass)] rounded-xl transition-all duration-300 group/item flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                <Briefcase size={20} />
                              </div>
                              <div>
                                <h4 className="text-[var(--color-text)] font-semibold text-sm group-hover/item:text-[var(--color-primary)] transition-colors">Careers</h4>
                                <p className="text-[var(--color-text-muted)] text-xs mt-1 leading-relaxed">Join our world-class engineering team.</p>
                              </div>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Sliding Dot */}
            <div
              className="absolute bottom-1 h-1.5 w-1.5 rounded-full transition-all duration-1000 ease-out pointer-events-none"
              style={{
                left: hoverStyle.left + hoverStyle.width / 2 - 3,
                opacity: hoverStyle.opacity,
                backgroundColor: "var(--color-primary)"
              }}
            />
          </div>

          <div className="hidden md:flex items-center gap-6">
            {/* Theme Toggle */}
            <div className="relative group/theme">
              <button className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center text-[var(--color-text)] hover:text-primary transition-colors cursor-pointer">
                {theme === "light" ? <Sun size={18} /> : theme === "dark" ? <Moon size={18} /> : <Monitor size={18} />}
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-32 py-2 rounded-xl glass-effect opacity-0 invisible group-hover/theme:opacity-100 group-hover/theme:visible transition-all duration-300 flex flex-col z-50 overflow-hidden">
                <button onClick={() => setTheme("light")} className={`px-4 py-2 text-left text-sm hover:text-primary transition-colors flex items-center gap-2 ${theme === 'light' ? 'text-primary' : 'text-[var(--color-text)]'}`}><Sun size={14} /> Light</button>
                <button onClick={() => setTheme("dark")} className={`px-4 py-2 text-left text-sm hover:text-primary transition-colors flex items-center gap-2 ${theme === 'dark' ? 'text-primary' : 'text-[var(--color-text)]'}`}><Moon size={14} /> Dark</button>
                <button onClick={() => setTheme("system")} className={`px-4 py-2 text-left text-sm hover:text-primary transition-colors flex items-center gap-2 ${theme === 'system' ? 'text-primary' : 'text-[var(--color-text)]'}`}><Monitor size={14} /> System</button>
              </div>
            </div>

            <a href="/login">
              <button className="btn-outline flex items-center gap-2 !py-2.5 !px-6 text-sm cursor-pointer">
                Login
              </button>
            </a>
            <a href="#contact">
              <button className="btn-primary flex items-center gap-2 !py-2.5 !px-6 text-sm cursor-pointer">
                Get Started <ArrowRight size={16} />
              </button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full px-6 transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? "max-h-[500px] py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}>
        <div className="glass-effect rounded-3xl p-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl font-black text-white hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-white/10 w-full"></div>
          
          {/* Mobile Theme Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-[var(--color-text)] font-medium">Theme</p>
            <div className="flex gap-2">
              <button onClick={() => setTheme("light")} className={`p-2 rounded-lg glass-effect transition-colors ${theme === 'light' ? 'text-primary' : 'text-[var(--color-text)]'}`}><Sun size={20} /></button>
              <button onClick={() => setTheme("dark")} className={`p-2 rounded-lg glass-effect transition-colors ${theme === 'dark' ? 'text-primary' : 'text-[var(--color-text)]'}`}><Moon size={20} /></button>
              <button onClick={() => setTheme("system")} className={`p-2 rounded-lg glass-effect transition-colors ${theme === 'system' ? 'text-primary' : 'text-[var(--color-text)]'}`}><Monitor size={20} /></button>
            </div>
          </div>

          <a href="/login">
            <button className="btn-primary w-full">Login</button>
          </a>
          <a href="#contact">
            <button className="btn-primary w-full">Get Started</button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
