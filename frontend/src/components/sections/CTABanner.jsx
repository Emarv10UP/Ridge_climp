import { Link } from 'react-router-dom';
import { BRAND } from '../../constants/brand';
import Button from '../ui/Button';

/**
 * Full-width dark navy CTA banner used at the bottom of every page.
 * Title/subtext/button label are configurable for the safety page variant.
 */
export default function CTABanner({
  title = 'Ready to Begin Your Adventure?',
  subtext = `Join thousands of climbers who have trusted ${BRAND.name} to guide them to the top of the world.`,
  buttonLabel = 'Contact Us Today',
  buttonTo = '/contact',
}) {
  return (
    <section className="bg-navy py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 contour-bg opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      />
      <div className="container-page text-center relative">
        <h2 className="font-display text-3xl text-white mb-4">{title}</h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">{subtext}</p>
        <Link to={buttonTo}>
          <Button variant="outline-white">{buttonLabel}</Button>
        </Link>
      </div>
    </section>
  );
}
