import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '../../constants/brand';
import Button from '../ui/Button';

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  // Subtle parallax: background and contour overlay move at different
  // rates for depth — the contour drifts slightly faster, like a map
  // sliding under the photograph.
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const yContour = useTransform(scrollY, [0, 800], [0, 260]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-navy">
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-20 bg-cover bg-center"
        role="img"
        aria-label="Snow-capped peaks of the Tian Shan range in Kyrgyzstan at sunrise"
      >
        <img
          src="/images/hero-mountains.jpg"
          alt="Snow-capped peaks of the Tian Shan range in Kyrgyzstan at sunrise"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy/80" />

      {/* Signature topographic contour motif, faint, drifting on scroll */}
      <motion.div
        style={{ y: yContour }}
        className="absolute inset-0 -z-10 contour-bg opacity-[0.18] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono-label text-glacier text-xs mb-5"
        >
          42°52′N 74°59′E — Tian Shan, Kyrgyzstan
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="font-display text-hero text-white max-w-5xl leading-[1.05]"
        >
          {BRAND.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
          className="mt-6 max-w-2xl text-lg text-white/90 font-body"
        >
          {BRAND.subTagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="mt-9"
        >
          <Button size="lg" variant="secondary">
            Start Your Journey
            <ArrowRight size={20} />
          </Button>
        </motion.div>
      </div>

      {/* Elevation tick marks down the left edge — a quiet cartographic
          detail rather than a generic scroll-indicator chevron */}
      <div
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-white/40 z-10"
        aria-hidden="true"
      >
        {['5800m', '4200m', '2600m', '1000m'].map((label) => (
          <span key={label} className="font-mono-label text-[0.6rem] [writing-mode:vertical-rl]">
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
