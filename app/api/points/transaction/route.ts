import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/jsonDb';


export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, walletType, amount, description } = body;

    // 입력 검증
    if (!userId || !type || !walletType || amount === undefined || !description) {
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

    // 포인트 차감 시 잔액 확인
    if (type === 'spending' && walletType === 'shopping') {
      if (user.shoppingPoints < Math.abs(amount)) {
        return NextResponse.json(
          { error: '쇼핑 포인트가 부족합니다' },
          { status: 400 }
        );
      }
    }

    // 현금 출금 시 잔액 확인
    if (type === 'withdrawal' && walletType === 'cash') {
      if (user.cash < Math.abs(amount)) {
        return NextResponse.json(
          { error: '현금이 부족합니다' },
          { status: 400 }
        );
      }
    }

    // 포인트/현금 업데이트
    const updates: Partial<typeof user> = {};
    if (walletType === 'shopping') {
      updates.shoppingPoints = user.shoppingPoints + amount;
    } else {
      updates.cash = user.cash + amount;
    }

    const updatedUser = db.updateUser(userId, updates);
    if (!updatedUser) {
      return NextResponse.json(
        { error: '사용자 업데이트 실패' },
        { status: 500 }
      );
    }

    // 거래 내역 저장
    const transaction = db.addPointTransaction({
      userId,
      type,
      walletType,
      amount,
      description,
      date: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      transaction,
      newBalance: walletType === 'shopping' ? updatedUser.shoppingPoints : updatedUser.cash,
    });

  } catch (error) {
    console.error('Point transaction error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

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

    const transactions = db.getPointTransactions(userId);

    return NextResponse.json({
      success: true,
      transactions,
    });

  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
