'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage, LanguageSelector } from '@/lib/i18n/LanguageContext';

export default function PrivacyPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-dark-700">
      <div className="container-mobile min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="btn-icon text-white">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-lg font-bold text-white">{t.homepage.privacyLink}</h1>
            </div>
            <LanguageSelector />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-6 text-gray-300">
          <div className="text-sm text-gray-400">
            {language === 'ko' ? '최종 수정일: 2024년 2월 12일' : 'Cập nhật lần cuối: 12/02/2024'}
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              {language === 'ko' ? '1. 개인정보 처리방침' : '1. Chính sách bảo mật'}
            </h2>
            <p className="leading-relaxed">
              {language === 'ko'
                ? 'Exfluencer VN(이하 "회사")은 이용자의 개인정보를 중요시하며, 개인정보 보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령을 준수하고 있습니다. 본 개인정보 처리방침은 회사가 수집하는 개인정보의 항목, 수집 및 이용 목적, 보유 및 이용기간, 파기절차 등에 관한 사항을 알려드립니다.'
                : 'Exfluencer VN (sau đây gọi là "Công ty") coi trọng thông tin cá nhân của người dùng và tuân thủ các luật liên quan như Luật Bảo vệ Thông tin Cá nhân, Luật Xúc tiến Sử dụng Mạng Thông tin và Truyền thông và Bảo vệ Thông tin. Chính sách bảo mật này thông báo về các mục thông tin cá nhân mà Công ty thu thập, mục đích thu thập và sử dụng, thời gian lưu trữ và sử dụng, quy trình hủy bỏ, v.v.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              {language === 'ko' ? '2. 수집하는 개인정보 항목' : '2. Các mục thông tin cá nhân được thu thập'}
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-white mb-2">
                  {language === 'ko' ? '필수 수집 항목' : 'Mục bắt buộc'}
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>{language === 'ko' ? '이메일 주소' : 'Địa chỉ email'}</li>
                  <li>{language === 'ko' ? '비밀번호 (암호화 저장)' : 'Mật khẩu (lưu trữ mã hóa)'}</li>
                  <li>{language === 'ko' ? '이름' : 'Tên'}</li>
                  <li>{language === 'ko' ? '전화번호' : 'Số điện thoại'}</li>
                  <li>{language === 'ko' ? '회사명 (광고주의 경우)' : 'Tên công ty (đối với nhà quảng cáo)'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">
                  {language === 'ko' ? '선택 수집 항목' : 'Mục tùy chọn'}
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>{language === 'ko' ? '프로필 사진' : 'Ảnh hồ sơ'}</li>
                  <li>{language === 'ko' ? '소셜미디어 계정 정보 (Instagram, TikTok, YouTube, Facebook)' : 'Thông tin tài khoản mạng xã hội (Instagram, TikTok, YouTube, Facebook)'}</li>
                  <li>{language === 'ko' ? '은행 계좌 정보 (출금용)' : 'Thông tin tài khoản ngân hàng (để rút tiền)'}</li>
                  <li>{language === 'ko' ? '자기소개' : 'Giới thiệu bản thân'}</li>
                  <li>{language === 'ko' ? '관심 카테고리' : 'Danh mục quan tâm'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">{language === 'ko' ? '자동 수집 항목' : 'Mục thu thập tự động'}</h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>{language === 'ko' ? 'IP 주소' : 'Địa chỉ IP'}</li>
                  <li>{language === 'ko' ? '쿠키' : 'Cookie'}</li>
                  <li>{language === 'ko' ? '서비스 이용 기록' : 'Lịch sử sử dụng dịch vụ'}</li>
                  <li>{language === 'ko' ? '기기 정보' : 'Thông tin thiết bị'}</li>
                  <li>{language === 'ko' ? '접속 로그' : 'Nhật ký truy cập'}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '3. 개인정보 수집 및 이용 목적' : '3. Mục đích thu thập và sử dụng thông tin cá nhân'}</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>{language === 'ko' ? <><strong>회원 관리:</strong> 회원가입, 본인 확인, 계정 관리, 고객 지원</> : <><strong>Quản lý thành viên:</strong> Đăng ký, xác minh danh tính, quản lý tài khoản, hỗ trợ khách hàng</>}</li>
              <li>{language === 'ko' ? <><strong>서비스 제공:</strong> 캠페인 매칭, 메시지 전송, 포인트 관리, 결제 및 정산</> : <><strong>Cung cấp dịch vụ:</strong> Kết nối chiến dịch, gửi tin nhắn, quản lý điểm, thanh toán và quyết toán</>}</li>
              <li>{language === 'ko' ? <><strong>마케팅:</strong> 신규 서비스 안내, 이벤트 정보 제공 (동의 시)</> : <><strong>Marketing:</strong> Thông báo dịch vụ mới, cung cấp thông tin sự kiện (khi đồng ý)</>}</li>
              <li>{language === 'ko' ? <><strong>서비스 개선:</strong> 통계 분석, 서비스 품질 향상</> : <><strong>Cải thiện dịch vụ:</strong> Phân tích thống kê, nâng cao chất lượng dịch vụ</>}</li>
              <li>{language === 'ko' ? <><strong>법적 의무 준수:</strong> 법령에 따른 의무 이행</> : <><strong>Tuân thủ nghĩa vụ pháp lý:</strong> Thực hiện nghĩa vụ theo quy định pháp luật</>}</li>
            </ul>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '4. 개인정보 보유 및 이용기간' : '4. Thời gian lưu trữ và sử dụng thông tin cá nhân'}</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>{language === 'ko' ? '회원 탈퇴 시까지 (단, 관련 법령에 따라 일정 기간 보관)' : 'Cho đến khi hủy thành viên (ngoại trừ thời gian bảo quản theo quy định pháp luật)'}</li>
              <li>{language === 'ko' ? '거래 관련 정보: 전자상거래법에 따라 5년 보관' : 'Thông tin giao dịch: Lưu trữ 5 năm theo Luật Thương mại điện tử'}</li>
              <li>{language === 'ko' ? '소비자 불만 및 분쟁 처리 기록: 3년 보관' : 'Hồ sơ khiếu nại và giải quyết tranh chấp của người tiêu dùng: Lưu trữ 3 năm'}</li>
              <li>{language === 'ko' ? '접속 로그 기록: 통신비밀보호법에 따라 3개월 보관' : 'Nhật ký truy cập: Lưu trữ 3 tháng theo Luật Bảo vệ Bí mật Truyền thông'}</li>
            </ul>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '5. 개인정보 파기 절차 및 방법' : '5. Quy trình và phương thức hủy thông tin cá nhân'}</h2>
            <div className="space-y-2">
              <p className="leading-relaxed">
                {language === 'ko' ? '이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다.' : 'Về nguyên tắc, thông tin cá nhân của người dùng sẽ được hủy ngay sau khi mục đích thu thập và sử dụng đạt được.'}
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>{language === 'ko' ? <><strong>파기 절차:</strong> 목적 달성 후 내부 방침에 따라 일정 기간 저장 후 파기</> : <><strong>Quy trình hủy:</strong> Lưu trữ một thời gian theo chính sách nội bộ sau khi đạt mục đích, sau đó hủy</>}</li>
                <li>{language === 'ko' ? <><strong>파기 방법:</strong> 전자적 파일은 복구 불가능한 방법으로 삭제, 종이 문서는 분쇄 또는 소각</> : <><strong>Phương thức hủy:</strong> Tệp điện tử bị xóa bằng phương pháp không thể phục hồi, tài liệu giấy bị nghiền hoặc đốt</>}</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '6. 개인정보 제3자 제공' : '6. Cung cấp thông tin cá nhân cho bên thứ ba'}</h2>
            <p className="leading-relaxed">
              {language === 'ko' ? '회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:' : 'Về nguyên tắc, Công ty không cung cấp thông tin cá nhân của người dùng cho bên thứ ba. Tuy nhiên, có các trường hợp ngoại lệ:'}
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>{language === 'ko' ? '이용자가 사전에 동의한 경우' : 'Khi người dùng đã đồng ý trước'}</li>
              <li>{language === 'ko' ? '법령에 따라 제공이 요구되는 경우' : 'Khi pháp luật yêu cầu cung cấp'}</li>
              <li>{language === 'ko' ? '캠페인 수행을 위해 광고주와 인플루언서 간 최소한의 정보 공유가 필요한 경우' : 'Khi cần chia sẻ thông tin tối thiểu giữa nhà quảng cáo và influencer để thực hiện chiến dịch'}</li>
            </ul>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '7. 개인정보 처리 위탁' : '7. Ủy thác xử lý thông tin cá nhân'}</h2>
            <p className="leading-relaxed">
              {language === 'ko' ? '회사는 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁하고 있습니다:' : 'Công ty ủy thác xử lý thông tin cá nhân cho các bên sau để cung cấp dịch vụ:'}
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>{language === 'ko' ? '결제 처리: VNPay, MoMo (결제 정보 처리)' : 'Xử lý thanh toán: VNPay, MoMo (xử lý thông tin thanh toán)'}</li>
              <li>{language === 'ko' ? '클라우드 서비스: AWS, Google Cloud (데이터 저장)' : 'Dịch vụ đám mây: AWS, Google Cloud (lưu trữ dữ liệu)'}</li>
              <li>{language === 'ko' ? '이메일 발송: SendGrid (알림 메일 발송)' : 'Gửi email: SendGrid (gửi thông báo email)'}</li>
            </ul>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '8. 이용자의 권리' : '8. Quyền của người dùng'}</h2>
            <p className="leading-relaxed">
              {language === 'ko' ? '이용자는 언제든지 다음의 권리를 행사할 수 있습니다:' : 'Người dùng có thể thực hiện các quyền sau bất cứ lúc nào:'}
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>{language === 'ko' ? '개인정보 열람 요구' : 'Yêu cầu xem thông tin cá nhân'}</li>
              <li>{language === 'ko' ? '개인정보 정정 요구' : 'Yêu cầu chỉnh sửa thông tin cá nhân'}</li>
              <li>{language === 'ko' ? '개인정보 삭제 요구' : 'Yêu cầu xóa thông tin cá nhân'}</li>
              <li>{language === 'ko' ? '개인정보 처리 정지 요구' : 'Yêu cầu dừng xử lý thông tin cá nhân'}</li>
              <li>{language === 'ko' ? '개인정보 수집 및 이용 동의 철회' : 'Rút lại sự đồng ý thu thập và sử dụng thông tin cá nhân'}</li>
            </ul>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '9. 개인정보 보호책임자' : '9. Người chịu trách nhiệm bảo vệ thông tin cá nhân'}</h2>
            <p className="leading-relaxed">
              {language === 'ko' ? '개인정보 보호와 관련된 문의사항은 아래 개인정보 보호책임자에게 연락 주시기 바랍니다:' : 'Vui lòng liên hệ với người chịu trách nhiệm bảo vệ thông tin cá nhân dưới đây nếu có câu hỏi:'}
            </p>
            <div className="pl-4 space-y-1">
              <p>{language === 'ko' ? '개인정보 보호책임자' : 'Người chịu trách nhiệm'}: Privacy Officer</p>
              <p>{language === 'ko' ? '이메일' : 'Email'}: privacy@exfluencervn.com</p>
              <p>{language === 'ko' ? '전화' : 'Điện thoại'}: +84 (0)28 xxxx xxxx</p>
            </div>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '10. 쿠키 사용' : '10. Sử dụng Cookie'}</h2>
            <p className="leading-relaxed">
              {language === 'ko' ? '회사는 서비스 제공을 위해 쿠키를 사용합니다. 이용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있으나, 이 경우 서비스 이용에 제한이 있을 수 있습니다.' : 'Công ty sử dụng cookie để cung cấp dịch vụ. Người dùng có thể từ chối sử dụng cookie thông qua cài đặt trình duyệt, nhưng trong trường hợp này, việc sử dụng dịch vụ có thể bị hạn chế.'}
            </p>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '11. 개인정보 보호를 위한 기술적 조치' : '11. Biện pháp kỹ thuật để bảo vệ thông tin cá nhân'}</h2>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>{language === 'ko' ? '비밀번호 암호화 저장' : 'Lưu trữ mật khẩu được mã hóa'}</li>
              <li>{language === 'ko' ? 'SSL/TLS를 통한 통신 암호화' : 'Mã hóa truyền thông qua SSL/TLS'}</li>
              <li>{language === 'ko' ? '개인정보 접근 권한 관리' : 'Quản lý quyền truy cập thông tin cá nhân'}</li>
              <li>{language === 'ko' ? '보안 프로그램 운영' : 'Vận hành chương trình bảo mật'}</li>
              <li>{language === 'ko' ? '정기적인 보안 점검' : 'Kiểm tra bảo mật định kỳ'}</li>
            </ul>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '12. 개인정보 처리방침 변경' : '12. Thay đổi chính sách bảo mật'}</h2>
            <p className="leading-relaxed">
              {language === 'ko' ? <>본 개인정보 처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용이 변경될 수 있습니다. 변경 시 서비스 내 공지사항을 통해 공지하며, 중요한 변경사항의 경우 이메일로 개별 통지합니다.</> : <>Chính sách bảo mật này có thể được thay đổi theo sự thay đổi của luật pháp, chính sách hoặc công nghệ bảo mật. Khi thay đổi, sẽ được thông báo qua mục thông báo trong dịch vụ, và đối với những thay đổi quan trọng, sẽ thông báo riêng qua email.</>}
            </p>
          </section>

          <div className="pt-6 pb-safe-bottom">
            <Link href="/auth/register" className="btn btn-primary w-full">
              {language === 'ko' ? '개인정보 처리방침에 동의하고 계속하기' : 'Đồng ý với chính sách bảo mật và tiếp tục'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
