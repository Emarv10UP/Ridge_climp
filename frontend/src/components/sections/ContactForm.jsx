import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { inquiriesApi } from '../../services/api';
import { contactFormSchema } from '../../utils/validators';
import { useToast } from '../ui/Toast';
import { BRAND } from '../../constants/brand';
import Button from '../ui/Button';

const CONTACT_DETAILS = [
  { icon: MapPin, label: 'Office Address', content: BRAND.address },
  { icon: Phone, label: 'Phone', content: BRAND.phone, href: BRAND.phoneHref },
  { icon: Mail, label: 'Email', content: BRAND.email, href: BRAND.emailHref },
  { icon: Clock, label: 'Office Hours', content: 'Mon–Fri 9:00–6:00, Sat 10:00–4:00, Sunday closed' },
];

export default function ContactForm() {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (data) => {
    try {
      await inquiriesApi.create(data);
      showToast("Your inquiry has been sent! We'll respond within 24 hours.", 'success');
      reset();
    } catch (err) {
      showToast(err.message || 'Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* Form */}
        <div>
          <h2 className="font-display text-3xl text-ink mb-2">Contact Us</h2>
          <p className="text-ink-secondary mb-8">
            Get in touch with our team to start planning your next mountain adventure
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-ink mb-1">
                Full name*
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                className="w-full border border-border px-4 py-2.5 text-sm"
                aria-required="true"
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
                Email Address*
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full border border-border px-4 py-2.5 text-sm"
                aria-required="true"
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
                Message*
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message')}
                placeholder="Tell us about your expedition goals, experience level, and any questions you have…"
                className="w-full border border-border px-4 py-2.5 text-sm"
                aria-required="true"
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-danger text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button type="submit" isLoading={isSubmitting} className="w-full">
              Send Inquiry
            </Button>
          </form>
        </div>

        {/* Contact info */}
        <div>
          <h2 className="font-display text-3xl text-ink mb-2">Get in Touch</h2>
          <p className="text-ink-secondary mb-8">
            Our team is here to answer your questions and help you plan the perfect expedition.
            Reach out through any of the channels below.
          </p>

          <div className="space-y-5">
            {CONTACT_DETAILS.map(({ icon: Icon, label, content, href }) => (
              <div key={label} className="flex items-start gap-4 bg-stone-50 p-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy text-white"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}
                >
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-mono-label text-xs text-ink-secondary mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm text-ink hover:text-ridge">
                      {content}
                    </a>
                  ) : (
                    <p className="text-sm text-ink">{content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
