'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import homeServices from '@/data/homeServices';

const easing = [0.22, 1, 0.36, 1] as const;

const features = [
  'Complimentary Digital Smile Design',
  'Concierge Patient Coordination',
  'Luxury Clinic Amenities',
];

export const FinalCTA: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    const digitsOnly = phone.replace(/[^\d]/g, '');
    if (digitsOnly.length < 7) {
      setValidationError('Please enter a valid phone number.');
      return;
    }
    if (!service) {
      setValidationError('Please select a service.');
      return;
    }

    setIsSubmitting(true);

    const params = new URLSearchParams();
    params.set('name', fullName.trim());
    params.set('phone', phone.trim());
    params.set('service', service);

    router.push(`/contact?${params.toString()}`);
  };

  return (
    <section className="w-full bg-[#003b1b] text-white py-16 md:py-20 relative overflow-hidden">
      {/* Subtle Background Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Headline & Feature List */}
          <div className="lg:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white"
            >
              Begin Your Journey to a <span className="italic font-normal">Radiant</span> New You.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easing }}
              className="font-sans text-sm sm:text-base text-white/80 mb-8 max-w-md"
            >
              Book a personalized consultation today and discover why we are the preferred choice
              for cosmetic excellence.
            </motion.p>

            {/* Feature Checkmarks */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
              className="space-y-4"
            >
              {features.map((feature) => (
                <motion.li
                  key={feature}
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easing } } }}
                  className="flex items-center font-sans text-sm sm:text-base text-white/90"
                >
                  <span className="bg-[#b1f2be] text-[#003b1b] p-1 rounded-full w-5 h-5 flex items-center justify-center mr-3 shrink-0">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right Column: White Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easing }}
            className="lg:col-span-6"
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-[var(--color-dark-text)] max-w-lg ml-auto w-full">
              <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-6">
                Request Consultation
              </h3>

              <form onSubmit={handleSubmit} noValidate>
                {/* 2-Column Top Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="fullName" className="sr-only">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-[#f6f3f2] p-3.5 rounded-xl border border-transparent text-sm w-full focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-dark-text)] placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-[#f6f3f2] p-3.5 rounded-xl border border-transparent text-sm w-full focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-dark-text)] placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Service Selector */}
                <div className="mb-6">
                  <label htmlFor="service" className="sr-only">
                    Interested Service
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="bg-[#f6f3f2] p-3.5 rounded-xl border border-transparent text-sm w-full mb-0 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-dark-text)]"
                  >
                    <option value="" disabled>
                      Interested Service
                    </option>
                    {homeServices.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </div>

                {/* Validation Errors */}
                {validationError && (
                  <span className="text-xs font-bold font-sans text-red-600 block mb-4">
                    ⚠ {validationError}
                  </span>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#003b1b] hover:bg-black text-white py-4 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Request'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-center text-gray-400 mt-4">
                  Our patient coordinator will contact you within 24 hours.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
