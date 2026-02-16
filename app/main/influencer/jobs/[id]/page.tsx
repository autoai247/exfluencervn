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

const statusConfig = {
  pending: {
    label: '승인 대기',
    icon: AlertCircle,
    color: 'text-warning',
    bgColor: 'bg-warning/20',
  },
  accepted: {
    label: '승인됨',
    icon: CheckCircle,
    color: 'text-info',
    bgColor: 'bg-info/20',
  },
  in_progress: {
    label: '진행 중',
    icon: Clock,
    color: 'text-secondary',
    bgColor: 'bg-secondary/20',
  },
  completed: {
    label: '완료',
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/20',
  },
  rejected: {
    label: '거절됨',
    icon: XCircle,
    color: 'text-error',
    bgColor: 'bg-error/20',
  },
};

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadItems, setUploadItems] = useState([{ url: '', description: '' }]);

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
      alert('최소 1개의 URL을 입력해주세요.');
      return;
    }
    alert(`${validItems.length}개의 결과물이 제출되었습니다!`);
    setShowUploadModal(false);
    setUploadItems([{ url: '', description: '' }]);
  };

  const handleStartWork = () => {
    alert('작업을 시작합니다!');
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
      <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="btn-icon text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">작업 상세</h1>
        </div>
      </div>

      <div className="container-mobile space-y-6 py-6">
        {/* Job Header */}
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <div className="flex items-start gap-4 mb-3">
            <img
              src={mockJob.companyLogo}
              alt={mockJob.company}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">{mockJob.title}</h2>
              <p className="text-sm text-gray-400">{mockJob.company}</p>
            </div>
            <div className={`px-3 py-1 rounded-full ${config.bgColor} flex items-center gap-1`}>
              <StatusIcon size={14} className={config.color} />
              <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{mockJob.description}</p>
        </div>

        {/* Budget */}
        <div className="card bg-gradient-to-r from-accent/20 to-accent/5 border-2 border-accent/30 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {mockJob.status === 'completed' ? '획득 수익' : '예상 수익'}
              </p>
              <p className="text-2xl font-bold text-accent">{formatPoints(mockJob.budget)}</p>
            </div>
            <DollarSign size={40} className="text-accent/50" />
          </div>
        </div>

        {/* Progress */}
        {mockJob.status === 'in_progress' && (
          <div className="card border-2 border-dark-500/50 shadow-xl">
            <h3 className="text-sm font-semibold text-white mb-3">진행 상황</h3>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">완료된 작업</span>
                <span className="text-white font-semibold">
                  {completedCount}/{mockJob.deliverables.length}
                </span>
              </div>
              <div className="w-full h-3 bg-dark-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Requirements */}
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <h3 className="text-sm font-semibold text-white mb-3">요구사항</h3>
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
          <div className="card border-2 border-dark-500/50 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">제출물 체크리스트</h3>
              {mockJob.status === 'in_progress' && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="btn btn-primary text-xs"
                >
                  <Upload size={14} className="mr-1" />
                  결과물 제출
                </button>
              )}
            </div>
            <ul className="space-y-2">
              {mockJob.deliverables.map((item) => (
                <li key={item.id} className="flex items-start gap-2 text-sm">
                  {item.submitted ? (
                    <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-gray-600 rounded flex-shrink-0 mt-0.5" />
                  )}
                  <span className={item.submitted ? 'text-gray-400 line-through' : 'text-gray-300'}>
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submitted Work */}
        {mockJob.submittedWork.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white">제출한 결과물</h3>
            {mockJob.submittedWork.map((work) => (
              <div key={work.id} className="card border-2 border-dark-500/50 shadow-xl">
                <img
                  src={work.thumbnail}
                  alt="Submitted work"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <div className="flex items-center justify-between mb-2">
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    링크 보기 →
                  </a>
                  <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">
                    승인됨
                  </span>
                </div>
                <div className="text-xs text-gray-400">제출일: {work.submittedAt}</div>
              </div>
            ))}
          </div>
        )}

        {/* Feedback (for rejected jobs) */}
        {mockJob.status === 'rejected' && mockJob.feedback && (
          <div className="card bg-error/10 border-2 border-error/30 shadow-xl">
            <h3 className="text-sm font-semibold text-error mb-2">거절 사유</h3>
            <p className="text-sm text-gray-300">{mockJob.feedback}</p>
          </div>
        )}

        {/* Timeline */}
        <div className="card border-2 border-dark-500/50 shadow-xl">
          <h3 className="text-sm font-semibold text-white mb-3">일정</h3>
          <div className="space-y-6">
            {mockJob.appliedAt && (
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-white">지원일</p>
                  <p className="text-xs text-gray-400">{mockJob.appliedAt}</p>
                </div>
              </div>
            )}
            {mockJob.startedAt && (
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-info" />
                <div className="flex-1">
                  <p className="text-sm text-white">시작일</p>
                  <p className="text-xs text-gray-400">{mockJob.startedAt}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-warning" />
              <div className="flex-1">
                <p className="text-sm text-white">마감일</p>
                <p className="text-xs text-gray-400">{mockJob.deadline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-6">
          {mockJob.status === 'accepted' && (
            <button onClick={handleStartWork} className="btn btn-primary w-full">
              <Clock size={18} className="mr-2" />
              작업 시작하기
            </button>
          )}

          {mockJob.status === 'in_progress' && (
            <button onClick={() => setShowUploadModal(true)} className="btn btn-primary w-full">
              <Upload size={18} className="mr-2" />
              결과물 제출하기
            </button>
          )}

          <button onClick={handleContactAdvertiser} className="btn btn-secondary w-full">
            <MessageCircle size={18} className="mr-2" />
            광고주에게 문의하기
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-dark-600 rounded-xl w-full max-w-md p-6 my-8">
            <h3 className="text-lg font-bold text-white mb-4">결과물 제출</h3>
            <form onSubmit={handleSubmitWork} className="space-y-4">
              {uploadItems.map((item, index) => (
                <div key={index} className="p-4 bg-dark-700 rounded-lg space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-primary">결과물 #{index + 1}</span>
                    {uploadItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeUploadItem(index)}
                        className="text-xs text-error hover:text-error/80"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      콘텐츠 URL
                    </label>
                    <input
                      type="url"
                      value={item.url}
                      onChange={(e) => updateUploadItem(index, 'url', e.target.value)}
                      placeholder="https://instagram.com/p/..."
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      설명 (선택)
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateUploadItem(index, 'description', e.target.value)}
                      placeholder="추가 설명을 입력하세요..."
                      rows={2}
                      className="input resize-none"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addUploadItem}
                className="btn btn-secondary w-full text-sm"
              >
                + 결과물 추가
              </button>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadItems([{ url: '', description: '' }]);
                  }}
                  className="flex-1 btn btn-ghost"
                >
                  취소
                </button>
                <button type="submit" className="flex-1 btn btn-primary">
                  {uploadItems.filter(i => i.url).length}개 제출
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
