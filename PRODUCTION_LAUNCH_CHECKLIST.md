# 🚀 ExFluencer VN - Production Launch Checklist

**마지막 업데이트:** 2026-02-15
**빌드 상태:** ✅ 컴파일 성공 / ❌ 프리렌더링 실패 (44 페이지)
**런칭 가능 여부:** ❌ NOT READY (1개 Critical Blocker)

---

## 📊 현재 상태 요약

### ✅ 성공한 항목
- TypeScript 컴파일: 성공
- Linting: 통과
- Type checking: 통과
- 정적 페이지 생성: 59/59 완료
- 4개 핵심 API 라우트 구현 완료:
  - `/api/campaigns` - 캠페인 CRUD
  - `/api/applications` - 지원 관리
  - `/api/verifications` - 사업자 인증
  - `/api/disputes` - 분쟁 관리

### ❌ 실패한 항목
- **Pre-rendering: 44개 페이지 실패**
  - 원인: Invalid Supabase URL
  - 영향: 모든 API 호출 실패, 페이지 로드 불가

---

## 🔴 CRITICAL BLOCKER (반드시 수정 필요)

### Blocker #1: Supabase 프로젝트 미설정

**현재 상태:**
```env
# .env.local (현재 - 플레이스홀더 값)
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here  ❌
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here  ❌
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here  ❌
```

**해결 방법:** (30분 소요)

#### Step 1: Supabase 프로젝트 생성 (5분)
1. https://supabase.com 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. 프로젝트 정보 입력:
   ```
   Name: exfluencer-vn
   Database Password: [강력한 비밀번호 - 꼭 저장!]
   Region: Southeast Asia (Singapore)
   Plan: Free
   ```
5. "Create new project" 클릭 후 2분 대기

#### Step 2: 데이터베이스 스키마 생성 (10분)
1. 왼쪽 사이드바 → "SQL Editor" 클릭
2. "New Query" 클릭
3. `/SUPABASE_SETUP.md` 파일 열기
4. SQL 스크립트 전체 복사 (라인 48부터 끝까지)
5. SQL Editor에 붙여넣고 "RUN" 클릭
6. ✅ Success 확인

#### Step 3: Storage 버킷 생성 (5분)
1. 왼쪽 사이드바 → "Storage" 클릭
2. "Create a new bucket" 클릭
3. 다음 4개 버킷 생성:
   ```
   campaign-images (Public)
   certificates (Private)
   content-submissions (Private)
   profile-avatars (Public)
   ```
4. 각 버킷의 "Policies" 설정 (SUPABASE_SETUP.md 참고)

#### Step 4: 환경 변수 복사 (2분)
1. Supabase 대시보드 → "Settings" → "API" 클릭
2. 다음 값들을 복사:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** (secret!) → `SUPABASE_SERVICE_ROLE_KEY`

3. `.env.local` 파일 수정:
   ```env
   # .env.local (수정 후)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   ```

#### Step 5: 빌드 재테스트 (2분)
```bash
npm run build
```

**예상 결과:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (59/59)
✓ Finalizing page optimization

Route (app)                                Size     First Load JS
┌ ○ /                                      ...KB          ...KB
└ ○ /auth/login                            ...KB          ...KB
...
```

**성공 조건:** "Export encountered errors" 메시지가 나타나지 않음

---

## ⚠️ HIGH PRIORITY (런칭 전 강력 권장)

### Priority #1: localStorage → API 마이그레이션

**현재 문제:**
- 14개 파일이 localStorage 사용 중
- 영향: 브라우저 간 데이터 공유 불가, 로그인 후에도 데이터 초기화

**영향받는 파일:**
1. `/app/main/influencer/campaigns/[id]/page.tsx`
2. `/app/main/advertiser/verification/page.tsx`
3. `/app/main/influencer/profile/page.tsx`
4. `/app/main/influencer/ranking/page.tsx`
5. `/app/settings/page.tsx`
6. `/app/main/influencer/page.tsx`
7. `/app/main/influencer/my-raffles/page.tsx`
8. `/app/main/influencer/korea-dream/page.tsx`
9. `/app/main/influencer/shop/page.tsx`
10. `/app/page.tsx`
11. `/app/auth/login/page.tsx`
12. `/app/main/influencer/points-stats/page.tsx`
13. `/app/main/influencer/shares/page.tsx`
14. `/app/main/influencer/attendance/page.tsx`

**수정 방법 예시:**

**Before (localStorage):**
```typescript
// ❌ 잘못된 방식
const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
```

**After (Supabase API):**
```typescript
// ✅ 올바른 방식
const supabase = createClient();
const { data: campaigns } = await supabase
  .from('campaigns')
  .select('*')
  .eq('status', 'recruiting');
```

**예상 소요 시간:** 각 파일당 5-10분 → 총 2-3시간

---

### Priority #2: 보안 강화

#### 2-1. Rate Limiting 추가
**현재:** 없음 (DDoS/무차별 대입 공격 취약)

**해결책:** (30분)
```bash
npm install @upstash/ratelimit @upstash/redis
```

`/middleware.ts` 생성:
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  return NextResponse.next();
}
```

#### 2-2. Input Sanitization 추가
**현재:** 없음 (XSS 공격 취약)

**해결책:** (20분)
```bash
npm install dompurify @types/dompurify
```

`/lib/sanitize.ts` 생성:
```typescript
import DOMPurify from 'dompurify';

export function sanitizeInput(dirty: string): string {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
}
```

**적용 대상:**
- `/app/api/campaigns/route.ts` (title, description)
- `/app/api/applications/route.ts` (message)
- `/app/api/disputes/route.ts` (reason, description)

---

### Priority #3: Error Handling 개선

#### 3-1. Error Boundaries 추가
**파일:** `/app/error.tsx` (신규 생성)
```typescript
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          오류가 발생했습니다
        </h2>
        <p className="text-gray-400 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-mint text-black px-6 py-3 rounded-xl font-bold"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
```

#### 3-2. Loading States 추가
**파일:** `/app/loading.tsx` (신규 생성)
```typescript
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-mint border-t-transparent" />
    </div>
  );
}
```

#### 3-3. Error Logging (Sentry)
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

---

### Priority #4: SEO 최적화

#### 4-1. Sitemap 생성
**파일:** `/app/sitemap.ts` (신규 생성)
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://exfluencer.vn',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://exfluencer.vn/auth/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ... 추가 페이지
  ];
}
```

#### 4-2. robots.txt 생성
**파일:** `/app/robots.ts` (신규 생성)
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://exfluencer.vn/sitemap.xml',
  };
}
```

---

## 🟡 MEDIUM PRIORITY (런칭 후 1주일 내)

### 1. 성능 최적화
- [ ] Bundle size 분석 (`npm run build -- --analyze`)
- [ ] axios 제거 (중복 - fetch 사용 중)
- [ ] lucide-react 트리쉐이킹
- [ ] 이미지 최적화 (next/image 활용)

### 2. 접근성 (Accessibility)
- [ ] axe DevTools로 WCAG 검사
- [ ] ARIA 라벨 추가 (버튼, 링크)
- [ ] 키보드 네비게이션 테스트
- [ ] 스크린 리더 호환성 확인

### 3. 테스트 코드 작성
- [ ] Jest + React Testing Library 설치
- [ ] API 라우트 유닛 테스트
- [ ] 컴포넌트 통합 테스트
- [ ] E2E 테스트 (Playwright)

---

## 📋 런칭 전 최종 체크리스트

### Infrastructure
- [ ] Supabase 프로젝트 생성 완료
- [ ] 데이터베이스 스키마 적용 완료
- [ ] Storage 버킷 4개 생성 완료
- [ ] 환경 변수 `.env.local` 설정 완료
- [ ] 프로덕션 환경 변수 `.env.production` 생성

### Build & Deploy
- [ ] `npm run build` 성공 (0 errors)
- [ ] Pre-rendering 성공 (44 페이지)
- [ ] Vercel/Netlify 배포 설정 완료
- [ ] 커스텀 도메인 연결 완료 (exfluencer.vn)
- [ ] SSL 인증서 발급 완료

### Security
- [ ] Rate limiting 적용
- [ ] Input sanitization 적용
- [ ] Row Level Security (RLS) 정책 검증
- [ ] 민감 정보 환경 변수 처리 확인
- [ ] CORS 설정 확인

### UX & Performance
- [ ] localStorage → API 마이그레이션 완료 (14 파일)
- [ ] Error boundaries 추가
- [ ] Loading states 추가
- [ ] 404 페이지 커스터마이징
- [ ] 모바일 반응형 테스트 (iPhone, Android)

### SEO & Analytics
- [ ] Sitemap 생성 및 제출
- [ ] robots.txt 설정
- [ ] Google Analytics 연동
- [ ] Open Graph 이미지 생성
- [ ] Meta tags 검증

### Legal & Compliance
- [ ] 이용약관 (/terms) 검토
- [ ] 개인정보처리방침 (/privacy) 검토
- [ ] 사업자 등록증 인증 플로우 테스트
- [ ] 결제 시스템 테스트 (베트남 현지 결제)

### QA Testing
- [ ] 회원가입 플로우 테스트
- [ ] 로그인/로그아웃 테스트
- [ ] 캠페인 생성 → 지원 → 선정 → 완료 전체 플로우
- [ ] 파일 업로드 테스트 (이미지, 사업자등록증)
- [ ] 알림 시스템 테스트
- [ ] 메시지 시스템 테스트
- [ ] 포인트 적립/사용 테스트
- [ ] 출금 요청 테스트

---

## 🚀 빠른 실행 명령어

### 개발 환경 시작
```bash
npm run dev
```

### 프로덕션 빌드 테스트
```bash
npm run build
npm start
```

### 타입 체크
```bash
npx tsc --noEmit
```

### Lint 검사
```bash
npm run lint
```

### Database Migration (Supabase)
```bash
# 로컬 Supabase CLI 설치 후
supabase db push
```

---

## 📞 문제 발생 시 체크 포인트

### 빌드 실패 시
1. `node_modules` 삭제 후 재설치: `rm -rf node_modules package-lock.json && npm install`
2. `.next` 캐시 삭제: `rm -rf .next`
3. TypeScript 에러 확인: `npx tsc --noEmit`

### Pre-rendering 실패 시
1. `.env.local` 환경 변수 확인 (Supabase URL 유효성)
2. Supabase 프로젝트 상태 확인 (대시보드에서 PAUSED 아닌지)
3. 네트워크 연결 확인 (방화벽/VPN)

### API 호출 실패 시
1. Supabase RLS 정책 확인
2. 브라우저 콘솔에서 CORS 에러 확인
3. Supabase 로그 확인 (대시보드 → Logs)

---

## 🎯 런칭 예상 일정

### 최소 기능 런칭 (MVP)
- **Supabase 설정만 완료:** 오늘 중 가능 (30분)
- **빌드 성공 확인:** 오늘 중 가능 (+10분)
- **Vercel 배포:** 오늘 중 가능 (+20분)
- **총 소요 시간:** 1시간

### 완전한 프로덕션 런칭
- **localStorage 마이그레이션:** 2-3시간
- **보안 강화:** 1시간
- **Error handling:** 30분
- **SEO 최적화:** 1시간
- **QA 테스트:** 2-3시간
- **총 소요 시간:** 1-2일

---

## 📈 런칭 후 모니터링

### 필수 지표
- [ ] 일일 활성 사용자 (DAU)
- [ ] 회원가입 전환율
- [ ] 캠페인 생성 건수
- [ ] 지원 건수
- [ ] 평균 응답 시간
- [ ] 에러 발생률 (Sentry)
- [ ] 페이지 로딩 속도 (Lighthouse)

### 주간 리뷰
- [ ] Supabase 사용량 확인 (Free tier: 500MB DB, 1GB Storage)
- [ ] API 호출 횟수 확인
- [ ] 사용자 피드백 수집
- [ ] 버그 리포트 확인

---

**마지막 업데이트:** 2026-02-15
**다음 체크 예정:** Supabase 설정 완료 후
