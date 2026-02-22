'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MessageCircle,
  Search,
  Clock,
  CheckCheck,
  Image as ImageIcon,
  Paperclip,
  Star,
  AlertCircle,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatCompactNumber } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useMessages } from '@/contexts/MessageContext';

const getTimeLabel = (timestamp: Date, t: any) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return t.common.justNow;
  if (minutes < 60) return `${minutes}${t.common.minutesAgo}`;
  if (hours < 24) return `${hours}${t.common.hoursAgo}`;
  if (days === 1) return t.common.yesterday;
  if (days < 7) return `${days}${t.common.daysAgo}`;
  return `${Math.floor(days / 7)}${t.common.weeksAgo}`;
};

export default function MessagesPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { conversations } = useMessages();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'advertiser' | 'support'>('all');

  const filteredConversations = conversations.filter((conv) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !conv.name.toLowerCase().includes(query) &&
        !conv.campaignTitle.toLowerCase().includes(query) &&
        !conv.lastMessage.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Type filter
    if (filter === 'unread' && conv.unreadCount === 0) return false;
    if (filter === 'advertiser' && conv.type !== 'advertiser') return false;
    if (filter === 'support' && conv.type !== 'support') return false;

    return true;
  });

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700/90 backdrop-blur-md border-b border-dark-400/40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="btn-icon text-white">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">{t.messages.title}</h1>
              {totalUnread > 0 && (
                <p className="text-xs text-gray-400">{totalUnread} {t.messages.unread.replace('📬 ', '').toLowerCase()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder={t.messages.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark-600/80 backdrop-blur-sm border border-dark-400/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {[
            { id: 'all', label: t.messages.allMessages, count: conversations.length },
            { id: 'unread', label: t.messages.unread, count: totalUnread },
            { id: 'advertiser', label: t.messages.brands, count: conversations.filter(c => c.type === 'advertiser').length },
            { id: 'support', label: t.messages.support, count: conversations.filter(c => c.type === 'support').length },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`flex-shrink-0 px-4 py-2 rounded-2xl font-semibold text-sm transition-all ${
                filter === item.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                  : 'bg-dark-600/80 text-gray-400 border border-dark-400/40'
              }`}
            >
              {item.label} ({item.count})
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="container-mobile py-4">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle size={48} className="text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 mb-1">{t.messages.noMessages}</p>
            <p className="text-sm text-gray-500">{t.messages.noMessagesDesc}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredConversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/main/influencer/messages/${conv.id}`}
                className="block"
              >
                <div className={`bg-dark-600/80 backdrop-blur-sm border rounded-2xl p-4 shadow-xl hover:bg-dark-500/70 transition-all ${
                  conv.unreadCount > 0
                    ? 'border-primary/40 border-l-4 border-l-primary'
                    : 'border-dark-400/40'
                }`}>
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      {conv.avatar ? (
                        <img
                          src={conv.avatar}
                          alt={conv.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-dark-400/40"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <MessageCircle size={24} className="text-white" />
                        </div>
                      )}
                      {conv.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-dark-700"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold text-sm truncate ${
                            conv.unreadCount > 0 ? 'text-white' : 'text-gray-300'
                          }`}>
                            {conv.name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">{conv.campaignTitle}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 ml-2">
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {getTimeLabel(conv.timestamp, t)}
                          </span>
                          {conv.unreadCount > 0 && (
                            <div className="w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{conv.unreadCount}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Message Status Icon */}
                        {conv.unreadCount === 0 && (
                          <div>
                            {conv.messageStatus === 'read' && (
                              <CheckCheck size={14} className="text-primary flex-shrink-0" />
                            )}
                            {conv.messageStatus === 'delivered' && (
                              <CheckCheck size={14} className="text-gray-500 flex-shrink-0" />
                            )}
                            {conv.messageStatus === 'sent' && (
                              <CheckCheck size={14} className="text-gray-600 flex-shrink-0" />
                            )}
                          </div>
                        )}

                        {/* Attachment Icon */}
                        {conv.hasAttachment && (
                          <Paperclip size={14} className="text-gray-500 flex-shrink-0" />
                        )}

                        {/* Last Message */}
                        <p className={`text-sm truncate flex-1 ${
                          conv.unreadCount > 0 ? 'text-white font-medium' : 'text-gray-400'
                        }`}>
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <BottomNav userType="influencer" />
    </div>
  );
}
