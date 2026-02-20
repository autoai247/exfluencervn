'use client';

import { Clock, X, TrendingUp } from 'lucide-react';

interface SearchHistoryProps {
  history: string[];
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
  popularSearches?: string[];
  language?: 'ko' | 'vi';
}

export default function SearchHistory({
  history,
  onSelect,
  onRemove,
  onClear,
  popularSearches = [],
  language = 'vi',
}: SearchHistoryProps) {
  const text = {
    ko: {
      recentSearches: '최근 검색',
      popularSearches: '인기 검색어',
      clearAll: '전체 삭제',
      noHistory: '최근 검색 기록이 없습니다',
    },
    vi: {
      recentSearches: 'Tìm kiếm gần đây',
      popularSearches: 'Tìm kiếm phổ biến',
      clearAll: 'Xóa tất cả',
      noHistory: 'Không có lịch sử tìm kiếm',
    },
  };

  const t = text[language];

  return (
    <div className="bg-dark-600 rounded-xl border border-dark-500 shadow-xl">
      {/* Recent Searches */}
      {history.length > 0 && (
        <div className="p-4 border-b border-dark-500">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-300">{t.recentSearches}</h3>
            </div>
            <button
              onClick={onClear}
              className="text-xs text-gray-400 hover:text-error transition-colors"
            >
              {t.clearAll}
            </button>
          </div>
          <div className="space-y-1">
            {history.map((query, index) => (
              <div
                key={index}
                className="flex items-center justify-between group hover:bg-dark-500 rounded-lg px-3 py-2 transition-colors"
              >
                <button
                  onClick={() => onSelect(query)}
                  className="flex-1 text-left text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {query}
                </button>
                <button
                  onClick={() => onRemove(query)}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-error transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Searches */}
      {popularSearches.length > 0 && (
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-accent" />
            <h3 className="text-sm font-semibold text-gray-300">{t.popularSearches}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((query, index) => (
              <button
                key={index}
                onClick={() => onSelect(query)}
                className="px-3 py-1.5 bg-dark-700 hover:bg-primary text-gray-300 hover:text-white text-xs rounded-full transition-all"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {history.length === 0 && popularSearches.length === 0 && (
        <div className="p-6 text-center">
          <Clock size={32} className="text-gray-600 mx-auto mb-2" />
          <p className="text-sm text-gray-500">{t.noHistory}</p>
        </div>
      )}
    </div>
  );
}
