import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';


export const dynamic = 'force-dynamic';
/**
 * GET /api/applications
 * 내 지원 내역 조회 (인플루언서용)
 *
 * Query Parameters:
 * - status?: 'pending' | 'selected' | 'rejected'
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const supabase = createClient();

    // 인증 확인
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 지원 내역 조회
    let query = supabase
      .from('campaign_applications')
      .select(`
        *,
        campaign:campaigns(
          *,
          advertiser:profiles!advertiser_id(*)
        )
      `)
      .eq('influencer_id', user.id)
      .order('applied_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ applications: data });

  } catch (error: any) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/applications
 * 캠페인 지원
 *
 * 요청 Body:
 * {
 *   campaignId: string;
 *   portfolioUrl?: string;
 *   message?: string;
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, portfolioUrl, message } = body;

    // Validation
    if (!campaignId) {
      return NextResponse.json(
        { error: 'Campaign ID is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 인증 확인
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 캠페인 존재 및 상태 확인
    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .select('status, deadline')
      .eq('id', campaignId)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    if (campaign.status !== 'recruiting') {
      return NextResponse.json(
        { error: 'Campaign is not recruiting' },
        { status: 400 }
      );
    }

    if (new Date(campaign.deadline) < new Date()) {
      return NextResponse.json(
        { error: 'Application deadline has passed' },
        { status: 400 }
      );
    }

    // 중복 지원 확인
    const { data: existing } = await supabase
      .from('campaign_applications')
      .select('id')
      .eq('campaign_id', campaignId)
      .eq('influencer_id', user.id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Already applied to this campaign' },
        { status: 400 }
      );
    }

    // 지원 생성
    const { data, error } = await supabase
      .from('campaign_applications')
      .insert({
        campaign_id: campaignId,
        influencer_id: user.id,
        portfolio_url: portfolioUrl,
        message,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ application: data }, { status: 201 });

  } catch (error: any) {
    console.error('Apply error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
