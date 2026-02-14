'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-dark-700">
      <div className="container-mobile min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-dark-700 border-b border-dark-500 px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="btn-icon text-white">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-lg font-bold text-white">개인정보 처리방침</h1>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-6 text-gray-300">
          <div className="text-sm text-gray-400">
            최종 수정일: 2024년 2월 12일
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. 개인정보 처리방침</h2>
            <p className="leading-relaxed">
              Exfluencer VN(이하 "회사")은 이용자의 개인정보를 중요시하며, 개인정보 보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령을 준수하고 있습니다.
              본 개인정보 처리방침은 회사가 수집하는 개인정보의 항목, 수집 및 이용 목적, 보유 및 이용기간, 파기절차 등에 관한 사항을 알려드립니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. 수집하는 개인정보 항목</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-white mb-2">필수 수집 항목</h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>이메일 주소</li>
                  <li>비밀번호 (암호화 저장)</li>
                  <li>이름</li>
                  <li>전화번호</li>
                  <li>회사명 (광고주의 경우)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">선택 수집 항목</h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>프로필 사진</li>
                  <li>소셜미디어 계정 정보 (Instagram, TikTok, YouTube, Facebook)</li>
                  <li>은행 계좌 정보 (출금용)</li>
                  <li>자기소개</li>
                  <li>관심 카테고리</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">자동 수집 항목</h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>IP 주소</li>
                  <li>쿠키</li>
                  <li>서비스 이용 기록</li>
                  <li>기기 정보</li>
                  <li>접속 로그</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. 개인정보 수집 및 이용 목적</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>회원 관리:</strong> 회원가입, 본인 확인, 계정 관리, 고객 지원</li>
              <li><strong>서비스 제공:</strong> 캠페인 매칭, 메시지 전송, 포인트 관리, 결제 및 정산</li>
              <li><strong>마케팅:</strong> 신규 서비스 안내, 이벤트 정보 제공 (동의 시)</li>
              <li><strong>서비스 개선:</strong> 통계 분석, 서비스 품질 향상</li>
              <li><strong>법적 의무 준수:</strong> 법령에 따른 의무 이행</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. 개인정보 보유 및 이용기간</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>회원 탈퇴 시까지 (단, 관련 법령에 따라 일정 기간 보관)</li>
              <li>거래 관련 정보: 전자상거래법에 따라 5년 보관</li>
              <li>소비자 불만 및 분쟁 처리 기록: 3년 보관</li>
              <li>접속 로그 기록: 통신비밀보호법에 따라 3개월 보관</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. 개인정보 파기 절차 및 방법</h2>
            <div className="space-y-2">
              <p className="leading-relaxed">
                이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다.
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>파기 절차:</strong> 목적 달성 후 내부 방침에 따라 일정 기간 저장 후 파기</li>
                <li><strong>파기 방법:</strong> 전자적 파일은 복구 불가능한 방법으로 삭제, 종이 문서는 분쇄 또는 소각</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. 개인정보 제3자 제공</h2>
            <p className="leading-relaxed">
              회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
              다만, 다음의 경우에는 예외로 합니다:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령에 따라 제공이 요구되는 경우</li>
              <li>캠페인 수행을 위해 광고주와 인플루언서 간 최소한의 정보 공유가 필요한 경우</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">7. 개인정보 처리 위탁</h2>
            <p className="leading-relaxed">
              회사는 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁하고 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>결제 처리: VNPay, MoMo (결제 정보 처리)</li>
              <li>클라우드 서비스: AWS, Google Cloud (데이터 저장)</li>
              <li>이메일 발송: SendGrid (알림 메일 발송)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">8. 이용자의 권리</h2>
            <p className="leading-relaxed">
              이용자는 언제든지 다음의 권리를 행사할 수 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>개인정보 열람 요구</li>
              <li>개인정보 정정 요구</li>
              <li>개인정보 삭제 요구</li>
              <li>개인정보 처리 정지 요구</li>
              <li>개인정보 수집 및 이용 동의 철회</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">9. 개인정보 보호책임자</h2>
            <p className="leading-relaxed">
              개인정보 보호와 관련된 문의사항은 아래 개인정보 보호책임자에게 연락 주시기 바랍니다:
            </p>
            <div className="pl-4 space-y-1">
              <p>개인정보 보호책임자: Privacy Officer</p>
              <p>이메일: privacy@exfluencervn.com</p>
              <p>전화: +84 (0)28 xxxx xxxx</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">10. 쿠키 사용</h2>
            <p className="leading-relaxed">
              회사는 서비스 제공을 위해 쿠키를 사용합니다. 이용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있으나, 이 경우 서비스 이용에 제한이 있을 수 있습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">11. 개인정보 보호를 위한 기술적 조치</h2>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>비밀번호 암호화 저장</li>
              <li>SSL/TLS를 통한 통신 암호화</li>
              <li>개인정보 접근 권한 관리</li>
              <li>보안 프로그램 운영</li>
              <li>정기적인 보안 점검</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">12. 개인정보 처리방침 변경</h2>
            <p className="leading-relaxed">
              본 개인정보 처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용이 변경될 수 있습니다.
              변경 시 서비스 내 공지사항을 통해 공지하며, 중요한 변경사항의 경우 이메일로 개별 통지합니다.
            </p>
          </section>

          <div className="pt-6 pb-safe-bottom">
            <Link href="/auth/register" className="btn btn-primary w-full">
              개인정보 처리방침에 동의하고 계속하기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
