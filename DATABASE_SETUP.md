# Database Setup Guide

## 1단계: Supabase 프로젝트 생성

1. https://supabase.com 접속
2. "New Project" 클릭
3. 프로젝트 이름, 비밀번호 설정
4. Region: **Singapore** (베트남과 가장 가까움)
5. 생성 완료 (1-2분 소요)

---

## 2단계: 테이블 생성

1. Supabase 대시보드 → **SQL Editor** 클릭
2. "New Query" 클릭
3. `supabase-schema.sql` 파일 내용 전체 복사
4. SQL Editor에 붙여넣기
5. **Run** 클릭

✅ **성공 확인:**
- 왼쪽 사이드바 "Table Editor"에서 `users`, `campaigns`, `applications` 등 테이블 보임

---

## 3단계: 환경변수 설정

1. Supabase 대시보드 → **Settings** → **API**
2. 아래 값들 복사:
   - `Project URL`
   - `anon public` key
   - `service_role` key (Show secret 클릭)

3. `.env.local` 파일 생성 (프로젝트 루트):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 4단계: 패키지 설치

```bash
npm install @supabase/supabase-js
```

---

## 5단계: 개발 서버 시작

```bash
npm run dev
```

http://localhost:3000 접속

---

## API 엔드포인트

생성된 API 엔드포인트들:

### 캠페인
- `GET /api/campaigns` - 캠페인 목록
- `GET /api/campaigns?platform=instagram&category=beauty` - 필터링
- `POST /api/campaigns` - 새 캠페인 생성

### 지원서
- `GET /api/applications?campaign_id=xxx` - 특정 캠페인 지원서
- `GET /api/applications?influencer_id=xxx` - 내 지원서
- `POST /api/applications` - 새 지원서 제출
- `PATCH /api/applications` - 지원서 상태 업데이트

### 프로필
- `GET /api/profiles?user_id=xxx` - 프로필 조회
- `POST /api/profiles` - 프로필 생성/업데이트

### 즐겨찾기
- `GET /api/favorites?user_id=xxx` - 즐겨찾기 목록
- `POST /api/favorites` - 추가
- `DELETE /api/favorites?user_id=xxx&campaign_id=yyy` - 제거

---

## Frontend 수정 예시

### Before (Mock data)
```typescript
const campaigns = getMockCampaigns(language);
```

### After (Real API)
```typescript
const res = await fetch('/api/campaigns?platform=instagram');
const campaigns = await res.json();
```

### 지원서 제출 Before
```typescript
localStorage.setItem('exfluencer_applications', JSON.stringify(data));
```

### 지원서 제출 After
```typescript
await fetch('/api/applications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    campaign_id: campaignId,
    influencer_id: userId, // 또는 null (guest)
    name: formData.name,
    zalo: formData.zalo,
    platform_url: formData.platformUrl,
    followers_range: formData.followers,
    message: formData.message,
  }),
});
```

---

## 테스트 데이터 확인

Supabase 대시보드 → **Table Editor** → `campaigns`

샘플 캠페인 1개가 이미 생성되어 있음 (SQL 스크립트에 포함)

---

## 다음 단계

1. **Auth 추가** - Supabase Auth로 로그인/회원가입
2. **Frontend 연동** - `getMockCampaigns()` → `fetch('/api/campaigns')`
3. **이미지 업로드** - Supabase Storage 사용

---

## 문제 해결

### Q: "relation users does not exist" 에러
A: SQL 스크립트를 다시 실행하세요

### Q: RLS 에러 (Row Level Security)
A: 지금은 `supabaseAdmin` 사용 (RLS 우회). 나중에 Auth 추가시 수정

### Q: CORS 에러
A: Next.js API Routes는 CORS 문제 없음 (같은 도메인)

---

## 추가 자료

- Supabase 공식 문서: https://supabase.com/docs
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
