import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function validateAdmin(request: NextRequest, adminPassword?: string): boolean {
  const adminSession = request.cookies.get('admin_session')?.value;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  const isValidSession = !!(sessionSecret && adminSession === sessionSecret);
  const isValidPassword = !!(adminPassword && adminPassword === process.env.ADMIN_PASSWORD);

  return isValidSession || isValidPassword;
}

// 추첨 실행 (관리자용)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { raffleId, adminPassword } = body;

    if (!validateAdmin(request, adminPassword)) {
      return NextResponse.json(
        { error: '관리자 권한이 없습니다' },
        { status: 403 }
      );
    }

    const supabase = createServiceClient();

    // 응모 상품 조회
    const { data: raffleItem, error: raffleError } = await supabase
      .from('raffle_items')
      .select('*')
      .eq('id', raffleId)
      .single();

    if (raffleError || !raffleItem) {
      return NextResponse.json(
        { error: '응모 상품을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // 참여자 목록 가져오기 (해당 raffle에 티켓이 1개 이상인 사용자)
    const { data: participants, error: participantsError } = await supabase
      .from('raffle_tickets')
      .select('user_id, ticket_count')
      .eq('raffle_id', raffleId)
      .gt('ticket_count', 0);

    if (participantsError) {
      console.error('Participants fetch error:', participantsError);
      return NextResponse.json(
        { error: '서버 오류가 발생했습니다' },
        { status: 500 }
      );
    }

    if (!participants || participants.length === 0) {
      return NextResponse.json(
        { error: '참여자가 없습니다' },
        { status: 400 }
      );
    }

    // 티켓 수에 비례한 추첨을 위해 모든 티켓을 배열로 만들기
    const ticketPool: string[] = [];
    participants.forEach(p => {
      for (let i = 0; i < p.ticket_count; i++) {
        ticketPool.push(p.user_id);
      }
    });

    // 무작위 추첨
    const randomIndex = Math.floor(Math.random() * ticketPool.length);
    const winnerId = ticketPool[randomIndex];

    // 당첨자 정보 조회
    const { data: winner, error: winnerError } = await supabase
      .from('profiles')
      .select('id, name, email')
      .eq('id', winnerId)
      .single();

    if (winnerError || !winner) {
      return NextResponse.json(
        { error: '당첨자 정보를 찾을 수 없습니다' },
        { status: 500 }
      );
    }

    // 추첨 결과 저장
    const { data: draw, error: drawError } = await supabase
      .from('raffle_draws')
      .insert({
        raffle_id: raffleId,
        winner_id: winnerId,
        winner_name: winner.name,
        draw_date: new Date().toISOString(),
        total_participants: participants.length,
        announced: false,
      })
      .select()
      .single();

    if (drawError) {
      console.error('Raffle draw insert error:', drawError);
      return NextResponse.json(
        { error: '추첨 결과 저장 실패' },
        { status: 500 }
      );
    }

    // 응모 상품 비활성화
    const { error: deactivateError } = await supabase
      .from('raffle_items')
      .update({ active: false, updated_at: new Date().toISOString() })
      .eq('id', raffleId);

    if (deactivateError) {
      console.error('Raffle item deactivate error:', deactivateError);
    }

    const winnerTicketCount = participants.find(p => p.user_id === winnerId)?.ticket_count ?? 0;

    return NextResponse.json({
      success: true,
      draw,
      winner: {
        id: winner.id,
        name: winner.name,
        email: winner.email,
        ticketCount: winnerTicketCount,
      },
      stats: {
        totalParticipants: participants.length,
        totalTickets: ticketPool.length,
        winProbability: (winnerTicketCount / ticketPool.length * 100).toFixed(2) + '%',
      },
    });

  } catch (error) {
    console.error('Raffle draw error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// 추첨 결과 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const raffleId = searchParams.get('raffleId');

    const supabase = createServiceClient();

    let query = supabase
      .from('raffle_draws')
      .select('*')
      .order('draw_date', { ascending: false });

    if (raffleId) {
      query = query.eq('raffle_id', raffleId);
    }

    const { data: results, error } = await query;

    if (error) {
      console.error('Raffle draws fetch error:', error);
      return NextResponse.json(
        { error: '서버 오류가 발생했습니다' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      results: results || [],
    });

  } catch (error) {
    console.error('Get draw results error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// 당첨 발표 (announced 플래그 업데이트)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { drawId, adminPassword } = body;

    if (!validateAdmin(request, adminPassword)) {
      return NextResponse.json(
        { error: '관리자 권한이 없습니다' },
        { status: 403 }
      );
    }

    if (!drawId) {
      return NextResponse.json(
        { error: 'drawId가 필요합니다' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { data: updatedDraw, error } = await supabase
      .from('raffle_draws')
      .update({ announced: true })
      .eq('id', drawId)
      .select()
      .single();

    if (error) {
      console.error('Raffle draw announce error:', error);
      return NextResponse.json(
        { error: '추첨 결과 업데이트 실패' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '당첨 결과가 발표되었습니다',
      draw: updatedDraw,
    });

  } catch (error) {
    console.error('Announce draw error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
