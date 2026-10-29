import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import BookingModal from '../components/sections/BookingModal';
import CTABanner from '../components/sections/CTABanner';
import { expeditionsApi } from '../services/api';
import { useBookingStore } from '../store/bookingStore';

export default function ExpeditionDetailPage() {
  const { slug } = useParams();
  const [expedition, setExpedition] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | found | not-found | error
  const openBookingModal = useBookingStore((s) => s.openBookingModal);

  useEffect(() => {
    let isMounted = true;
    setStatus('loading');
    expeditionsApi
      .getBySlug(slug)
      .then((res) => {
        if (!isMounted) return;
        setExpedition(res.data);
        setStatus('found');
      })
      .catch((err) => {
        if (!isMounted) return;
        setStatus(err.status === 404 ? 'not-found' : 'error');
      });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (status === 'loading') {
    return (
      <Layout>
        <div className="pt-32 pb-20 container-page">
          <div className="h-72 w-full animate-pulse rounded-card bg-border mb-8" />
          <div className="h-8 w-1/2 animate-pulse rounded bg-border mb-4" />
          <div className="h-4 w-full animate-pulse rounded bg-border mb-2" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-border" />
        </div>
      </Layout>
    );
  }

  if (status === 'not-found' || status === 'error') {
    return (
      <Layout>
        <div className="pt-32 pb-20 container-page text-center">
          <h1 className="font-display text-2xl text-ink mb-4">
            {status === 'not-found' ? 'Expedition not found' : 'Something went wrong'}
          </h1>
          <p className="text-ink-secondary mb-8">
            {status === 'not-found'
              ? "We couldn't find an expedition at this address."
              : 'Please try again in a moment.'}
          </p>
          <Link to="/expeditions">
            <Button variant="primary">Back to Expeditions</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-28">
        <div className="container-page">
          <Link
            to="/expeditions"
            className="inline-flex items-center gap-2 text-sm text-ridge font-medium mb-6"
          >
            <ArrowLeft size={16} />
            Back to Expeditions
          </Link>
        </div>

        <div className="container-page mb-10">
          <img
            src={expedition.imageUrl}
            alt={expedition.title}
            className="w-full h-64 sm:h-96 object-cover"
            style={{ clipPath: 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)' }}
          />
        </div>

        <div className="container-page grid grid-cols-1 lg:grid-cols-3 gap-12 pb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <Badge level={expedition.difficulty} />
              <span className="font-mono-label text-xs text-ink-secondary">{expedition.duration}</span>
            </div>
            <h1 className="font-display text-3xl text-ink mb-4">{expedition.title}</h1>
            <p className="text-ink-secondary leading-relaxed mb-8">{expedition.description}</p>

            <h2 className="font-display text-xl text-ink mb-3">What's Included</h2>
            <ul className="text-ink-secondary space-y-2 list-disc list-inside">
              <li>Expert guide services and permits</li>
              <li>Accommodation and most meals during the expedition</li>
              <li>Group climbing and safety equipment</li>
              <li>24/7 support from our base camp team</li>
            </ul>
          </div>

          <div>
            <div className="border border-border p-6 sticky top-28">
              <p className="font-mono-label text-xs text-ink-secondary mb-1">Starting From</p>
              <p className="font-display text-3xl text-navy mb-6">
                ${expedition.price}
              </p>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => openBookingModal('PRO')}
              >
                Book This Expedition
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CTABanner />
      <BookingModal />
    </Layout>
  );
}
