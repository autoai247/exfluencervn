import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 이 API 라우트는 동적이어야 함 (쿼리 파라미터 사용)
export const dynamic = 'force-dynamic';

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = (searchParams.get('category') as 'points' | 'tickets' | 'earnings' | 'referrals' | 'attendance') || 'points';
    const limit = parseInt(searchParams.get('limit') || '100');

    const supabase = createServiceClient();

    let rankedUsers: Array<Record<string, unknown>> = [];

    if (category === 'tickets') {
      // raffle_tickets 합산 기준 랭킹
      const { data: ticketRanks, error } = await supabase
        .from('raffle_tickets')
        .select('user_id, ticket_count, profiles(id, name, name_vi, email, avatar_url, user_type, followers)')
        .order('ticket_count', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Ticket ranking fetch error:', error);
        return NextResponse.json(
          { error: '서버 오류가 발생했습니다' },
          { status: 500 }
        );
      }

      // 사용자별 티켓 합산
      const userTicketMap = new Map<string, { totalTickets: number; profile: Record<string, unknown> }>();
      (ticketRanks || []).forEach((row: Record<string, unknown>) => {
        const uid = row.user_id as string;
        const existing = userTicketMap.get(uid);
        if (existing) {
          existing.totalTickets += (row.ticket_count as number) || 0;
        } else {
          userTicketMap.set(uid, {
            totalTickets: (row.ticket_count as number) || 0,
            profile: (row.profiles as Record<string, unknown>) || {},
          });
        }
      });

      rankedUsers = Array.from(userTicketMap.entries())
        .sort((a, b) => b[1].totalTickets - a[1].totalTickets)
        .slice(0, limit)
        .map(([, val], index) => ({
          ...val.profile,
          totalTickets: val.totalTickets,
          rank: index + 1,
          trend: 'same' as 'up' | 'down' | 'same',
        }));

    } else if (category === 'points') {
      // shopping_points 기준 랭킹
      const { data: users, error } = await supabase
        .from('profiles')
        .select('id, name, name_vi, email, avatar_url, user_type, followers, shopping_points')
        .order('shopping_points', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Points ranking fetch error:', error);
        return NextResponse.json(
          { error: '서버 오류가 발생했습니다' },
          { status: 500 }
        );
      }

      rankedUsers = (users || []).map((user, index) => ({
        ...user,
        rank: index + 1,
        trend: 'same' as 'up' | 'down' | 'same',
      }));

    } else if (category === 'earnings') {
      // followers 기준 랭킹 (earnings → followers 대체, profiles에 cash 컬럼 없음)
      const { data: users, error } = await supabase
        .from('profiles')
        .select('id, name, name_vi, email, avatar_url, user_type, followers, engagement_rate')
        .order('followers', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Earnings ranking fetch error:', error);
        return NextResponse.json(
          { error: '서버 오류가 발생했습니다' },
          { status: 500 }
        );
      }

      rankedUsers = (users || []).map((user, index) => ({
        ...user,
        rank: index + 1,
        trend: 'same' as 'up' | 'down' | 'same',
      }));

    } else {
      // referrals, attendance 등 기타 카테고리 - 기본 프로필 목록 반환
      const { data: users, error } = await supabase
        .from('profiles')
        .select('id, name, name_vi, email, avatar_url, user_type, followers')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Default ranking fetch error:', error);
        return NextResponse.json(
          { error: '서버 오류가 발생했습니다' },
          { status: 500 }
        );
      }

      rankedUsers = (users || []).map((user, index) => ({
        ...user,
        rank: index + 1,
        trend: 'same' as 'up' | 'down' | 'same',
      }));
    }

    return NextResponse.json({
      success: true,
      category,
      rankings: rankedUsers,
    });

  } catch (error) {
    console.error('Get ranking error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
