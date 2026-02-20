import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/applications - 지원서 목록 가져오기
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const campaignId = searchParams.get('campaign_id');
    const influencerId = searchParams.get('influencer_id');
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('applications')
      .select(`
        *,
        campaign:campaigns(id, title, thumbnail, budget, company:users!advertiser_id(name)),
        influencer:users!influencer_id(name, email)
      `)
      .order('applied_at', { ascending: false });

    // Filters
    if (campaignId) {
      query = query.eq('campaign_id', campaignId);
    }
    if (influencerId) {
      query = query.eq('influencer_id', influencerId);
    }
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Applications fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/applications - 새 지원서 제출
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaign_id, influencer_id, name, zalo, platform_url, followers_range, message } = body;

    if (!campaign_id || !name || !zalo || !platform_url || !followers_range) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if already applied
    const { data: existing } = await supabaseAdmin
      .from('applications')
      .select('id')
      .eq('campaign_id', campaign_id)
      .eq('influencer_id', influencer_id || '00000000-0000-0000-0000-000000000000')
      .single();

    if (existing) {
      return NextResponse.json({ error: 'Already applied to this campaign' }, { status: 409 });
    }

    const { data, error } = await supabaseAdmin
      .from('applications')
      .insert({
        campaign_id,
        influencer_id: influencer_id || '00000000-0000-0000-0000-000000000000', // Guest user
        applicant_name: name,
        zalo,
        platform_url,
        followers_range,
        message: message || '',
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Application creation error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH /api/applications - 지원서 상태 업데이트 (광고주)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { application_id, status, rejection_reason } = body;

    if (!application_id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updateData: any = {
      status,
      reviewed_at: new Date().toISOString(),
    };

    if (rejection_reason) {
      updateData.rejection_reason = rejection_reason;
    }

    const { data, error } = await supabaseAdmin
      .from('applications')
      .update(updateData)
      .eq('id', application_id)
      .select()
      .single();

    if (error) {
      console.error('Application update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
