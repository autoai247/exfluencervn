import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';


export const dynamic = 'force-dynamic';
/**
 * GET /api/disputes
 * 분쟁 목록 조회
 *
 * Query Parameters:
 * - status?: 'pending' | 'investigating' | 'resolved'
 * - participantId?: string (특정 참여자의 분쟁만 조회)
 *
 * 일반 사용자: 자신이 관련된 분쟁만 조회
 * 관리자: 모든 분쟁 조회 가능
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    const participantId = searchParams.get('participantId');
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
      .from('disputes')
      .select(`
        *,
        participant:campaign_participants!participant_id(
          *,
          campaign:campaigns!campaign_id(title),
          influencer:profiles!influencer_id(full_name, avatar_url),
          advertiser:campaigns!campaign_id(advertiser:profiles!advertiser_id(full_name, avatar_url))
        ),
        reporter:profiles!reported_by(full_name, avatar_url)
      `)
      .order('created_at', { ascending: false });

    // 관리자가 아니면 자신이 관련된 분쟁만 조회
    if (profile?.user_type !== 'admin') {
      // 자신이 신고한 분쟁 또는 자신이 포함된 캠페인의 분쟁
      const { data: participants } = await supabase
        .from('campaign_participants')
        .select('id')
        .or(`influencer_id.eq.${user.id},campaign_id.in.(select id from campaigns where advertiser_id = '${user.id}')`);

      const participantIds = participants?.map(p => p.id) || [];

      query = query.or(
        `reported_by.eq.${user.id},participant_id.in.(${participantIds.join(',')})`
      );
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (participantId) {
      query = query.eq('participant_id', participantId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ disputes: data });

  } catch (error: any) {
    console.error('Get disputes error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/disputes
 * 분쟁 신고
 *
 * 요청 Body:
 * {
 *   participantId: string;
 *   category: 'payment' | 'content' | 'deadline' | 'contract' | 'other';
 *   title: string;
 *   description: string;
 *   evidence?: string[]; // 증거 파일 URL 배열
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { participantId, category, title, description, evidence } = body;

    // Validation
    const requiredFields = ['participantId', 'category', 'title', 'description'];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const validCategories = ['payment', 'content', 'deadline', 'contract', 'other'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 인증 확인
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 참여자 정보 조회 (권한 확인용)
    const { data: participant, error: participantError } = await supabase
      .from('campaign_participants')
      .select(`
        *,
        campaign:campaigns!campaign_id(advertiser_id)
      `)
      .eq('id', participantId)
      .single();

    if (participantError || !participant) {
      return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
    }

    // 신고 권한 확인 (인플루언서 본인 또는 광고주만 가능)
    const isInfluencer = participant.influencer_id === user.id;
    const isAdvertiser = participant.campaign.advertiser_id === user.id;

    if (!isInfluencer && !isAdvertiser) {
      return NextResponse.json(
        { error: 'You are not authorized to report this participant' },
        { status: 403 }
      );
    }

    // 이미 동일 참여자에 대한 미해결 분쟁이 있는지 확인
    const { data: existingDispute } = await supabase
      .from('disputes')
      .select('id')
      .eq('participant_id', participantId)
      .eq('reported_by', user.id)
      .in('status', ['pending', 'investigating'])
      .single();

    if (existingDispute) {
      return NextResponse.json(
        { error: 'You already have an ongoing dispute for this participant' },
        { status: 400 }
      );
    }

    // 분쟁 생성
    const { data, error } = await supabase
      .from('disputes')
      .insert({
        participant_id: participantId,
        reported_by: user.id,
        category,
        title,
        description,
        evidence: evidence || [],
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ dispute: data }, { status: 201 });

  } catch (error: any) {
    console.error('Create dispute error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
