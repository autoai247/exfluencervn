import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// points 테이블 type 컬럼 허용 값
const VALID_TYPES = ['earned', 'spent', 'bonus', 'refund'] as const;
type PointType = (typeof VALID_TYPES)[number];

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

    const supabase = createClient();

    const { data: transactions, error } = await supabase
      .from('points')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get transactions error:', error);
      return NextResponse.json(
        { error: '포인트 내역 조회에 실패했습니다' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      transactions: transactions ?? [],
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      type,
      amount,
      reason,
      relatedCampaignId,
    }: {
      userId: string;
      type: PointType;
      amount: number;
      reason: string;
      relatedCampaignId?: string;
    } = body;

    // 입력 검증
    if (!userId || !type || amount === undefined || !reason) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다 (userId, type, amount, reason)' },
        { status: 400 }
      );
    }

    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json(
        {
          error: `type은 다음 중 하나여야 합니다: ${VALID_TYPES.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 사용자 존재 여부 확인
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // spent / refund 시 잔액 확인
    if (type === 'spent') {
      const { data: currentPoints, error: sumError } = await supabase
        .from('points')
        .select('amount')
        .eq('user_id', userId);

      if (sumError) {
        return NextResponse.json(
          { error: '잔액 조회에 실패했습니다' },
          { status: 500 }
        );
      }

      const balance = (currentPoints ?? []).reduce(
        (acc, row) => acc + row.amount,
        0
      );

      if (balance + amount < 0) {
        return NextResponse.json(
          { error: '포인트가 부족합니다' },
          { status: 400 }
        );
      }
    }

    // 포인트 트랜잭션 삽입
    const insertPayload: {
      user_id: string;
      type: PointType;
      amount: number;
      reason: string;
      related_campaign_id?: string;
    } = {
      user_id: userId,
      type,
      amount,
      reason,
    };

    if (relatedCampaignId) {
      insertPayload.related_campaign_id = relatedCampaignId;
    }

    const { data: transaction, error: insertError } = await supabase
      .from('points')
      .insert(insertPayload)
      .select()
      .single();

    if (insertError) {
      console.error('Point transaction insert error:', insertError);
      return NextResponse.json(
        { error: '포인트 트랜잭션 저장에 실패했습니다' },
        { status: 500 }
      );
    }

    // 현재 잔액 계산
    const { data: allPoints } = await supabase
      .from('points')
      .select('amount')
      .eq('user_id', userId);

    const newBalance = (allPoints ?? []).reduce(
      (acc, row) => acc + row.amount,
      0
    );

    return NextResponse.json({
      success: true,
      transaction,
      newBalance,
    });
  } catch (error) {
    console.error('Point transaction error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
