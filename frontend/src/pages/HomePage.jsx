import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import FeaturedExpeditions from '../components/sections/FeaturedExpeditions';
import CTABanner from '../components/sections/CTABanner';

export default function HomePage() {
  return (
    <Layout transparentHero>
      <Hero />
      <AboutSection />
      <FeaturedExpeditions />
      <CTABanner />
    </Layout>
  );
}
