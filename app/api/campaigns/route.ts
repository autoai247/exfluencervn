import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/campaigns
 * 캠페인 목록 조회
 *
 * Query Parameters:
 * - status?: 'recruiting' | 'in_progress' | 'completed' | 'cancelled'
 * - genre?: string
 * - platform?: 'instagram' | 'tiktok' | 'youtube'
 * - search?: string
 * - limit?: number
 * - offset?: number
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const genre = searchParams.get('genre');
    const platform = searchParams.get('platform');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = createClient();

    let query = supabase
      .from('campaigns')
      .select('*, advertiser:profiles!advertiser_id(*)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    if (genre) {
      query = query.contains('genres', [genre]);
    }

    if (platform) {
      query = query.contains('platforms', [platform]);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaigns: data, total: count });

  } catch (error: any) {
    console.error('Get campaigns error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/campaigns
 * 캠페인 생성
 *
 * 요청 Body:
 * {
 *   title: string;
 *   titleVi?: string;
 *   description: string;
 *   descriptionVi?: string;
 *   requirements?: string;
 *   requirementsVi?: string;
 *   budgetMin: number;
 *   budgetMax: number;
 *   recruitCount: number;
 *   platforms: string[];
 *   genres?: string[];
 *   startDate: string (YYYY-MM-DD);
 *   endDate: string (YYYY-MM-DD);
 *   deadline: string (YYYY-MM-DD);
 *   isProductProvided: boolean;
 *   productValue?: number;
 *   images?: string[];
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    const requiredFields = [
      'title',
      'description',
      'budgetMin',
      'budgetMax',
      'recruitCount',
      'platforms',
      'startDate',
      'endDate',
      'deadline'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const supabase = createClient();

    // 인증 확인
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 사업자 인증 확인
    const { data: verification } = await supabase
      .from('business_verifications')
      .select('status')
      .eq('user_id', user.id)
      .single();

    if (!verification || verification.status !== 'approved') {
      return NextResponse.json(
        { error: 'Business verification required' },
        { status: 403 }
      );
    }

    // 캠페인 생성
    const { data, error } = await supabase
      .from('campaigns')
      .insert({
        advertiser_id: user.id,
        title: body.title,
        title_vi: body.titleVi,
        description: body.description,
        description_vi: body.descriptionVi,
        requirements: body.requirements,
        requirements_vi: body.requirementsVi,
        budget_min: body.budgetMin,
        budget_max: body.budgetMax,
        recruit_count: body.recruitCount,
        platforms: body.platforms,
        genres: body.genres || [],
        start_date: body.startDate,
        end_date: body.endDate,
        deadline: body.deadline,
        is_product_provided: body.isProductProvided,
        product_value: body.productValue,
        images: body.images || [],
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaign: data }, { status: 201 });

  } catch (error: any) {
    console.error('Create campaign error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
