import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="flex min-h-[70vh] items-center justify-center py-12"><div className="text-sm font-semibold text-slate-500">Loading secure reset page...</div></main>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
