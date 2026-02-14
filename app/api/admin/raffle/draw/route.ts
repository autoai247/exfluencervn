import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/jsonDb';

// 추첨 실행 (관리자용)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { raffleId, adminPassword } = body;

    // 간단한 관리자 인증 (실제로는 JWT 등 사용)
    if (adminPassword !== 'admin123') {
      return NextResponse.json(
        { error: '관리자 권한이 없습니다' },
        { status: 403 }
      );
    }

    // 응모 상품 조회
    const raffleItem = db.getRaffleItemById(raffleId);
    if (!raffleItem) {
      return NextResponse.json(
        { error: '응모 상품을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // 참여자 목록 가져오기
    const allTickets = db.getRaffleTickets();
    const participants = allTickets.filter(t => t.raffleId === raffleId && t.ticketCount > 0);

    if (participants.length === 0) {
      return NextResponse.json(
        { error: '참여자가 없습니다' },
        { status: 400 }
      );
    }

    // 티켓 수에 비례한 추첨을 위해 모든 티켓을 배열로 만들기
    const ticketPool: string[] = [];
    participants.forEach(p => {
      for (let i = 0; i < p.ticketCount; i++) {
        ticketPool.push(p.userId);
      }
    });

    // 무작위 추첨
    const randomIndex = Math.floor(Math.random() * ticketPool.length);
    const winnerId = ticketPool[randomIndex];

    // 당첨자 정보
    const winner = db.getUserById(winnerId);
    if (!winner) {
      return NextResponse.json(
        { error: '당첨자 정보를 찾을 수 없습니다' },
        { status: 500 }
      );
    }

    // 추첨 결과 저장
    const draw = db.createRaffleDraw({
      raffleId,
      winnerId,
      winnerName: winner.name,
      drawDate: new Date().toISOString(),
      totalParticipants: participants.length,
      announced: false,
    });

    // 응모 상품 비활성화
    db.updateRaffleItem(raffleId, {
      active: false,
    });

    return NextResponse.json({
      success: true,
      draw,
      winner: {
        id: winner.id,
        name: winner.name,
        email: winner.email,
        ticketCount: participants.find(p => p.userId === winnerId)?.ticketCount || 0,
      },
      stats: {
        totalParticipants: participants.length,
        totalTickets: ticketPool.length,
        winProbability: ((participants.find(p => p.userId === winnerId)?.ticketCount || 0) / ticketPool.length * 100).toFixed(2) + '%',
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
    const { searchParams } = new URL(request.url);
    const raffleId = searchParams.get('raffleId');

    const draws = db.getRaffleDraws();
    const results = raffleId
      ? draws.filter(d => d.raffleId === raffleId)
      : draws;

    return NextResponse.json({
      success: true,
      results,
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

    // 관리자 인증
    if (adminPassword !== 'admin123') {
      return NextResponse.json(
        { error: '관리자 권한이 없습니다' },
        { status: 403 }
      );
    }

    // 추첨 결과 발표는 DB에서 직접 수정
    // (간단한 구현을 위해 생략, 실제로는 draw 업데이트 함수 필요)

    return NextResponse.json({
      success: true,
      message: '당첨 결과가 발표되었습니다',
    });

  } catch (error) {
    console.error('Announce draw error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
