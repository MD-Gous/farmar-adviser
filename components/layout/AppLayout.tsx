'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import { useAuth } from '@/hooks/useAuth';

interface AppLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AppLayout({ children, requireAuth = true }: AppLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, requireAuth, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-3xl">🌾</span>
          </div>
          <p className="text-green-700 font-medium">Loading Farmers Adviser...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) return null;

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
      {user && <BottomNav />}
    </div>
  );
}
