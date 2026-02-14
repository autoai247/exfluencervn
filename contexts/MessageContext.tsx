'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export type MessageStatus = 'sent' | 'delivered' | 'read';
export type MessageType = 'text' | 'image' | 'file';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  status: MessageStatus;
  type: MessageType;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
}

export interface Conversation {
  id: string;
  type: 'advertiser' | 'support';
  name: string;
  avatar: string;
  campaignTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messageStatus: MessageStatus;
  hasAttachment: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface MessageContextType {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  sendMessage: (conversationId: string, message: string, type?: MessageType, fileUrl?: string, fileName?: string) => void;
  markAsRead: (conversationId: string) => void;
  getMessages: (conversationId: string) => Message[];
  getConversation: (conversationId: string) => Conversation | undefined;
  typingIndicators: Record<string, boolean>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Mock data
const initialConversations: Conversation[] = [
  {
    id: '1',
    type: 'advertiser',
    name: 'Beauty Brand Vietnam',
    avatar: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop',
    campaignTitle: '신규 스킨케어 제품 리뷰',
    lastMessage: '네, 내일 오전 10시에 샘플을 보내드리겠습니다!',
    lastMessageTime: '5분 전',
    unreadCount: 2,
    isOnline: true,
    messageStatus: 'delivered',
    hasAttachment: false,
    timestamp: new Date('2024-02-13T15:55:00'),
  },
  {
    id: '2',
    type: 'advertiser',
    name: 'Pho House Vietnam',
    avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
    campaignTitle: '베트남 레스토랑 체험',
    lastMessage: '촬영 일정을 조율하고 싶어요. 언제가 괜찮으신가요?',
    lastMessageTime: '1시간 전',
    unreadCount: 0,
    isOnline: false,
    messageStatus: 'read',
    hasAttachment: false,
    timestamp: new Date('2024-02-13T14:00:00'),
  },
];

const initialMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      conversationId: '1',
      senderId: 'advertiser',
      senderName: 'Beauty Brand Vietnam',
      message: '안녕하세요! 저희 신규 스킨케어 제품 캠페인에 지원해주셔서 감사합니다.',
      timestamp: new Date('2024-02-13T10:00:00'),
      status: 'read',
      type: 'text',
    },
    {
      id: '2',
      conversationId: '1',
      senderId: 'me',
      senderName: 'Me',
      message: '안녕하세요! 지원하게 되어 기쁩니다. 제품에 대해 더 자세히 알고 싶어요.',
      timestamp: new Date('2024-02-13T10:05:00'),
      status: 'read',
      type: 'text',
    },
  ],
  '2': [
    {
      id: '3',
      conversationId: '2',
      senderId: 'advertiser',
      senderName: 'Pho House Vietnam',
      message: '촬영 일정을 조율하고 싶어요. 언제가 괜찮으신가요?',
      timestamp: new Date('2024-02-13T14:00:00'),
      status: 'read',
      type: 'text',
    },
  ],
};

export function MessageProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [typingIndicators, setTypingIndicators] = useState<Record<string, boolean>>({});

  // Simulate message status updates (sent → delivered → read)
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(convId => {
          updated[convId] = updated[convId].map(msg => {
            if (msg.senderId === 'me') {
              // Simulate message delivery
              if (msg.status === 'sent') {
                return { ...msg, status: 'delivered' as MessageStatus };
              }
              // Simulate message read (50% chance after 3 seconds)
              if (msg.status === 'delivered' && Math.random() > 0.5) {
                return { ...msg, status: 'read' as MessageStatus };
              }
            }
            return msg;
          });
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate auto-reply from advertiser
  const simulateAutoReply = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;

    // Show typing indicator
    setTypingIndicators(prev => ({ ...prev, [conversationId]: true }));

    // Send reply after 2-4 seconds
    setTimeout(() => {
      const replies = [
        '네, 알겠습니다!',
        '감사합니다. 곧 연락드리겠습니다.',
        '좋은 의견 감사합니다!',
        '확인했습니다. 진행하겠습니다.',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const newMessage: Message = {
        id: Date.now().toString(),
        conversationId,
        senderId: 'advertiser',
        senderName: conversation.name,
        message: randomReply,
        timestamp: new Date(),
        status: 'read',
        type: 'text',
      };

      setMessages(prev => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), newMessage],
      }));

      setConversations(prev =>
        prev.map(c =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: randomReply,
                lastMessageTime: '방금',
                timestamp: new Date(),
              }
            : c
        )
      );

      setTypingIndicators(prev => ({ ...prev, [conversationId]: false }));
    }, Math.random() * 2000 + 2000);
  };

  const sendMessage = (
    conversationId: string,
    message: string,
    type: MessageType = 'text',
    fileUrl?: string,
    fileName?: string
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId,
      senderId: 'me',
      senderName: 'Me',
      message,
      timestamp: new Date(),
      status: 'sent',
      type,
      imageUrl: type === 'image' ? fileUrl : undefined,
      fileUrl: type === 'file' ? fileUrl : undefined,
      fileName: type === 'file' ? fileName : undefined,
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage],
    }));

    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: type === 'image' ? '📷 이미지' : type === 'file' ? `📎 ${fileName}` : message,
              lastMessageTime: '방금',
              messageStatus: 'sent',
              timestamp: new Date(),
            }
          : c
      )
    );

    // Simulate auto-reply (30% chance)
    if (Math.random() < 0.3) {
      simulateAutoReply(conversationId);
    }
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev =>
      prev.map(c => (c.id === conversationId ? { ...c, unreadCount: 0 } : c))
    );

    setMessages(prev => ({
      ...prev,
      [conversationId]: (prev[conversationId] || []).map(msg =>
        msg.senderId !== 'me' ? { ...msg, status: 'read' as MessageStatus } : msg
      ),
    }));
  };

  const getMessages = (conversationId: string) => {
    return messages[conversationId] || [];
  };

  const getConversation = (conversationId: string) => {
    return conversations.find(c => c.id === conversationId);
  };

  return (
    <MessageContext.Provider
      value={{
        conversations,
        messages,
        sendMessage,
        markAsRead,
        getMessages,
        getConversation,
        typingIndicators,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within MessageProvider');
  }
  return context;
}
