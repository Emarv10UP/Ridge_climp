import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { expeditionsApi } from '../../services/api';
import { useIntersectionAnimation } from '../../hooks/useIntersectionAnimation';
import Card from '../ui/Card';
import Button from '../ui/Button';

function ExpeditionCardSkeleton() {
  return (
    <div className="rounded-card overflow-hidden bg-white">
      <div className="h-56 w-full animate-pulse bg-border" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-2/3 animate-pulse rounded bg-border" />
        <div className="h-4 w-full animate-pulse rounded bg-border" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-border" />
      </div>
    </div>
  );
}

export default function FeaturedExpeditions() {
  const [expeditions, setExpeditions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ref, isVisible] = useIntersectionAnimation();

  useEffect(() => {
    let isMounted = true;
    expeditionsApi
      .getFeatured()
      .then((res) => {
        if (isMounted) setExpeditions(res.data || []);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Failed to load expeditions');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container-page text-center">
        <span className="font-mono-label text-glacier-dark text-xs">Where We Go</span>
        <h2 className="font-display text-3xl text-ink mt-2 mb-3">Featured Expeditions</h2>
        <p className="text-ink-secondary mb-12">
          Explore our most popular climbing destinations around the world
        </p>

        {error && (
          <p className="text-danger mb-8" role="alert">
            Couldn't load expeditions: {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => <ExpeditionCardSkeleton key={i} />)}

          {!isLoading &&
            expeditions.map((expedition, i) => (
              <motion.div
                key={expedition.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card>
                  <img
                    src={expedition.imageUrl}
                    alt={expedition.title}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <h3 className="font-display text-lg text-ink mb-2">
                      {expedition.title}
                    </h3>
                    <p className="text-sm text-ink-secondary mb-4 line-clamp-3">
                      {expedition.description}
                    </p>
                    <Link
                      to={`/expeditions/${expedition.slug}`}
                      className="inline-block"
                    >
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
        </div>

        <div className="mt-12">
          <Link to="/expeditions">
            <Button variant="outline" size="lg">
              View All Expeditions
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
