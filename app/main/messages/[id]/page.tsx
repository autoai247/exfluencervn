'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Send, Paperclip } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Mock conversation data
const mockConversation = {
  id: '1',
  recipient: {
    id: '1',
    name: 'K-Beauty Co.',
    avatar: 'https://ui-avatars.com/api/?name=K-Beauty&background=FF6B6B&color=fff',
    type: 'advertiser' as const,
  },
  messages: [
    {
      id: '1',
      sender: 'other',
      text: '안녕하세요! 캠페인에 관심 가져주셔서 감사합니다.',
      timestamp: '2024-02-13 10:00',
    },
    {
      id: '2',
      sender: 'me',
      text: '네, 관심있습니다. 자세한 내용 알려주시겠어요?',
      timestamp: '2024-02-13 10:05',
    },
    {
      id: '3',
      sender: 'other',
      text: '네, 우선 제품을 무료로 보내드리고, 인스타그램 피드 포스트 1개와 스토리 3개를 요청드립니다.',
      timestamp: '2024-02-13 10:10',
    },
    {
      id: '4',
      sender: 'me',
      text: '알겠습니다. 제품은 언제 받을 수 있을까요?',
      timestamp: '2024-02-13 10:15',
    },
    {
      id: '5',
      sender: 'other',
      text: '캠페인 진행 상황이 어떠신가요? 중간 결과물을 먼저 확인해보고 싶습니다.',
      timestamp: '2024-02-13 14:30',
    },
  ],
};

export default function MessageDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { language } = useLanguage();
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(mockConversation.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      id: String(messages.length + 1),
      sender: 'me' as const,
      text: messageText,
      timestamp: new Date().toLocaleString(language === 'ko' ? 'ko-KR' : 'vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  return (
    <div className="min-h-screen bg-dark-700 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <img
            src={mockConversation.recipient.avatar}
            alt={mockConversation.recipient.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-base font-bold text-white">
              {mockConversation.recipient.name}
            </h1>
            <p className="text-xs text-gray-400">{language === 'ko' ? '온라인' : 'Trực tuyến'}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] ${
                message.sender === 'me'
                  ? 'bg-primary text-white'
                  : 'bg-dark-600 text-gray-100'
              } rounded-2xl px-4 py-3`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'me' ? 'text-primary-light' : 'text-gray-500'
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-dark-700 border-t border-dark-500 p-4">
        <form onSubmit={handleSend} className="space-y-2">
          {/* File Upload Button - 명확하게 표시 */}
          <button
            type="button"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.multiple = true; // ⚡ 다중 선택 가능!
              input.accept = 'image/*,video/*,application/pdf,.doc,.docx';
              input.onchange = (e: any) => {
                const files = Array.from(e.target.files) as File[];
                if (files.length === 0) return;

                // 용량 체크 (파일당 10MB, 전체 50MB 제한)
                const maxFileSize = 10 * 1024 * 1024; // 10MB
                const maxTotalSize = 50 * 1024 * 1024; // 50MB

                const oversizedFiles = files.filter(f => f.size > maxFileSize);
                if (oversizedFiles.length > 0) {
                  alert(language === 'ko'
                    ? `⚠️ 파일당 최대 10MB까지 업로드 가능합니다.\n\n초과 파일:\n${oversizedFiles.map(f => `• ${f.name} (${(f.size / 1024 / 1024).toFixed(1)}MB)`).join('\n')}`
                    : `⚠️ Tối đa 10MB mỗi tệp.\n\nTệp vượt quá:\n${oversizedFiles.map(f => `• ${f.name} (${(f.size / 1024 / 1024).toFixed(1)}MB)`).join('\n')}`);
                  return;
                }

                const totalSize = files.reduce((sum, f) => sum + f.size, 0);
                if (totalSize > maxTotalSize) {
                  alert(language === 'ko'
                    ? `⚠️ 전체 파일 용량은 50MB를 초과할 수 없습니다.\n\n현재 선택된 용량: ${(totalSize / 1024 / 1024).toFixed(1)}MB`
                    : `⚠️ Tổng dung lượng tệp không được vượt quá 50MB.\n\nDung lượng đã chọn: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
                  return;
                }

                // 파일명과 용량 표시
                const fileList = files.map((f, i) => `${i + 1}. ${f.name} (${(f.size / 1024 / 1024).toFixed(1)}MB)`).join('\n');
                alert(language === 'ko'
                  ? `✅ ${files.length}개 파일 선택 완료!\n\n${fileList}\n\n📤 업로드를 시작합니다...`
                  : `✅ Đã chọn ${files.length} tệp!\n\n${fileList}\n\n📤 Đang bắt đầu tải lên...`);

                // 실제로는 여기서 파일 업로드 처리
                // 예: FormData로 서버에 전송
              };
              input.click();
            }}
            className="w-full btn btn-secondary text-sm py-2 flex items-center justify-center gap-2"
          >
            <Paperclip size={18} />
            {language === 'ko' ? '📎 파일 첨부 (다중 선택 가능 - 사진, 영상, 문서)' : '📎 Đính kèm tệp (chọn nhiều - ảnh, video, tài liệu)'}
          </button>

          {/* Message Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={language === 'ko' ? '메시지를 입력하세요...' : 'Nhập tin nhắn...'}
              className="flex-1 input"
            />
            <button
              type="submit"
              disabled={!messageText.trim()}
              className="btn btn-primary px-4"
            >
              <Send size={18} />
            </button>
          </div>
        </form>

        {/* 안내 텍스트 */}
        <p className="text-xs text-gray-500 text-center mt-2">
          {language === 'ko' ? '💡 Ctrl 또는 Shift 키로 여러 파일 선택 가능 | 파일당 10MB, 전체 50MB' : '💡 Giữ Ctrl hoặc Shift để chọn nhiều tệp | Tối đa 10MB/tệp, 50MB tổng'}
        </p>
      </div>
    </div>
  );
}
