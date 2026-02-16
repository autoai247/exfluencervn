'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  DollarSign,
  Calendar,
  FileText,
} from 'lucide-react';
import MobileHeader from '@/components/common/MobileHeader';
import BottomNav from '@/components/common/BottomNav';
import { formatPoints } from '@/lib/points';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getMockJobs } from '@/lib/mockData';

type JobStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected';

interface Job {
  id: string;
  campaignId: string;
  title: string;
  company: string;
  companyLogo: string;
  budget: number;
  status: JobStatus;
  deadline: string;
  appliedAt?: string;
  startedAt?: string;
  completedAt?: string;
  submittedContent?: string;
  feedback?: string;
}

// Mock data - hardcoded jobs array with Korean text (replaced with translated version)
// const mockJobs: Job[] = [
//   {
//     id: '1',
//     campaignId: '1',
//     title: '신규 스킨케어 제품 광고',
//     company: 'Beauty Brand',
//     companyLogo: 'https://ui-avatars.com/api/?name=Beauty+Brand&background=FF6B6B&color=fff',
//     budget: 500000,
//     status: 'in_progress',
//     deadline: '2024-02-15',
//     appliedAt: '2024-01-20',
//     startedAt: '2024-01-25',
//   },
//   {
//     id: '2',
//     campaignId: '2',
//     title: '고급 레스토랑 리뷰',
//     company: 'Food Paradise',
//     companyLogo: 'https://ui-avatars.com/api/?name=Food+Paradise&background=4ECDC4&color=fff',
//     budget: 300000,
//     status: 'pending',
//     deadline: '2024-02-20',
//     appliedAt: '2024-02-01',
//   },
//   {
//     id: '3',
//     campaignId: '3',
//     title: '플래그십 스마트폰 언박싱',
//     company: 'Tech Store',
//     companyLogo: 'https://ui-avatars.com/api/?name=Tech+Store&background=6C5CE7&color=fff',
//     budget: 800000,
//     status: 'completed',
//     deadline: '2024-02-10',
//     appliedAt: '2024-01-15',
//     startedAt: '2024-01-18',
//     completedAt: '2024-02-08',
//   },
//   {
//     id: '4',
//     campaignId: '4',
//     title: '피트니스 앱 프로모션',
//     company: 'FitLife App',
//     companyLogo: 'https://ui-avatars.com/api/?name=FitLife&background=00B894&color=fff',
//     budget: 400000,
//     status: 'rejected',
//     deadline: '2024-02-18',
//     appliedAt: '2024-01-28',
//     feedback: '팔로워 수가 요구사항에 미달되었습니다.',
//   },
//   {
//     id: '5',
//     campaignId: '5',
//     title: '카페 신메뉴 홍보',
//     company: 'Cafe Mocha',
//     companyLogo: 'https://ui-avatars.com/api/?name=Cafe+Mocha&background=FFA502&color=fff',
//     budget: 250000,
//     status: 'accepted',
//     deadline: '2024-02-22',
//     appliedAt: '2024-02-02',
//   },
// ];

const getStatusConfig = (t: any) => ({
  pending: {
    label: t.campaign.status.pending,
    icon: AlertCircle,
    color: 'text-warning',
    bgColor: 'bg-warning/20',
    borderColor: 'border-warning/30',
  },
  accepted: {
    label: t.notification.types.accepted,
    icon: CheckCircle,
    color: 'text-info',
    bgColor: 'bg-info/20',
    borderColor: 'border-info/30',
  },
  in_progress: {
    label: t.dashboard.inProgress,
    icon: Clock,
    color: 'text-secondary',
    bgColor: 'bg-secondary/20',
    borderColor: 'border-secondary/30',
  },
  completed: {
    label: t.campaign.status.completed,
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/20',
    borderColor: 'border-success/30',
  },
  rejected: {
    label: t.notification.types.rejected,
    icon: XCircle,
    color: 'text-error',
    bgColor: 'bg-error/20',
    borderColor: 'border-error/30',
  },
});

export default function JobsPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | JobStatus>('all');
  const statusConfig = getStatusConfig(t);
  const mockJobs = getMockJobs(language);

  const filteredJobs = activeTab === 'all'
    ? mockJobs
    : mockJobs.filter((job) => job.status === activeTab);

  const statusCounts = {
    all: mockJobs.length,
    pending: mockJobs.filter((j) => j.status === 'pending').length,
    accepted: mockJobs.filter((j) => j.status === 'accepted').length,
    in_progress: mockJobs.filter((j) => j.status === 'in_progress').length,
    completed: mockJobs.filter((j) => j.status === 'completed').length,
    rejected: mockJobs.filter((j) => j.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-20">
      {/* Header */}
      <MobileHeader title={t.common.all === 'Tất cả' ? 'Công việc của tôi' : '내 작업'} showNotification />

      {/* Tabs */}
      <div className="sticky top-14 z-20 bg-dark-700 border-b border-dark-500 overflow-x-auto">
        <div className="flex gap-2 px-4 py-3 min-w-max">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-primary text-white'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            {t.common.all} ({statusCounts.all})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'pending'
                ? 'bg-warning text-white'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            {statusConfig.pending.label} ({statusCounts.pending})
          </button>
          <button
            onClick={() => setActiveTab('accepted')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'accepted'
                ? 'bg-info text-white'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            {statusConfig.accepted.label} ({statusCounts.accepted})
          </button>
          <button
            onClick={() => setActiveTab('in_progress')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'in_progress'
                ? 'bg-secondary text-white'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            {statusConfig.in_progress.label} ({statusCounts.in_progress})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'completed'
                ? 'bg-success text-white'
                : 'bg-dark-600 text-gray-400'
            }`}
          >
            {statusConfig.completed.label} ({statusCounts.completed})
          </button>
        </div>
      </div>

      {/* Job List */}
      <div className="container-mobile space-y-6 py-6">
        {filteredJobs.map((job) => {
          const config = statusConfig[job.status];
          const StatusIcon = config.icon;

          return (
            <div key={job.id} className={`card border-2 ${config.borderColor} ${config.bgColor} shadow-xl`}>
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-400">{job.company}</p>
                </div>
                <div className={`px-3 py-1 rounded-full ${config.bgColor} flex items-center gap-1`}>
                  <StatusIcon size={14} className={config.color} />
                  <span className={`text-xs font-medium ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">
                    {job.status === 'completed'
                      ? (t.common.all === 'Tất cả' ? 'Thu nhập đã nhận' : '획득 수익')
                      : (t.common.all === 'Tất cả' ? 'Thu nhập dự kiến' : '예상 수익')
                    }
                  </span>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-accent" />
                    <span className="text-white font-bold text-lg">
                      {formatPoints(job.budget)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-400">
                    {t.campaign.deadline}: {job.deadline}
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2 text-xs text-gray-500">
                {job.appliedAt && (
                  <div className="flex items-center gap-2">
                    <FileText size={12} />
                    <span>
                      {t.common.all === 'Tất cả' ? 'Ngày ứng tuyển' : '지원일'}: {job.appliedAt}
                    </span>
                  </div>
                )}
                {job.startedAt && (
                  <div className="flex items-center gap-2">
                    <Clock size={12} />
                    <span>
                      {t.common.all === 'Tất cả' ? 'Ngày bắt đầu' : '시작일'}: {job.startedAt}
                    </span>
                  </div>
                )}
                {job.completedAt && (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} />
                    <span>
                      {t.completed.completedOn}: {job.completedAt}
                    </span>
                  </div>
                )}
              </div>

              {/* Feedback (for rejected jobs) */}
              {job.status === 'rejected' && job.feedback && (
                <div className="mt-3 p-3 bg-dark-700 rounded-lg">
                  <p className="text-sm text-gray-400">{job.feedback}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-3 space-y-2">
                <Link href={`/main/influencer/jobs/${job.id}`} className="btn btn-ghost w-full">
                  {t.completed.viewDetails}
                </Link>
                {job.status === 'accepted' && (
                  <Link href={`/main/influencer/jobs/${job.id}`} className="btn btn-secondary w-full">
                    {t.common.all === 'Tất cả' ? 'Bắt đầu công việc' : '작업 시작'}
                  </Link>
                )}
                {job.status === 'in_progress' && (
                  <Link href={`/main/influencer/jobs/${job.id}`} className="btn btn-primary w-full">
                    {t.common.submit === 'Gửi' ? 'Nộp kết quả' : '결과물 제출'}
                  </Link>
                )}
              </div>
            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              {activeTab === 'all'
                ? (t.common.all === 'Tất cả' ? 'Không có công việc đang thực hiện' : '진행 중인 작업이 없습니다')
                : `${statusConfig[activeTab as JobStatus]?.label} ${t.common.all === 'Tất cả' ? 'không có công việc' : '작업이 없습니다'}`
              }
            </p>
            <Link href="/main/influencer/campaigns" className="btn btn-primary mt-4">
              {t.dashboard.findCampaigns}
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav userType="influencer" />
    </div>
  );
}
