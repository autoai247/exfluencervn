import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/jsonDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, raffleId, ticketCount, pointsSpent } = body;

    // 입력 검증
    if (!userId || !raffleId || !ticketCount || !pointsSpent) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다' },
        { status: 400 }
      );
    }

    // 사용자 조회
    const user = db.getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다' },
        { status: 404 }
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

    // 상품 활성화 여부 확인
    if (!raffleItem.active) {
      return NextResponse.json(
        { error: '이 응모는 현재 진행되지 않습니다' },
        { status: 400 }
      );
    }

    // 재고 확인 (재고가 있는 경우)
    if (raffleItem.stock !== undefined && raffleItem.stock < 1) {
      return NextResponse.json(
        { error: '재고가 부족합니다' },
        { status: 400 }
      );
    }

    // 포인트 잔액 확인
    if (user.shoppingPoints < pointsSpent) {
      return NextResponse.json(
        { error: '쇼핑 포인트가 부족합니다' },
        { status: 400 }
      );
    }

    // 포인트 차감
    const updatedUser = db.updateUser(userId, {
      shoppingPoints: user.shoppingPoints - pointsSpent,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: '포인트 차감 실패' },
        { status: 500 }
      );
    }

    // 응모권 업데이트
    const existingTicket = db.getUserRaffleTicket(userId, raffleId);
    const newTicketCount = (existingTicket?.ticketCount || 0) + ticketCount;
    const newTotalSpent = (existingTicket?.totalSpent || 0) + pointsSpent;

    const raffleTicket = db.updateRaffleTicket(
      userId,
      raffleId,
      newTicketCount,
      newTotalSpent
    );

    // 응모 상품의 현재 티켓 수 증가
    db.updateRaffleItem(raffleId, {
      currentTickets: raffleItem.currentTickets + ticketCount,
    });

    // 재고 차감 (있는 경우)
    if (raffleItem.stock !== undefined) {
      db.updateRaffleItem(raffleId, {
        stock: raffleItem.stock - 1,
      });
    }

    // 구매 내역 저장
    const purchaseHistory = db.addPurchaseHistory({
      userId,
      raffleId,
      tickets: ticketCount,
      pointsSpent,
      date: new Date().toISOString(),
    });

    // 거래 내역 저장
    db.addPointTransaction({
      userId,
      type: 'spending',
      walletType: 'shopping',
      amount: -pointsSpent,
      description: `${raffleItem.name} 구매 (${ticketCount}장)`,
      date: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      raffleTicket,
      purchaseHistory,
      newBalance: updatedUser.shoppingPoints,
    });

  } catch (error) {
    console.error('Raffle purchase error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// 사용자의 응모권 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId가 필요합니다' },
        { status: 400 }
      );
    }

    const tickets = db.getRaffleTickets(userId);
    const history = db.getPurchaseHistory(userId);

    return NextResponse.json({
      success: true,
      tickets,
      history,
    });

  } catch (error) {
    console.error('Get raffle tickets error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
