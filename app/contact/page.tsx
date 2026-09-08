'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error?.message || 'Failed to submit inquiry');
      }
    } catch {
      setError('Network communication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 py-4 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Support & Partnerships
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch with Our Team
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
          Have questions regarding enterprise template licensing, custom calculator implementations, or regional partnerships?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Direct Contact Channels
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Email Inquiries</strong>
                  <span>hello@toolbox.events</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Live Support Hours</strong>
                  <span>Sunday – Thursday: 9:00 AM – 6:00 PM (GST / EST / GMT)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Operational Hubs</strong>
                  <span>Dubai DIFC • London Mayfair • New York Manhattan</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form (7 cols) */}
        <div className="md:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out. An event systems specialist will respond within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Send an Inquiry</h3>

                {error && (
                  <div className="p-3 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Enterprise Template Inquiry, Partnership"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our computational engines assist your organization?"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Transmit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
