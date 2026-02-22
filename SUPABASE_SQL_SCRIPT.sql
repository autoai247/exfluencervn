-- ExFluencer VN - Supabase 데이터베이스 스키마
-- 이 파일을 Supabase SQL Editor에 전체 복사 붙여넣기 하세요

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

-- ============================================================
-- profiles 테이블에 포인트/캐시 컬럼 추가 (없는 경우)
-- ============================================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS shopping_points INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cash INTEGER DEFAULT 0;

-- ============================================================
-- Raffle (응모) 관련 테이블
-- ============================================================

-- Raffle Items 테이블
CREATE TABLE IF NOT EXISTS public.raffle_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_vi TEXT,
  description TEXT,
  description_vi TEXT,
  price INTEGER NOT NULL,
  prize_value TEXT,
  stock INTEGER DEFAULT 0,
  total_tickets INTEGER DEFAULT 0,
  current_tickets INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Raffle Tickets 테이블
CREATE TABLE IF NOT EXISTS public.raffle_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  raffle_id UUID REFERENCES public.raffle_items(id) ON DELETE CASCADE,
  ticket_count INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, raffle_id)
);

-- Raffle Purchase History
CREATE TABLE IF NOT EXISTS public.raffle_purchase_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  raffle_id UUID REFERENCES public.raffle_items(id) ON DELETE CASCADE,
  tickets INTEGER NOT NULL,
  points_spent INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Raffle Draws
CREATE TABLE IF NOT EXISTS public.raffle_draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  raffle_id UUID REFERENCES public.raffle_items(id) ON DELETE CASCADE,
  winner_id UUID REFERENCES public.profiles(id),
  winner_name TEXT,
  draw_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_participants INTEGER DEFAULT 0,
  announced BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.raffle_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raffle_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raffle_purchase_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raffle_draws ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view raffle items" ON public.raffle_items FOR SELECT USING (true);
CREATE POLICY "Users can view own tickets" ON public.raffle_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tickets" ON public.raffle_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tickets" ON public.raffle_tickets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view own purchase history" ON public.raffle_purchase_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own purchase history" ON public.raffle_purchase_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can view raffle draws" ON public.raffle_draws FOR SELECT USING (true);
