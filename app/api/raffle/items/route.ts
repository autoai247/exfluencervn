import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// 응모 상품 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const activeOnly = searchParams.get('activeOnly') === 'true';

    const supabase = createServiceClient();

    let query = supabase
      .from('raffle_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (activeOnly) {
      query = query.eq('active', true);
    }

    const { data: items, error } = await query;

    if (error) {
      console.error('Supabase raffle items fetch error:', error);
      return NextResponse.json(
        { error: '서버 오류가 발생했습니다' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      items: items || [],
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
      nameVi,
      description,
      descriptionVi,
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

    const supabase = createServiceClient();

    const { data: newItem, error } = await supabase
      .from('raffle_items')
      .insert({
        name,
        name_vi: nameVi ?? null,
        description,
        description_vi: descriptionVi ?? null,
        price,
        total_tickets: totalTickets,
        current_tickets: currentTickets,
        prize_value: prizeValue,
        stock: stock ?? 0,
        active,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase create raffle item error:', error);
      return NextResponse.json(
        { error: '서버 오류가 발생했습니다' },
        { status: 500 }
      );
    }

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

    // camelCase → snake_case 변환
    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.nameVi !== undefined) dbUpdates.name_vi = updates.nameVi;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.descriptionVi !== undefined) dbUpdates.description_vi = updates.descriptionVi;
    if (updates.price !== undefined) dbUpdates.price = updates.price;
    if (updates.totalTickets !== undefined) dbUpdates.total_tickets = updates.totalTickets;
    if (updates.currentTickets !== undefined) dbUpdates.current_tickets = updates.currentTickets;
    if (updates.prizeValue !== undefined) dbUpdates.prize_value = updates.prizeValue;
    if (updates.stock !== undefined) dbUpdates.stock = updates.stock;
    if (updates.active !== undefined) dbUpdates.active = updates.active;
    dbUpdates.updated_at = new Date().toISOString();

    const supabase = createServiceClient();

    const { data: updatedItem, error } = await supabase
      .from('raffle_items')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update raffle item error:', error);
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
