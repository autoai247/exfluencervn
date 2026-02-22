'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Upload,
  FileText,
  MessageCircle,
} from 'lucide-react';
import { formatPoints } from '@/lib/points';
import BottomNav from '@/components/common/BottomNav';
import SocialMetaTags from '@/components/common/SocialMetaTags';
import { useLanguage } from '@/lib/i18n/LanguageContext';

type JobStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected';

// Mock job detail
const mockJob = {
  id: '1',
  campaignId: '1',
  title: '신규 스킨케어 제품 광고',
  company: 'Beauty Brand',
  companyLogo: 'https://ui-avatars.com/api/?name=Beauty+Brand&background=FF6B6B&color=fff',
  budget: 500000,
  status: 'in_progress' as JobStatus,
  deadline: '2024-02-15',
  appliedAt: '2024-01-20',
  startedAt: '2024-01-25',
  description: '새로 출시된 스킨케어 제품을 리뷰하고 홍보하는 캠페인입니다.',
  requirements: [
    'Instagram 피드 포스트 1개',
    'Instagram 스토리 3개 이상',
    '제품 사용 후기 영상 (1분 이상)',
    '해시태그 필수 포함: #스킨케어 #뷰티리뷰 #신제품',
  ],
  deliverables: [
    { id: 1, title: 'Instagram 피드 포스트 1개', submitted: true },
    { id: 2, title: 'Instagram 스토리 3개 이상', submitted: true },
    { id: 3, title: '제품 사용 후기 영상 (1분 이상)', submitted: false },
    { id: 4, title: '해시태그 필수 포함', submitted: false },
  ],
  submittedWork: [
    {
      id: 1,
      type: 'instagram_post',
      url: 'https://instagram.com/p/xxx',
      thumbnail: 'https://ui-avatars.com/api/?name=Post+1&background=4ECDC4&color=fff&size=400',
      submittedAt: '2024-02-01',
      status: 'approved',
    },
  ],
  feedback: '',
};

const getStatusConfig = (language: string) => ({
  pending: {
    label: language === 'ko' ? '승인 대기' : 'Chờ duyệt',
    icon: AlertCircle,
    color: 'text-warning',
    bgColor: 'bg-warning/20',
    borderColor: 'border-warning/30',
  },
  accepted: {
    label: language === 'ko' ? '승인됨' : 'Đã duyệt',
    icon: CheckCircle,
    color: 'text-info',
    bgColor: 'bg-info/20',
    borderColor: 'border-info/30',
  },
  in_progress: {
    label: language === 'ko' ? '진행 중' : 'Đang thực hiện',
    icon: Clock,
    color: 'text-secondary',
    bgColor: 'bg-secondary/20',
    borderColor: 'border-secondary/30',
  },
  completed: {
    label: language === 'ko' ? '완료' : 'Hoàn thành',
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/20',
    borderColor: 'border-success/30',
  },
  rejected: {
    label: language === 'ko' ? '거절됨' : 'Bị từ chối',
    icon: XCircle,
    color: 'text-error',
    bgColor: 'bg-error/20',
    borderColor: 'border-error/30',
  },
});

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { language } = useLanguage();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadItems, setUploadItems] = useState([{ url: '', description: '' }]);

  const statusConfig = getStatusConfig(language);
  const config = statusConfig[mockJob.status];
  const StatusIcon = config.icon;

  const addUploadItem = () => {
    setUploadItems([...uploadItems, { url: '', description: '' }]);
  };

  const removeUploadItem = (index: number) => {
    if (uploadItems.length > 1) {
      setUploadItems(uploadItems.filter((_, i) => i !== index));
    }
  };

  const updateUploadItem = (index: number, field: 'url' | 'description', value: string) => {
    const newItems = [...uploadItems];
    newItems[index][field] = value;
    setUploadItems(newItems);
  };

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = uploadItems.filter(item => item.url.trim() !== '');
    if (validItems.length === 0) {
      alert(language === 'ko' ? '최소 1개의 URL을 입력해주세요.' : 'Vui lòng nhập ít nhất 1 URL.');
      return;
    }
    alert(language === 'ko' ? `${validItems.length}개의 결과물이 제출되었습니다!` : `Đã nộp ${validItems.length} kết quả!`);
    setShowUploadModal(false);
    setUploadItems([{ url: '', description: '' }]);
  };

  const handleStartWork = () => {
    alert(language === 'ko' ? '작업을 시작합니다!' : 'Bắt đầu công việc!');
  };

  const handleContactAdvertiser = () => {
    router.push('/main/messages/1');
  };

  const completedCount = mockJob.deliverables.filter((d) => d.submitted).length;
  const progress = (completedCount / mockJob.deliverables.length) * 100;

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* 페이스북 공유 최적화 */}
      <SocialMetaTags
        title={`${mockJob.title} - ${mockJob.company} | Exfluencer VN`}
        description={mockJob.description}
        image={typeof window !== 'undefined'
          ? `${window.location.origin}/api/og/campaign?title=${encodeURIComponent(mockJob.title)}&company=${encodeURIComponent(mockJob.company)}&budget=${mockJob.budget}`
          : '/api/og/campaign'
        }
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        type="article"
        price={mockJob.budget}
        currency="VND"
      />

      {/* Header */}
      <div className="sticky top-0 z-10 bg-dark-800/80 backdrop-blur-sm border-b border-dark-400/40 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">{language === 'ko' ? '작업 상세' : 'Chi tiết công việc'}</h1>
        </div>
      </div>

      <div className="container-mobile space-y-4 py-6">
        {/* Job Header */}
        <div className={`bg-dark-600/80 backdrop-blur-sm border rounded-2xl p-4 shadow-xl ${config.borderColor}`}>
          <div className="flex items-start gap-4 mb-3">
            <img
              src={mockJob.companyLogo}
              alt={mockJob.company}
              className="w-12 h-12 rounded-full ring-2 ring-dark-400/40"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">{mockJob.title}</h2>
              <p className="text-sm text-gray-400">{mockJob.company}</p>
            </div>
            <div className={`px-3 py-1 rounded-full ${config.bgColor} border ${config.borderColor} flex items-center gap-1`}>
              <StatusIcon size={14} className={config.color} />
              <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{mockJob.description}</p>
        </div>

        {/* Budget */}
        <div className="bg-gradient-to-r from-accent/20 to-accent/5 backdrop-blur-sm border border-accent/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {mockJob.status === 'completed'
                  ? (language === 'ko' ? '획득 수익' : 'Thu nhập đã nhận')
                  : (language === 'ko' ? '예상 수익' : 'Thu nhập dự kiến')}
              </p>
              <p className="text-2xl font-bold text-accent">{formatPoints(mockJob.budget)}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
              <DollarSign size={24} className="text-accent" />
            </div>
          </div>
        </div>

        {/* Progress */}
        {mockJob.status === 'in_progress' && (
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <h3 className="text-sm font-semibold text-white">{language === 'ko' ? '진행 상황' : 'Tiến độ'}</h3>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">{language === 'ko' ? '완료된 작업' : 'Công việc hoàn thành'}</span>
                <span className="text-white font-semibold">
                  {completedCount}/{mockJob.deliverables.length}
                </span>
              </div>
              <div className="w-full h-3 bg-dark-700/80 border border-dark-400/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Requirements */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-semibold text-white">{language === 'ko' ? '요구사항' : 'Yêu cầu'}</h3>
          </div>
          <ul className="space-y-2">
            {mockJob.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        {(mockJob.status === 'in_progress' || mockJob.status === 'completed') && (
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
                <h3 className="text-sm font-semibold text-white">{language === 'ko' ? '제출물 체크리스트' : 'Danh sách nộp'}</h3>
              </div>
              {mockJob.status === 'in_progress' && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
                >
                  <Upload size={14} />
                  {language === 'ko' ? '결과물 제출' : 'Nộp kết quả'}
                </button>
              )}
            </div>
            <ul className="space-y-2">
              {mockJob.deliverables.map((item) => (
                <li key={item.id} className="flex items-start gap-2 text-sm">
                  {item.submitted ? (
                    <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-dark-400/60 rounded flex-shrink-0 mt-0.5" />
                  )}
                  <span className={item.submitted ? 'text-gray-500 line-through' : 'text-gray-300'}>
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submitted Work */}
        {mockJob.submittedWork.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <h3 className="text-sm font-semibold text-white">{language === 'ko' ? '제출한 결과물' : 'Kết quả đã nộp'}</h3>
            </div>
            {mockJob.submittedWork.map((work) => (
              <div key={work.id} className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
                <img
                  src={work.thumbnail}
                  alt="Submitted work"
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <div className="flex items-center justify-between mb-2">
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    {language === 'ko' ? '링크 보기 →' : 'Xem liên kết →'}
                  </a>
                  <span className="text-xs px-3 py-1 rounded-full bg-success/20 border border-success/30 text-success font-medium">
                    {language === 'ko' ? '승인됨' : 'Đã duyệt'}
                  </span>
                </div>
                <div className="text-xs text-gray-400">{language === 'ko' ? '제출일' : 'Ngày nộp'}: {work.submittedAt}</div>
              </div>
            ))}
          </div>
        )}

        {/* Feedback (for rejected jobs) */}
        {mockJob.status === 'rejected' && mockJob.feedback && (
          <div className="bg-error/10 backdrop-blur-sm border border-error/30 rounded-2xl p-4 shadow-xl">
            <h3 className="text-sm font-semibold text-error mb-2">{language === 'ko' ? '거절 사유' : 'Lý do từ chối'}</h3>
            <p className="text-sm text-gray-300">{mockJob.feedback}</p>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-semibold text-white">{language === 'ko' ? '일정' : 'Lịch trình'}</h3>
          </div>
          <div className="space-y-3">
            {mockJob.appliedAt && (
              <div className="flex items-center gap-3 p-3 bg-dark-700/50 border border-dark-400/30 rounded-xl">
                <div className="w-8 h-8 rounded-xl bg-dark-600/80 border border-dark-400/40 flex items-center justify-center flex-shrink-0">
                  <FileText size={14} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{language === 'ko' ? '지원일' : 'Ngày ứng tuyển'}</p>
                  <p className="text-xs text-gray-400">{mockJob.appliedAt}</p>
                </div>
              </div>
            )}
            {mockJob.startedAt && (
              <div className="flex items-center gap-3 p-3 bg-dark-700/50 border border-dark-400/30 rounded-xl">
                <div className="w-8 h-8 rounded-xl bg-info/10 border border-info/30 flex items-center justify-center flex-shrink-0">
                  <Clock size={14} className="text-info" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{language === 'ko' ? '시작일' : 'Ngày bắt đầu'}</p>
                  <p className="text-xs text-gray-400">{mockJob.startedAt}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 p-3 bg-dark-700/50 border border-dark-400/30 rounded-xl">
              <div className="w-8 h-8 rounded-xl bg-warning/10 border border-warning/30 flex items-center justify-center flex-shrink-0">
                <Calendar size={14} className="text-warning" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">{language === 'ko' ? '마감일' : 'Ngày hết hạn'}</p>
                <p className="text-xs text-gray-400">{mockJob.deadline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {mockJob.status === 'accepted' && (
            <button
              onClick={handleStartWork}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              <Clock size={18} />
              {language === 'ko' ? '작업 시작하기' : 'Bắt đầu công việc'}
            </button>
          )}

          {mockJob.status === 'in_progress' && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              <Upload size={18} />
              {language === 'ko' ? '결과물 제출하기' : 'Nộp kết quả'}
            </button>
          )}

          <button
            onClick={handleContactAdvertiser}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-dark-600/80 text-gray-300 border border-dark-400/40 rounded-2xl font-semibold hover:border-primary/30 transition-all"
          >
            <MessageCircle size={18} />
            {language === 'ko' ? '광고주에게 문의하기' : 'Liên hệ nhà quảng cáo'}
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-dark-600/95 backdrop-blur-sm border border-dark-400/40 rounded-2xl w-full max-w-md p-6 my-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full" />
              {language === 'ko' ? '결과물 제출' : 'Nộp kết quả'}
            </h3>
            <form onSubmit={handleSubmitWork} className="space-y-4">
              {uploadItems.map((item, index) => (
                <div key={index} className="p-4 bg-dark-700/50 border border-dark-400/30 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-primary">{language === 'ko' ? `결과물 #${index + 1}` : `Kết quả #${index + 1}`}</span>
                    {uploadItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeUploadItem(index)}
                        className="text-xs text-error hover:text-error/80 transition-colors"
                      >
                        {language === 'ko' ? '삭제' : 'Xóa'}
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      {language === 'ko' ? '콘텐츠 URL' : 'URL nội dung'}
                    </label>
                    <input
                      type="url"
                      value={item.url}
                      onChange={(e) => updateUploadItem(index, 'url', e.target.value)}
                      placeholder="https://instagram.com/p/..."
                      className="w-full px-4 py-2.5 bg-dark-700/50 border border-dark-400/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      {language === 'ko' ? '설명 (선택)' : 'Mô tả (tùy chọn)'}
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateUploadItem(index, 'description', e.target.value)}
                      placeholder={language === 'ko' ? '추가 설명을 입력하세요...' : 'Nhập mô tả thêm...'}
                      rows={2}
                      className="w-full px-4 py-2.5 bg-dark-700/50 border border-dark-400/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addUploadItem}
                className="w-full py-2.5 bg-dark-600/80 text-gray-300 border border-dark-400/40 rounded-2xl hover:border-primary/30 transition-all text-sm font-medium"
              >
                + {language === 'ko' ? '결과물 추가' : 'Thêm kết quả'}
              </button>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadItems([{ url: '', description: '' }]);
                  }}
                  className="flex-1 py-3 bg-dark-600/80 text-gray-300 border border-dark-400/40 rounded-2xl hover:border-primary/30 transition-all font-medium"
                >
                  {language === 'ko' ? '취소' : 'Hủy'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  {language === 'ko' ? `${uploadItems.filter(i => i.url).length}개 제출` : `Nộp ${uploadItems.filter(i => i.url).length} mục`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNav userType="influencer" />
    </div>
  );
}
