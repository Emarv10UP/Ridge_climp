import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { expeditionsApi } from '../../services/api';
import { useIntersectionAnimation } from '../../hooks/useIntersectionAnimation';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

function CardSkeleton() {
  return (
    <div className="rounded-card overflow-hidden bg-white border border-border">
      <div className="h-48 w-full animate-pulse bg-border" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-2/3 animate-pulse rounded bg-border" />
        <div className="h-4 w-full animate-pulse rounded bg-border" />
        <div className="h-4 w-1/4 animate-pulse rounded bg-border" />
      </div>
    </div>
  );
}

export default function ExpeditionGrid() {
  const [expeditions, setExpeditions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ref, isVisible] = useIntersectionAnimation();

  useEffect(() => {
    let isMounted = true;
    expeditionsApi
      .getAll()
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
    <section className="py-20 bg-stone-50" ref={ref}>
      <div className="container-page">
        {error && (
          <p className="text-danger text-center mb-8" role="alert">
            Couldn't load expeditions: {error}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

          {!isLoading &&
            expeditions.map((expedition, i) => (
              <motion.div
                key={expedition.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              >
                <Card className="border border-border h-full flex flex-col">
                  <div className="relative">
                    <img
                      src={expedition.imageUrl}
                      alt={expedition.title}
                      className="h-48 w-full object-cover aspect-[4/3]"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge level={expedition.difficulty} />
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-lg text-ink mb-2">
                      {expedition.title}
                    </h3>
                    <p className="text-sm text-ink-secondary flex-1">{expedition.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="primary" size="lg">
            LEARN MORE
          </Button>
        </div>
      </div>
    </section>
  );
}
