import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { BRAND } from '../../constants/brand';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Climbing Expeditions', to: '/expeditions' },
  { label: 'Safety & Preparation', to: '/safety' },
  { label: 'Contact Us', to: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: Facebook, href: BRAND.social.facebook },
  { label: 'Instagram', icon: Instagram, href: BRAND.social.instagram },
  { label: 'Twitter', icon: Twitter, href: BRAND.social.twitter },
  { label: 'YouTube', icon: Youtube, href: BRAND.social.youtube },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Faint contour motif, signature element echoed quietly in the footer */}
      <div
        className="absolute inset-0 contour-bg opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-page py-14 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + address */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <img src="/images/logo-icon-white.png" alt="RidgeClimb Adventures" className="h-10 w-auto" />
              <span className="font-display text-base leading-none tracking-wide">
                RidgeClimb
                <span className="block text-[0.6rem] font-body font-normal normal-case tracking-[0.18em] opacity-70">
                  Adventures
                </span>
              </span>
            </Link>
            <div className="flex items-start gap-2 text-sm text-white/75 mb-2">
              <MapPin size={16} className="shrink-0 mt-0.5" />
              <span>{BRAND.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/75 mb-2">
              <Phone size={16} className="shrink-0" />
              <a href={BRAND.phoneHref} className="hover:text-glacier">
                {BRAND.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/75">
              <Mail size={16} className="shrink-0" />
              <a href={BRAND.emailHref} className="hover:text-glacier">
                {BRAND.email}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="heading-mark font-display text-sm mb-4 tracking-widest">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/75 hover:text-glacier">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h3 className="heading-mark font-display text-sm mb-4 tracking-widest">Follow Us</h3>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/75 hover:text-glacier"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter (optional column) */}
          <div>
            <h3 className="heading-mark font-display text-sm mb-4 tracking-widest">Stay Updated</h3>
            <p className="text-sm text-white/75 mb-3">
              Get expedition news and seasonal offers in your inbox.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 relative">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-glacier">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="hover:text-glacier">
              Privacy Policy
            </Link>
          </div>
          <span>Designed by {BRAND.designedBy}</span>
          <span>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
