'use client';

import { X, Shield, AlertTriangle, CheckCircle, FileText, Scale, Users } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ContractProtectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContractProtectionModal({ isOpen, onClose }: ContractProtectionModalProps) {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const t = {
    ko: {
      title: '계약 보호 시스템',
      subtitle: 'Contract Protection System',
      intro: {
        title: '🛡️ 양측 보호 시스템',
        desc: '플랫폼이 법적 효력이 있는 전자 계약서를 제공하여 광고주와 인플루언서 모두를 보호합니다. 계약 위반 시 명확한 패널티가 적용됩니다.',
      },
      sections: {
        advertiser: '광고주가 지켜야 할 의무',
        influencer: '인플루언서가 지켜야 할 의무',
        penalties: '위반 시 패널티',
        dispute: '분쟁 해결 프로세스',
        verification: '사업자 인증',
      },
      advertiserObligations: [
        {
          title: '결제 의무',
          desc: '약속한 금액을 합의된 시점에 정확히 지급해야 합니다.',
          penalty: '미지급 시: 블랙리스트 등록 + 법적 조치 + 계정 영구 정지',
        },
        {
          title: '제품 발송',
          desc: '제품 협찬인 경우 약속한 기한 내에 제품을 발송해야 합니다.',
          penalty: '미발송 시: 인플루언서에게 배상 책임 + 평점 하락 + 경고',
        },
        {
          title: '공정한 검수',
          desc: '정당한 사유 없이 콘텐츠를 반려할 수 없습니다.',
          penalty: '부당 반려 시: 전액 지급 의무 + 경고 + 평점 하락',
        },
      ],
      influencerObligations: [
        {
          title: '콘텐츠 제출',
          desc: '약속한 기한 내에 고품질 콘텐츠를 제출해야 합니다.',
          penalty: '미제출 시: 계약 해지 + 전액 반환 + 제품 반환 + 블랙리스트',
        },
        {
          title: '포스팅 의무',
          desc: '승인된 콘텐츠를 약속한 날짜에 포스팅해야 합니다.',
          penalty: '미포스팅 시: 계약 해지 + 전액 반환 + 평점 하락',
        },
        {
          title: '게시 기간 유지',
          desc: '계약서에 명시된 기간 동안 포스팅을 유지해야 합니다.',
          penalty: '조기 삭제 시: 50% 반환 + 경고 + 평점 하락',
        },
        {
          title: '진실된 성과',
          desc: '가짜 조회수, 좋아요 등으로 성과를 조작할 수 없습니다.',
          penalty: '조작 시: 전액 반환 + 계정 영구 정지',
        },
      ],
      disputeSteps: [
        {
          step: '1단계',
          title: '신고 접수',
          desc: '플랫폼에서 "분쟁 신고" 버튼 클릭 후 증거 자료 제출 (스크린샷, 메시지, 송금 기록 등)',
          time: '즉시',
        },
        {
          step: '2단계',
          title: '양측 의견 수렴',
          desc: '플랫폼 관리자가 양측의 입장과 증거를 검토',
          time: '1-2 영업일',
        },
        {
          step: '3단계',
          title: '중재 및 판정',
          desc: '계약서 및 증거를 기반으로 공정한 판정',
          time: '2-3 영업일',
        },
        {
          step: '4단계',
          title: '해결 또는 법적 안내',
          desc: '합의 도출 또는 법적 절차 안내 (변호사, 법원)',
          time: '3-5 영업일',
        },
      ],
      verification: {
        title: '사업자 인증 필수',
        desc: '신뢰할 수 있는 광고주인지 확인하세요',
        items: [
          '✅ 사업자 등록증 (Giấy chứng nhận đăng ký kinh doanh)',
          '✅ 세금 코드 (Mã số thuế - MST)',
          '✅ 정부 사이트 실시간 조회로 확인됨',
          '⚠️ 미인증 광고주는 신중하게 판단하세요',
        ],
      },
      important: {
        title: '⚠️ 중요 사항',
        items: [
          '플랫폼은 계약서 제공 및 중재만 제공하며, 결제는 당사자 간 직접 처리됩니다',
          '계약 위반 시 패널티가 자동으로 적용되며, 평점 및 계정 상태에 영향을 줍니다',
          '분쟁이 해결되지 않을 경우 법적 조치를 취할 수 있도록 안내합니다',
          '모든 증거 자료는 최소 6개월간 보관하는 것을 권장합니다',
        ],
      },
      close: '이해했습니다',
    },
    vi: {
      title: 'Hệ thống bảo vệ hợp đồng',
      subtitle: 'Contract Protection System',
      intro: {
        title: '🛡️ Hệ thống bảo vệ hai bên',
        desc: 'Nền tảng cung cấp hợp đồng điện tử có hiệu lực pháp lý để bảo vệ cả nhà quảng cáo và influencer. Nếu vi phạm hợp đồng, sẽ có hình phạt rõ ràng.',
      },
      sections: {
        advertiser: 'Nghĩa vụ của nhà quảng cáo',
        influencer: 'Nghĩa vụ của influencer',
        penalties: 'Hình phạt khi vi phạm',
        dispute: 'Quy trình giải quyết tranh chấp',
        verification: 'Xác minh doanh nghiệp',
      },
      advertiserObligations: [
        {
          title: 'Nghĩa vụ thanh toán',
          desc: 'Phải thanh toán chính xác số tiền đã thỏa thuận vào thời điểm đã hẹn.',
          penalty: 'Không thanh toán: Đưa vào danh sách đen + Hành động pháp lý + Khóa tài khoản vĩnh viễn',
        },
        {
          title: 'Gửi sản phẩm',
          desc: 'Nếu tài trợ sản phẩm, phải gửi đúng hạn.',
          penalty: 'Không gửi: Trách nhiệm bồi thường cho influencer + Giảm xếp hạng + Cảnh cáo',
        },
        {
          title: 'Duyệt nội dung công bằng',
          desc: 'Không được từ chối nội dung không có lý do chính đáng.',
          penalty: 'Từ chối bất công: Phải thanh toán đầy đủ + Cảnh cáo + Giảm xếp hạng',
        },
      ],
      influencerObligations: [
        {
          title: 'Nộp nội dung',
          desc: 'Phải nộp nội dung chất lượng cao đúng thời hạn đã hẹn.',
          penalty: 'Không nộp: Hủy hợp đồng + Hoàn tiền + Trả sản phẩm + Danh sách đen',
        },
        {
          title: 'Nghĩa vụ đăng bài',
          desc: 'Phải đăng nội dung đã được duyệt vào ngày đã hẹn.',
          penalty: 'Không đăng: Hủy hợp đồng + Hoàn tiền + Giảm xếp hạng',
        },
        {
          title: 'Duy trì thời gian đăng',
          desc: 'Phải giữ bài đăng trong thời gian đã cam kết.',
          penalty: 'Xóa sớm: Hoàn 50% + Cảnh cáo + Giảm xếp hạng',
        },
        {
          title: 'Kết quả trung thực',
          desc: 'Không được gian lận lượt xem, lượt thích để giả mạo kết quả.',
          penalty: 'Gian lận: Hoàn tiền + Khóa tài khoản vĩnh viễn',
        },
      ],
      disputeSteps: [
        {
          step: 'Bước 1',
          title: 'Tiếp nhận khiếu nại',
          desc: 'Nhấn nút "Khiếu nại" và gửi tài liệu chứng cứ (ảnh chụp màn hình, tin nhắn, biên lai chuyển khoản, v.v.)',
          time: 'Ngay lập tức',
        },
        {
          step: 'Bước 2',
          title: 'Thu thập ý kiến',
          desc: 'Quản trị viên xem xét lập trường và chứng cứ của cả hai bên',
          time: '1-2 ngày làm việc',
        },
        {
          step: 'Bước 3',
          title: 'Trọng tài và phán quyết',
          desc: 'Phán quyết công bằng dựa trên hợp đồng và chứng cứ',
          time: '2-3 ngày làm việc',
        },
        {
          step: 'Bước 4',
          title: 'Giải quyết hoặc hướng dẫn pháp lý',
          desc: 'Đạt được thỏa thuận hoặc hướng dẫn thủ tục pháp lý (luật sư, tòa án)',
          time: '3-5 ngày làm việc',
        },
      ],
      verification: {
        title: 'Xác minh doanh nghiệp bắt buộc',
        desc: 'Kiểm tra xem nhà quảng cáo có đáng tin cậy không',
        items: [
          '✅ Giấy chứng nhận đăng ký kinh doanh',
          '✅ Mã số thuế (MST)',
          '✅ Xác minh trực tuyến qua trang chính phủ',
          '⚠️ Hãy thận trọng với nhà quảng cáo chưa xác minh',
        ],
      },
      important: {
        title: '⚠️ Lưu ý quan trọng',
        items: [
          'Nền tảng chỉ cung cấp hợp đồng và trọng tài, thanh toán do các bên tự thực hiện',
          'Nếu vi phạm hợp đồng, hình phạt sẽ tự động áp dụng và ảnh hưởng đến xếp hạng và trạng thái tài khoản',
          'Nếu tranh chấp không giải quyết được, chúng tôi sẽ hướng dẫn thủ tục pháp lý',
          'Khuyến nghị lưu giữ tất cả tài liệu chứng cứ ít nhất 6 tháng',
        ],
      },
      close: 'Đã hiểu',
    },
  };

  const text = t[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-dark-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-primary/30 animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary/20 to-purple-500/20 border-b border-primary/30 p-6 backdrop-blur-sm z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center">
                <Shield size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{text.title}</h3>
                <p className="text-xs text-primary">{text.subtitle}</p>
              </div>
            </div>
            <button onClick={onClose} className="btn-icon text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Intro */}
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <h4 className="text-lg font-bold text-white mb-2">{text.intro.title}</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{text.intro.desc}</p>
          </div>

          {/* Advertiser Obligations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Users size={16} className="text-yellow-400" />
              {text.sections.advertiser}
            </h4>
            <div className="space-y-2">
              {text.advertiserObligations.map((item, idx) => (
                <div key={idx} className="bg-dark-600 rounded-lg p-4 border border-dark-500">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-white mb-1">{item.title}</h5>
                      <p className="text-xs text-gray-400 mb-2">{item.desc}</p>
                      <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded px-2 py-1">
                        {item.penalty}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Influencer Obligations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Users size={16} className="text-mint" />
              {text.sections.influencer}
            </h4>
            <div className="space-y-2">
              {text.influencerObligations.map((item, idx) => (
                <div key={idx} className="bg-dark-600 rounded-lg p-4 border border-dark-500">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-mint flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-white mb-1">{item.title}</h5>
                      <p className="text-xs text-gray-400 mb-2">{item.desc}</p>
                      <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded px-2 py-1">
                        {item.penalty}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispute Resolution */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale size={16} className="text-blue-400" />
              {text.sections.dispute}
            </h4>
            <div className="relative">
              <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-blue-500/50 to-transparent"></div>
              <div className="space-y-4">
                {text.disputeSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="text-white text-xs font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-sm font-semibold text-white">{step.title}</h5>
                        <span className="text-xs text-blue-400 font-semibold">{step.time}</span>
                      </div>
                      <p className="text-xs text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Verification */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <FileText size={16} className="text-green-400" />
              {text.verification.title}
            </h4>
            <p className="text-xs text-gray-300 mb-3">{text.verification.desc}</p>
            <div className="space-y-1">
              {text.verification.items.map((item, idx) => (
                <p key={idx} className="text-xs text-gray-300">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle size={16} className="text-yellow-400" />
              {text.important.title}
            </h4>
            <ul className="space-y-1">
              {text.important.items.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-300">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Close Button */}
          <button onClick={onClose} className="w-full btn btn-primary py-4">
            ✅ {text.close}
          </button>
        </div>
      </div>
    </div>
  );
}
