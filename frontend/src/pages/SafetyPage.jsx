import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import TrainingPrograms from '../components/sections/TrainingPrograms';
import CTABanner from '../components/sections/CTABanner';
import { BRAND } from '../constants/brand';
import Button from '../components/ui/Button';

export default function SafetyPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-navy">
        <img
          src="/images/safety-hero.jpg"
          alt="Climbers roped together crossing a snowy mountain ridge"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/70" />
        <div
          className="absolute inset-0 contour-bg opacity-[0.15] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 container-page">
          <span className="font-mono-label text-glacier text-xs mb-4">Before You Go</span>
          <h1 className="font-display text-4xl sm:text-5xl text-white max-w-xl leading-[0.95]">
            Your Safety, Our Priority
          </h1>
          <p className="mt-4 max-w-lg text-white/90">
            We ensure every climber is trained, equipped, and prepared for the challenges ahead.
          </p>
        </div>
      </section>

      {/* Why Safety Matters */}
      <section className="py-20 bg-white">
        <div className="container-page max-w-3xl">
          <span className="font-mono-label text-glacier-dark text-xs">Our Approach</span>
          <h2 className="font-display text-3xl text-ink mt-2 mb-6">Why Safety Matters</h2>
          <p className="text-ink-secondary leading-relaxed">
            Mountaineering is an inherently challenging activity that requires respect for
            nature, proper preparation, and unwavering commitment to safety. At {BRAND.name},
            we've built our reputation on maintaining the highest safety standards in
            the industry. Our comprehensive approach to safety combines cutting-edge equipment,
            rigorous training protocols, and decades of collective experience. We believe that
            proper preparation and risk management are the keys to successful and enjoyable
            expeditions.
          </p>
        </div>
      </section>

      <TrainingPrograms />

      {/* Safety CTA */}
      <section className="bg-navy py-14 relative overflow-hidden">
        <div className="absolute inset-0 contour-bg opacity-[0.06] pointer-events-none" aria-hidden="true" />
        <div className="container-page text-center relative">
          <p className="font-display text-xl sm:text-2xl text-white mb-6">
            Join our certified safety programs and climb with confidence
          </p>
          <Link to="/contact">
            <Button variant="outline-white" size="lg">
              Join Now
            </Button>
          </Link>
        </div>
      </section>

      <CTABanner />
    </Layout>
  );
}
