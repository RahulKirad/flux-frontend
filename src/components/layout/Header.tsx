import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FluxLogo from '../common/FluxLogo';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Engineering Design', path: '/services/engineering-design' },
      { label: 'Composites & Forming', path: '/services/composites-forming' },
      { label: 'Prototyping', path: '/services/prototyping' },
      { label: 'Tools & Die', path: '/services/tools-die' },
      { label: 'Automotive Styling', path: '/services/automotive-styling' },
      { label: 'Bus Body Manufacturing', path: '/services/bus-body-manufacturing' },
      { label: 'Railway Components', path: '/services/railway-components' },
      { label: 'Industrial Components', path: '/services/industrial-components' },
    ],
  },
  { label: 'Industries', path: '/industries' },
  { label: 'Projects', path: '/projects' },
  { label: 'Product Gallery', path: '/product-gallery' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [pathname]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideDropdown =
        dropdownRef.current?.contains(target) || mobileDropdownRef.current?.contains(target);

      if (!insideDropdown) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const homeNavClass = (isActive: boolean) =>
    isActive
      ? 'text-white border-b border-white/80'
      : 'text-white/70 hover:text-white';

  const defaultNavClass = (isActive: boolean) =>
    isActive
      ? 'text-kinetic-primary border-b border-kinetic-primary'
      : 'text-kinetic-secondary hover:text-kinetic-primary';

  const toggleDropdown = (label: string) => {
    setDropdownOpen((open) => (open === label ? null : label));
  };

  const isLinkActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${
        isHome
          ? `fixed top-0 left-0 right-0 border-b ${
              scrolled
                ? 'bg-[#0a1628]/88 backdrop-blur-md border-white/10 shadow-sm'
                : 'bg-black/15 backdrop-blur-sm border-white/5'
            }`
          : `sticky top-0 bg-white/90 backdrop-blur-md border-b border-kinetic-outline-variant${
              scrolled ? ' shadow-sm' : ''
            }`
      }`}
    >
      <div className="stitch-container-home min-w-0">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem] gap-2 lg:gap-3 xl:gap-4 min-w-0">
          <Link to="/" className="flex items-center shrink-0 min-w-0" aria-label="Flux Corporation home">
            <FluxLogo
              highlighted
              className="h-10 sm:h-11 lg:h-12 w-auto max-w-[200px] sm:max-w-[240px] lg:max-w-[272px]"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-5 2xl:gap-7 flex-1 justify-center min-w-0 overflow-visible">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative shrink-0"
                ref={link.children && dropdownOpen === link.label ? dropdownRef : undefined}
              >
                {link.children ? (
                  <button
                    type="button"
                    aria-expanded={dropdownOpen === link.label}
                    aria-haspopup="true"
                    onClick={() => toggleDropdown(link.label)}
                    className={`text-[10px] lg:text-[11px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-widest transition-colors duration-300 kinetic-border pb-1 flex items-center gap-1 shrink-0 ${
                      isHome
                        ? homeNavClass(isLinkActive(link.path))
                        : defaultNavClass(isLinkActive(link.path))
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${dropdownOpen === link.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `text-[10px] lg:text-[11px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-widest transition-colors duration-300 kinetic-border pb-1 flex items-center gap-1 shrink-0 ${
                        isHome ? homeNavClass(isActive) : defaultNavClass(isActive)
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}

                {link.children && dropdownOpen === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 w-64 bg-white border border-kinetic-outline-variant py-2 mt-2 shadow-lg z-50"
                  >
                    <Link
                      to={link.path}
                      className="block px-4 py-2.5 text-xs uppercase tracking-wider text-kinetic-primary font-semibold border-b border-kinetic-outline-variant mb-1 hover:bg-kinetic-surface-low transition"
                    >
                      All Services
                    </Link>
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2.5 text-xs uppercase tracking-wider text-kinetic-on-surface-variant hover:text-kinetic-primary transition"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          <Link
            to="/contact"
            className={`hidden lg:inline-flex shrink-0 !px-3 !py-2 lg:!px-4 xl:!px-5 !py-2.5 text-[10px] lg:text-[11px] xl:text-xs whitespace-nowrap ${
              isHome
                ? 'stitch-btn-ghost !border-white/25 !bg-white/5 !backdrop-blur-sm hover:!bg-white/12'
                : 'stitch-btn-primary'
            }`}
          >
            Request Quote
          </Link>

          <button
            className={`lg:hidden p-2 shrink-0 ${isHome ? 'text-white' : 'text-kinetic-primary'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`lg:hidden border-t overflow-hidden ${
              isHome ? 'border-white/10 bg-[#0a1628]/95 backdrop-blur-md' : 'border-kinetic-outline-variant bg-white'
            }`}
          >
            <nav className="stitch-container-home py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.children ? (
                    <div ref={dropdownOpen === link.label ? mobileDropdownRef : undefined}>
                      <button
                        type="button"
                        aria-expanded={dropdownOpen === link.label}
                        onClick={() => toggleDropdown(link.label)}
                        className={`w-full flex items-center justify-between py-2.5 text-sm uppercase tracking-widest transition ${
                          isHome ? 'text-white/80 hover:text-white' : 'text-kinetic-secondary hover:text-kinetic-primary'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${dropdownOpen === link.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {dropdownOpen === link.label && (
                        <div className="pl-4 pb-2 space-y-1">
                          <Link
                            to={link.path}
                            className={`block py-2 text-xs uppercase tracking-wider font-semibold ${
                              isHome ? 'text-white hover:text-white/90' : 'text-kinetic-primary hover:text-kinetic-primary/80'
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            All Services
                          </Link>
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`block py-2 text-xs uppercase tracking-wider ${
                                isHome ? 'text-white/60 hover:text-white' : 'text-kinetic-on-surface-variant hover:text-kinetic-primary'
                              }`}
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block py-2.5 text-sm uppercase tracking-widest transition ${
                        isHome ? 'text-white/80 hover:text-white' : 'text-kinetic-secondary hover:text-kinetic-primary'
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className={`block text-center mt-4 ${isHome ? 'stitch-btn-ghost !border-white/25 !bg-white/5' : 'stitch-btn-primary'}`}
                onClick={() => setMobileOpen(false)}
              >
                Request Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
