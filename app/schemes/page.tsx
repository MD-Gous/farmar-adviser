'use client';

import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { FileText, ExternalLink, Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { GOVT_SCHEMES } from '@/lib/constants';

const categories = ['All', 'Income Support', 'Insurance', 'Credit', 'Market', 'Technology'];

export default function SchemesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = GOVT_SCHEMES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  const colorMap: Record<string, string> = {
    green: 'bg-green-50 border-green-200 text-green-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    teal: 'bg-teal-50 border-teal-200 text-teal-700',
    brown: 'bg-amber-50 border-amber-200 text-amber-700',
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('govtSchemes')}</h1>
              <p className="text-gray-500 text-sm">Central government schemes for Indian farmers</p>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💰</span>
            <div>
              <h3 className="font-bold text-lg mb-1">You May Be Eligible for Benefits!</h3>
              <p className="text-amber-100 text-sm">
                Explore government schemes for income support, crop insurance, credit, and market access.
                Most schemes are free — apply at your nearest Krishi Bhavan.
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search government schemes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-white"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Schemes List */}
        <div className="space-y-4">
          {filtered.map(scheme => {
            const isOpen = expanded === scheme.id;
            const colorClass = colorMap[scheme.color] || colorMap.green;

            return (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full text-left p-5"
                  onClick={() => setExpanded(isOpen ? null : scheme.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border flex-shrink-0 ${colorClass}`}>
                      {scheme.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-gray-900 text-base">{scheme.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colorClass}`}>
                              {scheme.amount}
                            </span>
                          </div>
                          <p className="text-sm text-green-700 font-medium">{scheme.fullName}</p>
                        </div>
                        <div className="flex-shrink-0 mt-1">
                          {isOpen ? (
                            <ChevronUp size={18} className="text-gray-400" />
                          ) : (
                            <ChevronDown size={18} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">{scheme.description}</p>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-green-50 pt-4 space-y-3">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Eligibility</h4>
                        <p className="text-sm text-gray-700">{scheme.eligibility}</p>
                      </div>
                      <div className="bg-amber-50 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Ministry</h4>
                        <p className="text-sm text-gray-700">{scheme.ministry}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a
                        href={scheme.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
                      >
                        Apply Online <ExternalLink size={14} />
                      </a>
                      <a
                        href={`/chat?q=Tell me more about ${scheme.fullName} scheme`}
                        className="flex items-center justify-center gap-2 border-2 border-green-600 text-green-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-50 transition-colors"
                      >
                        🤖 Ask AI About This
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-medium">No schemes found for &quot;{search}&quot;</p>
            <button onClick={() => setSearch('')} className="text-green-600 text-sm mt-2 underline">
              Clear search
            </button>
          </div>
        )}

        {/* Bottom note */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-800">
            📍 <strong>Visit your nearest Krishi Bhavan</strong> for offline applications and guidance on government agricultural schemes.
            You can also call the <strong>Kisan Call Centre: 1800-180-1551</strong> (toll-free).
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
