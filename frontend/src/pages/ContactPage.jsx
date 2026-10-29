import Layout from '../components/layout/Layout';
import ContactForm from '../components/sections/ContactForm';
import FAQAccordion from '../components/sections/FAQAccordion';
import CTABanner from '../components/sections/CTABanner';

export default function ContactPage() {
  return (
    <Layout>
      <section className="bg-navy pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 contour-bg opacity-[0.08] pointer-events-none" aria-hidden="true" />
        <div className="container-page text-center relative">
          <h1 className="font-display text-4xl text-white mb-3">Contact Us</h1>
          <p className="text-white/85 max-w-xl mx-auto">
            Get in touch with our team to start planning your next mountain adventure
          </p>
        </div>
      </section>

      <ContactForm />
      <FAQAccordion />
      <CTABanner />
    </Layout>
  );
}
