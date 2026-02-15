import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';


export const dynamic = 'force-dynamic';
/**
 * PATCH /api/applications/[id]
 * 지원 승인/거부 (광고주용)
 *
 * 요청 Body:
 * {
 *   status: 'selected' | 'rejected';
 *   paymentAmount?: number; // 선정 시 결제 금액
 * }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, paymentAmount } = body;

    // Validation
    if (!status || !['selected', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 인증 확인
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 지원 조회 및 권한 확인
    const { data: application, error: appError } = await supabase
      .from('campaign_applications')
      .select('*, campaign:campaigns!campaign_id(advertiser_id)')
      .eq('id', id)
      .single();

    if (appError || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.campaign.advertiser_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 상태 업데이트
    const { data, error } = await supabase
      .from('campaign_applications')
      .update({
        status,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 선정 시 campaign_participants 테이블에 추가
    if (status === 'selected') {
      const { error: participantError } = await supabase
        .from('campaign_participants')
        .insert({
          campaign_id: application.campaign_id,
          influencer_id: application.influencer_id,
          application_id: application.id,
          payment_amount: paymentAmount || 0,
          current_step: 1, // 18단계 중 1단계부터 시작
        });

      if (participantError) {
        console.error('Error creating participant:', participantError);
        // 에러가 나도 지원 승인은 성공으로 간주
      }
    }

    return NextResponse.json({ application: data });

  } catch (error: any) {
    console.error('Update application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
