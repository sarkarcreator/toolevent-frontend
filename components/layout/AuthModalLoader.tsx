'use client';

import dynamic from 'next/dynamic';
import { useAuth } from './AuthContext';

const LazyAuthModal = dynamic(
  () => import('./AuthModal').then((module) => module.AuthModal),
  { ssr: false, loading: () => null },
);

export function AuthModalLoader() {
  const { isAuthModalOpen } = useAuth();

  if (!isAuthModalOpen) return null;
  return <LazyAuthModal />;
}
