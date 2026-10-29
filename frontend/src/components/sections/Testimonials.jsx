import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Alex Morgan',
    quote: 'An unforgettable experience, the crew were incredible!',
    avatar: '/images/avatar-alex.jpg',
  },
  {
    name: 'Emma Johnson',
    quote: 'I highly recommend RidgeClimb to anyone!',
    avatar: '/images/avatar-emma.jpg',
  },
  {
    name: 'Sofia Bennett',
    quote: 'RidgeClimb made me feel safe, strong, and inspired. Truly life-changing!',
    avatar: '/images/avatar-sofia.jpg',
  },
  {
    name: 'Michael Smith',
    quote: 'Worth every penny!',
    avatar: '/images/avatar-michael.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <span className="font-mono-label text-glacier-dark text-xs block text-center">Field Reports</span>
        <h2 className="font-display text-3xl text-ink text-center mt-2 mb-12">
          What Our Climbers Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="flex gap-4">
              <img
                src={t.avatar}
                alt={`Portrait of ${t.name}`}
                className="h-14 w-14 rounded-full object-cover shrink-0"
                loading="lazy"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-ink">{t.name}</h3>
                </div>
                <div className="flex gap-0.5 text-warning mb-2" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-sm text-ink-secondary italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
