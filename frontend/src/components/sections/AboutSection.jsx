import { useIntersectionAnimation } from '../../hooks/useIntersectionAnimation';
import { useCountUp } from '../../hooks/useCountUp';
import { BRAND } from '../../constants/brand';

const STATS = [
  { end: BRAND.stats.peaksConquered, suffix: '+', label: 'Peaks Conquered' },
  { end: BRAND.stats.happyClimbers, suffix: '+', label: 'Happy Climbers' },
  { end: BRAND.stats.yearsExperience, suffix: '+', label: 'Years Experience' },
];

function StatMarker({ stat, isVisible }) {
  const count = useCountUp(stat.end, 1500, isVisible);
  return (
    <div className="flex-1 pl-5 border-l-2 border-border">
      <span className="font-display text-4xl text-navy block leading-none">
        {count}
        {stat.suffix}
      </span>
      <span className="font-mono-label text-[0.65rem] text-ink-secondary mt-2 block">{stat.label}</span>
    </div>
  );
}

export default function AboutSection() {
  const [ref, isVisible] = useIntersectionAnimation();

  return (
    <section className="bg-stone-50 py-20" ref={ref}>
      <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <span className="font-mono-label text-glacier-dark text-xs">Our Story</span>
          <h2 className="font-display text-3xl text-ink mt-2 mb-6">About RidgeClimb Adventures</h2>
          <p className="text-ink-secondary leading-relaxed mb-4">
            For over 15 years, RidgeClimb Adventures has been leading expeditions across the world's
            most challenging peaks. Based in the heart of Kyrgyzstan, we combine local expertise with
            international mountaineering standards to deliver safe, exhilarating climbing experiences.
          </p>
          <p className="text-ink-secondary leading-relaxed mb-10">
            Our team of certified mountain guides is passionate about sharing the beauty and challenge of
            high-altitude climbing. Whether you're a beginner taking your first steps on a glacier or an
            experienced climber tackling an 8,000-meter peak, we're here to make your mountain dreams a
            reality.
          </p>

          {/* Elevation-marker stat strip — a connected baseline rather than
              isolated icon-circle stat cards */}
          <div className="flex">
            {STATS.map((stat) => (
              <StatMarker key={stat.label} stat={stat} isVisible={isVisible} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <img
            src="/images/about-1.jpg"
            alt="Climber standing on a snowy ridge overlooking mountain peaks"
            className="w-full h-56 object-cover"
            style={{ clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)' }}
            loading="lazy"
          />
          <img
            src="/images/about-2.jpg"
            alt="Close-up of climbing rope and ice axe equipment on a glacier"
            className="w-full h-56 object-cover"
            style={{ clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)' }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
