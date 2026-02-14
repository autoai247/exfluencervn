import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/jsonDb';

// 응모 상품 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';

    let items = db.getRaffleItems();

    // 활성 상품만 필터링
    if (activeOnly) {
      items = items.filter(item => item.active);
    }

    return NextResponse.json({
      success: true,
      items,
    });

  } catch (error) {
    console.error('Get raffle items error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// 새로운 응모 상품 생성 (관리자용)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      totalTickets,
      currentTickets = 0,
      prizeValue,
      stock,
      active = true,
    } = body;

    // 입력 검증
    if (!name || !description || !price || !totalTickets || !prizeValue) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다' },
        { status: 400 }
      );
    }

    const newItem = db.createRaffleItem({
      name,
      description,
      price,
      totalTickets,
      currentTickets,
      prizeValue,
      stock,
      active,
    });

    return NextResponse.json({
      success: true,
      item: newItem,
    });

  } catch (error) {
    console.error('Create raffle item error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// 응모 상품 수정 (관리자용)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'id가 필요합니다' },
        { status: 400 }
      );
    }

    const updatedItem = db.updateRaffleItem(id, updates);

    if (!updatedItem) {
      return NextResponse.json(
        { error: '응모 상품을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      item: updatedItem,
    });

  } catch (error) {
    console.error('Update raffle item error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
