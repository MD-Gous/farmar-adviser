'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageCircle, Camera, Mic, BookOpen } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const items = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'dashboard' },
  { href: '/chat', icon: MessageCircle, label: 'chat' },
  { href: '/diagnosis', icon: Camera, label: 'diagnosis' },
  { href: '/voice', icon: Mic, label: 'voice' },
  { href: '/advisory', icon: BookOpen, label: 'advisory' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 shadow-lg z-40">
      <div className="flex items-center justify-around px-2 py-1">
        {items.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors min-w-[60px]
                ${active ? 'text-green-600' : 'text-gray-500'}`}
            >
              <div className={`p-1.5 rounded-lg ${active ? 'bg-green-100' : ''}`}>
                <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              </div>
              <span className={`text-[10px] font-medium capitalize ${active ? 'text-green-600' : 'text-gray-500'}`}>
                {t(label as any)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
