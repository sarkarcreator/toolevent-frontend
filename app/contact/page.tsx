'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, Mail, MapPin, MessageCircle, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

const channels = [
  { icon: Mail, title: 'Email us', value: 'hello@toolbox.events', copy: 'For general questions, partnerships and product support.' },
  { icon: MessageCircle, title: 'Support', value: 'Sunday – Thursday', copy: '9:00 AM – 6:00 PM across GST / EST / GMT.' },
  { icon: MapPin, title: 'Event markets', value: 'USA · UAE · UK', copy: 'Planning workflows designed for multiple regional markets.' },
];

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
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, subject, message }) });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setError(data.error?.message || 'Failed to submit inquiry');
    } catch {
      setError('Network communication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 py-6 sm:py-10">
      <section className="relative overflow-hidden rounded-[32px] bg-[#17191F] px-6 py-11 text-white sm:px-12 sm:py-14 lg:px-16">
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#FF5A36]/20 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#3867FF]/15 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/70"><Sparkles className="h-3.5 w-3.5 text-[#FF7A5C]" /> We’re here to help</span>
            <h1 className="mt-6 text-4xl font-bold leading-[1] tracking-[-0.055em] sm:text-6xl">Let’s make your next event easier to plan.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">Questions about Toolbox.Events, templates, partnerships or a planning workflow? Send us a message and we’ll take it from there.</p>
          </div>
          <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-4 lg:block"><Clock3 className="h-5 w-5 text-[#FF7A5C]" /><p className="mt-3 text-xs font-semibold text-white/70">Typical response</p><p className="mt-1 text-sm font-bold">Within 24 business hours</p></div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {channels.map(({ icon: Icon, title, value, copy }) => (
          <div key={title} className="rounded-3xl border border-[#E7E9EE] bg-white p-6 shadow-[0_10px_30px_rgba(23,25,31,0.04)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF0EB] text-[#FF5A36]"><Icon className="h-5 w-5" /></div>
            <p className="mt-5 text-xs font-semibold text-[#667085]">{title}</p>
            <h2 className="mt-1 text-lg font-bold">{value}</h2>
            <p className="mt-2 text-sm leading-6 text-[#667085]">{copy}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
        <div className="pt-2">
          <span className="text-xs font-bold text-[#FF5A36]">SEND A MESSAGE</span>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Tell us what you’re working on.</h2>
          <p className="mt-5 text-sm leading-6 text-[#667085]">Whether you need help choosing a tool or want to discuss a bigger collaboration, keep it simple. We’ll route your message to the right place.</p>
          <div className="mt-7 space-y-3 text-sm font-semibold"><div className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-[#3867FF]" /> Product & planning questions</div><div className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-[#3867FF]" /> Template & licensing enquiries</div><div className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-[#3867FF]" /> Partnerships & custom solutions</div></div>
          <Link href="/tools" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#17191F] hover:text-[#FF5A36]">Explore free tools <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="rounded-[28px] border border-[#E7E9EE] bg-white p-6 shadow-[0_18px_50px_rgba(23,25,31,0.06)] sm:p-8">
          {submitted ? (
            <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF8F1] text-[#16A34A]"><CheckCircle2 className="h-7 w-7" /></div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight">Message received.</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[#667085]">Thanks for reaching out. Your inquiry has been sent to the Toolbox.Events team.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div><p className="text-xs font-bold text-[#FF5A36]">CONTACT FORM</p><h3 className="mt-1 text-xl font-bold">Start a conversation</h3></div>
              {error && <div className="rounded-2xl border border-[#FFB8AA] bg-[#FFF0EB] px-4 py-3 text-sm font-semibold text-[#B93820]">{error}</div>}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold">Name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="mt-2 w-full rounded-2xl border border-[#E7E9EE] bg-[#F7F8FA] px-4 py-3 text-sm outline-none transition focus:border-[#FF5A36] focus:bg-white" /></label>
                <label className="text-sm font-semibold">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="mt-2 w-full rounded-2xl border border-[#E7E9EE] bg-[#F7F8FA] px-4 py-3 text-sm outline-none transition focus:border-[#FF5A36] focus:bg-white" /></label>
              </div>
              <label className="block text-sm font-semibold">Subject<input required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="How can we help?" className="mt-2 w-full rounded-2xl border border-[#E7E9EE] bg-[#F7F8FA] px-4 py-3 text-sm outline-none transition focus:border-[#FF5A36] focus:bg-white" /></label>
              <label className="block text-sm font-semibold">Message<textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us a little about what you need..." className="mt-2 w-full resize-y rounded-2xl border border-[#E7E9EE] bg-[#F7F8FA] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#FF5A36] focus:bg-white" /></label>
              <button type="submit" disabled={loading} className="w-full rounded-full bg-[#FF5A36] px-5 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#ED4B29] disabled:cursor-not-allowed disabled:opacity-50"><span className="inline-flex items-center justify-center gap-2"><Send className="h-4 w-4" />{loading ? 'Sending...' : 'Send message'}</span></button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
