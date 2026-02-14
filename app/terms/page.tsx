'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-dark-700">
      <div className="container-mobile min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="btn-icon text-white">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-lg font-bold text-white">서비스 약관</h1>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-6 text-gray-300">
          <div className="text-sm text-gray-400">
            최종 수정일: 2024년 2월 12일
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. 서비스 이용약관</h2>
            <p className="leading-relaxed">
              Exfluencer VN(이하 "회사")이 제공하는 인플루언서 마케팅 플랫폼 서비스(이하 "서비스")를 이용해 주셔서 감사합니다.
              본 약관은 회사가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. 용어의 정의</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>"서비스"란 회사가 제공하는 인플루언서와 광고주를 연결하는 온라인 마케팅 플랫폼을 의미합니다.</li>
              <li>"회원"이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 의미합니다.</li>
              <li>"인플루언서"란 소셜미디어 플랫폼에서 콘텐츠를 생성하고 캠페인에 참여하는 회원을 의미합니다.</li>
              <li>"광고주"란 캠페인을 생성하고 인플루언서와 협업하는 회원을 의미합니다.</li>
              <li>"포인트"란 서비스 내에서 사용되는 가상 화폐로, 1 VI Point = 1 VND로 환산됩니다.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. 회원가입 및 계정</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>회원가입은 만 18세 이상만 가능합니다.</li>
              <li>회원은 정확하고 최신의 정보를 제공해야 합니다.</li>
              <li>회원은 계정 정보를 안전하게 관리할 책임이 있습니다.</li>
              <li>타인의 정보를 도용하거나 허위 정보를 제공할 경우 계정이 정지될 수 있습니다.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. 서비스 이용</h2>
            <p className="leading-relaxed">
              회원은 본 약관 및 관련 법령을 준수하며 서비스를 이용해야 합니다.
              다음 행위는 금지됩니다:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>허위 정보 또는 부정확한 정보 제공</li>
              <li>타인의 개인정보 무단 수집 또는 도용</li>
              <li>서비스의 정상적인 운영을 방해하는 행위</li>
              <li>불법적이거나 부적절한 콘텐츠 게시</li>
              <li>사기, 스팸 등 부정한 목적의 서비스 이용</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. 포인트 및 결제</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>인플루언서는 캠페인 완료 시 포인트를 지급받습니다.</li>
              <li>포인트는 베트남 동화(VND)로 출금 가능합니다.</li>
              <li>최소 출금 금액은 100,000 VND이며, 출금 시 2% 수수료가 부과됩니다.</li>
              <li>출금 처리는 영업일 기준 1-3일이 소요됩니다.</li>
              <li>부정한 방법으로 획득한 포인트는 회수될 수 있습니다.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. 캠페인 및 계약</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>광고주와 인플루언서 간의 캠페인 계약은 당사자 간 합의에 따릅니다.</li>
              <li>회사는 플랫폼을 제공할 뿐이며, 계약 이행의 당사자는 아닙니다.</li>
              <li>캠페인 관련 분쟁은 당사자 간 해결을 원칙으로 합니다.</li>
              <li>회사는 필요 시 중재 서비스를 제공할 수 있습니다.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">7. 지적재산권</h2>
            <p className="leading-relaxed">
              서비스에 포함된 모든 콘텐츠, 상표, 로고 등의 지적재산권은 회사에 귀속됩니다.
              회원이 게시한 콘텐츠의 저작권은 회원에게 있으나, 회사는 서비스 운영을 위해 해당 콘텐츠를 사용할 수 있습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">8. 면책사항</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>회사는 천재지변, 전쟁, 시스템 장애 등 불가항력으로 인한 서비스 중단에 대해 책임지지 않습니다.</li>
              <li>회원 간의 거래 및 분쟁에 대해 회사는 책임지지 않습니다.</li>
              <li>회원이 제공한 정보의 정확성에 대해 회사는 책임지지 않습니다.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">9. 계약 해지</h2>
            <p className="leading-relaxed">
              회원은 언제든지 계정을 삭제하고 서비스 이용을 중단할 수 있습니다.
              회사는 본 약관 위반 시 사전 통지 후 계정을 정지하거나 해지할 수 있습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">10. 약관의 변경</h2>
            <p className="leading-relaxed">
              회사는 필요 시 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지를 통해 고지됩니다.
              변경된 약관에 동의하지 않을 경우 회원은 서비스 이용을 중단할 수 있습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">11. 문의</h2>
            <p className="leading-relaxed">
              본 약관에 관한 문의사항이 있으시면 아래로 연락 주시기 바랍니다:
            </p>
            <div className="pl-4 space-y-1">
              <p>이메일: support@exfluencervn.com</p>
              <p>회사명: Exfluencer VN</p>
              <p>주소: Ho Chi Minh City, Vietnam</p>
            </div>
          </section>

          <div className="pt-6 pb-safe-bottom">
            <Link href="/auth/register" className="btn btn-primary w-full">
              약관에 동의하고 계속하기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
