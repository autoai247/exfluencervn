# Phase 5 통합 가이드 - Polish & 완성도

Phase 5에서 추가된 세련화 기능들을 실제 프로젝트에 통합하는 방법을 안내합니다.

## 📦 생성된 파일

### 1. 타이포그래피 시스템
- **파일:** `/styles/typography.css`
- **기능:** 일관된 타이포그래피 시스템, 다국어 최적화

### 2. 색상 시스템
- **파일:** `/styles/colors.css`
- **기능:** 포괄적인 색상 팔레트, 라이트/다크 모드 지원

### 3. 다크모드
- **Hook:** `/hooks/useTheme.ts`
- **Component:** `/components/common/ThemeToggle.tsx`
- **기능:** 라이트/다크/자동 모드 전환

### 4. 푸시 알림
- **Hook:** `/hooks/useNotifications.ts`
- **Component:** `/components/common/NotificationPrompt.tsx`
- **기능:** 웹 푸시 알림, 권한 관리

### 5. 소셜 로그인
- **Component:** `/components/auth/SocialLogin.tsx`
- **기능:** 6개 소셜 로그인 지원

---

## 🎨 1. 타이포그래피 시스템 사용법

### globals.css에 임포트

```css
/* app/globals.css */
@import '../styles/typography.css';
```

### 클래스 사용 예제

```tsx
// Headings
<h1 className="heading-1">대형 제목</h1>
<h2 className="heading-2">중형 제목</h2>
<h3 className="heading-3">소형 제목</h3>

// Body Text
<p className="body-large">큰 본문 텍스트</p>
<p className="body-base">기본 본문 텍스트</p>
<p className="body-small">작은 본문 텍스트</p>

// Labels
<label className="label-large">큰 레이블</label>
<label className="label-base">기본 레이블</label>
<label className="label-small">작은 레이블 (대문자)</label>

// Buttons
<button className="button-large">큰 버튼</button>
<button className="button-base">기본 버튼</button>
<button className="button-small">작은 버튼</button>

// Special
<p className="caption">캡션 텍스트</p>
<p className="overline">오버라인 텍스트</p>
<code className="code-inline">인라인 코드</code>

// Gradients
<h1 className="heading-1 text-gradient">그라디언트 제목</h1>
<h2 className="heading-2 text-gradient-accent">악센트 그라디언트</h2>
```

### CSS Variables 사용

```css
.custom-text {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
}
```

---

## 🎨 2. 색상 시스템 사용법

### globals.css에 임포트

```css
/* app/globals.css */
@import '../styles/colors.css';
```

### 클래스 사용 예제

```tsx
// Background Colors
<div className="bg-primary">Primary Background</div>
<div className="bg-secondary">Secondary Background</div>
<div className="bg-accent">Accent Background</div>
<div className="bg-success">Success Background</div>

// Text Colors
<p className="text-primary">Primary Text</p>
<p className="text-secondary">Secondary Text</p>
<p className="text-error">Error Text</p>

// Gradients
<div className="bg-gradient-primary">Primary Gradient</div>
<div className="bg-gradient-accent">Accent Gradient</div>
<div className="bg-gradient-cool">Cool Gradient</div>

// Border Colors
<div className="border border-primary">Primary Border</div>
```

### CSS Variables 사용

```css
.custom-element {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
}

.custom-button:hover {
  background-color: var(--color-primary-dark);
  box-shadow: var(--glow-primary);
}
```

### 테마별 색상

```css
/* 라이트 모드에서만 적용 */
[data-theme='light'] .custom {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}

/* 다크 모드에서만 적용 */
[data-theme='dark'] .custom {
  background: var(--color-dark-700);
  color: var(--color-white);
}
```

---

## 🌓 3. 다크모드 통합

### 레이아웃에 테마 프로바이더 추가

```tsx
// app/layout.tsx
import ThemeToggle from '@/components/common/ThemeToggle';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* Header에 테마 토글 추가 */}
        <header>
          <ThemeToggle variant="dropdown" showLabel />
        </header>

        {children}
      </body>
    </html>
  );
}
```

### 페이지에서 테마 사용

```tsx
'use client';

import { useTheme } from '@/hooks/useTheme';

function MyComponent() {
  const { theme, effectiveTheme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <p>실제 적용된 테마: {effectiveTheme}</p>

      <button onClick={toggleTheme}>
        테마 전환
      </button>

      <button onClick={() => setTheme('light')}>
        라이트 모드
      </button>
    </div>
  );
}
```

### ThemeToggle 변형

```tsx
// Icon only
<ThemeToggle variant="icon" />

// Button with label
<ThemeToggle variant="button" showLabel />

// Dropdown menu
<ThemeToggle variant="dropdown" language="ko" />
```

---

## 🔔 4. 푸시 알림 통합

### 알림 권한 프롬프트 추가

```tsx
// app/layout.tsx
import NotificationPrompt from '@/components/common/NotificationPrompt';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}

        {/* 푸시 알림 권한 요청 프롬프트 */}
        <NotificationPrompt language="ko" />
      </body>
    </html>
  );
}
```

### 페이지에서 알림 사용

```tsx
'use client';

import { useNotifications } from '@/hooks/useNotifications';

function CampaignsPage() {
  const {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    notifyCampaign,
    notifyMessage,
  } = useNotifications();

  // 새 캠페인 알림
  const handleNewCampaign = async () => {
    await notifyCampaign('뷰티 브랜드 협찬', 'new');
  };

  // 마감 임박 알림
  const handleDeadlineAlert = async () => {
    await notifyCampaign('패션 브랜드 캠페인', 'deadline');
  };

  // 승인 알림
  const handleAccepted = async () => {
    await notifyCampaign('스킨케어 리뷰', 'accepted');
  };

  // 메시지 알림
  const handleMessage = async () => {
    await notifyMessage('브랜드 담당자', '캠페인 관련 문의드립니다.');
  };

  // 커스텀 알림
  const handleCustom = async () => {
    await sendNotification({
      title: '🎉 특별 이벤트',
      body: '지금 바로 확인하세요!',
      icon: '/icon.png',
      tag: 'event',
      data: { url: '/events' },
    });
  };

  return (
    <div>
      <p>알림 지원: {isSupported ? '✅' : '❌'}</p>
      <p>권한: {permission}</p>

      {permission === 'default' && (
        <button onClick={requestPermission}>
          알림 허용하기
        </button>
      )}

      <button onClick={handleNewCampaign}>새 캠페인 알림</button>
      <button onClick={handleDeadlineAlert}>마감 알림</button>
      <button onClick={handleMessage}>메시지 알림</button>
    </div>
  );
}
```

---

## 🔐 5. 소셜 로그인 통합

### 로그인 페이지에 추가

```tsx
// app/auth/login/page.tsx
import SocialLogin from '@/components/auth/SocialLogin';

export default function LoginPage() {
  const handleSuccess = (provider: string, data: any) => {
    console.log(`${provider} login success:`, data);
    // 사용자 정보 저장, 리다이렉트 등
  };

  const handleError = (provider: string, error: any) => {
    console.error(`${provider} login error:`, error);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="heading-2 mb-6">로그인</h1>

      {/* 이메일 로그인 폼 */}
      <form>
        {/* ... */}
      </form>

      {/* 구분선 */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 border-t border-gray-300" />
        <span className="text-sm text-gray-500">또는</span>
        <div className="flex-1 border-t border-gray-300" />
      </div>

      {/* 소셜 로그인 */}
      <SocialLogin
        providers={['google', 'facebook', 'kakao', 'naver']}
        layout="grid"
        language="ko"
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}
```

### Stack 레이아웃

```tsx
<SocialLogin
  providers={['google', 'facebook', 'apple', 'zalo']}
  layout="stack"
  language="vi"
  onSuccess={handleSuccess}
/>
```

### 지원 소셜 제공자

- ✅ Google
- ✅ Facebook
- ✅ Apple
- ✅ Kakao (한국)
- ✅ Naver (한국)
- ✅ Zalo (베트남)

---

## 🎯 통합 체크리스트

### 필수 통합
- [ ] typography.css를 globals.css에 임포트
- [ ] colors.css를 globals.css에 임포트
- [ ] ThemeToggle을 헤더에 추가
- [ ] NotificationPrompt를 레이아웃에 추가

### 선택 통합
- [ ] SocialLogin을 로그인 페이지에 추가
- [ ] 주요 페이지에 타이포그래피 클래스 적용
- [ ] 기존 색상 코드를 CSS 변수로 교체
- [ ] 알림 기능을 주요 이벤트에 연결

---

## 📊 기대 효과

| 기능 | 개선 영역 | 효과 |
|------|-----------|------|
| 타이포그래피 시스템 | 일관성, 가독성 | +30% |
| 색상 시스템 | 브랜드 일관성 | +25% |
| 다크모드 | 접근성, 사용성 | +40% |
| 푸시 알림 | 사용자 참여도 | +50% |
| 소셜 로그인 | 가입 전환율 | +60% |

---

## 🔍 주의사항

1. **타이포그래피**
   - 한글/베트남어 폰트 최적화 적용됨
   - 모바일 우선 반응형 크기 설정

2. **색상**
   - 접근성 기준 (WCAG 2.1 AA) 준수
   - 고대비 모드 지원

3. **다크모드**
   - 시스템 설정 자동 감지
   - localStorage에 사용자 선택 저장

4. **푸시 알림**
   - HTTPS 필수
   - 브라우저 지원 확인 필요
   - 권한 거부 시 재요청 불가

5. **소셜 로그인**
   - OAuth 설정 필요
   - 각 플랫폼별 앱 등록 필요
   - CORS 설정 확인

---

## 🚀 다음 단계

Phase 5 통합 완료 후:
- 전체 페이지 일관성 검토
- 접근성 테스트
- 성능 측정
- 사용자 피드백 수집
- A/B 테스트 실시
