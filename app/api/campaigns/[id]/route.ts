import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/campaigns/[id]
 * 캠페인 상세 조회
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supabase = createClient();

    const { data, error } = await supabase
      .from('campaigns')
      .select(`
        *,
        advertiser:profiles!advertiser_id(*),
        applications:campaign_applications(
          *,
          influencer:profiles!influencer_id(*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ campaign: data });

  } catch (error: any) {
    console.error('Get campaign error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/campaigns/[id]
 * 캠페인 수정
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const supabase = createClient();

    // 인증 확인
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 소유권 확인
    const { data: campaign } = await supabase
      .from('campaigns')
      .select('advertiser_id')
      .eq('id', id)
      .single();

    if (!campaign || campaign.advertiser_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 캠페인 수정
    const { data, error } = await supabase
      .from('campaigns')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaign: data });

  } catch (error: any) {
    console.error('Update campaign error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/campaigns/[id]
 * 캠페인 삭제 (실제로는 status를 'cancelled'로 변경)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supabase = createClient();

    // 인증 확인
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 소유권 확인
    const { data: campaign } = await supabase
      .from('campaigns')
      .select('advertiser_id')
      .eq('id', id)
      .single();

    if (!campaign || campaign.advertiser_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 캠페인 삭제 (status를 'cancelled'로 변경)
    const { error } = await supabase
      .from('campaigns')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Campaign cancelled successfully' });

  } catch (error: any) {
    console.error('Delete campaign error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
