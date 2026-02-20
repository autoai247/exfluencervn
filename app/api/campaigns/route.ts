import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/campaigns - 캠페인 목록 가져오기
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Query params
    const platform = searchParams.get('platform');
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const type = searchParams.get('type'); // cash or points
    const status = searchParams.get('status') || 'active';

    let query = supabaseAdmin
      .from('campaigns')
      .select(\`
        *,
        advertiser:users!advertiser_id(name),
        advertiser_profile:advertiser_profiles!advertiser_id(company_name, company_logo)
      \`)
      .eq('status', status)
      .order('created_at', { ascending: false });

    // Filters
    if (platform) {
      query = query.contains('platforms', [platform]);
    }
    if (category) {
      query = query.contains('categories', [category]);
    }
    if (location) {
      query = query.eq('location', location);
    }
    if (type) {
      query = query.eq('campaign_type', type);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Campaigns fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform data to match frontend MockCampaign interface
    const campaigns = data?.map((c: any) => ({
      id: c.id,
      title: c.title,
      company: c.advertiser_profile?.company_name || c.advertiser?.name || 'Unknown',
      companyLogo: c.advertiser_profile?.company_logo || \`https://ui-avatars.com/api/?name=\${encodeURIComponent(c.advertiser?.name || 'Company')}&background=FF6B6B&color=fff\`,
      description: c.description,
      budget: c.budget,
      type: c.campaign_type,
      deadline: c.deadline,
      location: c.location || 'Toàn quốc',
      platforms: c.platforms || [],
      categories: c.categories || [],
      applicants: c.applicants_count || 0,
      thumbnail: c.thumbnail || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
      requirements: c.requirements || {},
      isDemoMode: c.is_demo || false,
    })) || [];

    return NextResponse.json(campaigns);

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/campaigns - 새 캠페인 생성 (광고주만)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Get advertiser_id from auth session
    // For now, use from body
    const { advertiser_id, ...campaignData } = body;

    if (!advertiser_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('campaigns')
      .insert({
        advertiser_id,
        ...campaignData,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Campaign creation error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
