# 📱 페이스북/SNS 공유 최적화 가이드

## ✅ 완료된 작업

### 1. **Open Graph 메타 태그 설정**

모든 주요 페이지에 SNS 공유 최적화를 위한 메타 태그가 추가되었습니다.

### 2. **동적 OG 이미지 생성 API 구현** ✨

Next.js의 ImageResponse를 사용하여 **실시간으로 OG 이미지를 생성하는 API 라우트**를 구현했습니다.
이제 정적 이미지 파일 대신 동적으로 생성된 이미지가 페이스북/SNS 공유 시 표시됩니다.

#### 구현된 API 라우트
- ✅ `/api/og/korea-dream` - Korea Dream 응모권 이미지
- ✅ `/api/og/shop` - 포인트 상점 이미지
- ✅ `/api/og/referral` - 친구 초대 이미지
- ✅ `/api/og/campaign` - 캠페인 상세 이미지 (동적 파라미터 지원)
- ✅ `/api/og/default` - 기본 이미지

#### 동적 OG 이미지의 장점
- 🚀 **자동 생성**: 이미지 파일을 수동으로 만들 필요 없음
- 🎨 **일관성**: 코드로 관리되어 디자인 일관성 보장
- 🔄 **실시간 업데이트**: 캠페인 정보 변경 시 이미지도 자동 반영
- ⚡ **빠른 로딩**: Edge Runtime으로 전세계 어디서나 빠른 생성
- 💰 **비용 절감**: 수백 개의 캠페인 이미지를 개별 생성할 필요 없음

#### 적용된 페이지
- ✅ 캠페인 상세 (`/jobs/[id]`)
- ✅ Korea Dream 응모권 (`/korea-dream`)
- ✅ 포인트 상점 (`/shop`)
- ✅ 친구 초대 (`/referral`)

---

## 🎨 페이스북 공유 시 보이는 화면

### 예시 1: Korea Dream 응모권

```
페이스북에 링크 붙여넣기:
https://exfluencer.vn/korea-dream

↓ 자동으로 생성되는 카드

┌───────────────────────────────────┐
│ [큰 이미지: Korea Dream 배너]      │
│                                    │
│ 🇰🇷 KOREA DREAM                   │
│ 한국 뷰티 체험 여행 응모권          │
│                                    │
│ 왕복 항공 + 4박5일 + 뷰티 시술 +   │
│ 쇼핑 지원! 총 가치 50,000,000 VND. │
│ 지금 응모하고 한국에서 만나요! ✈️   │
│                                    │
│ EXFLUENCER.VN                      │
└───────────────────────────────────┘
```

### 예시 2: 친구 초대

```
페이스북 메시지로 전송:
https://exfluencer.vn/referral?ref=KIMMINSU2024

↓ 미리보기

┌───────────────────────────────────┐
│ [이미지: 친구 초대 배너]           │
│                                    │
│ 💰 친구 초대하고 평생 수익!        │
│ 응모권 5장 무료                    │
│                                    │
│ 친구 1명 초대 시 30,000 SP +       │
│ 응모권 5장 무료! 친구가 캠페인 할   │
│ 때마다 5% 평생 자동 수익! 🚀       │
│                                    │
│ EXFLUENCER.VN                      │
└───────────────────────────────────┘
```

---

## 🛠️ 기술 구현

### SocialMetaTags 컴포넌트

각 페이지에서 사용하는 동적 메타 태그 컴포넌트:

```tsx
<SocialMetaTags
  title="페이지 제목"
  description="설명 (155자 이내 권장)"
  image="https://exfluencer.vn/og-image.png"
  url={window.location.href}
  type="article"
  price={50000000}  // 선택 (상품일 경우)
  currency="VND"
/>
```

#### 설정되는 메타 태그

```html
<!-- Open Graph (페이스북, 메신저) -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:url" content="..." />
<meta property="og:type" content="article" />
<meta property="og:locale" content="vi_VN" />

<!-- 상품 정보 (선택) -->
<meta property="product:price:amount" content="50000000" />
<meta property="product:price:currency" content="VND" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />

<!-- Zalo (베트남 SNS) -->
<meta property="zalo:title" content="..." />
<meta property="zalo:description" content="..." />
<meta property="zalo:image" content="..." />
```

---

## 🔧 동적 OG 이미지 API 사용법

### 기본 사용

각 페이지에서 API 라우트를 OG 이미지로 사용합니다:

```tsx
<SocialMetaTags
  title="페이지 제목"
  description="설명"
  image={`${window.location.origin}/api/og/korea-dream`}
  url={window.location.href}
/>
```

### 동적 파라미터 전달 (캠페인 페이지)

캠페인 상세 페이지는 URL 파라미터로 동적 정보를 전달합니다:

```tsx
<SocialMetaTags
  title={`${job.title} - ${job.company}`}
  description={job.description}
  image={`${window.location.origin}/api/og/campaign?title=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}&budget=${job.budget}`}
  url={window.location.href}
/>
```

이렇게 하면 각 캠페인마다 **고유한 OG 이미지**가 실시간으로 생성됩니다!

### API 라우트 예시

**Korea Dream 이미지 생성**
```
https://exfluencer.vn/api/og/korea-dream
→ 1200x630 PNG 이미지 반환
```

**캠페인 이미지 생성 (파라미터 포함)**
```
https://exfluencer.vn/api/og/campaign?title=신규%20스킨케어%20제품%20광고&company=Beauty%20Brand&budget=500000
→ 캠페인 정보가 반영된 맞춤 이미지 반환
```

### 이미지 커스터마이징

API 라우트 파일(`/app/api/og/*/route.tsx`)을 수정하여 이미지 디자인을 변경할 수 있습니다:
- 색상 변경
- 폰트 크기 조정
- 레이아웃 변경
- 아이콘/이모지 추가

---

## 🖼️ OG 이미지 요구사항

### 페이스북 권장 사이즈
- **최적 크기**: 1200 x 630 픽셀
- **최소 크기**: 600 x 315 픽셀
- **비율**: 1.91:1
- **포맷**: JPG, PNG
- **최대 크기**: 8MB

### ~~만들어야 할 이미지들~~ → ✅ 자동 생성됨!

**주의**: 아래 이미지들은 이제 **수동으로 만들 필요가 없습니다**.
API 라우트가 자동으로 생성합니다. 아래는 참고용 디자인 가이드입니다.

#### 1. `/api/og/korea-dream` (자동 생성)
```
┌─────────────────────────────────────┐
│                                      │
│   🇰🇷 KOREA DREAM                   │
│   한국 뷰티 체험 여행                 │
│                                      │
│   ✈️ 왕복 항공                       │
│   🏨 4박5일 호텔                     │
│   💆 뷰티 시술                        │
│   🛍️ 쇼핑 지원금                     │
│                                      │
│   총 가치: 50,000,000 VND            │
│                                      │
│   [로고] EXFLUENCER.VN               │
└─────────────────────────────────────┘
```

#### 2. `/api/og/shop` (자동 생성)
```
┌─────────────────────────────────────┐
│                                      │
│   🛍️ 포인트 상점                     │
│   응모권으로 경품 받자!               │
│                                      │
│   📱 iPhone 15 Pro Max               │
│   💻 MacBook Pro M3                  │
│   💰 현금 10M VND                    │
│                                      │
│   [로고] EXFLUENCER.VN               │
└─────────────────────────────────────┘
```

#### 3. `/api/og/referral` (자동 생성)
```
┌─────────────────────────────────────┐
│                                      │
│   💰 친구 초대하고 평생 수익!         │
│                                      │
│   🎁 친구 1명 초대 시:               │
│   • 30,000 SP                       │
│   • 응모권 5장 무료                  │
│                                      │
│   ⚡ 친구 캠페인 시 5% 평생 수익      │
│                                      │
│   [로고] EXFLUENCER.VN               │
└─────────────────────────────────────┘
```

#### 4. `/api/og/campaign` (자동 생성 + 동적 파라미터)
```
┌─────────────────────────────────────┐
│                                      │
│   📸 인플루언서 캠페인                │
│   {캠페인 제목}                       │
│                                      │
│   💰 보상: {금액} VND                │
│   📅 마감: {날짜}                     │
│                                      │
│   지금 바로 지원하세요!               │
│                                      │
│   [로고] EXFLUENCER.VN               │
└─────────────────────────────────────┘
```

#### 5. `/api/og/default` (자동 생성)
기본 이미지 (특정 페이지 이미지가 없을 때 사용)

```
┌─────────────────────────────────────┐
│                                      │
│   EXFLUENCER VN                      │
│   베트남 인플루언서 마케팅 플랫폼      │
│                                      │
│   📸 캠페인 만들기                    │
│   👥 인플루언서 찾기                  │
│   💰 함께 성장하기                    │
│                                      │
│   [큰 로고]                          │
└─────────────────────────────────────┘
```

---

## 🎨 디자인 가이드

### 색상
```css
주요 색상:
- Primary Red: #FF6B6B
- Secondary Teal: #4ECDC4
- Accent Yellow: #FFD93D
- Success Green: #10B981
- 배경: 그라데이션 (빨강→노랑→빨강)

텍스트:
- 제목: 흰색, 굵게, 크게
- 부제목: 밝은 회색
- 강조: 노란색/금색
```

### 폰트
```
- 제목: 굵은 폰트 (Bold/Black)
- 본문: 중간 폰트 (Medium)
- 크기: 큰 폰트 사용 (썸네일에서 잘 보여야 함)
```

### 이모지
```
많이 사용! 베트남 스타일
🇰🇷 ✈️ 💰 🎁 🛍️ 📱 💻 ⚡ 🔥 🎟️
```

---

## 🧪 테스트 방법

### 1. 페이스북 Sharing Debugger

**URL**: https://developers.facebook.com/tools/debug/

#### 사용법
1. 링크 입력: `https://exfluencer.vn/korea-dream`
2. **Scrape Again** 클릭 (캐시 새로고침)
3. 미리보기 확인

#### 체크 사항
- ✅ 이미지가 제대로 보이는지
- ✅ 제목이 잘려있지 않은지 (65자 이내)
- ✅ 설명이 매력적인지 (155자 이내)
- ✅ URL이 정확한지

#### 오류 발생 시
```
Errors That Must Be Fixed:
- og:image 크기가 600x315 미만
- 이미지 로딩 실패 (서버 문제)
- og:title 또는 og:description 누락

Warnings:
- 이미지 비율이 1.91:1이 아님
- 설명이 너무 김 (200자 이상)
```

### 2. LinkedIn Post Inspector

**URL**: https://www.linkedin.com/post-inspector/

### 3. Twitter Card Validator

**URL**: https://cards-dev.twitter.com/validator

---

## 📱 주요 SNS별 최적화

### 페이스북 (Facebook)
- ✅ Open Graph 태그
- ✅ 이미지 1200x630
- ✅ 제목 60자 이내
- ✅ 설명 155자 이내

### 메신저 (Facebook Messenger)
- ✅ 페이스북과 동일
- ✅ 작은 화면 고려 (제목 짧게)

### Zalo (베트남 #1 메신저)
- ✅ `zalo:*` 메타 태그
- ✅ 베트남어 설명 추가
- ✅ 밝고 화려한 이미지

### WhatsApp
- ✅ Open Graph 태그 사용
- ✅ 이미지 중요 (썸네일 크게 표시됨)

### KakaoTalk
- ✅ Open Graph 태그
- ✅ 한국어 제목/설명

---

## 🚀 동적 OG 이미지 생성 (선택 - 고급)

### Next.js API Route로 동적 생성

```typescript
// /app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Exfluencer VN';
  const price = searchParams.get('price');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)',
        }}
      >
        <h1 style={{ fontSize: 72, color: 'white' }}>{title}</h1>
        {price && <p style={{ fontSize: 48, color: 'white' }}>{price} VND</p>}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

#### 사용법
```tsx
<SocialMetaTags
  title="Korea Dream"
  description="..."
  image={`https://exfluencer.vn/api/og?title=${encodeURIComponent('Korea Dream')}&price=50000000`}
/>
```

---

## 📋 체크리스트

### ✅ OG 이미지 생성 (완료)
- ✅ `/api/og/default` - 자동 생성 API 구현
- ✅ `/api/og/korea-dream` - 자동 생성 API 구현
- ✅ `/api/og/shop` - 자동 생성 API 구현
- ✅ `/api/og/referral` - 자동 생성 API 구현
- ✅ `/api/og/campaign` - 자동 생성 API 구현 (동적 파라미터 지원)

### ✅ 페이지 OG 메타 태그 설정 (완료)
- ✅ korea-dream/page.tsx - API route 연결
- ✅ shop/page.tsx - API route 연결
- ✅ referral/page.tsx - API route 연결
- ✅ jobs/[id]/page.tsx - API route 연결 (동적)
- ✅ layout.tsx - 기본 OG 이미지 API route 연결

### 페이스북 테스트
- [ ] Korea Dream 페이지 테스트
- [ ] 상점 페이지 테스트
- [ ] 친구 초대 페이지 테스트
- [ ] 캠페인 페이지 테스트

### SNS별 테스트
- [ ] 페이스북 Sharing Debugger
- [ ] Zalo 공유 테스트
- [ ] WhatsApp 공유 테스트
- [ ] KakaoTalk 공유 테스트

---

## 💡 베스트 프랙티스

### 제목 (Title)
```
❌ 나쁜 예:
"Korea Dream"

✅ 좋은 예:
"🇰🇷 KOREA DREAM - 한국 뷰티 체험 여행 응모권 | Exfluencer VN"

이유:
- 이모지로 시선 끌기
- 구체적인 설명
- 브랜드명 포함
```

### 설명 (Description)
```
❌ 나쁜 예:
"응모권을 구매하세요"

✅ 좋은 예:
"왕복 항공 + 4박5일 + 뷰티 시술 + 쇼핑 지원! 총 가치 50,000,000 VND. 지금 응모하고 한국에서 만나요! ✈️"

이유:
- 구체적인 혜택
- 숫자로 가치 강조
- 행동 유도 (CTA)
- 이모지 활용
```

### 이미지
```
❌ 나쁜 예:
- 작은 텍스트
- 어두운 배경
- 복잡한 디자인

✅ 좋은 예:
- 큰 텍스트 (썸네일에서도 보임)
- 밝고 화려한 배경 (금색, 빨강)
- 단순하고 명확한 메시지
- 이모지 활용
```

---

## 🔧 문제 해결

### 이미지가 안 보일 때
```
1. 페이스북 Debugger에서 "Scrape Again" 클릭
2. 이미지 URL 직접 접속해서 확인
3. HTTPS 사용 확인 (HTTP는 안 됨)
4. 이미지 크기 확인 (최소 600x315)
5. Content-Type 확인 (image/png 또는 image/jpeg)
```

### 제목/설명이 업데이트 안 될 때
```
1. 페이스북 캐시 문제 → Debugger에서 Scrape Again
2. 메타 태그 확인 (페이지 소스 보기)
3. SocialMetaTags 컴포넌트 제대로 마운트됐는지 확인
4. 브라우저 개발자 도구에서 <head> 태그 확인
```

### 베트남어 깨질 때
```
1. UTF-8 인코딩 확인
2. HTML meta charset="UTF-8" 확인
3. og:locale="vi_VN" 확인
```

---

## 📚 참고 자료

### 공식 문서
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Next.js Open Graph Image Generation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)

### 도구
- [OG Image Generator](https://og-image.vercel.app/) - 온라인 생성기
- [Canva](https://www.canva.com/) - 디자인 도구
- [Figma](https://www.figma.com/) - 디자인 도구

---

## ✅ 완료!

이제 모든 주요 페이지의 링크를 SNS에 공유하면 **자동 생성된 예쁜 카드 형태**로 미리보기가 나타납니다!

### 구현 완료 내역
1. ✅ 메타 태그 설정 완료
2. ✅ OG 이미지 자동 생성 API 구현 (5개 라우트)
3. ✅ 모든 페이지에 API route 연결 완료
4. ✅ 동적 파라미터 지원 (캠페인 페이지)

### 권장 테스트 단계
1. ⏳ 페이스북 Sharing Debugger로 각 페이지 테스트
   - https://developers.facebook.com/tools/debug/
2. ⏳ 실제 SNS 공유 테스트
   - Zalo에서 링크 공유
   - Facebook 메신저에서 링크 공유
   - WhatsApp에서 링크 공유
3. ⏳ 모바일 디바이스에서 확인

**🎉 페이스북 공유 최적화 100% 완료!**

### 🚀 자동 생성의 장점
- 이미지 파일 수동 제작/업로드 **불필요**
- 캠페인마다 고유한 OG 이미지 **자동 생성**
- 디자인 변경이 필요하면 **코드만 수정**
- 전세계 어디서나 **빠른 로딩** (Edge Runtime)
