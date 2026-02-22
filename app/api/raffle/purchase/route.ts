import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

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

    const supabase = createServiceClient();

    // 사용자 조회 (shopping_points 필드 확인)
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('id, name, email, shopping_points')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

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
    const currentPoints = user.shopping_points ?? 0;
    if (currentPoints < pointsSpent) {
      return NextResponse.json(
        { error: '쇼핑 포인트가 부족합니다' },
        { status: 400 }
      );
    }

    // 포인트 차감
    const { data: updatedUser, error: updateUserError } = await supabase
      .from('profiles')
      .update({ shopping_points: currentPoints - pointsSpent, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select('id, shopping_points')
      .single();

    if (updateUserError || !updatedUser) {
      return NextResponse.json(
        { error: '포인트 차감 실패' },
        { status: 500 }
      );
    }

    // 응모권 upsert (user_id + raffle_id UNIQUE 제약 활용)
    const { data: existingTicket } = await supabase
      .from('raffle_tickets')
      .select('ticket_count, total_spent')
      .eq('user_id', userId)
      .eq('raffle_id', raffleId)
      .single();

    const newTicketCount = (existingTicket?.ticket_count ?? 0) + ticketCount;
    const newTotalSpent = (existingTicket?.total_spent ?? 0) + pointsSpent;

    const { data: raffleTicket, error: ticketError } = await supabase
      .from('raffle_tickets')
      .upsert(
        {
          user_id: userId,
          raffle_id: raffleId,
          ticket_count: newTicketCount,
          total_spent: newTotalSpent,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,raffle_id' }
      )
      .select()
      .single();

    if (ticketError) {
      console.error('Raffle ticket upsert error:', ticketError);
      return NextResponse.json(
        { error: '응모권 업데이트 실패' },
        { status: 500 }
      );
    }

    // 응모 상품의 current_tickets 증가
    const { error: itemUpdateError } = await supabase
      .from('raffle_items')
      .update({
        current_tickets: raffleItem.current_tickets + ticketCount,
        ...(raffleItem.stock !== undefined ? { stock: raffleItem.stock - 1 } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq('id', raffleId);

    if (itemUpdateError) {
      console.error('Raffle item update error:', itemUpdateError);
    }

    // 구매 내역 저장
    const { data: purchaseHistory, error: historyError } = await supabase
      .from('raffle_purchase_history')
      .insert({
        user_id: userId,
        raffle_id: raffleId,
        tickets: ticketCount,
        points_spent: pointsSpent,
      })
      .select()
      .single();

    if (historyError) {
      console.error('Purchase history insert error:', historyError);
    }

    // 포인트 거래 내역 저장
    const { error: pointsError } = await supabase
      .from('points')
      .insert({
        user_id: userId,
        amount: -pointsSpent,
        type: 'spent',
        reason: `${raffleItem.name} 구매 (${ticketCount}장)`,
      });

    if (pointsError) {
      console.error('Points transaction insert error:', pointsError);
    }

    return NextResponse.json({
      success: true,
      raffleTicket,
      purchaseHistory,
      newBalance: updatedUser.shopping_points,
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
    const { searchParams } = request.nextUrl;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId가 필요합니다' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { data: tickets, error: ticketsError } = await supabase
      .from('raffle_tickets')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (ticketsError) {
      console.error('Raffle tickets fetch error:', ticketsError);
      return NextResponse.json(
        { error: '서버 오류가 발생했습니다' },
        { status: 500 }
      );
    }

    const { data: history, error: historyError } = await supabase
      .from('raffle_purchase_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (historyError) {
      console.error('Purchase history fetch error:', historyError);
      return NextResponse.json(
        { error: '서버 오류가 발생했습니다' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      tickets: tickets || [],
      history: history || [],
    });

  } catch (error) {
    console.error('Get raffle tickets error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
