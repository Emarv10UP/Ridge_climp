import Layout from '../components/layout/Layout';
import ExpeditionGrid from '../components/sections/ExpeditionGrid';
import PricingTable from '../components/sections/PricingTable';
import Testimonials from '../components/sections/Testimonials';
import CTABanner from '../components/sections/CTABanner';
import BookingModal from '../components/sections/BookingModal';

export default function ExpeditionsPage() {
  return (
    <Layout>
      <section className="bg-stone-50 pt-32 pb-12">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl text-ink mb-4">
            Choose Your Next Adventure
          </h1>
          <p className="text-ink-secondary max-w-2xl mx-auto">
            From beginner-friendly treks to elite technical ascents, find the expedition that
            matches your experience and ambition.
          </p>
        </div>
      </section>

      <ExpeditionGrid />
      <PricingTable />
      <Testimonials />
      <CTABanner />
      <BookingModal />
    </Layout>
  );
}
