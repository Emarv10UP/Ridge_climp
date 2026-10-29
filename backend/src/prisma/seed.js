// Seeds the database with the 6 RidgeClimb expeditions.
// Run via: npx prisma db seed  (configured in package.json -> "prisma.seed")

const { PrismaClient, Difficulty } = require('@prisma/client');
const prisma = new PrismaClient();

const expeditions = [
  {
    title: 'Everest Base Camp',
    slug: 'everest-base-camp',
    description:
      "A legendary 14-day trek to the base of the world's highest peak. Demands acclimatization and altitude challenge for first-time adventurers.",
    difficulty: Difficulty.EXPERT,
    duration: '14 days',
    price: 2400,
    imageUrl: '/images/everest-base-camp.jpg',
    featured: true,
  },
  {
    title: 'Kilimanjaro Trek',
    slug: 'kilimanjaro-trek',
    description:
      'Climb Africa\'s tallest mountain through diverse landscapes. A rewarding challenge for first-time adventurers.',
    difficulty: Difficulty.INTERMEDIATE,
    duration: '9 days',
    price: 1800,
    imageUrl: '/images/kilimanjaro-trek.jpg',
    featured: true,
  },
  {
    title: 'Island Peak Climb',
    slug: 'island-peak-climb',
    description:
      'A scenic Himalayan climb, ideal for newcomers. Offers breathtaking vistas and a taste of alpine adventure.',
    difficulty: Difficulty.BEGINNER,
    duration: '12 days',
    price: 1600,
    imageUrl: '/images/island-peak-climb.jpg',
    featured: false,
  },
  {
    title: 'Mont Blanc Summit',
    slug: 'mont-blanc-summit',
    description:
      'Explore the Alps with a guided ascent to Mont Blanc. Perfect for first-time climbers seeking stunning views.',
    difficulty: Difficulty.BEGINNER,
    duration: '6 days',
    price: 1400,
    imageUrl: '/images/mont-blanc-summit.jpg',
    featured: true,
  },
  {
    title: 'Aconcagua Expedition',
    slug: 'aconcagua-expedition',
    description:
      "Conquer South America's highest summit. High altitude and rugged terrain make this a serious expedition.",
    difficulty: Difficulty.EXPERT,
    duration: '18 days',
    price: 3200,
    imageUrl: '/images/aconcagua-expedition.jpg',
    featured: false,
  },
  {
    title: 'Elbrus Challenge',
    slug: 'elbrus-challenge',
    description:
      "Ascend Europe's highest peak in snowy conditions. A great step up for intermediate mountaineers.",
    difficulty: Difficulty.INTERMEDIATE,
    duration: '8 days',
    price: 1900,
    imageUrl: '/images/elbrus-challenge.jpg',
    featured: false,
  },
];

async function main() {
  console.log('Seeding database...');

  for (const exp of expeditions) {
    await prisma.expedition.upsert({
      where: { slug: exp.slug },
      update: exp,
      create: exp,
    });
    console.log(`  ✓ ${exp.title}`);
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
