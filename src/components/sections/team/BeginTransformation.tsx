'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Loader } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Container from '@/components/ui/Container';
import { services } from '@/data/services';

const statCards = [
  { value: '98%', label: 'Patient Satisfaction' },
  { value: '15k+', label: 'Smiles Performed' },
];

interface FormState {
  fullName: string;
  email: string;
  serviceInterest: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  serviceInterest?: string;
}

const INITIAL_FORM: FormState = {
  fullName: '',
  email: '',
  serviceInterest: '',
  message: '',
};

export const BeginTransformation: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.serviceInterest) {
      nextErrors.serviceInterest = 'Please select a service.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          serviceInterest: formData.serviceInterest,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit request.');
      }

      setSubmitted(true);
      setFormData(INITIAL_FORM);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setErrors({ fullName: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-24 bg-bg overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Copy + Stat Cards */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-5 text-left"
          >
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-gray-900 leading-tight mb-4">
              Begin Your Transformation
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans font-normal mb-10 max-w-md">
              Schedule a private consultation with our specialists to explore your options. No
              obligations, just expert insight.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {statCards.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl px-6 py-5 shadow-card border border-slate-100 text-left"
                >
                  <p className="font-serif font-bold text-3xl text-[#003b1b]">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="text-xs text-gray-500 font-sans font-semibold mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Form Box */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-card border border-slate-100 text-left">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="transformation-form"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5 font-sans"
                  >
                    {/* Full Name */}
                    <div className="flex flex-col items-start w-full">
                      <label
                        htmlFor="transformation-name"
                        className="text-xs font-bold uppercase text-gray-900 mb-2"
                      >
                        Full Name *
                      </label>
                      <div className="relative w-full">
                        <input
                          id="transformation-name"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Your Name"
                          className={`w-full px-4 py-3 rounded-xl bg-[#F0F0F0] border text-sm text-gray-900 font-sans placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300 pr-10 ${
                            errors.fullName ? 'border-accent/40 focus:ring-accent' : 'border-transparent'
                          }`}
                        />
                        {formData.fullName.trim().length >= 2 && (
                          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 flex items-center justify-center pointer-events-none animate-fade-in">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      {errors.fullName && (
                        <span className="text-xs text-accent mt-1">{errors.fullName}</span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col items-start w-full">
                      <label
                        htmlFor="transformation-email"
                        className="text-xs font-bold uppercase text-gray-900 mb-2"
                      >
                        Email Address *
                      </label>
                      <div className="relative w-full">
                        <input
                          id="transformation-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className={`w-full px-4 py-3 rounded-xl bg-[#F0F0F0] border text-sm text-gray-900 font-sans placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300 pr-10 ${
                            errors.email ? 'border-accent/40 focus:ring-accent' : 'border-transparent'
                          }`}
                        />
                        {formData.email.trim().length > 0 && /\S+@\S+\.\S+/.test(formData.email) && (
                          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 flex items-center justify-center pointer-events-none animate-fade-in">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      {errors.email && (
                        <span className="text-xs text-accent mt-1">{errors.email}</span>
                      )}
                    </div>

                    {/* Interested Service */}
                    <div className="flex flex-col items-start w-full">
                      <label
                        htmlFor="transformation-service"
                        className="text-xs font-bold uppercase text-gray-900 mb-2"
                      >
                        Interested Service *
                      </label>
                      <div className="relative w-full">
                        <select
                          id="transformation-service"
                          value={formData.serviceInterest}
                          onChange={(e) =>
                            setFormData({ ...formData, serviceInterest: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-[#F0F0F0] border border-transparent text-sm text-gray-900 font-sans focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300 cursor-pointer pr-10"
                        >
                          <option value="">Select a service</option>
                          {services.map((srv) => (
                            <option key={srv.id} value={srv.title}>
                              {srv.title}
                            </option>
                          ))}
                        </select>
                        {formData.serviceInterest && (
                          <span className="absolute right-8 top-1/2 -translate-y-1/2 text-emerald-600 flex items-center justify-center pointer-events-none animate-fade-in">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      {errors.serviceInterest && (
                        <span className="text-xs text-accent mt-1">{errors.serviceInterest}</span>
                      )}
                    </div>

                    {/* Your Message */}
                    <div className="flex flex-col items-start w-full">
                      <label
                        htmlFor="transformation-message"
                        className="text-xs font-bold uppercase text-gray-900 mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="transformation-message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your goals..."
                        className="w-full px-4 py-3 rounded-xl bg-[#F0F0F0] border border-transparent text-sm text-gray-900 font-sans placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-[#003b1b] hover:bg-emerald-900 text-white font-bold rounded-full text-xs disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors cursor-pointer mt-2 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" /> Sending Request...
                        </>
                      ) : (
                        'Send Request'
                      )}
                    </button>

                    <p className="text-[10px] text-gray-500 leading-relaxed text-center">
                      By submitting, you agree to our privacy policy and terms of service.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="transformation-success"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-gray-900 mb-3">
                      Request Received!
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-sans font-normal mb-6 max-w-sm">
                      Thank you. Our patient coordinator will reach out within 24 business hours to
                      schedule your private consultation.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Send Another Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default BeginTransformation;
