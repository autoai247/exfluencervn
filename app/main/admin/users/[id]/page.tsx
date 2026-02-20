'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Mail, Phone, Calendar, DollarSign, Star, Briefcase, Ban, CheckCircle, MessageCircle, Facebook } from 'lucide-react';
import { FaFacebookMessenger } from 'react-icons/fa';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Mock user data
const mockUsers: any = {
  'U001': {
    id: 'U001',
    email: 'nguyenvana@gmail.com',
    name: '응우옌 반 A',
    userType: 'influencer',
    phone: '+84 90 123 4567',
    zalo: '+84 90 123 4567',
    facebook: 'fb.com/nguyenvana.beauty',
    status: 'active',
    createdAt: '2024-01-15',
    lastActive: '2024-02-13',

    // Influencer specific
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=FF6B6B&color=fff',
    bio: '뷰티 & 라이프스타일 인플루언서입니다. 자연스러운 메이크업과 스킨케어 루틴을 공유합니다.',
    location: 'Ho Chi Minh City',
    birthDate: '1995-05-20',
    gender: 'female',
    categories: ['뷰티', '패션', '라이프스타일'],

    socialAccounts: [
      { platform: 'Instagram', username: '@nguyen_beauty', followers: 125000, engagement: 4.8 },
      { platform: 'TikTok', username: '@nguyenbeauty', followers: 89000, engagement: 5.2 },
      { platform: 'YouTube', username: 'Nguyen Beauty', followers: 45000, engagement: 3.5 },
      { platform: 'Facebook', username: 'Nguyen Van A Beauty', followers: 68000, engagement: 4.1 },
    ],

    stats: {
      totalEarnings: 15000000,
      completedCampaigns: 25,
      inProgressCampaigns: 3,
      rating: 4.8,
      reviewCount: 18,
      availablePoints: 2500000,
      lockedPoints: 500000,
    },

    recentCampaigns: [
      { title: '스킨케어 제품 리뷰', brand: 'Beauty Brand', amount: 500000, date: '2024-02-01', status: 'completed' },
      { title: '메이크업 튜토리얼', brand: 'Cosmetic Co.', amount: 800000, date: '2024-01-20', status: 'completed' },
      { title: '패션 룩북', brand: 'Fashion Store', amount: 600000, date: '2024-01-15', status: 'completed' },
    ],

    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'Nguyen Van A',
    },
  },

  'U002': {
    id: 'U002',
    email: 'shopfashion@gmail.com',
    name: 'Fashion Shop VN',
    userType: 'advertiser',
    phone: '+84 28 3456 7890',
    zalo: '+84 28 3456 7890',
    facebook: 'fb.com/fashionshopvn',
    status: 'active',
    createdAt: '2024-01-20',
    lastActive: '2024-02-13',

    // Advertiser specific
    logo: 'https://ui-avatars.com/api/?name=Fashion+Shop&background=4ECDC4&color=fff',
    companyName: 'Fashion Shop VN',
    industry: '패션/의류',
    companySize: '중소기업',
    description: '한국과 베트남의 최신 트렌드를 선도하는 패션 브랜드입니다. 20-30대 여성을 타겟으로 합니다.',
    website: 'https://fashionshopvn.com',
    address: 'District 1, Ho Chi Minh City',
    taxId: 'MST-123456789',

    stats: {
      totalSpent: 45000000,
      activeCampaigns: 5,
      completedCampaigns: 12,
      totalInfluencers: 23,
      rating: 4.5,
      reviewCount: 10,
      avgCampaignBudget: 3750000,
    },

    recentCampaigns: [
      { title: '봄 신상 컬렉션', budget: 5000000, influencers: 8, date: '2024-02-01', status: 'active' },
      { title: '겨울 세일 이벤트', budget: 3000000, influencers: 5, date: '2024-01-15', status: 'completed' },
      { title: '신규 브랜드 런칭', budget: 8000000, influencers: 12, date: '2024-01-01', status: 'completed' },
    ],
  },
};

export default function AdminUserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { language } = useLanguage();
  const userId = params?.id as string;

  const user = mockUsers[userId] || mockUsers['U001'];
  const isInfluencer = user.userType === 'influencer';

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{language === 'ko' ? '사용자 상세 정보' : 'Thông tin người dùng'}</h1>
        </div>
      </div>

      <div className="container-mobile space-y-6 py-6">
        {/* Profile Card */}
        <div className="card">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={user.avatar || user.logo}
              alt={user.name}
              className="w-20 h-20 rounded-full border-2 border-primary"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
              <span className={`text-xs px-3 py-1 rounded-full ${
                isInfluencer ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'
              }`}>
                {isInfluencer ? (language === 'ko' ? '인플루언서' : 'Influencer') : (language === 'ko' ? '광고주' : 'Nhà QC')}
              </span>
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  user.status === 'active' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                }`}>
                  {user.status === 'active' ? (language === 'ko' ? '활성' : 'Hoạt động') : (language === 'ko' ? '정지됨' : 'Đình chỉ')}
                </span>
              </div>
            </div>
          </div>

          {isInfluencer && user.bio && (
            <p className="text-sm text-gray-300 mb-3">{user.bio}</p>
          )}

          {!isInfluencer && user.description && (
            <p className="text-sm text-gray-300 mb-3">{user.description}</p>
          )}
        </div>

        {/* Contact Info */}
        <div className="card space-y-3">
          <h3 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? '연락처 정보' : 'Thông tin liên lạc'}</h3>

          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-gray-400" />
            <span className="text-gray-400">{language === 'ko' ? '이메일' : 'Email'}:</span>
            <span className="text-white">{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Phone size={16} className="text-gray-400" />
            <span className="text-gray-400">{language === 'ko' ? '전화' : 'Điện thoại'}:</span>
            <span className="text-white">{user.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <FaFacebookMessenger size={16} className="text-blue-500" />
            <span className="text-gray-400">Zalo:</span>
            <span className="text-white">{user.zalo}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Facebook size={16} className="text-blue-400" />
            <span className="text-gray-400">Facebook:</span>
            <span className="text-white">{user.facebook}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-gray-400">{language === 'ko' ? '가입일' : 'Ngày tham gia'}:</span>
            <span className="text-white">{user.createdAt}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-gray-400">{language === 'ko' ? '마지막 활동' : 'Hoạt động cuối'}:</span>
            <span className="text-white">{user.lastActive}</span>
          </div>
        </div>

        {/* Influencer Stats */}
        {isInfluencer && (
          <>
            {/* Social Accounts */}
            <div className="card">
              <h3 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? '소셜 미디어 계정' : 'Tài khoản mạng xã hội'}</h3>
              <div className="space-y-3">
                {user.socialAccounts.map((account: any, index: number) => (
                  <div key={index} className="bg-dark-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{account.platform}</span>
                      <span className="text-xs text-gray-400">@{account.username}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-400">{language === 'ko' ? '팔로워' : 'Người theo dõi'}</p>
                        <p className="text-white font-semibold">{account.followers.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">{language === 'ko' ? '참여율' : 'Tỷ lệ tương tác'}</p>
                        <p className="text-white font-semibold">{account.engagement}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="card text-center">
                <DollarSign size={24} className="text-success mx-auto mb-2" />
                <div className="text-lg font-bold text-white">
                  {formatPoints(user.stats.totalEarnings)}
                </div>
                <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? '총 수익' : 'Tổng thu nhập'}</div>
              </div>
              <div className="card text-center">
                <Briefcase size={24} className="text-secondary mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{user.stats.completedCampaigns}</div>
                <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? '완료한 캠페인' : 'Chiến dịch hoàn thành'}</div>
              </div>
              <div className="card text-center">
                <Star size={24} className="text-warning mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{user.stats.rating}</div>
                <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? '평균 평점' : 'Đánh giá trung bình'}</div>
              </div>
              <div className="card text-center">
                <CheckCircle size={24} className="text-info mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{user.stats.reviewCount}</div>
                <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? '리뷰 수' : 'Số đánh giá'}</div>
              </div>
            </div>

            {/* Points Balance */}
            <div className="card">
              <h3 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? '포인트 잔액' : 'Số dư điểm'}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'ko' ? '사용 가능' : 'Có thể dùng'}:</span>
                  <span className="text-success font-semibold">{formatPoints(user.stats.availablePoints)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'ko' ? '보류 중' : 'Đang chờ'}:</span>
                  <span className="text-warning font-semibold">{formatPoints(user.stats.lockedPoints)}</span>
                </div>
                <div className="border-t border-dark-500 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">{language === 'ko' ? '총 잔액' : 'Tổng số dư'}:</span>
                    <span className="text-white font-bold">{formatPoints(user.stats.availablePoints + user.stats.lockedPoints)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Info */}
            <div className="card">
              <h3 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? '출금 계좌 정보' : 'Thông tin tài khoản rút tiền'}</h3>
              <div className="space-y-2 text-sm bg-dark-700 rounded-lg p-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'ko' ? '은행' : 'Ngân hàng'}:</span>
                  <span className="text-white">{user.bankInfo.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'ko' ? '계좌번호' : 'Số tài khoản'}:</span>
                  <span className="text-white font-mono">{user.bankInfo.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'ko' ? '예금주' : 'Chủ tài khoản'}:</span>
                  <span className="text-white">{user.bankInfo.accountName}</span>
                </div>
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">{language === 'ko' ? '최근 캠페인 활동' : 'Hoạt động chiến dịch gần đây'}</h3>
              {user.recentCampaigns.map((campaign: any, index: number) => (
                <div key={index} className="card">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{campaign.title}</h4>
                      <p className="text-xs text-gray-400">{campaign.brand}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      campaign.status === 'completed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                    }`}>
                      {campaign.status === 'completed' ? (language === 'ko' ? '완료' : 'Hoàn thành') : (language === 'ko' ? '진행 중' : 'Đang tiến hành')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{campaign.date}</span>
                    <span className="text-accent font-semibold">{formatPoints(campaign.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Advertiser Stats */}
        {!isInfluencer && (
          <>
            {/* Company Info */}
            <div className="card space-y-2">
              <h3 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? '회사 정보' : 'Thông tin công ty'}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'ko' ? '산업' : 'Ngành'}:</span>
                  <span className="text-white">{user.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'ko' ? '회사 규모' : 'Quy mô công ty'}:</span>
                  <span className="text-white">{user.companySize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'ko' ? '웹사이트' : 'Website'}:</span>
                  <span className="text-primary">{user.website}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'ko' ? '주소' : 'Địa chỉ'}:</span>
                  <span className="text-white">{user.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'ko' ? '사업자번호' : 'Mã số thuế'}:</span>
                  <span className="text-white font-mono">{user.taxId}</span>
                </div>
              </div>
            </div>

            {/* Business Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="card text-center">
                <DollarSign size={24} className="text-error mx-auto mb-2" />
                <div className="text-lg font-bold text-white">
                  {formatPoints(user.stats.totalSpent)}
                </div>
                <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? '총 지출' : 'Tổng chi tiêu'}</div>
              </div>
              <div className="card text-center">
                <Briefcase size={24} className="text-secondary mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{user.stats.completedCampaigns}</div>
                <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? '완료한 캠페인' : 'Chiến dịch hoàn thành'}</div>
              </div>
              <div className="card text-center">
                <Star size={24} className="text-warning mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{user.stats.rating}</div>
                <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? '평균 평점' : 'Đánh giá trung bình'}</div>
              </div>
              <div className="card text-center">
                <CheckCircle size={24} className="text-info mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{user.stats.totalInfluencers}</div>
                <div className="text-xs text-gray-400 mt-1">{language === 'ko' ? '협업 인플루언서' : 'Influencer hợp tác'}</div>
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">{language === 'ko' ? '최근 캠페인' : 'Chiến dịch gần đây'}</h3>
              {user.recentCampaigns.map((campaign: any, index: number) => (
                <div key={index} className="card">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{campaign.title}</h4>
                      <p className="text-xs text-gray-400">{language === 'ko' ? `${campaign.influencers}명의 인플루언서` : `${campaign.influencers} influencer`}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      campaign.status === 'completed' ? 'bg-success/20 text-success' : campaign.status === 'active' ? 'bg-warning/20 text-warning' : 'bg-info/20 text-info'
                    }`}>
                      {campaign.status === 'completed' ? (language === 'ko' ? '완료' : 'Hoàn thành') : campaign.status === 'active' ? (language === 'ko' ? '진행 중' : 'Đang tiến hành') : (language === 'ko' ? '대기' : 'Chờ duyệt')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{campaign.date}</span>
                    <span className="text-accent font-semibold">{formatPoints(campaign.budget)}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Admin Actions */}
        <div className="card space-y-3">
          <h3 className="text-sm font-semibold text-white mb-3">{language === 'ko' ? '관리자 작업' : 'Thao tác quản trị'}</h3>

          <div className="grid grid-cols-2 gap-3">
            {user.status === 'active' ? (
              <button className="btn bg-error/20 text-error hover:bg-error/30">
                <Ban size={16} className="mr-2" />
                {language === 'ko' ? '계정 정지' : 'Đình chỉ tài khoản'}
              </button>
            ) : (
              <button className="btn bg-success/20 text-success hover:bg-success/30">
                <CheckCircle size={16} className="mr-2" />
                {language === 'ko' ? '정지 해제' : 'Bỏ đình chỉ'}
              </button>
            )}

            <button
              onClick={() => router.push(`/main/messages?userId=${user.id}&userName=${user.name}`)}
              className="btn btn-ghost"
            >
              <MessageCircle size={16} className="mr-2" />
              {language === 'ko' ? '메시지 보내기' : 'Gửi tin nhắn'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
