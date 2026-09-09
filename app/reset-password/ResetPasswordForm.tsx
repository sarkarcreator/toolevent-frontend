'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, KeyRound, ArrowLeft } from 'lucide-react';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (!token) return setError('This reset link is missing its security token.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirm) return setError('Passwords do not match.');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, password }) });
      const data = await res.json();
      if (!res.ok || !data.success) setError(data.error?.message || 'Password reset failed.');
      else setMessage('Your password has been reset successfully. You can now sign in.');
    } catch {
      setError('Unable to reset your password right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
        <div className="mb-7 flex items-center gap-3">
          <Image src="/logo.png" alt="Toolbox.Events" width={52} height={52} className="h-13 w-13 rounded-2xl object-cover" priority />
          <div><p className="text-lg font-extrabold text-slate-900">Toolbox.Events</p><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Secure password reset</p></div>
        </div>
        {message ? (
          <div className="space-y-5 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 className="h-7 w-7" /></div><div><h1 className="text-2xl font-extrabold text-slate-900">Password updated</h1><p className="mt-2 text-sm leading-6 text-slate-500">{message}</p></div><Link href="/" className="inline-flex items-center gap-2 rounded-full bg-[#ff5a36] px-5 py-2.5 text-sm font-bold text-white">Return to Toolbox.Events</Link></div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div><h1 className="text-2xl font-extrabold text-slate-900">Create a new password</h1><p className="mt-2 text-sm leading-6 text-slate-500">Choose a strong password with at least 8 characters.</p></div>
            {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">New password</span><div className="relative"><KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white" /></div></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Confirm password</span><input required type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white" /></label>
            <button disabled={loading} className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50">{loading ? 'Updating...' : 'Reset Password'}</button>
            <Link href="/" className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft className="h-4 w-4" />Back to website</Link>
          </form>
        )}
      </div>
    </main>
  );
}
