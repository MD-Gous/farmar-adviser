'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sprout, MessageCircle, Camera, Mic, BookOpen, FileText, User, LogOut, Home, LayoutDashboard } from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { href: '/dashboard', label: 'dashboard', icon: LayoutDashboard },
  { href: '/chat', label: 'chat', icon: MessageCircle },
  { href: '/diagnosis', label: 'diagnosis', icon: Camera },
  { href: '/voice', label: 'voice', icon: Mic },
  { href: '/advisory', label: 'advisory', icon: BookOpen },
  { href: '/schemes', label: 'schemes', icon: FileText },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, changeLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Sprout size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-green-800 text-base leading-tight">
                {t('appName')}
              </div>
              <div className="text-xs text-green-600 leading-tight">{t('tagline')}</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          {user && (
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive(href)
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                    }`}
                >
                  <Icon size={16} />
                  <span className="capitalize">{t(label as any)}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher language={language} onChange={changeLanguage} compact />

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden md:block">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/auth/login" className="btn-ghost text-sm py-2">
                  {t('login')}
                </Link>
                <Link href="/auth/signup" className="btn-primary text-sm py-2 px-4">
                  {t('signup')}
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              {menuOpen ? <X size={22} className="text-gray-700" /> : <Menu size={22} className="text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-green-100 bg-white px-4 pb-4 pt-2">
          {user ? (
            <>
              <div className="flex items-center gap-3 py-3 border-b border-green-50 mb-2">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors
                    ${isActive(href)
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-green-50'
                    }`}
                >
                  <Icon size={18} />
                  <span className="capitalize">{t(label as any)}</span>
                </Link>
              ))}
              <Link href="/profile" onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium text-gray-700 hover:bg-green-50">
                <User size={18} />
                <span>{t('profile')}</span>
              </Link>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                <span>{t('logout')}</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="btn-secondary w-full">
                {t('login')}
              </Link>
              <Link href="/auth/signup" onClick={() => setMenuOpen(false)} className="btn-primary w-full">
                {t('signup')}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
