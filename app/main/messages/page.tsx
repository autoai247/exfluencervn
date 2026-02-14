'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MessageCircle, Clock } from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatTimeAgo } from '@/lib/utils';

interface Message {
  id: string;
  conversationId: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    type: 'influencer' | 'advertiser';
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  unreadCount?: number;
}

// Mock data
const mockMessages: Message[] = [
  {
    id: '1',
    conversationId: '1',
    sender: {
      id: '1',
      name: 'K-Beauty Co.',
      avatar: 'https://ui-avatars.com/api/?name=K-Beauty&background=FF6B6B&color=fff',
      type: 'advertiser',
    },
    lastMessage: '캠페인 진행 상황이 어떠신가요? 중간 결과물을 먼저 확인해보고 싶습니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15분 전
    unread: true,
    unreadCount: 2,
  },
  {
    id: '2',
    conversationId: '2',
    sender: {
      id: '2',
      name: 'Tech Store',
      avatar: 'https://ui-avatars.com/api/?name=Tech+Store&background=6C5CE7&color=fff',
      type: 'advertiser',
    },
    lastMessage: '언박싱 영상 잘 봤습니다! 정말 퀄리티가 좋네요. 다음 제품도 부탁드립니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2시간 전
    unread: false,
  },
  {
    id: '3',
    conversationId: '3',
    sender: {
      id: '3',
      name: 'Food Paradise',
      avatar: 'https://ui-avatars.com/api/?name=Food+Paradise&background=4ECDC4&color=fff',
      type: 'advertiser',
    },
    lastMessage: '레스토랑 방문 일정을 조율하고 싶어요. 다음 주 언제 시간 되시나요?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1일 전
    unread: true,
    unreadCount: 1,
  },
  {
    id: '4',
    conversationId: '4',
    sender: {
      id: '4',
      name: 'FitLife App',
      avatar: 'https://ui-avatars.com/api/?name=FitLife&background=00B894&color=fff',
      type: 'advertiser',
    },
    lastMessage: '네, 괜찮습니다. 그럼 그렇게 진행해주세요!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2일 전
    unread: false,
  },
  {
    id: '5',
    conversationId: '5',
    sender: {
      id: '5',
      name: 'Cafe Mocha',
      avatar: 'https://ui-avatars.com/api/?name=Cafe+Mocha&background=FFA502&color=fff',
      type: 'advertiser',
    },
    lastMessage: '신메뉴 출시 일정이 연기되었습니다. 다시 연락드리겠습니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3일 전
    unread: false,
  },
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userType] = useState<'influencer' | 'advertiser'>('influencer'); // TODO: Get from auth context

  const filteredMessages = mockMessages.filter((message) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      message.sender.name.toLowerCase().includes(query) ||
      message.lastMessage.toLowerCase().includes(query)
    );
  });

  const unreadCount = mockMessages.filter((m) => m.unread).length;

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <MobileHeader
        title="메시지"
        rightAction={
          unreadCount > 0 ? (
            <div className="px-3 py-1 bg-primary rounded-full">
              <span className="text-xs font-semibold text-white">{unreadCount}개</span>
            </div>
          ) : undefined
        }
      />

      {/* Search Bar */}
      <div className="sticky top-14 z-20 bg-dark-700 border-b border-dark-500 p-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="메시지 검색..."
            className="input pl-12 pr-4"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="container-mobile">
        {filteredMessages.length > 0 ? (
          <div className="divide-y divide-dark-500">
            {filteredMessages.map((message) => (
              <Link
                key={message.id}
                href={`/main/messages/${message.conversationId}`}
                className="block"
              >
                <div className={`px-4 py-4 hover:bg-dark-600 transition-colors ${
                  message.unread ? 'bg-dark-600/50' : ''
                }`}>
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={message.sender.avatar}
                        alt={message.sender.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {message.unread && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {message.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold truncate ${
                          message.unread ? 'text-white' : 'text-gray-300'
                        }`}>
                          {message.sender.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0 ml-2">
                          <Clock size={12} />
                          {formatTimeAgo(message.timestamp)}
                        </div>
                      </div>
                      <p className={`text-sm line-clamp-2 ${
                        message.unread ? 'text-gray-300 font-medium' : 'text-gray-400'
                      }`}>
                        {message.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <MessageCircle size={48} className="text-gray-600 mb-4" />
            <p className="text-gray-400 text-center">
              {searchQuery ? '검색 결과가 없습니다' : '메시지가 없습니다'}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav userType={userType} />
    </div>
  );
}
