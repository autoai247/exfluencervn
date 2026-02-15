import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';


export const dynamic = 'force-dynamic';
/**
 * GET /api/verifications
 * 사업자 인증 목록 조회
 *
 * Query Parameters:
 * - status?: 'pending' | 'approved' | 'rejected'
 *
 * 일반 사용자: 자신의 인증만 조회
 * 관리자: 모든 인증 조회 가능
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

    // 사용자 프로필 조회 (관리자 여부 확인)
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single();

    let query = supabase
      .from('business_verifications')
      .select('*, user:profiles!user_id(*)')
      .order('submitted_at', { ascending: false });

    // 관리자가 아니면 자신의 인증만 조회
    if (profile?.user_type !== 'admin') {
      query = query.eq('user_id', user.id);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ verifications: data });

  } catch (error: any) {
    console.error('Get verifications error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/verifications
 * 사업자 인증 신청
 *
 * 요청 Body:
 * {
 *   businessName: string;
 *   businessNumber: string;
 *   representativeName: string;
 *   businessType: string;
 *   businessAddress: string;
 *   contactEmail: string;
 *   contactPhone: string;
 *   documents: string[]; // 파일 URL 배열
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      businessName,
      businessNumber,
      representativeName,
      businessType,
      businessAddress,
      contactEmail,
      contactPhone,
      documents
    } = body;

    // Validation
    const requiredFields = [
      'businessName',
      'businessNumber',
      'representativeName',
      'businessType',
      'businessAddress',
      'contactEmail',
      'contactPhone'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!documents || documents.length === 0) {
      return NextResponse.json(
        { error: 'At least one document is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 인증 확인
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 이미 승인된 인증이 있는지 확인
    const { data: existing } = await supabase
      .from('business_verifications')
      .select('id, status')
      .eq('user_id', user.id)
      .single();

    if (existing?.status === 'approved') {
      return NextResponse.json(
        { error: 'Business already verified' },
        { status: 400 }
      );
    }

    if (existing?.status === 'pending') {
      return NextResponse.json(
        { error: 'Verification request already pending' },
        { status: 400 }
      );
    }

    // 인증 신청 생성 (이전 거부된 인증이 있으면 덮어쓰기)
    const { data, error } = existing
      ? await supabase
          .from('business_verifications')
          .update({
            business_name: businessName,
            business_number: businessNumber,
            representative_name: representativeName,
            business_type: businessType,
            business_address: businessAddress,
            contact_email: contactEmail,
            contact_phone: contactPhone,
            documents,
            status: 'pending',
            submitted_at: new Date().toISOString(),
            reviewed_at: null,
            rejection_reason: null,
          })
          .eq('id', existing.id)
          .select()
          .single()
      : await supabase
          .from('business_verifications')
          .insert({
            user_id: user.id,
            business_name: businessName,
            business_number: businessNumber,
            representative_name: representativeName,
            business_type: businessType,
            business_address: businessAddress,
            contact_email: contactEmail,
            contact_phone: contactPhone,
            documents,
            status: 'pending',
          })
          .select()
          .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ verification: data }, { status: 201 });

  } catch (error: any) {
    console.error('Submit verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
