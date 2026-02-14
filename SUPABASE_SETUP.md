# 🚀 Supabase 설정 가이드 (실제 서비스 런칭용)

이 가이드를 따라하면 **30분 안에** 실제 서비스 런칭이 가능합니다.

---

## 📋 목차
1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [데이터베이스 설정](#2-데이터베이스-설정)
3. [Storage 설정](#3-storage-설정)
4. [환경 변수 복사](#4-환경-변수-복사)
5. [패키지 설치](#5-패키지-설치)
6. [테스트](#6-테스트)

---

## 1. Supabase 프로젝트 생성

### Step 1-1: 계정 생성
1. https://supabase.com 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인 (또는 이메일로 가입)

### Step 1-2: 새 프로젝트 생성
1. 대시보드에서 **"New Project"** 클릭
2. 다음 정보 입력:
   ```
   Name: exfluencer-vn
   Database Password: [강력한 비밀번호 설정 - 꼭 메모하세요!]
   Region: Southeast Asia (Singapore) ⚠️ 중요! 베트남과 가장 가까움
   Pricing Plan: Free (무료)
   ```
3. **"Create new project"** 클릭
4. ⏰ 약 2분 대기 (프로젝트 생성 중)

---

## 2. 데이터베이스 설정

### Step 2-1: SQL Editor 열기
1. 왼쪽 사이드바에서 **🗄️ SQL Editor** 클릭
2. **"New Query"** 클릭

### Step 2-2: 테이블 생성 스크립트 실행

아래 SQL을 복사해서 붙여넣고 **"RUN"** 클릭:

```sql
-- 1. 사용자 프로필 테이블
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
  platforms JSONB,
  genres JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_verified BOOLEAN DEFAULT FALSE,
  verification_status TEXT DEFAULT 'none' CHECK (verification_status IN ('none', 'pending', 'approved', 'rejected'))
);

-- 2. 사업자 인증 테이블
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

-- 3. 캠페인 테이블
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
  platforms JSONB NOT NULL,
  genres JSONB,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  deadline DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'in_progress', 'completed', 'cancelled')),
  is_product_provided BOOLEAN DEFAULT FALSE,
  product_value INTEGER,
  images JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 캠페인 지원 테이블
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

-- 5. 캠페인 참여자 테이블
CREATE TABLE public.campaign_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.campaign_applications(id),
  current_step INTEGER NOT NULL DEFAULT 1,
  courier_service TEXT,
  tracking_number TEXT,
  product_sent_at TIMESTAMP WITH TIME ZONE,
  payment_amount INTEGER NOT NULL,
  payment_confirmed_by_advertiser BOOLEAN DEFAULT FALSE,
  payment_confirmed_by_influencer BOOLEAN DEFAULT FALSE,
  payment_confirmed_at TIMESTAMP WITH TIME ZONE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, influencer_id)
);

-- 6. 콘텐츠 제출 테이블
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

-- 7. 분쟁 신고 테이블
CREATE TABLE public.disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reporter_type TEXT NOT NULL CHECK (reporter_type IN ('influencer', 'advertiser')),
  reason TEXT NOT NULL,
  description TEXT NOT NULL,
  evidence_urls JSONB,
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

-- 8. 메시지 테이블
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  attachments JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. 찜 테이블
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('artist', 'venue', 'campaign')),
  target_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, target_type, target_id)
);

-- 10. 포인트 테이블
CREATE TABLE public.points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earned', 'spent', 'bonus', 'refund')),
  reason TEXT NOT NULL,
  related_campaign_id UUID REFERENCES public.campaigns(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- RLS 정책: 프로필
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS 정책: 캠페인
CREATE POLICY "Anyone can view campaigns" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "Advertisers can create campaigns" ON public.campaigns FOR INSERT WITH CHECK (auth.uid() = advertiser_id);
CREATE POLICY "Advertisers can update own campaigns" ON public.campaigns FOR UPDATE USING (auth.uid() = advertiser_id);
CREATE POLICY "Advertisers can delete own campaigns" ON public.campaigns FOR DELETE USING (auth.uid() = advertiser_id);

-- RLS 정책: 지원
CREATE POLICY "Users can view applications" ON public.campaign_applications FOR SELECT USING (
  auth.uid() = influencer_id OR
  auth.uid() IN (SELECT advertiser_id FROM campaigns WHERE id = campaign_id)
);
CREATE POLICY "Influencers can create applications" ON public.campaign_applications FOR INSERT WITH CHECK (auth.uid() = influencer_id);
CREATE POLICY "Advertisers can update applications" ON public.campaign_applications FOR UPDATE USING (
  auth.uid() IN (SELECT advertiser_id FROM campaigns WHERE id = campaign_id)
);

-- RLS 정책: 메시지
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update own messages" ON public.messages FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- RLS 정책: 찜
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- RLS 정책: 사업자 인증
CREATE POLICY "Users can view own verification" ON public.business_verifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own verification" ON public.business_verifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all verifications" ON public.business_verifications FOR SELECT USING (
  auth.uid() IN (SELECT id FROM profiles WHERE user_type = 'admin')
);
CREATE POLICY "Admins can update verifications" ON public.business_verifications FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM profiles WHERE user_type = 'admin')
);

-- 함수: 회원가입 시 자동으로 프로필 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거: 회원가입 시 자동으로 프로필 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

✅ **"Success. No rows returned"** 메시지가 나오면 성공!

---

## 3. Storage 설정

### Step 3-1: Storage 페이지 열기
1. 왼쪽 사이드바에서 **🗂️ Storage** 클릭

### Step 3-2: Bucket 생성

아래 4개의 Bucket을 생성합니다:

#### Bucket 1: campaign-images
```
Name: campaign-images
Public: ✅ Yes (체크)
File size limit: 10 MB
Allowed MIME types: image/*
```
**"Create bucket"** 클릭

#### Bucket 2: certificates
```
Name: certificates
Public: ❌ No (체크 해제)
File size limit: 10 MB
Allowed MIME types: image/*, application/pdf
```
**"Create bucket"** 클릭

#### Bucket 3: content-submissions
```
Name: content-submissions
Public: ✅ Yes (체크)
File size limit: 10 MB
Allowed MIME types: image/*
```
**"Create bucket"** 클릭

#### Bucket 4: profile-avatars
```
Name: profile-avatars
Public: ✅ Yes (체크)
File size limit: 5 MB
Allowed MIME types: image/*
```
**"Create bucket"** 클릭

### Step 3-3: Storage 정책 설정

각 Bucket마다 업로드 권한 설정:

1. **campaign-images** 클릭 → **"Policies"** 탭 → **"New Policy"** 클릭
2. 아래 설정:
   ```
   Policy name: Anyone can upload campaign images
   Policy definition: INSERT
   Target roles: authenticated
   ```
3. **"Review"** → **"Save policy"**

나머지 3개 Bucket도 동일하게 반복

---

## 4. 환경 변수 복사

### Step 4-1: API 키 복사
1. 왼쪽 사이드바에서 **⚙️ Settings** 클릭
2. **"API"** 클릭
3. 아래 값들을 복사:

```
Project URL: https://abcdefghijk.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (Show를 클릭해야 보임)
```

### Step 4-2: .env.local 파일 생성

프로젝트 루트에 `.env.local` 파일 생성:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

⚠️ **중요**: 위 값들을 **실제로 복사한 값으로 교체**하세요!

---

## 5. 패키지 설치

터미널에서 실행:

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

---

## 6. 테스트

### Step 6-1: 개발 서버 실행
```bash
npm run dev
```

### Step 6-2: 회원가입 테스트
1. http://localhost:3000 접속
2. 회원가입 진행
3. Supabase Dashboard → **Authentication** → **Users**에서 사용자 확인

✅ 사용자가 보이면 성공!

### Step 6-3: 데이터베이스 확인
1. Supabase Dashboard → **Table Editor**
2. **profiles** 테이블 확인
3. 방금 가입한 사용자 데이터가 있으면 성공!

---

## ✅ 완료!

이제 실제 서비스 런칭 준비가 완료되었습니다:

- ✅ 데이터베이스: 여러 사용자가 동시에 사용 가능
- ✅ 인증: 이메일/비밀번호 로그인
- ✅ 파일 저장: 이미지, 문서 업로드 가능
- ✅ 보안: Row Level Security로 데이터 보호
- ✅ 무료: 50,000 MAU까지 무료

---

## 🚨 문제 해결

### 문제 1: "relation does not exist" 에러
→ SQL 스크립트를 다시 실행하세요

### 문제 2: "Invalid API key" 에러
→ `.env.local`의 API 키가 정확한지 확인하세요

### 문제 3: 파일 업로드 안됨
→ Storage Bucket의 정책이 올바르게 설정되었는지 확인

---

**다음 단계**: 코드 구현 (자동으로 완료됩니다)
