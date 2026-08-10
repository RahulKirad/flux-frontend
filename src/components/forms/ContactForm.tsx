import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { leadsApi } from '../../services/api';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface ContactFormProps {
  source?: string;
  serviceId?: number;
  serviceSlug?: string;
  serviceName?: string;
  title?: string;
  compact?: boolean;
  variant?: 'default' | 'stitch';
}

export default function ContactForm({
  source = 'contact_form',
  serviceId,
  serviceSlug,
  serviceName,
  title,
  compact,
  variant = 'default',
}: ContactFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isStitch = variant === 'stitch';
  const isServiceInquiry = Boolean(serviceName);
  const messagePlaceholder = isServiceInquiry
    ? `Tell us about your ${serviceName} requirements, timeline, and project scope...`
    : 'How can we help you?';

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      await leadsApi.create({
        ...data,
        source,
        service_id: serviceId && serviceId > 0 ? serviceId : undefined,
        service_slug: serviceSlug,
        service_name: serviceName,
      });
      setSubmitted(true);
      reset();
    } catch {
      alert('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${isStitch ? 'text-kinetic-primary' : 'text-green-500'}`} />
        <h3 className={`text-xl font-semibold mb-2 ${isStitch ? 'text-kinetic-primary uppercase tracking-wide' : 'text-gray-900'}`}>
          Thank You!
        </h3>
        <p className={isStitch ? 'text-kinetic-on-surface-variant' : 'text-gray-600'}>
          {isServiceInquiry
            ? `We've received your ${serviceName} consultation request and will contact you shortly.`
            : "We've received your inquiry and will contact you shortly."}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className={`mt-4 font-medium hover:underline ${isStitch ? 'text-kinetic-primary text-xs uppercase tracking-widest' : 'text-primary-500'}`}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const labelClass = isStitch
    ? 'block text-xs font-semibold uppercase tracking-wider text-kinetic-secondary mb-1'
    : 'block text-sm font-medium text-gray-700 mb-1';

  const inputClass = isStitch
    ? 'stitch-input'
    : 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none';

  const textareaClass = isStitch
    ? 'stitch-textarea'
    : 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none';

  return (
    <div className={compact || isStitch ? '' : 'bg-white rounded-2xl shadow-lg p-6 lg:p-8'}>
      {title && (
        <h3 className={`mb-6 ${isStitch ? 'text-kinetic-primary font-bold uppercase tracking-wide' : 'text-xl font-bold text-gray-900'}`}>
          {title}
        </h3>
      )}
      {isServiceInquiry && (
        <div className="mb-6 border border-kinetic-outline-variant bg-white px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-kinetic-secondary mb-1">Service</p>
          <p className="text-kinetic-primary font-semibold uppercase">{serviceName}</p>
          <p className="text-kinetic-on-surface-variant text-sm mt-2 leading-relaxed">
            This request will be routed to our {serviceName} team.
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {isStitch ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input {...register('name', { required: 'Name is required' })} className={inputClass} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Company</label>
                <input {...register('company')} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Email Address *</label>
                <input type="email" {...register('email', { required: 'Email is required' })} className={inputClass} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input {...register('phone')} className={inputClass} />
              </div>
            </div>
          </>
        ) : (
          <div className={compact ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
            <div>
              <label className={labelClass}>Full Name *</label>
              <input {...register('name', { required: 'Name is required' })} className={inputClass} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input type="email" {...register('email', { required: 'Email is required' })} className={inputClass} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input {...register('phone')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Company</label>
              <input {...register('company')} className={inputClass} />
            </div>
          </div>
        )}
        <div>
          <label className={labelClass}>
            {isServiceInquiry ? `${serviceName} Project Details *` : isStitch ? 'Project Details *' : 'Message *'}
          </label>
          <textarea
            {...register('message', { required: 'Message is required' })}
            rows={4}
            className={textareaClass}
            placeholder={messagePlaceholder}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={
            isStitch
              ? 'stitch-btn-primary w-full disabled:opacity-50 tracking-[0.2em]'
              : 'btn-primary w-full md:w-auto disabled:opacity-50'
          }
        >
          {isStitch ? (
            loading ? 'Submitting...' : isServiceInquiry ? `Submit ${serviceName} Request` : 'Submit Request'
          ) : (
            <>
              <ArrowRight size={18} className="mr-2" />
              {loading ? 'Sending...' : 'Submit Inquiry'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
