-- =============================================
-- EXFLUENCER VN - Database Schema
-- Supabase PostgreSQL
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────
-- 1. USERS (인플루언서 + 광고주 공통)
-- ─────────────────────────────────────────────
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('influencer', 'advertiser', 'admin')),
  name TEXT NOT NULL,
  phone TEXT,
  zalo TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);

-- ─────────────────────────────────────────────
-- 2. INFLUENCER PROFILES
-- ─────────────────────────────────────────────
CREATE TABLE influencer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,

  -- Demographics
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  age_range TEXT CHECK (age_range IN ('18-24', '25-34', '35-44', '45+')),
  location TEXT,

  -- Social Media
  instagram_url TEXT,
  instagram_followers INTEGER DEFAULT 0,
  tiktok_url TEXT,
  tiktok_followers INTEGER DEFAULT 0,
  youtube_url TEXT,
  youtube_followers INTEGER DEFAULT 0,
  facebook_url TEXT,
  facebook_followers INTEGER DEFAULT 0,

  -- Content Categories (JSONB array)
  categories JSONB DEFAULT '[]'::jsonb,

  -- Lifestyle
  vehicle TEXT CHECK (vehicle IN ('', 'motorbike', 'car', 'both')),
  marital_status TEXT CHECK (marital_status IN ('', 'single', 'dating', 'married', 'divorced')),
  has_children BOOLEAN DEFAULT FALSE,
  travel_frequency TEXT CHECK (travel_frequency IN ('', 'rarely', '1_2_year', 'often')),
  occupation TEXT,

  -- Category-specific
  has_pets BOOLEAN DEFAULT FALSE,
  skin_type TEXT,
  height INTEGER,
  weight INTEGER,

  -- Pricing
  price_per_post TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id)
);

CREATE INDEX idx_influencer_profiles_user ON influencer_profiles(user_id);
CREATE INDEX idx_influencer_profiles_location ON influencer_profiles(location);
CREATE INDEX idx_influencer_profiles_categories ON influencer_profiles USING GIN(categories);

-- ─────────────────────────────────────────────
-- 3. ADVERTISER PROFILES
-- ─────────────────────────────────────────────
CREATE TABLE advertiser_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  company_logo TEXT,
  industry TEXT,
  website TEXT,
  description TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id)
);

CREATE INDEX idx_advertiser_profiles_user ON advertiser_profiles(user_id);

-- ─────────────────────────────────────────────
-- 4. CAMPAIGNS
-- ─────────────────────────────────────────────
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  advertiser_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,

  -- Budget & Timing
  budget INTEGER NOT NULL, -- VND
  campaign_type TEXT DEFAULT 'cash' CHECK (campaign_type IN ('cash', 'points')),
  deadline DATE NOT NULL,

  -- Targeting
  platforms JSONB DEFAULT '[]'::jsonb, -- ['instagram', 'tiktok', ...]
  categories JSONB DEFAULT '[]'::jsonb,
  location TEXT,

  -- Requirements (JSONB object)
  requirements JSONB DEFAULT '{}'::jsonb,
  -- Example: {"minFollowers": 10000, "minEngagement": 3.0, "platforms": ["instagram"]}

  -- Campaign Details (JSONB)
  deliverables JSONB DEFAULT '[]'::jsonb,

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),

  -- Stats
  applicants_count INTEGER DEFAULT 0,
  selected_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,

  -- Demo mode (for testing)
  is_demo BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_campaigns_advertiser ON campaigns(advertiser_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_deadline ON campaigns(deadline);
CREATE INDEX idx_campaigns_platforms ON campaigns USING GIN(platforms);
CREATE INDEX idx_campaigns_categories ON campaigns USING GIN(categories);

-- ─────────────────────────────────────────────
-- 5. APPLICATIONS (지원서)
-- ─────────────────────────────────────────────
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Application Data (from Google Form style modal)
  applicant_name TEXT NOT NULL,
  zalo TEXT NOT NULL,
  platform_url TEXT NOT NULL,
  followers_range TEXT NOT NULL,
  message TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),

  -- Review
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES users(id),
  rejection_reason TEXT,

  -- Payment
  payment_amount INTEGER,
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'cancelled')),
  paid_at TIMESTAMP WITH TIME ZONE,

  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_applications_campaign ON applications(campaign_id);
CREATE INDEX idx_applications_influencer ON applications(influencer_id);
CREATE INDEX idx_applications_status ON applications(status);

-- ─────────────────────────────────────────────
-- 6. SHARE HISTORY (Facebook share bonus)
-- ─────────────────────────────────────────────
CREATE TABLE share_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,

  platform TEXT DEFAULT 'facebook' CHECK (platform IN ('facebook', 'twitter', 'linkedin')),
  post_url TEXT NOT NULL,

  -- Bonus
  points_earned INTEGER DEFAULT 5000,

  -- Verification
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES users(id),
  rejection_reason TEXT,

  shared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_share_history_user ON share_history(user_id);
CREATE INDEX idx_share_history_campaign ON share_history(campaign_id);
CREATE INDEX idx_share_history_status ON share_history(status);

-- ─────────────────────────────────────────────
-- 7. FAVORITES (인플루언서가 저장한 캠페인)
-- ─────────────────────────────────────────────
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, campaign_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_campaign ON favorites(campaign_id);

-- ─────────────────────────────────────────────
-- TRIGGERS: Auto-update timestamps
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_influencer_profiles_updated_at BEFORE UPDATE ON influencer_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_advertiser_profiles_updated_at BEFORE UPDATE ON advertiser_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─────────────────────────────────────────────
-- TRIGGERS: Update campaign applicants_count
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_campaign_applicants_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE campaigns SET applicants_count = applicants_count + 1 WHERE id = NEW.campaign_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE campaigns SET applicants_count = applicants_count - 1 WHERE id = OLD.campaign_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applicants_count_on_insert
AFTER INSERT ON applications
FOR EACH ROW EXECUTE FUNCTION update_campaign_applicants_count();

CREATE TRIGGER update_applicants_count_on_delete
AFTER DELETE ON applications
FOR EACH ROW EXECUTE FUNCTION update_campaign_applicants_count();

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE advertiser_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Users: 본인 데이터만 읽기/수정
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Influencer profiles: 본인 것만 수정, 모두가 볼 수 있음 (광고주가 검색)
CREATE POLICY "Anyone can view influencer profiles" ON influencer_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON influencer_profiles FOR ALL USING (auth.uid() = user_id);

-- Advertiser profiles: 본인 것만 수정, 모두가 볼 수 있음
CREATE POLICY "Anyone can view advertiser profiles" ON advertiser_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON advertiser_profiles FOR ALL USING (auth.uid() = user_id);

-- Campaigns: 모두가 볼 수 있음, 광고주만 자기 캠페인 수정
CREATE POLICY "Anyone can view active campaigns" ON campaigns FOR SELECT USING (status = 'active' OR advertiser_id = auth.uid());
CREATE POLICY "Advertisers can manage own campaigns" ON campaigns FOR ALL USING (advertiser_id = auth.uid());

-- Applications: 인플루언서는 본인 지원서, 광고주는 자기 캠페인 지원서
CREATE POLICY "Influencers can view own applications" ON applications FOR SELECT USING (influencer_id = auth.uid());
CREATE POLICY "Advertisers can view campaign applications" ON applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = applications.campaign_id AND campaigns.advertiser_id = auth.uid())
);
CREATE POLICY "Influencers can create applications" ON applications FOR INSERT WITH CHECK (influencer_id = auth.uid());
CREATE POLICY "Advertisers can update application status" ON applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = applications.campaign_id AND campaigns.advertiser_id = auth.uid())
);

-- Share history: 본인 것만
CREATE POLICY "Users can view own shares" ON share_history FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create shares" ON share_history FOR INSERT WITH CHECK (user_id = auth.uid());

-- Favorites: 본인 것만
CREATE POLICY "Users can manage own favorites" ON favorites FOR ALL USING (user_id = auth.uid());

-- ─────────────────────────────────────────────
-- SAMPLE DATA (테스트용 - 옵션)
-- ─────────────────────────────────────────────
-- 실제 배포시에는 아래 INSERT 문들은 제거하세요

-- Sample advertiser
INSERT INTO users (id, email, user_type, name, phone, zalo) VALUES
('00000000-0000-0000-0000-000000000001', 'advertiser@example.com', 'advertiser', 'Beauty Brand VN', '+84 28 1234 5678', '+84 28 1234 5678');

INSERT INTO advertiser_profiles (user_id, company_name, company_logo, industry) VALUES
('00000000-0000-0000-0000-000000000001', 'Beauty Brand VN', 'https://ui-avatars.com/api/?name=Beauty+Brand&background=FF6B6B&color=fff', 'Beauty & Cosmetics');

-- Sample campaign
INSERT INTO campaigns (id, advertiser_id, title, description, thumbnail, budget, deadline, platforms, categories, requirements) VALUES
('00000000-0000-0000-0000-000000000101',
 '00000000-0000-0000-0000-000000000001',
 'Review sản phẩm Skincare cao cấp mới ra mắt',
 'Trải nghiệm dòng skincare premium mới ra mắt và chia sẻ đánh giá trung thực của bạn.',
 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
 500000,
 '2026-04-15',
 '["instagram", "tiktok"]'::jsonb,
 '["beauty", "lifestyle"]'::jsonb,
 '{"minFollowers": 10000, "minEngagement": 3.0}'::jsonb
);

-- ─────────────────────────────────────────────
-- COMPLETE!
-- ─────────────────────────────────────────────
-- Next steps:
-- 1. Copy this SQL and run in Supabase SQL Editor
-- 2. Create .env.local with Supabase credentials
-- 3. Install @supabase/supabase-js
-- 4. Create API routes
