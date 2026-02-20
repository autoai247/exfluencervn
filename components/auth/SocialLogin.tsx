'use client';

import { useState } from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { SiKakao, SiNaver, SiZalo } from 'react-icons/si';
import { useToast } from '@/components/common/ToastContainer';

interface SocialLoginProps {
  onSuccess?: (provider: string, data: any) => void;
  onError?: (provider: string, error: any) => void;
  providers?: SocialProvider[];
  layout?: 'grid' | 'stack';
  language?: 'ko' | 'vi';
}

export type SocialProvider = 'google' | 'facebook' | 'apple' | 'kakao' | 'naver' | 'zalo';

const providerConfig = {
  google: {
    name: 'Google',
    icon: FaGoogle,
    color: 'bg-white text-gray-900 hover:bg-gray-100',
    iconColor: 'text-[#4285F4]',
  },
  facebook: {
    name: 'Facebook',
    icon: FaFacebook,
    color: 'bg-[#1877F2] hover:bg-[#166FE5] text-white',
    iconColor: 'text-white',
  },
  apple: {
    name: 'Apple',
    icon: FaApple,
    color: 'bg-black hover:bg-gray-900 text-white',
    iconColor: 'text-white',
  },
  kakao: {
    name: 'Kakao',
    icon: SiKakao,
    color: 'bg-[#FEE500] hover:bg-[#F5DC00] text-gray-900',
    iconColor: 'text-gray-900',
  },
  naver: {
    name: 'Naver',
    icon: SiNaver,
    color: 'bg-[#03C75A] hover:bg-[#02B350] text-white',
    iconColor: 'text-white',
  },
  zalo: {
    name: 'Zalo',
    icon: SiZalo,
    color: 'bg-[#0068FF] hover:bg-[#0058E6] text-white',
    iconColor: 'text-white',
  },
};

export default function SocialLogin({
  onSuccess,
  onError,
  providers = ['google', 'facebook', 'kakao', 'naver'],
  layout = 'grid',
  language = 'vi',
}: SocialLoginProps) {
  const [loading, setLoading] = useState<SocialProvider | null>(null);
  const toast = useToast();

  const text = {
    ko: {
      continueWith: '{provider}로 계속하기',
      or: '또는',
      loading: '로그인 중...',
      error: '로그인 실패',
      errorMsg: '{provider} 로그인에 실패했습니다.',
    },
    vi: {
      continueWith: 'Tiếp tục với {provider}',
      or: 'Hoặc',
      loading: 'Đang đăng nhập...',
      error: 'Đăng nhập thất bại',
      errorMsg: 'Không thể đăng nhập với {provider}.',
    },
  };

  const t = text[language];

  const handleSocialLogin = async (provider: SocialProvider) => {
    setLoading(provider);

    try {
      // Simulate OAuth flow
      // In production, this would redirect to OAuth provider
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response
      const mockData = {
        id: `${provider}_${Date.now()}`,
        email: `user@${provider}.com`,
        name: 'Test User',
        avatar: `https://ui-avatars.com/api/?name=Test+User&background=random`,
        provider,
      };

      toast.success(
        language === 'ko' ? `${providerConfig[provider].name} 로그인 성공` : `Đăng nhập ${providerConfig[provider].name} thành công`,
        language === 'ko' ? '환영합니다!' : 'Chào mừng!'
      );

      onSuccess?.(provider, mockData);
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(
        t.error,
        t.errorMsg.replace('{provider}', providerConfig[provider].name)
      );
      onError?.(provider, error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="w-full">
      {/* Social Buttons */}
      <div className={layout === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
        {providers.map((provider) => {
          const config = providerConfig[provider];
          const Icon = config.icon;
          const isLoading = loading === provider;

          return (
            <button
              key={provider}
              onClick={() => handleSocialLogin(provider)}
              disabled={loading !== null}
              className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${config.color}`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">{t.loading}</span>
                </>
              ) : (
                <>
                  <Icon size={20} className={config.iconColor} />
                  <span className="text-sm">
                    {layout === 'stack'
                      ? t.continueWith.replace('{provider}', config.name)
                      : config.name
                    }
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
