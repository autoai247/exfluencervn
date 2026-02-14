'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Send,
  Image as ImageIcon,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  CheckCheck,
  Clock,
  AlertCircle,
  X,
  Camera,
  File,
} from 'lucide-react';
import { formatCompactNumber } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useMessages, Message } from '@/contexts/MessageContext';

const getTimeLabel = (timestamp: Date) => {
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const ampm = hours >= 12 ? '오후' : '오전';
  const displayHours = hours % 12 || 12;
  return `${ampm} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
};

const getDateLabel = (timestamp: Date) => {
  const today = new Date();
  const messageDate = new Date(timestamp);

  if (
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()
  ) {
    return '오늘';
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (
    messageDate.getDate() === yesterday.getDate() &&
    messageDate.getMonth() === yesterday.getMonth() &&
    messageDate.getFullYear() === yesterday.getFullYear()
  ) {
    return '어제';
  }

  return `${messageDate.getMonth() + 1}월 ${messageDate.getDate()}일`;
};

export default function ConversationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { t } = useLanguage();
  const { getMessages, getConversation, sendMessage, markAsRead, typingIndicators } = useMessages();
  const [message, setMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const conversationId = params.id;
  const messages = getMessages(conversationId);
  const conversation = getConversation(conversationId);
  const isTyping = typingIndicators[conversationId];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Mark messages as read when page is opened
    markAsRead(conversationId);
  }, [conversationId, markAsRead]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(conversationId, message.trim());
    setMessage('');
  };

  const handleAttachment = (type: 'image' | 'file' | 'camera') => {
    setShowAttachMenu(false);
    // In real app, open file picker or camera
    console.log('Attachment type:', type);
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  let currentDate = '';

  messages.forEach((msg) => {
    const dateLabel = getDateLabel(msg.timestamp);
    if (dateLabel !== currentDate) {
      currentDate = dateLabel;
      groupedMessages.push({ date: dateLabel, messages: [] });
    }
    groupedMessages[groupedMessages.length - 1].messages.push(msg);
  });

  if (!conversation) {
    return (
      <div className="min-h-screen bg-dark-700 flex items-center justify-center">
        <p className="text-white">Conversation not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-700 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button onClick={() => router.back()} className="btn-icon text-white flex-shrink-0">
              <ArrowLeft size={24} />
            </button>

            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {conversation.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-dark-700"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-bold text-white truncate">{conversation.name}</h2>
                <p className="text-xs text-gray-400 truncate">{conversation.campaignTitle}</p>
                {isTyping && (
                  <p className="text-xs text-primary">입력 중...</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <button className="btn-icon text-gray-400 hover:text-white">
              <Phone size={20} />
            </button>
            <button className="btn-icon text-gray-400 hover:text-white">
              <Video size={20} />
            </button>
            <button className="btn-icon text-gray-400 hover:text-white">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Campaign Info Banner */}
        <div className="px-4 pb-3">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-400">{conversation.campaignTitle}</p>
              </div>
              <button className="btn btn-primary btn-sm">
                {t.messages.viewCampaign}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {groupedMessages.map((group, groupIdx) => (
          <div key={groupIdx}>
            {/* Date Divider */}
            <div className="flex items-center justify-center mb-4">
              <div className="px-3 py-1 bg-dark-600 rounded-full">
                <span className="text-xs text-gray-400">{group.date}</span>
              </div>
            </div>

            {/* Messages in this date group */}
            <div className="space-y-3">
              {group.messages.map((msg, msgIdx) => {
                const isMe = msg.senderId === 'me';
                const showAvatar = !isMe && (
                  msgIdx === group.messages.length - 1 ||
                  group.messages[msgIdx + 1]?.senderId !== msg.senderId
                );

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar (only for other person's last message in group) */}
                    {!isMe && (
                      <div className="w-8 h-8 flex-shrink-0">
                        {showAvatar && (
                          <img
                            src={conversation.avatar}
                            alt={conversation.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                      </div>
                    )}

                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                      {/* Message Bubble */}
                      {msg.type === 'text' ? (
                        <div
                          className={`px-4 py-2.5 rounded-2xl ${
                            isMe
                              ? 'bg-primary text-white rounded-br-sm'
                              : 'bg-dark-600 text-white rounded-bl-sm'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                        </div>
                      ) : msg.type === 'image' ? (
                        <div className="rounded-2xl overflow-hidden">
                          <img
                            src={msg.imageUrl}
                            alt="Sent image"
                            className="max-w-full h-auto"
                          />
                        </div>
                      ) : null}

                      {/* Time & Status */}
                      <div className={`flex items-center gap-1 mt-1 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                        <span className="text-xs text-gray-500">{getTimeLabel(msg.timestamp)}</span>
                        {isMe && (
                          <div>
                            {msg.status === 'read' && (
                              <CheckCheck size={14} className="text-primary" />
                            )}
                            {msg.status === 'delivered' && (
                              <CheckCheck size={14} className="text-gray-500" />
                            )}
                            {msg.status === 'sent' && (
                              <CheckCheck size={14} className="text-gray-600" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="px-4 py-2">
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 flex-shrink-0">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="bg-dark-600 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies (Optional) */}
      <div className="px-4 py-2 border-t border-dark-600">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[t.messages.quickReply1, t.messages.quickReply2, t.messages.quickReply3, t.messages.quickReply4].map((quick, idx) => (
            <button
              key={idx}
              onClick={() => setMessage(quick)}
              className="flex-shrink-0 px-3 py-1.5 bg-dark-600 hover:bg-dark-500 rounded-full text-xs text-gray-300 transition-all"
            >
              {quick}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-dark-700 border-t border-dark-500 px-4 py-3">
        <div className="flex items-end gap-2">
          {/* Attachment Button */}
          <div className="relative">
            <button
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="btn-icon text-gray-400 hover:text-white mb-1"
            >
              <Paperclip size={22} />
            </button>

            {/* Attachment Menu */}
            {showAttachMenu && (
              <div className="absolute bottom-full left-0 mb-2 bg-dark-600 rounded-xl shadow-xl border border-dark-500 overflow-hidden">
                <button
                  onClick={() => handleAttachment('image')}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-dark-500 transition-all w-full text-left"
                >
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <ImageIcon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.messages.gallery}</p>
                    <p className="text-xs text-gray-400">Chọn ảnh</p>
                  </div>
                </button>
                <button
                  onClick={() => handleAttachment('camera')}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-dark-500 transition-all w-full text-left border-t border-dark-500"
                >
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Camera size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.messages.camera}</p>
                    <p className="text-xs text-gray-400">Chụp ảnh</p>
                  </div>
                </button>
                <button
                  onClick={() => handleAttachment('file')}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-dark-500 transition-all w-full text-left border-t border-dark-500"
                >
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <File size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.messages.file}</p>
                    <p className="text-xs text-gray-400">Đính kèm</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t.messages.typeMessage}
              rows={1}
              className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary resize-none max-h-24"
              style={{
                minHeight: '44px',
                height: 'auto',
              }}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`btn-icon mb-1 ${
              message.trim()
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-dark-600 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          // Handle file upload
          console.log('File selected:', e.target.files?.[0]);
        }}
      />
    </div>
  );
}
