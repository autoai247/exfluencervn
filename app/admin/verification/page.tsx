'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, Eye, Building2, FileText, AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

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
  const { language } = useLanguage();
  const [verifications, setVerifications] = useState(mockPendingVerifications);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [confirmModal, setConfirmModal] = useState<{ type: 'approve' | 'reject'; id: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleApprove = (id: string) => {
    setConfirmModal({ type: 'approve', id });
  };

  const handleReject = (id: string) => {
    setRejectReason('');
    setConfirmModal({ type: 'reject', id });
  };

  const executeApprove = () => {
    if (!confirmModal) return;
    setVerifications(prev =>
      prev.map(v =>
        v.id === confirmModal.id ? { ...v, status: 'approved' as const, reviewedAt: new Date().toISOString() } : v
      )
    );
    showToast(language === 'ko' ? '승인되었습니다!' : 'Đã phê duyệt!');
    setConfirmModal(null);
  };

  const executeReject = () => {
    if (!confirmModal || !rejectReason.trim()) return;
    setVerifications(prev =>
      prev.map(v =>
        v.id === confirmModal.id
          ? { ...v, status: 'rejected' as const, reviewedAt: new Date().toISOString(), rejectionReason: rejectReason }
          : v
      )
    );
    showToast(language === 'ko' ? `거부되었습니다: ${rejectReason}` : `Đã từ chối: ${rejectReason}`);
    setConfirmModal(null);
    setRejectReason('');
  };

  const selected = verifications.find(v => v.id === selectedId);

  const filteredVerifications =
    filter === 'all' ? verifications : verifications.filter(v => v.status === filter);

  const getFilterLabel = (f: string) => {
    if (f === 'all') return language === 'ko' ? '전체' : 'Tất cả';
    if (f === 'pending') return language === 'ko' ? '대기' : 'Chờ duyệt';
    if (f === 'approved') return language === 'ko' ? '승인' : 'Đã duyệt';
    return language === 'ko' ? '거부' : 'Từ chối';
  };

  const getStatusLabel = (status: string, short = false) => {
    if (status === 'pending') return language === 'ko' ? (short ? '대기' : '대기 중') : (short ? 'Chờ duyệt' : 'Đang chờ duyệt');
    if (status === 'approved') return language === 'ko' ? '승인됨' : 'Đã duyệt';
    return language === 'ko' ? '거부됨' : 'Đã từ chối';
  };

  const getBusinessTypeLabel = (type: string) => {
    if (type === 'limited_company') return language === 'ko' ? '유한책임회사' : 'Công ty TNHH';
    if (type === 'joint_stock') return language === 'ko' ? '주식회사' : 'Công ty cổ phần';
    return language === 'ko' ? '기타' : 'Khác';
  };

  return (
    <div className="min-h-screen bg-dark-700 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-green-500 text-white rounded-full shadow-2xl animate-bounce font-semibold text-sm">
          {toastMessage}
        </div>
      )}

      {/* Confirm Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">
                {confirmModal.type === 'approve'
                  ? (language === 'ko' ? '승인 확인' : 'Xác nhận phê duyệt')
                  : (language === 'ko' ? '거부 확인' : 'Xác nhận từ chối')}
              </h3>
              <button onClick={() => setConfirmModal(null)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            {confirmModal.type === 'approve' ? (
              <p className="text-gray-300 text-sm mb-6">
                {language === 'ko' ? '이 사업자를 승인하시겠습니까? 승인 후에는 광고주로 활동할 수 있습니다.' : 'Bạn có chắc muốn phê duyệt doanh nghiệp này? Sau khi phê duyệt họ có thể hoạt động như nhà quảng cáo.'}
              </p>
            ) : (
              <>
                <p className="text-gray-300 text-sm mb-3">
                  {language === 'ko' ? '거부 사유를 입력하세요:' : 'Nhập lý do từ chối:'}
                </p>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder={language === 'ko' ? '예: 사업자등록증 정보 불일치' : 'Ví dụ: Thông tin giấy phép không khớp'}
                  className="w-full bg-dark-700 border border-dark-500 rounded-xl p-3 text-white text-sm resize-none h-24 mb-4 focus:outline-none focus:border-primary/60"
                />
              </>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-3 bg-dark-700 hover:bg-dark-500 text-gray-300 rounded-xl font-semibold text-sm transition-all"
              >
                {language === 'ko' ? '취소' : 'Hủy'}
              </button>
              {confirmModal.type === 'approve' ? (
                <button
                  onClick={executeApprove}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  {language === 'ko' ? '승인' : 'Phê duyệt'}
                </button>
              ) : (
                <button
                  onClick={executeReject}
                  disabled={!rejectReason.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-red-500/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <XCircle size={16} />
                  {language === 'ko' ? '거부' : 'Từ chối'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-30 bg-dark-700/95 backdrop-blur-sm border-b border-dark-400/40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">{language === 'ko' ? '사업자 인증 승인 관리' : 'Quản lý xét duyệt xác minh doanh nghiệp'}</h1>
          <p className="text-sm text-gray-400 mt-1">{language === 'ko' ? '광고주 사업자 인증을 검토하고 승인/거부하세요' : 'Xem xét và phê duyệt/từ chối xác minh doanh nghiệp của nhà quảng cáo'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl p-4">
            <p className="text-sm text-gray-400">{language === 'ko' ? '대기 중' : 'Đang chờ'}</p>
            <p className="text-2xl font-bold text-orange-400">
              {verifications.filter(v => v.status === 'pending').length}
            </p>
          </div>
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl p-4">
            <p className="text-sm text-gray-400">{language === 'ko' ? '승인됨' : 'Đã duyệt'}</p>
            <p className="text-2xl font-bold text-green-400">
              {verifications.filter(v => v.status === 'approved').length}
            </p>
          </div>
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl p-4">
            <p className="text-sm text-gray-400">{language === 'ko' ? '거부됨' : 'Đã từ chối'}</p>
            <p className="text-2xl font-bold text-red-400">
              {verifications.filter(v => v.status === 'rejected').length}
            </p>
          </div>
          <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl p-4">
            <p className="text-sm text-gray-400">{language === 'ko' ? '전체' : 'Tổng'}</p>
            <p className="text-2xl font-bold text-white">{verifications.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25'
                  : 'bg-dark-600/60 text-gray-400 hover:bg-dark-500/60 hover:text-white border border-dark-400/40'
              }`}
            >
              {getFilterLabel(f)}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: List */}
          <div className="lg:col-span-1 space-y-3">
            {filteredVerifications.length === 0 ? (
              <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl p-8 text-center">
                <p className="text-gray-400">{language === 'ko' ? '신청 내역이 없습니다' : 'Không có yêu cầu nào'}</p>
              </div>
            ) : (
              filteredVerifications.map(verification => (
                <button
                  key={verification.id}
                  onClick={() => setSelectedId(verification.id)}
                  className={`w-full text-left bg-dark-600/80 backdrop-blur-sm border rounded-2xl shadow-xl p-4 transition-all ${
                    selectedId === verification.id
                      ? 'border-primary/60 shadow-primary/10'
                      : 'border-dark-400/40 hover:border-dark-300/60'
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
                      {getStatusLabel(verification.status, true)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{verification.companyNameVi}</p>
                  <p className="text-xs text-gray-500">MST: {verification.taxCode}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {language === 'ko' ? '신청일' : 'Ngày nộp'}: {new Date(verification.submittedAt).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'vi-VN')}
                  </p>
                </button>
              ))
            )}
          </div>

          {/* Right: Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl p-6 space-y-6">
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
                    {getStatusLabel(selected.status)}
                  </span>
                </div>

                {/* Business Info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Building2 size={16} />
                    {language === 'ko' ? '사업자 정보' : 'Thông tin doanh nghiệp'}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">{language === 'ko' ? '사업자 등록번호' : 'Số đăng ký kinh doanh'}</p>
                      <p className="text-white font-medium">{selected.registrationNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">{language === 'ko' ? '세금 코드 (MST)' : 'Mã số thuế (MST)'}</p>
                      <p className="text-white font-medium">{selected.taxCode}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">{language === 'ko' ? '사업자 형태' : 'Loại hình doanh nghiệp'}</p>
                      <p className="text-white font-medium">
                        {getBusinessTypeLabel(selected.businessType)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">{language === 'ko' ? '대표자' : 'Người đại diện pháp luật'}</p>
                      <p className="text-white font-medium">{selected.legalRepresentative}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{language === 'ko' ? '주소' : 'Địa chỉ'}</p>
                    <p className="text-white text-sm">{selected.registeredAddress}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white">{language === 'ko' ? '연락처' : 'Thông tin liên lạc'}</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">{language === 'ko' ? '이메일' : 'Email'}</p>
                      <p className="text-white font-medium">{selected.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">{language === 'ko' ? '전화번호' : 'Số điện thoại'}</p>
                      <p className="text-white font-medium">{selected.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Certificate */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText size={16} />
                    {language === 'ko' ? '사업자등록증' : 'Giấy phép đăng ký kinh doanh'}
                  </h3>
                  <img
                    src={selected.certificateImage}
                    alt="Certificate"
                    className="w-full h-96 object-cover rounded-xl border border-dark-400/40"
                  />
                  <a
                    href={selected.certificateImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:underline"
                  >
                    <Eye size={14} />
                    {language === 'ko' ? '원본 크기로 보기' : 'Xem kích thước gốc'}
                  </a>
                </div>

                {/* Actions */}
                {selected.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-dark-400/40">
                    <button
                      onClick={() => handleReject(selected.id)}
                      className="flex-1 bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border border-red-500/30 py-3 rounded-xl font-bold hover:from-red-500/30 hover:to-rose-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle size={20} />
                      {language === 'ko' ? '거부' : 'Từ chối'}
                    </button>
                    <button
                      onClick={() => handleApprove(selected.id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:from-green-400 hover:to-emerald-400 transition-all shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={20} />
                      {language === 'ko' ? '승인' : 'Phê duyệt'}
                    </button>
                  </div>
                )}

                {selected.status === 'rejected' && (selected as any).rejectionReason && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-sm font-bold text-red-500 mb-1 flex items-center gap-2">
                      <AlertTriangle size={16} />
                      {language === 'ko' ? '거부 사유' : 'Lý do từ chối'}
                    </p>
                    <p className="text-sm text-gray-300">{(selected as any).rejectionReason}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-dark-600/80 backdrop-blur-sm border border-dark-400/40 rounded-2xl shadow-xl p-12 text-center">
                <Building2 size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">{language === 'ko' ? '좌측에서 신청을 선택하세요' : 'Chọn một yêu cầu từ danh sách bên trái'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
