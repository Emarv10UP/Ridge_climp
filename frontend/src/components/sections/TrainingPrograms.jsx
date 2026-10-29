import Card from '../ui/Card';

const PROGRAMS = [
  {
    level: '01',
    title: 'Basic Climbing Skills',
    description: 'Learn essential rope handling and balance control.',
    image: '/images/training-basic.jpg',
  },
  {
    level: '02',
    title: 'Advanced Techniques',
    description: 'Master glacier travel, altitude management, and learn mountain navigation.',
    image: '/images/training-advanced.jpg',
  },
  {
    level: '03',
    title: 'Survival Training',
    description: 'Prepare for emergencies and learn mountain survival tactics.',
    image: '/images/training-survival.jpg',
  },
];

export default function TrainingPrograms() {
  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <span className="font-mono-label text-glacier-dark text-xs">Build Your Skills</span>
        <h2 className="font-display text-3xl text-ink mt-2 mb-10">Training Programs</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Numbered 01/02/03 markers are appropriate here — these programs
              are a genuine skill progression, not an arbitrary list */}
          {PROGRAMS.map((program) => (
            <Card key={program.title} className="border border-border">
              <div className="relative">
                <img
                  src={program.image}
                  alt={program.title}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
                <span className="font-mono-label absolute top-3 left-3 bg-navy/85 text-white text-xs px-2 py-1">
                  {program.level}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-ink mb-2">{program.title}</h3>
                <p className="text-sm text-ink-secondary">{program.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
