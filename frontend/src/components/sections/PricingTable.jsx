import { useBookingStore } from '../../store/bookingStore';
import Button from '../ui/Button';
import Card from '../ui/Card';

const PACKAGES = [
  {
    id: 'BASIC',
    name: 'Basic',
    price: 300,
    description:
      'Ideal for beginners. Join the climb and start your mountain journey with expert guidance.',
  },
  {
    id: 'PRO',
    name: 'Pro',
    price: 800,
    description:
      'For intermediate climbers. Includes gear rental and access to more demanding routes with support.',
    highlighted: true,
  },
  {
    id: 'EXTREME',
    name: 'Extreme',
    price: 1500,
    description:
      'Designed for experts. Tackle advanced ascents with elite guides and full expedition logistics.',
  },
];

export default function PricingTable() {
  const openBookingModal = useBookingStore((s) => s.openBookingModal);

  return (
    <section className="py-20 bg-stone-50">
      <div className="container-page text-center">
        <span className="font-mono-label text-glacier-dark text-xs">Choose Your Tier</span>
        <h2 className="font-display text-3xl text-ink mt-2 mb-3">Expedition Packages</h2>
        <p className="text-ink-secondary mb-12">
          Affordable and Flexible Pricing For All Experience Levels
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PACKAGES.map((pkg) => (
            <Card
              key={pkg.id}
              className={`p-8 text-left ${
                pkg.highlighted ? 'border-2 border-navy shadow-lg relative md:-mt-4' : 'border border-border'
              }`}
            >
              {pkg.highlighted && (
                <span
                  className="font-mono-label absolute -top-3 right-6 bg-navy px-3 py-1 text-[0.65rem] text-white"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}
                >
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl text-ink mb-2">{pkg.name}</h3>
              <p className="font-display text-4xl text-navy mb-4">${pkg.price}</p>
              <p className="text-sm text-ink-secondary mb-6 min-h-[72px]">{pkg.description}</p>
              <Button variant="primary" className="w-full" onClick={() => openBookingModal(pkg.id)}>
                Book Now
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
