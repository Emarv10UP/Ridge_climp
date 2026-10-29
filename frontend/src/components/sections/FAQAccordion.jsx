import Accordion from '../ui/Accordion';

const FAQS = [
  {
    question: "What's the best time to book an expedition?",
    answer:
      'We recommend booking 3-6 months in advance, especially for popular destinations like the Everest Base Camp. This allows time for proper preparation and training.',
  },
  {
    question: 'Do I need prior climbing experience?',
    answer:
      "It depends on the expedition. We offer trips for all levels, from beginner treks to advanced technical climbs. Our team will help you choose the right adventure based on your experience.",
  },
  {
    question: "What's included in the expedition cost?",
    answer:
      'All our packages include guide services, permits, accommodation, most meals, and group equipment. Personal gear, international flights, and travel insurance are typically not included.',
  },
  {
    question: 'Can I join as a solo traveler?',
    answer:
      'Absolutely! Many of our climbers join as individuals and are matched with groups. We also offer private expeditions for those who prefer a customized experience.',
  },
];

export default function FAQAccordion() {
  return (
    <section className="py-16 bg-white">
      <div className="container-page max-w-3xl">
        <h2 className="font-display text-3xl text-ink text-center mb-10">
          Frequently Asked Questions
        </h2>
        <Accordion items={FAQS} />
      </div>
    </section>
  );
}
