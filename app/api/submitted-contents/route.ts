import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// POST /api/submitted-contents - 콘텐츠 제출 저장
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      campaign_id,
      influencer_id,
      content_url,
      description,
      content_type = 'post',
      points_earned = 0,
      status = 'pending',
    } = body;

    if (!campaign_id || !content_url) {
      return NextResponse.json({ error: 'Missing required fields: campaign_id, content_url' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('submitted_contents')
      .insert({
        campaign_id,
        influencer_id: influencer_id || null,
        content_url,
        description: description || '',
        content_type,
        points_earned,
        status,
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Submitted content creation error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET /api/submitted-contents - 현재 유저의 제출 콘텐츠 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const influencerId = searchParams.get('influencer_id');
    const campaignId = searchParams.get('campaign_id');
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('submitted_contents')
      .select(`
        *,
        campaign:campaigns(id, title, thumbnail, budget)
      `)
      .order('submitted_at', { ascending: false });

    if (influencerId) {
      query = query.eq('influencer_id', influencerId);
    }
    if (campaignId) {
      query = query.eq('campaign_id', campaignId);
    }
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Submitted contents fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH /api/submitted-contents - 콘텐츠 상태 업데이트 (관리자/광고주)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { content_id, status, admin_note } = body;

    if (!content_id || !status) {
      return NextResponse.json({ error: 'Missing required fields: content_id, status' }, { status: 400 });
    }

    const updateData: Record<string, any> = {
      status,
      reviewed_at: new Date().toISOString(),
    };

    if (admin_note) {
      updateData.admin_note = admin_note;
    }

    const { data, error } = await supabaseAdmin
      .from('submitted_contents')
      .update(updateData)
      .eq('id', content_id)
      .select()
      .single();

    if (error) {
      console.error('Submitted content update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
