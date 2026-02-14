# 🚀 ExFluencer VN - 백엔드 설정 가이드

## 📋 목차

1. [개요](#개요)
2. [기술 스택 선택](#기술-스택-선택)
3. [데이터베이스 설정](#데이터베이스-설정)
4. [인증 시스템](#인증-시스템)
5. [API Routes 구조](#api-routes-구조)
6. [파일 업로드](#파일-업로드)
7. [환경 변수](#환경-변수)
8. [단계별 구현 가이드](#단계별-구현-가이드)

---

## 개요

현재 프론트엔드는 `localStorage`를 사용한 목업 데이터로 구현되어 있습니다. 이 가이드는 실제 백엔드 인프라를 구축하기 위한 단계별 지침을 제공합니다.

### 현재 상태
- ✅ 프론트엔드 UI/UX 완료 (약 55%)
- ✅ 인플루언서 기능 대부분 구현
- ✅ 광고주 기능 핵심 완료
- ⏳ 백엔드 API 미구현 (localStorage로 임시 대체)

### 목표
- 실시간 데이터 동기화
- 안전한 인증/인가 시스템
- 파일 업로드 및 저장
- 확장 가능한 API 구조

---

## 기술 스택 선택

### 추천 옵션 A: Supabase (빠른 개발)

**장점:**
- 🚀 설정 5분 이내 완료
- 🔐 인증 시스템 내장 (소셜 로그인 포함)
- 📦 PostgreSQL + Realtime + Storage 통합
- 🆓 무료 티어 제공 (50,000 MAU)
- 🌏 베트남 서버 지원

**단점:**
- 벤더 락인 위험
- 복잡한 쿼리 시 제약 가능

**설치:**
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

---

### 추천 옵션 B: Prisma + PostgreSQL (완전한 제어)

**장점:**
- 🎯 완전한 데이터베이스 제어
- 📝 타입 안전성 (TypeScript 자동 생성)
- 🔄 마이그레이션 관리 우수
- 🏢 엔터프라이즈 확장성

**단점:**
- 초기 설정 시간 2-3시간 소요
- 인증 시스템 별도 구축 필요 (NextAuth.js)

**설치:**
```bash
npm install prisma @prisma/client
npm install next-auth @next-auth/prisma-adapter
npx prisma init
```

---

## 데이터베이스 설정

### Supabase 사용 시

#### 1. Supabase 프로젝트 생성
1. https://supabase.com 접속
2. "New Project" 클릭
3. 프로젝트명: `exfluencer-vn`
4. 비밀번호 설정 (강력한 암호 사용)
5. 지역 선택: **Southeast Asia (Singapore)** (베트남과 가장 가까움)

#### 2. 테이블 생성 SQL

```sql
-- 사용자 테이블 (Supabase auth.users 확장)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  user_type TEXT NOT NULL CHECK (user_type IN ('client', 'artist', 'venue', 'admin')),
  name TEXT NOT NULL,
  name_vi TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  bio_vi TEXT,
  followers INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  portfolio_url TEXT,
  platforms JSONB, -- [{type: 'instagram', handle: '@user', followers: 10000}]
  genres JSONB, -- ['house', 'techno']
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_verified BOOLEAN DEFAULT FALSE,
  verification_status TEXT CHECK (verification_status IN ('none', 'pending', 'approved', 'rejected'))
);

-- 사업자 인증 테이블
CREATE TABLE public.business_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  company_name_vi TEXT,
  registration_number TEXT NOT NULL,
  tax_code TEXT NOT NULL,
  business_type TEXT NOT NULL,
  registered_address TEXT NOT NULL,
  legal_representative TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  certificate_image_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 캠페인 테이블
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advertiser_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_vi TEXT,
  description TEXT NOT NULL,
  description_vi TEXT,
  requirements TEXT,
  requirements_vi TEXT,
  budget_min INTEGER NOT NULL,
  budget_max INTEGER NOT NULL,
  recruit_count INTEGER NOT NULL,
  platforms JSONB NOT NULL, -- ['instagram', 'tiktok']
  genres JSONB, -- ['house', 'techno']
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  deadline DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'in_progress', 'completed', 'cancelled')),
  is_product_provided BOOLEAN DEFAULT FALSE,
  product_value INTEGER,
  images JSONB, -- ['url1', 'url2']
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 캠페인 지원 테이블
CREATE TABLE public.campaign_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'selected', 'rejected')),
  portfolio_url TEXT,
  message TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, influencer_id)
);

-- 캠페인 참여자 테이블 (선정된 인플루언서)
CREATE TABLE public.campaign_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.campaign_applications(id),

  -- 진행 상태 (18단계)
  current_step INTEGER NOT NULL DEFAULT 1,

  -- 제품 발송 정보
  courier_service TEXT,
  tracking_number TEXT,
  product_sent_at TIMESTAMP WITH TIME ZONE,

  -- 결제 정보
  payment_amount INTEGER NOT NULL,
  payment_confirmed_by_advertiser BOOLEAN DEFAULT FALSE,
  payment_confirmed_by_influencer BOOLEAN DEFAULT FALSE,
  payment_confirmed_at TIMESTAMP WITH TIME ZONE,

  -- 시간 추적
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(campaign_id, influencer_id)
);

-- 콘텐츠 제출 테이블
CREATE TABLE public.submitted_contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES public.campaign_participants(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

  url TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  platform TEXT NOT NULL,

  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,

  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.profiles(id),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 분쟁 신고 테이블
CREATE TABLE public.disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reporter_type TEXT NOT NULL CHECK (reporter_type IN ('influencer', 'advertiser')),

  reason TEXT NOT NULL,
  description TEXT NOT NULL,
  evidence_urls JSONB, -- ['url1', 'url2']
  requested_action TEXT,

  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'rejected')),
  admin_notes TEXT,
  resolution TEXT,

  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES public.profiles(id),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 메시지 테이블
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,

  content TEXT NOT NULL,
  attachments JSONB, -- [{type: 'image', url: '...'}]

  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 찜 테이블
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('artist', 'venue', 'campaign')),
  target_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, target_type, target_id)
);

-- 포인트 테이블
CREATE TABLE public.points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earned', 'spent', 'bonus', 'refund')),
  reason TEXT NOT NULL,
  related_campaign_id UUID REFERENCES public.campaigns(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 포인트 잔액 뷰
CREATE VIEW public.user_point_balances AS
SELECT
  user_id,
  SUM(CASE WHEN type IN ('earned', 'bonus', 'refund') THEN amount ELSE -amount END) AS balance
FROM public.points
GROUP BY user_id;

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_campaigns_advertiser ON public.campaigns(advertiser_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_campaigns_deadline ON public.campaigns(deadline);
CREATE INDEX idx_applications_campaign ON public.campaign_applications(campaign_id);
CREATE INDEX idx_applications_influencer ON public.campaign_applications(influencer_id);
CREATE INDEX idx_participants_campaign ON public.campaign_participants(campaign_id);
CREATE INDEX idx_participants_influencer ON public.campaign_participants(influencer_id);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX idx_favorites_user ON public.favorites(user_id);
CREATE INDEX idx_points_user ON public.points(user_id);

-- Row Level Security (RLS) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submitted_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points ENABLE ROW LEVEL SECURITY;

-- RLS 정책 예시 (프로필은 본인만 수정 가능)
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS 정책 (캠페인은 모두 볼 수 있지만 수정은 작성자만)
CREATE POLICY "Anyone can view campaigns" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "Advertisers can create campaigns" ON public.campaigns FOR INSERT WITH CHECK (auth.uid() = advertiser_id);
CREATE POLICY "Advertisers can update own campaigns" ON public.campaigns FOR UPDATE USING (auth.uid() = advertiser_id);

-- RLS 정책 (메시지는 송수신자만 조회)
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- 함수: 캠페인 통계
CREATE OR REPLACE FUNCTION get_campaign_stats(campaign_uuid UUID)
RETURNS TABLE (
  applicant_count BIGINT,
  selected_count BIGINT,
  completed_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*) FILTER (WHERE status IN ('pending', 'selected', 'rejected')) AS applicant_count,
    COUNT(*) FILTER (WHERE status = 'selected') AS selected_count,
    (SELECT COUNT(*) FROM campaign_participants WHERE campaign_id = campaign_uuid AND current_step = 18) AS completed_count
  FROM campaign_applications
  WHERE campaign_id = campaign_uuid;
END;
$$ LANGUAGE plpgsql;
```

#### 3. Storage Bucket 생성

Supabase Dashboard → Storage → Create Bucket:

```
Bucket 이름: campaign-images
Public: Yes (공개 이미지)

Bucket 이름: certificates
Public: No (사업자등록증 비공개)

Bucket 이름: content-submissions
Public: Yes (제출 콘텐츠 썸네일)

Bucket 이름: profile-avatars
Public: Yes (프로필 사진)
```

#### 4. 환경 변수 설정

`.env.local` 파일 생성:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### Prisma 사용 시

#### 1. Prisma 초기화

```bash
npx prisma init
```

#### 2. Schema 정의

`prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserType {
  client
  artist
  venue
  admin
}

enum VerificationStatus {
  none
  pending
  approved
  rejected
}

model Profile {
  id                    String   @id @default(uuid())
  userType              UserType @map("user_type")
  name                  String
  nameVi                String?  @map("name_vi")
  email                 String   @unique
  phone                 String?
  avatarUrl             String?  @map("avatar_url")
  bio                   String?
  bioVi                 String?  @map("bio_vi")
  followers             Int      @default(0)
  engagementRate        Decimal? @map("engagement_rate") @db.Decimal(5, 2)
  portfolioUrl          String?  @map("portfolio_url")
  platforms             Json?
  genres                Json?
  createdAt             DateTime @default(now()) @map("created_at")
  updatedAt             DateTime @updatedAt @map("updated_at")
  isVerified            Boolean  @default(false) @map("is_verified")
  verificationStatus    VerificationStatus @default(none) @map("verification_status")

  // Relations
  campaigns             Campaign[] @relation("AdvertiserCampaigns")
  applications          CampaignApplication[]
  participants          CampaignParticipant[]
  sentMessages          Message[] @relation("SentMessages")
  receivedMessages      Message[] @relation("ReceivedMessages")
  favorites             Favorite[]
  points                Point[]
  disputes              Dispute[]
  businessVerification  BusinessVerification?

  @@map("profiles")
}

model BusinessVerification {
  id                   String    @id @default(uuid())
  userId               String    @unique @map("user_id")
  companyName          String    @map("company_name")
  companyNameVi        String?   @map("company_name_vi")
  registrationNumber   String    @map("registration_number")
  taxCode              String    @map("tax_code")
  businessType         String    @map("business_type")
  registeredAddress    String    @map("registered_address")
  legalRepresentative  String    @map("legal_representative")
  email                String
  phone                String
  certificateImageUrl  String    @map("certificate_image_url")
  status               String    @default("pending")
  rejectionReason      String?   @map("rejection_reason")
  submittedAt          DateTime  @default(now()) @map("submitted_at")
  reviewedAt           DateTime? @map("reviewed_at")
  reviewedBy           String?   @map("reviewed_by")
  createdAt            DateTime  @default(now()) @map("created_at")
  updatedAt            DateTime  @updatedAt @map("updated_at")

  profile              Profile   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("business_verifications")
}

// ... (나머지 모델들도 동일하게 변환)

model Campaign {
  id                String    @id @default(uuid())
  advertiserId      String    @map("advertiser_id")
  title             String
  titleVi           String?   @map("title_vi")
  description       String
  descriptionVi     String?   @map("description_vi")
  requirements      String?
  requirementsVi    String?   @map("requirements_vi")
  budgetMin         Int       @map("budget_min")
  budgetMax         Int       @map("budget_max")
  recruitCount      Int       @map("recruit_count")
  platforms         Json
  genres            Json?
  startDate         DateTime  @map("start_date") @db.Date
  endDate           DateTime  @map("end_date") @db.Date
  deadline          DateTime  @db.Date
  status            String    @default("recruiting")
  isProductProvided Boolean   @default(false) @map("is_product_provided")
  productValue      Int?      @map("product_value")
  images            Json?
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  advertiser        Profile   @relation("AdvertiserCampaigns", fields: [advertiserId], references: [id], onDelete: Cascade)
  applications      CampaignApplication[]
  participants      CampaignParticipant[]
  disputes          Dispute[]

  @@index([advertiserId])
  @@index([status])
  @@index([deadline])
  @@map("campaigns")
}

// (다른 모델들도 동일하게 변환...)
```

#### 3. 마이그레이션 실행

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 인증 시스템

### Supabase Auth 사용 시

#### 1. 클라이언트 설정

`/lib/supabase/client.ts`:

```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';

export const supabase = createClientComponentClient<Database>();
```

#### 2. 서버 설정

`/lib/supabase/server.ts`:

```typescript
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

export const createServerSupabaseClient = () => {
  return createServerComponentClient<Database>({ cookies });
};
```

#### 3. 회원가입 API

`/app/api/auth/signup/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password, userType, name, nameVi } = await request.json();

  const supabase = createRouteHandlerClient({ cookies });

  // 1. Auth 사용자 생성
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_type: userType,
        name,
      },
    },
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  // 2. Profile 생성
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user!.id,
      user_type: userType,
      name,
      name_vi: nameVi,
      email,
    });

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ user: authData.user });
}
```

#### 4. 로그인 API

`/app/api/auth/login/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ user: data.user, session: data.session });
}
```

#### 5. 인증 컨텍스트

`/contexts/AuthContext.tsx`:

```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 초기 세션 체크
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
    setLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

---

## API Routes 구조

### 필수 API Routes 목록

```
/app/api/
├── auth/
│   ├── signup/route.ts          # 회원가입
│   ├── login/route.ts           # 로그인
│   └── me/route.ts              # 현재 사용자 정보
├── campaigns/
│   ├── route.ts                 # GET (목록), POST (생성)
│   ├── [id]/route.ts            # GET (상세), PATCH (수정), DELETE (삭제)
│   ├── [id]/apply/route.ts      # POST (지원)
│   └── [id]/participants/route.ts # GET (참여자 목록)
├── applications/
│   ├── route.ts                 # GET (내 지원 목록)
│   └── [id]/route.ts            # PATCH (승인/거부)
├── participants/
│   └── [id]/
│       ├── route.ts             # PATCH (진행 단계 업데이트)
│       ├── shipping/route.ts    # POST (배송 정보 등록)
│       └── payment/route.ts     # POST (결제 확인)
├── contents/
│   ├── route.ts                 # POST (콘텐츠 제출)
│   └── [id]/route.ts            # PATCH (승인/반려)
├── disputes/
│   ├── route.ts                 # GET (목록), POST (생성)
│   └── [id]/route.ts            # PATCH (해결)
├── messages/
│   ├── route.ts                 # GET (목록), POST (전송)
│   ├── [id]/route.ts            # GET (대화 내역)
│   └── [id]/read/route.ts       # POST (읽음 표시)
├── favorites/
│   ├── route.ts                 # GET (목록), POST (추가)
│   └── [id]/route.ts            # DELETE (제거)
├── points/
│   └── route.ts                 # GET (포인트 내역)
├── verifications/
│   ├── route.ts                 # POST (인증 신청)
│   └── [id]/route.ts            # PATCH (승인/거부) - 관리자만
└── upload/
    └── route.ts                 # POST (파일 업로드)
```

### API Route 예시: 캠페인 생성

`/app/api/campaigns/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// GET /api/campaigns - 캠페인 목록
export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const genre = searchParams.get('genre');
  const platform = searchParams.get('platform');

  let query = supabase
    .from('campaigns')
    .select('*, advertiser:profiles!advertiser_id(*)')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  if (genre) {
    query = query.contains('genres', [genre]);
  }

  if (platform) {
    query = query.contains('platforms', [platform]);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ campaigns: data });
}

// POST /api/campaigns - 캠페인 생성
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  // 인증 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 사업자 인증 확인
  const { data: verification } = await supabase
    .from('business_verifications')
    .select('status')
    .eq('user_id', user.id)
    .single();

  if (!verification || verification.status !== 'approved') {
    return NextResponse.json(
      { error: 'Business verification required' },
      { status: 403 }
    );
  }

  const body = await request.json();

  const { data, error } = await supabase
    .from('campaigns')
    .insert({
      advertiser_id: user.id,
      title: body.title,
      title_vi: body.titleVi,
      description: body.description,
      description_vi: body.descriptionVi,
      requirements: body.requirements,
      requirements_vi: body.requirementsVi,
      budget_min: body.budgetMin,
      budget_max: body.budgetMax,
      recruit_count: body.recruitCount,
      platforms: body.platforms,
      genres: body.genres,
      start_date: body.startDate,
      end_date: body.endDate,
      deadline: body.deadline,
      is_product_provided: body.isProductProvided,
      product_value: body.productValue,
      images: body.images,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ campaign: data }, { status: 201 });
}
```

---

## 파일 업로드

### Supabase Storage 사용

`/app/api/upload/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File;
  const bucket = formData.get('bucket') as string; // 'campaign-images', 'certificates', etc.

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // 파일명 생성 (충돌 방지)
  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}/${Date.now()}.${fileExt}`;

  // 업로드
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 공개 URL 생성
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return NextResponse.json({ url: publicUrl });
}
```

### 클라이언트에서 사용

```typescript
async function uploadImage(file: File, bucket: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucket', bucket);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const { url } = await res.json();
  return url;
}

// 사용 예시
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const url = await uploadImage(file, 'campaign-images');
  setFormData({ ...formData, certificateImage: url });
};
```

---

## 환경 변수

### `.env.local` 전체 예시

```env
# Database (Supabase 사용 시)
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database (Prisma 사용 시)
DATABASE_URL=postgresql://user:password@localhost:5432/exfluencer_vn

# NextAuth (Prisma 사용 시)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key-here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ExFluencer VN

# Optional: OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
KAKAO_CLIENT_ID=your-kakao-client-id
KAKAO_CLIENT_SECRET=your-kakao-client-secret

# Optional: File Storage (AWS S3)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET_NAME=exfluencer-vn
AWS_S3_REGION=ap-southeast-1

# Optional: Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@exfluencer.vn

# Optional: SMS (Twilio)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+84xxxxxxxxx
```

---

## 단계별 구현 가이드

### Phase 1: 기본 인프라 구축 (1일)

1. **Supabase 프로젝트 생성 및 DB 설정**
   - [ ] Supabase 계정 생성
   - [ ] 프로젝트 생성 (Southeast Asia region)
   - [ ] SQL 스크립트 실행 (모든 테이블 생성)
   - [ ] RLS 정책 설정
   - [ ] Storage Bucket 생성

2. **Next.js 프로젝트 설정**
   - [ ] Supabase 패키지 설치
   - [ ] 환경 변수 설정 (`.env.local`)
   - [ ] Supabase 클라이언트 생성 (`/lib/supabase/`)
   - [ ] AuthContext 구현

3. **테스트**
   - [ ] Supabase Studio에서 테이블 확인
   - [ ] 로컬 환경에서 Supabase 연결 테스트

### Phase 2: 인증 시스템 (1일)

1. **회원가입/로그인 API 구현**
   - [ ] `/api/auth/signup` 생성
   - [ ] `/api/auth/login` 생성
   - [ ] `/api/auth/me` 생성 (현재 사용자 정보)

2. **프론트엔드 연동**
   - [ ] 회원가입 페이지 API 연동
   - [ ] 로그인 페이지 API 연동
   - [ ] AuthContext 전역 사용
   - [ ] 보호된 라우트 처리 (미들웨어)

3. **테스트**
   - [ ] 회원가입 → 로그인 → 프로필 조회 플로우 테스트

### Phase 3: 캠페인 API (2일)

1. **캠페인 CRUD**
   - [ ] `/api/campaigns` - 목록, 생성
   - [ ] `/api/campaigns/[id]` - 상세, 수정, 삭제
   - [ ] `/api/campaigns/[id]/apply` - 지원
   - [ ] `/api/campaigns/[id]/participants` - 참여자 목록

2. **프론트엔드 연동**
   - [ ] 홈 페이지 캠페인 목록 API 연동
   - [ ] 캠페인 상세 페이지 API 연동
   - [ ] 캠페인 생성 폼 API 연동
   - [ ] 지원 기능 API 연동

3. **테스트**
   - [ ] 캠페인 생성 → 조회 → 지원 플로우 테스트

### Phase 4: 인플루언서 기능 (1.5일)

1. **지원 관리 API**
   - [ ] `/api/applications` - 내 지원 목록
   - [ ] `/api/applications/[id]` - 승인/거부

2. **콘텐츠 제출 API**
   - [ ] `/api/contents` - 콘텐츠 제출
   - [ ] `/api/contents/[id]` - 승인/반려

3. **프론트엔드 연동**
   - [ ] 인플루언서 대시보드 API 연동
   - [ ] 콘텐츠 제출 폼 API 연동

### Phase 5: 광고주 기능 (1.5일)

1. **사업자 인증 API**
   - [ ] `/api/verifications` - 인증 신청
   - [ ] `/api/verifications/[id]` - 승인/거부 (관리자)

2. **참여자 관리 API**
   - [ ] `/api/participants/[id]` - 진행 단계 업데이트
   - [ ] `/api/participants/[id]/shipping` - 배송 정보
   - [ ] `/api/participants/[id]/payment` - 결제 확인

3. **프론트엔드 연동**
   - [ ] 사업자 인증 신청 페이지 API 연동
   - [ ] 광고주 캠페인 상세 페이지 API 연동
   - [ ] 관리자 인증 승인 페이지 API 연동

### Phase 6: 메시지 & 기타 (1일)

1. **메시지 API**
   - [ ] `/api/messages` - 목록, 전송
   - [ ] `/api/messages/[id]` - 대화 내역
   - [ ] `/api/messages/[id]/read` - 읽음 표시

2. **기타 API**
   - [ ] `/api/favorites` - 찜 기능
   - [ ] `/api/points` - 포인트 내역
   - [ ] `/api/disputes` - 분쟁 신고

3. **프론트엔드 연동**
   - [ ] 메시지 페이지 API 연동
   - [ ] 찜 기능 API 연동

### Phase 7: 파일 업로드 (0.5일)

1. **업로드 API**
   - [ ] `/api/upload` - 파일 업로드

2. **프론트엔드 연동**
   - [ ] 기존 URL 입력 → 파일 업로드로 변경
   - [ ] 이미지 프리뷰 기능 추가

### Phase 8: localStorage 데이터 마이그레이션 (0.5일)

1. **마이그레이션 스크립트**
   - [ ] localStorage 데이터 → Supabase로 이동
   - [ ] 임시 데이터 정리

2. **테스트**
   - [ ] 전체 플로우 E2E 테스트

---

## 다음 단계

1. **Supabase vs Prisma 결정**: 팀 상황에 맞게 선택
   - 빠른 개발 필요 → Supabase 추천
   - 완전한 제어 필요 → Prisma 추천

2. **환경 설정**: `.env.local` 파일 생성 및 키 입력

3. **단계별 구현**: Phase 1부터 순차적으로 진행

4. **테스트**: 각 Phase 완료 시마다 기능 테스트

---

## 자주 묻는 질문 (FAQ)

### Q1: Supabase vs Prisma 중 뭘 선택해야 하나요?

**A:**
- **Supabase**: 빠른 개발, 인증/스토리지 통합, 초기 스타트업에 추천
- **Prisma**: 복잡한 비즈니스 로직, 엔터프라이즈, 완전한 제어 필요 시

### Q2: 베트남 서버는 어디로 선택해야 하나요?

**A:** Supabase는 **Southeast Asia (Singapore)** 선택. AWS/Vercel은 **ap-southeast-1** 리전.

### Q3: 파일 업로드는 어떻게 처리하나요?

**A:**
- Supabase 사용 시: Supabase Storage
- Prisma 사용 시: AWS S3 또는 Cloudinary

### Q4: RLS(Row Level Security)는 꼭 필요한가요?

**A:** 네. 사용자가 다른 사람의 데이터를 볼 수 없도록 보안을 강화합니다.

### Q5: localStorage 데이터는 어떻게 처리하나요?

**A:** Phase 8에서 마이그레이션 스크립트를 작성하여 Supabase로 이동합니다.

---

## 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Prisma 공식 문서](https://www.prisma.io/docs)
- [NextAuth.js 공식 문서](https://next-auth.js.org/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**작성일:** 2026-02-15
**작성자:** Claude (AI Assistant)
**프로젝트:** ExFluencer VN
