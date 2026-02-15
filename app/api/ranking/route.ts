import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/jsonDb';

// 이 API 라우트는 동적이어야 함 (쿼리 파라미터 사용)
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as 'points' | 'tickets' | 'earnings' | 'referrals' | 'attendance' || 'points';
    const limit = parseInt(searchParams.get('limit') || '100');

    let rankings;

    if (category === 'points' || category === 'tickets' || category === 'earnings') {
      rankings = db.getUserRankings(category).slice(0, limit);
    } else {
      // 다른 카테고리는 기본 사용자 목록 반환 (추후 확장 가능)
      rankings = db.getUsers().slice(0, limit);
    }

    // 랭킹 번호 추가
    const rankedUsers = rankings.map((user, index) => ({
      ...user,
      rank: index + 1,
      trend: 'same' as 'up' | 'down' | 'same', // 추후 이전 랭킹과 비교하여 업데이트
    }));

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
