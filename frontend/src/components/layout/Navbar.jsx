import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { useScrollNavbar } from '../../hooks/useScrollNavbar';
import { BRAND } from '../../constants/brand';
import Button from '../ui/Button';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Climbing Expeditions', to: '/expeditions' },
  { label: 'Safety & Preparation', to: '/safety' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar({ transparentOnHero = false }) {
  const isScrolled = useScrollNavbar(80);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Transparent only applies on pages with a dark hero (home) before scrolling.
  const isTransparent = transparentOnHero && !isScrolled;
  const textColor = isTransparent ? 'text-white' : 'text-ink';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-white shadow-sm'
      }`}
    >
      <nav className="container-page flex items-center justify-between py-4" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={isTransparent ? '/images/logo-icon-white.png' : '/images/logo-icon-only.png'}
            alt="RidgeClimb Adventures"
            className="h-9 w-auto"
          />
          <span className={`font-display text-base leading-none tracking-wide ${textColor}`}>
            RidgeClimb
            <span className="block text-[0.6rem] font-body font-normal normal-case tracking-[0.18em] opacity-70">
              Adventures
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-glacier-dark ${
                  location.pathname === link.to ? 'text-glacier-dark' : textColor
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-5">
          <a href={BRAND.phoneHref} className={`flex items-center gap-2 text-sm font-medium ${textColor}`}>
            <Phone size={16} />
            {BRAND.phone}
          </a>
          <Link to="/contact">
            <Button variant="primary" size="sm">
              Book a Climb
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden ${textColor}`}
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl p-6 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsMobileOpen(false)} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
              <ul className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setIsMobileOpen(false)}
                      className="font-medium text-ink hover:text-ridge"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-4">
                <a href={BRAND.phoneHref} className="flex items-center gap-2 text-sm font-medium text-ink">
                  <Phone size={16} />
                  {BRAND.phone}
                </a>
                <Link to="/contact" onClick={() => setIsMobileOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Book a Climb
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
