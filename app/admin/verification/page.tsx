'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, Eye, Building2, FileText, AlertTriangle } from 'lucide-react';

// Mock data for pending verifications
const mockPendingVerifications = [
  {
    id: 'ver-001',
    companyName: '하이랜드 커피',
    companyNameVi: 'Highlands Coffee',
    registrationNumber: '0123456789',
    taxCode: '0123456789-001',
    businessType: 'limited_company',
    registeredAddress: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    legalRepresentative: 'Nguyễn Văn A',
    email: 'info@highlandscoffee.vn',
    phone: '+84 901 234 567',
    certificateImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    submittedAt: '2026-02-14T10:30:00',
    status: 'pending'
  },
  {
    id: 'ver-002',
    companyName: '엘리자 패션',
    companyNameVi: 'Elise Fashion',
    registrationNumber: '9876543210',
    taxCode: '9876543210-002',
    businessType: 'joint_stock',
    registeredAddress: '456 Lê Lợi, Quận 1, TP. Hồ Chí Minh',
    legalRepresentative: 'Trần Thị B',
    email: 'contact@elisefashion.vn',
    phone: '+84 902 345 678',
    certificateImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
    submittedAt: '2026-02-13T15:20:00',
    status: 'pending'
  }
];

export default function AdminVerificationPage() {
  const [verifications, setVerifications] = useState(mockPendingVerifications);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const handleApprove = (id: string) => {
    if (confirm('이 사업자를 승인하시겠습니까?')) {
      setVerifications(prev =>
        prev.map(v =>
          v.id === id ? { ...v, status: 'approved' as const, reviewedAt: new Date().toISOString() } : v
        )
      );
      alert('승인되었습니다!');
    }
  };

  const handleReject = (id: string) => {
    const reason = prompt('거부 사유를 입력하세요:');
    if (reason) {
      setVerifications(prev =>
        prev.map(v =>
          v.id === id
            ? { ...v, status: 'rejected' as const, reviewedAt: new Date().toISOString(), rejectionReason: reason }
            : v
        )
      );
      alert(`거부되었습니다: ${reason}`);
    }
  };

  const selected = verifications.find(v => v.id === selectedId);

  const filteredVerifications =
    filter === 'all' ? verifications : verifications.filter(v => v.status === filter);

  return (
    <div className="min-h-screen bg-dark pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-dark/95 backdrop-blur-sm border-b border-dark-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">사업자 인증 승인 관리</h1>
          <p className="text-sm text-gray-400 mt-1">광고주 사업자 인증을 검토하고 승인/거부하세요</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-dark-100 border border-dark-200 rounded-xl p-4">
            <p className="text-sm text-gray-400">대기 중</p>
            <p className="text-2xl font-bold text-orange-500">
              {verifications.filter(v => v.status === 'pending').length}
            </p>
          </div>
          <div className="bg-dark-100 border border-dark-200 rounded-xl p-4">
            <p className="text-sm text-gray-400">승인됨</p>
            <p className="text-2xl font-bold text-green-500">
              {verifications.filter(v => v.status === 'approved').length}
            </p>
          </div>
          <div className="bg-dark-100 border border-dark-200 rounded-xl p-4">
            <p className="text-sm text-gray-400">거부됨</p>
            <p className="text-2xl font-bold text-red-500">
              {verifications.filter(v => v.status === 'rejected').length}
            </p>
          </div>
          <div className="bg-dark-100 border border-dark-200 rounded-xl p-4">
            <p className="text-sm text-gray-400">전체</p>
            <p className="text-2xl font-bold text-white">{verifications.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-mint text-black'
                  : 'bg-dark-100 text-gray-400 hover:bg-dark-200'
              }`}
            >
              {f === 'all' ? '전체' : f === 'pending' ? '대기' : f === 'approved' ? '승인' : '거부'}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: List */}
          <div className="lg:col-span-1 space-y-3">
            {filteredVerifications.length === 0 ? (
              <div className="bg-dark-100 border border-dark-200 rounded-xl p-8 text-center">
                <p className="text-gray-400">신청 내역이 없습니다</p>
              </div>
            ) : (
              filteredVerifications.map(verification => (
                <button
                  key={verification.id}
                  onClick={() => setSelectedId(verification.id)}
                  className={`w-full text-left bg-dark-100 border rounded-xl p-4 transition-all ${
                    selectedId === verification.id
                      ? 'border-mint'
                      : 'border-dark-200 hover:border-dark-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-white text-sm">{verification.companyName}</h3>
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        verification.status === 'pending'
                          ? 'bg-orange-500/20 text-orange-500'
                          : verification.status === 'approved'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}
                    >
                      {verification.status === 'pending'
                        ? '대기'
                        : verification.status === 'approved'
                        ? '승인'
                        : '거부'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{verification.companyNameVi}</p>
                  <p className="text-xs text-gray-500">MST: {verification.taxCode}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    신청일: {new Date(verification.submittedAt).toLocaleDateString('ko-KR')}
                  </p>
                </button>
              ))
            )}
          </div>

          {/* Right: Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-dark-100 border border-dark-200 rounded-xl p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selected.companyName}</h2>
                    <p className="text-gray-400">{selected.companyNameVi}</p>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold ${
                      selected.status === 'pending'
                        ? 'bg-orange-500/20 text-orange-500'
                        : selected.status === 'approved'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {selected.status === 'pending' ? '대기 중' : selected.status === 'approved' ? '승인됨' : '거부됨'}
                  </span>
                </div>

                {/* Business Info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Building2 size={16} />
                    사업자 정보
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">사업자 등록번호</p>
                      <p className="text-white font-medium">{selected.registrationNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">세금 코드 (MST)</p>
                      <p className="text-white font-medium">{selected.taxCode}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">사업자 형태</p>
                      <p className="text-white font-medium">
                        {selected.businessType === 'limited_company'
                          ? '유한책임회사'
                          : selected.businessType === 'joint_stock'
                          ? '주식회사'
                          : '기타'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">대표자</p>
                      <p className="text-white font-medium">{selected.legalRepresentative}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">주소</p>
                    <p className="text-white text-sm">{selected.registeredAddress}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white">연락처</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">이메일</p>
                      <p className="text-white font-medium">{selected.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">전화번호</p>
                      <p className="text-white font-medium">{selected.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Certificate */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText size={16} />
                    사업자등록증
                  </h3>
                  <img
                    src={selected.certificateImage}
                    alt="Certificate"
                    className="w-full h-96 object-cover rounded-lg border border-dark-200"
                  />
                  <a
                    href={selected.certificateImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:underline"
                  >
                    <Eye size={14} />
                    원본 크기로 보기
                  </a>
                </div>

                {/* Actions */}
                {selected.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-dark-200">
                    <button
                      onClick={() => handleReject(selected.id)}
                      className="flex-1 bg-red-500/20 text-red-500 border border-red-500/30 py-3 rounded-xl font-bold hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle size={20} />
                      거부
                    </button>
                    <button
                      onClick={() => handleApprove(selected.id)}
                      className="flex-1 bg-green-500/20 text-green-500 border border-green-500/30 py-3 rounded-xl font-bold hover:bg-green-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={20} />
                      승인
                    </button>
                  </div>
                )}

                {selected.status === 'rejected' && (selected as any).rejectionReason && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-sm font-bold text-red-500 mb-1 flex items-center gap-2">
                      <AlertTriangle size={16} />
                      거부 사유
                    </p>
                    <p className="text-sm text-gray-300">{(selected as any).rejectionReason}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-dark-100 border border-dark-200 rounded-xl p-12 text-center">
                <Building2 size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">좌측에서 신청을 선택하세요</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
