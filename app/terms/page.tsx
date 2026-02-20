'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage, LanguageSelector } from '@/lib/i18n/LanguageContext';

export default function TermsPage() {
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
              <h1 className="text-lg font-bold text-white">{t.homepage.termsLink}</h1>
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
              {language === 'ko' ? '1. 서비스 이용약관' : '1. Điều khoản sử dụng dịch vụ'}
            </h2>
            <p className="leading-relaxed">
              {language === 'ko'
                ? 'Exfluencer VN(이하 "회사")이 제공하는 인플루언서 마케팅 플랫폼 서비스(이하 "서비스")를 이용해 주셔서 감사합니다. 본 약관은 회사가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.'
                : 'Cảm ơn bạn đã sử dụng dịch vụ nền tảng tiếp thị influencer (sau đây gọi là "Dịch vụ") do Exfluencer VN (sau đây gọi là "Công ty") cung cấp. Điều khoản này nhằm quy định về quyền, nghĩa vụ và trách nhiệm giữa Công ty và người dùng liên quan đến việc sử dụng Dịch vụ.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              {language === 'ko' ? '2. 용어의 정의' : '2. Định nghĩa thuật ngữ'}
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>{language === 'ko'
                ? '"서비스"란 회사가 제공하는 인플루언서와 광고주를 연결하는 온라인 마케팅 플랫폼을 의미합니다.'
                : '"Dịch vụ" là nền tảng tiếp thị trực tuyến kết nối influencer và nhà quảng cáo do Công ty cung cấp.'}</li>
              <li>{language === 'ko'
                ? '"회원"이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 의미합니다.'
                : '"Thành viên" là người đồng ý với điều khoản này và ký hợp đồng sử dụng dịch vụ với Công ty.'}</li>
              <li>{language === 'ko'
                ? '"인플루언서"란 소셜미디어 플랫폼에서 콘텐츠를 생성하고 캠페인에 참여하는 회원을 의미합니다.'
                : '"Influencer" là thành viên tạo nội dung trên nền tảng mạng xã hội và tham gia các chiến dịch.'}</li>
              <li>{language === 'ko'
                ? '"광고주"란 캠페인을 생성하고 인플루언서와 협업하는 회원을 의미합니다.'
                : '"Nhà quảng cáo" là thành viên tạo chiến dịch và hợp tác với influencer.'}</li>
              <li>{language === 'ko'
                ? '"포인트"란 서비스 내에서 사용되는 가상 화폐로, 1 VI Point = 1 VND로 환산됩니다.'
                : '"Điểm" là tiền ảo được sử dụng trong dịch vụ, được quy đổi 1 VI Point = 1 VND.'}</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              {language === 'ko' ? '3. 회원가입 및 계정' : '3. Đăng ký thành viên và tài khoản'}
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>{language === 'ko' ? '회원가입은 만 18세 이상만 가능합니다.' : 'Chỉ người từ 18 tuổi trở lên mới có thể đăng ký thành viên.'}</li>
              <li>{language === 'ko' ? '회원은 정확하고 최신의 정보를 제공해야 합니다.' : 'Thành viên phải cung cấp thông tin chính xác và mới nhất.'}</li>
              <li>{language === 'ko' ? '회원은 계정 정보를 안전하게 관리할 책임이 있습니다.' : 'Thành viên có trách nhiệm quản lý thông tin tài khoản một cách an toàn.'}</li>
              <li>{language === 'ko' ? '타인의 정보를 도용하거나 허위 정보를 제공할 경우 계정이 정지될 수 있습니다.' : 'Tài khoản có thể bị đình chỉ nếu giả mạo thông tin của người khác hoặc cung cấp thông tin sai.'}</li>
            </ul>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '4. 서비스 이용' : '4. Sử dụng dịch vụ'}</h2>
            <p className="leading-relaxed">
              {language === 'ko' ? <>회원은 본 약관 및 관련 법령을 준수하며 서비스를 이용해야 합니다. 다음 행위는 금지됩니다:</> : <>Thành viên phải sử dụng dịch vụ tuân thủ các điều khoản này và pháp luật liên quan. Các hành vi sau bị cấm:</>}
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>{language === 'ko' ? '허위 정보 또는 부정확한 정보 제공' : 'Cung cấp thông tin sai hoặc không chính xác'}</li>
              <li>{language === 'ko' ? '타인의 개인정보 무단 수집 또는 도용' : 'Thu thập hoặc đánh cắp thông tin cá nhân của người khác trái phép'}</li>
              <li>{language === 'ko' ? '서비스의 정상적인 운영을 방해하는 행위' : 'Hành vi cản trở hoạt động bình thường của dịch vụ'}</li>
              <li>{language === 'ko' ? '불법적이거나 부적절한 콘텐츠 게시' : 'Đăng tải nội dung bất hợp pháp hoặc không phù hợp'}</li>
              <li>{language === 'ko' ? '사기, 스팸 등 부정한 목적의 서비스 이용' : 'Sử dụng dịch vụ cho mục đích gian lận, spam, v.v.'}</li>
            </ul>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '5. 포인트 및 결제' : '5. Điểm và thanh toán'}</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>{language === 'ko' ? '인플루언서는 캠페인 완료 시 포인트를 지급받습니다.' : 'Influencer nhận điểm khi hoàn thành chiến dịch.'}</li>
              <li>{language === 'ko' ? '포인트는 베트남 동화(VND)로 출금 가능합니다.' : 'Có thể rút điểm dưới dạng tiền Việt Nam (VND).'}</li>
              <li>{language === 'ko' ? '최소 출금 금액은 100,000 VND이며, 출금 시 2% 수수료가 부과됩니다.' : 'Số tiền rút tối thiểu là 100.000 VND, phí rút tiền là 2%.'}</li>
              <li>{language === 'ko' ? '출금 처리는 영업일 기준 1-3일이 소요됩니다.' : 'Xử lý rút tiền mất 1-3 ngày làm việc.'}</li>
              <li>{language === 'ko' ? '부정한 방법으로 획득한 포인트는 회수될 수 있습니다.' : 'Điểm nhận được bằng phương thức gian lận có thể bị thu hồi.'}</li>
            </ul>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '6. 캠페인 및 계약' : '6. Chiến dịch và hợp đồng'}</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>{language === 'ko' ? '광고주와 인플루언서 간의 캠페인 계약은 당사자 간 합의에 따릅니다.' : 'Hợp đồng chiến dịch giữa nhà quảng cáo và influencer được thực hiện theo thỏa thuận giữa các bên.'}</li>
              <li>{language === 'ko' ? '회사는 플랫폼을 제공할 뿐이며, 계약 이행의 당사자는 아닙니다.' : 'Công ty chỉ cung cấp nền tảng và không phải là bên thực hiện hợp đồng.'}</li>
              <li>{language === 'ko' ? '캠페인 관련 분쟁은 당사자 간 해결을 원칙으로 합니다.' : 'Tranh chấp liên quan đến chiến dịch về nguyên tắc được giải quyết giữa các bên.'}</li>
              <li>{language === 'ko' ? '회사는 필요 시 중재 서비스를 제공할 수 있습니다.' : 'Công ty có thể cung cấp dịch vụ hòa giải khi cần thiết.'}</li>
            </ul>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '7. 지적재산권' : '7. Quyền sở hữu trí tuệ'}</h2>
            <p className="leading-relaxed">
              {language === 'ko' ? <>서비스에 포함된 모든 콘텐츠, 상표, 로고 등의 지적재산권은 회사에 귀속됩니다. 회원이 게시한 콘텐츠의 저작권은 회원에게 있으나, 회사는 서비스 운영을 위해 해당 콘텐츠를 사용할 수 있습니다.</> : <>Quyền sở hữu trí tuệ của tất cả nội dung, thương hiệu, logo, v.v. trong dịch vụ thuộc về Công ty. Bản quyền nội dung thành viên đăng thuộc về thành viên, nhưng Công ty có thể sử dụng nội dung đó để vận hành dịch vụ.</>}
            </p>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '8. 면책사항' : '8. Miễn trách nhiệm'}</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>{language === 'ko' ? '회사는 천재지변, 전쟁, 시스템 장애 등 불가항력으로 인한 서비스 중단에 대해 책임지지 않습니다.' : 'Công ty không chịu trách nhiệm về việc gián đoạn dịch vụ do thiên tai, chiến tranh, sự cố hệ thống và các trường hợp bất khả kháng khác.'}</li>
              <li>{language === 'ko' ? '회원 간의 거래 및 분쟁에 대해 회사는 책임지지 않습니다.' : 'Công ty không chịu trách nhiệm về giao dịch và tranh chấp giữa các thành viên.'}</li>
              <li>{language === 'ko' ? '회원이 제공한 정보의 정확성에 대해 회사는 책임지지 않습니다.' : 'Công ty không chịu trách nhiệm về tính chính xác của thông tin thành viên cung cấp.'}</li>
            </ul>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '9. 계약 해지' : '9. Chấm dứt hợp đồng'}</h2>
            <p className="leading-relaxed">
              {language === 'ko' ? <>회원은 언제든지 계정을 삭제하고 서비스 이용을 중단할 수 있습니다. 회사는 본 약관 위반 시 사전 통지 후 계정을 정지하거나 해지할 수 있습니다.</> : <>Thành viên có thể xóa tài khoản và ngừng sử dụng dịch vụ bất cứ lúc nào. Công ty có thể đình chỉ hoặc chấm dứt tài khoản sau khi thông báo trước trong trường hợp vi phạm điều khoản này.</>}
            </p>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '10. 약관의 변경' : '10. Thay đổi điều khoản'}</h2>
            <p className="leading-relaxed">
              {language === 'ko' ? <>회사는 필요 시 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지를 통해 고지됩니다. 변경된 약관에 동의하지 않을 경우 회원은 서비스 이용을 중단할 수 있습니다.</> : <>Công ty có thể thay đổi điều khoản khi cần thiết, và điều khoản đã thay đổi sẽ được thông báo qua thông báo trong dịch vụ. Nếu không đồng ý với điều khoản đã thay đổi, thành viên có thể ngừng sử dụng dịch vụ.</>}
            </p>
          </section>

          <section className="space-y-3">
<h2 className="text-xl font-bold text-white">{language === 'ko' ? '11. 문의' : '11. Liên hệ'}</h2>
            <p className="leading-relaxed">
              {language === 'ko' ? '본 약관에 관한 문의사항이 있으시면 아래로 연락 주시기 바랍니다:' : 'Nếu có câu hỏi về điều khoản này, vui lòng liên hệ theo địa chỉ dưới đây:'}
            </p>
            <div className="pl-4 space-y-1">
              <p>{language === 'ko' ? '이메일' : 'Email'}: support@exfluencervn.com</p>
              <p>{language === 'ko' ? '회사명' : 'Tên công ty'}: Exfluencer VN</p>
              <p>{language === 'ko' ? '주소' : 'Địa chỉ'}: Ho Chi Minh City, Vietnam</p>
            </div>
          </section>

          <div className="pt-6 pb-safe-bottom">
            <Link href="/auth/register" className="btn btn-primary w-full">
              {language === 'ko' ? '약관에 동의하고 계속하기' : 'Đồng ý với điều khoản và tiếp tục'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
