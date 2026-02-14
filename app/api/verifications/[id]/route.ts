import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/verifications/[id]
 * 사업자 인증 상세 조회
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

    const { data: verification, error } = await supabase
      .from('business_verifications')
      .select('*, user:profiles!user_id(*)')
      .eq('id', id)
      .single();

    if (error || !verification) {
      return NextResponse.json({ error: 'Verification not found' }, { status: 404 });
    }

    // 본인 또는 관리자만 조회 가능
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single();

    if (verification.user_id !== user.id && profile?.user_type !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ verification });

  } catch (error: any) {
    console.error('Get verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/verifications/[id]
 * 사업자 인증 승인/거부 (관리자 전용)
 *
 * 요청 Body:
 * {
 *   status: 'approved' | 'rejected';
 *   rejectionReason?: string; // 거부 시 사유
 * }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, rejectionReason } = body;

    // Validation
    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    if (status === 'rejected' && !rejectionReason) {
      return NextResponse.json(
        { error: 'Rejection reason is required' },
        { status: 400 }
      );
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

    // 인증 조회
    const { data: verification, error: verificationError } = await supabase
      .from('business_verifications')
      .select('*')
      .eq('id', id)
      .single();

    if (verificationError || !verification) {
      return NextResponse.json({ error: 'Verification not found' }, { status: 404 });
    }

    // 상태 업데이트
    const { data, error } = await supabase
      .from('business_verifications')
      .update({
        status,
        reviewed_at: new Date().toISOString(),
        rejection_reason: status === 'rejected' ? rejectionReason : null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 승인 시 사용자 프로필 업데이트 (user_type을 advertiser로)
    if (status === 'approved') {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ user_type: 'advertiser' })
        .eq('id', verification.user_id);

      if (profileError) {
        console.error('Error updating user type:', profileError);
        // 프로필 업데이트 실패해도 인증 승인은 성공으로 간주
      }
    }

    return NextResponse.json({ verification: data });

  } catch (error: any) {
    console.error('Update verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/verifications/[id]
 * 사업자 인증 신청 취소 (본인만 가능, pending 상태만)
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

    // 인증 조회
    const { data: verification } = await supabase
      .from('business_verifications')
      .select('user_id, status')
      .eq('id', id)
      .single();

    if (!verification) {
      return NextResponse.json({ error: 'Verification not found' }, { status: 404 });
    }

    // 본인 확인
    if (verification.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // pending 상태만 취소 가능
    if (verification.status !== 'pending') {
      return NextResponse.json(
        { error: 'Only pending verifications can be cancelled' },
        { status: 400 }
      );
    }

    // 삭제
    const { error } = await supabase
      .from('business_verifications')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Verification cancelled successfully' });

  } catch (error: any) {
    console.error('Delete verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
