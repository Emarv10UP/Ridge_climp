import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Accessible modal: closes on Escape, traps initial focus on the close
 * button, locks body scroll while open, and renders via portal so it
 * isn't clipped by parent overflow/stacking contexts.
 */
export default function Modal({ isOpen, onClose, title, children }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        role="presentation"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-card bg-white p-6 sm:p-8 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 id="modal-title" className="font-display text-xl font-bold text-ink">
              {title}
            </h2>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-full p-2 text-ink-secondary hover:bg-stone-50"
            >
              <X size={20} />
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
