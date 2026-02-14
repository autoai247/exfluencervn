'use client';

import { useState } from 'react';
import { X, AlertTriangle, Upload, CheckCircle2 } from 'lucide-react';

interface DisputeReportModalProps {
  campaignId: string;
  campaignTitle: string;
  reporterType: 'influencer' | 'advertiser';
  onClose: () => void;
  language?: 'ko' | 'vi';
}

const DISPUTE_REASONS_INFLUENCER = [
  { id: 'no_payment', labelKo: '결제 미지급', labelVi: 'Không thanh toán' },
  { id: 'late_payment', labelKo: '결제 지연', labelVi: 'Thanh toán chậm trễ' },
  { id: 'no_product_delivery', labelKo: '제품 미발송', labelVi: 'Không gửi sản phẩm' },
  { id: 'unfair_content_rejection', labelKo: '부당한 콘텐츠 반려', labelVi: 'Từ chối nội dung không công bằng' },
  { id: 'contract_violation', labelKo: '계약 위반', labelVi: 'Vi phạm hợp đồng' },
  { id: 'other', labelKo: '기타', labelVi: 'Khác' }
];

const DISPUTE_REASONS_ADVERTISER = [
  { id: 'no_content_submission', labelKo: '콘텐츠 미제출', labelVi: 'Không gửi nội dung' },
  { id: 'no_posting', labelKo: '포스팅 미이행', labelVi: 'Không đăng bài' },
  { id: 'low_quality_content', labelKo: '저품질 콘텐츠', labelVi: 'Nội dung chất lượng thấp' },
  { id: 'guideline_violation', labelKo: '가이드라인 위반', labelVi: 'Vi phạm hướng dẫn' },
  { id: 'early_deletion', labelKo: '조기 삭제', labelVi: 'Xóa sớm' },
  { id: 'contract_violation', labelKo: '계약 위반', labelVi: 'Vi phạm hợp đồng' },
  { id: 'other', labelKo: '기타', labelVi: 'Khác' }
];

export default function DisputeReportModal({
  campaignId,
  campaignTitle,
  reporterType,
  onClose,
  language = 'ko'
}: DisputeReportModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    reason: '',
    description: '',
    evidenceUrls: ['', '', ''],
    requestedAction: ''
  });

  const reasons = reporterType === 'influencer' ? DISPUTE_REASONS_INFLUENCER : DISPUTE_REASONS_ADVERTISER;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.reason) {
      alert(language === 'ko' ? '신고 사유를 선택하세요' : 'Vui lòng chọn lý do');
      return;
    }

    if (!formData.description.trim()) {
      alert(language === 'ko' ? '상세 설명을 입력하세요' : 'Vui lòng nhập mô tả chi tiết');
      return;
    }

    // TODO: API 호출
    console.log('Dispute report submitted:', {
      campaignId,
      reporterType,
      ...formData,
      submittedAt: new Date().toISOString()
    });

    // 임시: localStorage 저장
    const disputes = JSON.parse(localStorage.getItem('disputes') || '[]');
    disputes.push({
      id: `dispute-${Date.now()}`,
      campaignId,
      campaignTitle,
      reporterType,
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('disputes', JSON.stringify(disputes));

    setStep('success');
  };

  const handleAddEvidence = () => {
    setFormData({
      ...formData,
      evidenceUrls: [...formData.evidenceUrls, '']
    });
  };

  const handleRemoveEvidence = (index: number) => {
    setFormData({
      ...formData,
      evidenceUrls: formData.evidenceUrls.filter((_, i) => i !== index)
    });
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-dark-100 rounded-xl w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {language === 'ko' ? '신고 접수 완료' : 'Đã tiếp nhận báo cáo'}
          </h2>
          <p className="text-gray-400 mb-6">
            {language === 'ko'
              ? '분쟁 신고가 접수되었습니다. 관리자가 1-5일 내에 검토 후 연락드리겠습니다.'
              : 'Báo cáo đã được tiếp nhận. Quản trị viên sẽ xem xét trong vòng 1-5 ngày.'}
          </p>
          <button
            onClick={onClose}
            className="w-full bg-mint text-black py-3 rounded-xl font-bold hover:bg-mint/90 transition-all"
          >
            {language === 'ko' ? '확인' : 'Xác nhận'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-dark-100 rounded-xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-200">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle size={24} className="text-red-500" />
              {language === 'ko' ? '분쟁 신고' : 'Báo cáo tranh chấp'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{campaignTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-dark-200 rounded-lg flex items-center justify-center hover:bg-dark-300 transition-all"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Important Notice */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-sm text-red-400 font-bold mb-2">
              ⚠️ {language === 'ko' ? '주의사항' : 'Lưu ý'}
            </p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>
                • {language === 'ko' ? '허위 신고 시 계정이 정지될 수 있습니다' : 'Báo cáo sai sự thật có thể bị đình chỉ tài khoản'}
              </li>
              <li>
                • {language === 'ko' ? '증거 자료를 반드시 첨부해주세요' : 'Vui lòng đính kèm bằng chứng'}
              </li>
              <li>
                • {language === 'ko' ? '처리까지 1-5일이 소요됩니다' : 'Xử lý mất 1-5 ngày'}
              </li>
            </ul>
          </div>

          {/* Reason */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {language === 'ko' ? '신고 사유' : 'Lý do'} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
              required
            >
              <option value="">
                {language === 'ko' ? '선택하세요' : 'Chọn'}
              </option>
              {reasons.map((reason) => (
                <option key={reason.id} value={reason.id}>
                  {language === 'ko' ? reason.labelKo : reason.labelVi}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {language === 'ko' ? '상세 설명' : 'Mô tả chi tiết'} <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={
                language === 'ko'
                  ? '무슨 일이 있었는지 자세히 설명해주세요...'
                  : 'Vui lòng mô tả chi tiết những gì đã xảy ra...'
              }
              rows={5}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none resize-none"
              required
            />
          </div>

          {/* Evidence */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {language === 'ko' ? '증거 자료' : 'Bằng chứng'} ({language === 'ko' ? '최대 5개' : 'Tối đa 5'})
            </label>
            {formData.evidenceUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    const newUrls = [...formData.evidenceUrls];
                    newUrls[index] = e.target.value;
                    setFormData({ ...formData, evidenceUrls: newUrls });
                  }}
                  placeholder={`${language === 'ko' ? '증거 자료' : 'Bằng chứng'} ${index + 1} URL`}
                  className="flex-1 bg-dark border border-dark-200 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                />
                {formData.evidenceUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEvidence(index)}
                    className="px-3 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            {formData.evidenceUrls.length < 5 && (
              <button
                type="button"
                onClick={handleAddEvidence}
                className="flex items-center gap-2 text-sm text-mint hover:underline"
              >
                <Upload size={14} />
                {language === 'ko' ? '증거 자료 추가' : 'Thêm bằng chứng'}
              </button>
            )}
            <p className="text-xs text-gray-500">
              {language === 'ko'
                ? '💡 스크린샷, 메시지 캡처, 계약서 등의 URL을 입력하세요'
                : '💡 Nhập URL của ảnh chụp màn hình, tin nhắn, hợp đồng, v.v.'}
            </p>
          </div>

          {/* Requested Action */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              {language === 'ko' ? '요청 사항' : 'Yêu cầu'}
            </label>
            <textarea
              value={formData.requestedAction}
              onChange={(e) => setFormData({ ...formData, requestedAction: e.target.value })}
              placeholder={
                language === 'ko'
                  ? '어떤 조치를 원하시나요? (예: 결제 요청, 계약 취소 등)'
                  : 'Bạn muốn hành động gì? (Ví dụ: Yêu cầu thanh toán, hủy hợp đồng, v.v.)'
              }
              rows={3}
              className="w-full bg-dark border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-dark-200 text-white py-3 rounded-xl font-bold hover:bg-dark-300 transition-all"
            >
              {language === 'ko' ? '취소' : 'Hủy'}
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all"
            >
              {language === 'ko' ? '신고 제출' : 'Gửi báo cáo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
