import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/disputes/[id]
 * 분쟁 상세 조회
 */
export async function GET(
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

    const { data: dispute, error } = await supabase
      .from('disputes')
      .select(`
        *,
        participant:campaign_participants!participant_id(
          *,
          campaign:campaigns!campaign_id(
            *,
            advertiser:profiles!advertiser_id(*)
          ),
          influencer:profiles!influencer_id(*)
        ),
        reporter:profiles!reported_by(*),
        resolver:profiles!resolved_by(*)
      `)
      .eq('id', id)
      .single();

    if (error || !dispute) {
      return NextResponse.json({ error: 'Dispute not found' }, { status: 404 });
    }

    // 권한 확인: 관련자 또는 관리자만 조회 가능
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single();

    const isReporter = dispute.reported_by === user.id;
    const isInfluencer = dispute.participant?.influencer_id === user.id;
    const isAdvertiser = dispute.participant?.campaign?.advertiser_id === user.id;
    const isAdmin = profile?.user_type === 'admin';

    if (!isReporter && !isInfluencer && !isAdvertiser && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ dispute });

  } catch (error: any) {
    console.error('Get dispute error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/disputes/[id]
 * 분쟁 상태 업데이트 / 해결 (관리자 전용)
 *
 * 요청 Body:
 * {
 *   status?: 'pending' | 'investigating' | 'resolved';
 *   resolution?: string; // 해결 내용 (resolved 상태로 변경 시 필수)
 *   winner?: 'advertiser' | 'influencer' | 'both'; // 승소자 (resolved 시 필수)
 *   compensationAmount?: number; // 보상 금액
 *   adminNotes?: string; // 관리자 메모
 * }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, resolution, winner, compensationAmount, adminNotes } = body;

    // Validation
    if (status && !['pending', 'investigating', 'resolved'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    if (status === 'resolved') {
      if (!resolution) {
        return NextResponse.json(
          { error: 'Resolution is required when resolving dispute' },
          { status: 400 }
        );
      }
      if (!winner || !['advertiser', 'influencer', 'both'].includes(winner)) {
        return NextResponse.json(
          { error: 'Valid winner is required when resolving dispute' },
          { status: 400 }
        );
      }
    }

    const supabase = createClient();

    // 인증 확인
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 관리자 권한 확인
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single();

    if (profile?.user_type !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // 분쟁 조회
    const { data: dispute, error: disputeError } = await supabase
      .from('disputes')
      .select('*')
      .eq('id', id)
      .single();

    if (disputeError || !dispute) {
      return NextResponse.json({ error: 'Dispute not found' }, { status: 404 });
    }

    // 업데이트 데이터 준비
    const updateData: any = {};

    if (status) updateData.status = status;
    if (resolution) updateData.resolution = resolution;
    if (winner) updateData.winner = winner;
    if (compensationAmount !== undefined) updateData.compensation_amount = compensationAmount;
    if (adminNotes) updateData.admin_notes = adminNotes;

    if (status === 'resolved') {
      updateData.resolved_by = user.id;
      updateData.resolved_at = new Date().toISOString();
    }

    // 상태 업데이트
    const { data, error } = await supabase
      .from('disputes')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        participant:campaign_participants!participant_id(
          *,
          campaign:campaigns!campaign_id(
            *,
            advertiser:profiles!advertiser_id(*)
          ),
          influencer:profiles!influencer_id(*)
        ),
        reporter:profiles!reported_by(*),
        resolver:profiles!resolved_by(*)
      `)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ dispute: data });

  } catch (error: any) {
    console.error('Update dispute error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/disputes/[id]
 * 분쟁 신고 취소 (신고자만 가능, pending 상태만)
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

    // 분쟁 조회
    const { data: dispute } = await supabase
      .from('disputes')
      .select('reported_by, status')
      .eq('id', id)
      .single();

    if (!dispute) {
      return NextResponse.json({ error: 'Dispute not found' }, { status: 404 });
    }

    // 신고자 본인 확인
    if (dispute.reported_by !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // pending 상태만 취소 가능
    if (dispute.status !== 'pending') {
      return NextResponse.json(
        { error: 'Only pending disputes can be cancelled' },
        { status: 400 }
      );
    }

    // 삭제
    const { error } = await supabase
      .from('disputes')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Dispute cancelled successfully' });

  } catch (error: any) {
    console.error('Delete dispute error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
