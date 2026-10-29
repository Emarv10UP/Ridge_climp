import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { bookingsApi, expeditionsApi } from '../../services/api';
import { bookingFormSchema } from '../../utils/validators';
import { useToast } from '../ui/Toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const PACKAGE_LABELS = { BASIC: 'Basic — $300', PRO: 'Pro — $800', EXTREME: 'Extreme — $1500' };

export default function BookingModal() {
  const { isModalOpen, selectedPackage, closeBookingModal, setLastBookingId } = useBookingStore();
  const { showToast } = useToast();
  const [expeditions, setExpeditions] = useState([]);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: { package: selectedPackage || 'BASIC' },
  });

  // Load expeditions for the dropdown once when modal first opens
  useEffect(() => {
    if (isModalOpen && expeditions.length === 0) {
      expeditionsApi
        .getAll()
        .then((res) => setExpeditions(res.data || []))
        .catch(() => {
          /* dropdown will just show "no expeditions" — non-fatal */
        });
    }
  }, [isModalOpen, expeditions.length]);

  // Sync the package field whenever a different pricing card opens the modal
  useEffect(() => {
    if (selectedPackage) setValue('package', selectedPackage);
  }, [selectedPackage, setValue]);

  const handleClose = () => {
    closeBookingModal();
    setSubmittedBooking(null);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      const res = await bookingsApi.create(data);
      setSubmittedBooking(res.data);
      setLastBookingId(res.data.id);
      showToast('Booking confirmed! Check your email for details.', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose} title="Book Your Expedition">
      {submittedBooking ? (
        <div className="text-center py-4">
          <CheckCircle2 size={48} className="mx-auto text-success mb-4" />
          <h3 className="font-display text-lg text-ink mb-2">Booking Received!</h3>
          <p className="text-ink-secondary mb-1">Your booking ID:</p>
          <p className="font-mono text-sm bg-stone-50 px-3 py-2 inline-block mb-6">
            {submittedBooking.id}
          </p>
          <p className="text-sm text-ink-secondary mb-6">
            We've sent a confirmation to your email. Our team will follow up shortly with next steps.
          </p>
          <Button onClick={handleClose} className="w-full">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="package" className="block text-sm font-medium text-ink mb-1">
              Package
            </label>
            <select
              id="package"
              {...register('package')}
              className="w-full border border-border px-4 py-2.5 text-sm"
              aria-describedby={errors.package ? 'package-error' : undefined}
            >
              {Object.entries(PACKAGE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.package && (
              <p id="package-error" className="text-danger text-xs mt-1">
                {errors.package.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="expeditionId" className="block text-sm font-medium text-ink mb-1">
              Expedition
            </label>
            <select
              id="expeditionId"
              {...register('expeditionId')}
              className="w-full border border-border px-4 py-2.5 text-sm"
              aria-describedby={errors.expeditionId ? 'expedition-error' : undefined}
            >
              <option value="">Select an expedition…</option>
              {expeditions.map((exp) => (
                <option key={exp.id} value={exp.id}>
                  {exp.title}
                </option>
              ))}
            </select>
            {errors.expeditionId && (
              <p id="expedition-error" className="text-danger text-xs mt-1">
                {errors.expeditionId.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-ink mb-1">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              className="w-full border border-border px-4 py-2.5 text-sm"
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-danger text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full border border-border px-4 py-2.5 text-sm"
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-danger text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className="w-full border border-border px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink mb-1">
              Message (optional)
            </label>
            <textarea
              id="message"
              rows={3}
              {...register('message')}
              className="w-full border border-border px-4 py-2.5 text-sm"
            />
          </div>

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Confirm Booking
          </Button>
        </form>
      )}
    </Modal>
  );
}
