import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/favorites?user_id=xxx - 즐겨찾기 목록
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json({ error: 'user_id required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('favorites')
      .select(\`
        campaign_id,
        created_at,
        campaign:campaigns(*)
      \`)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Favorites fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/favorites - 즐겨찾기 추가
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, campaign_id } = body;

    if (!user_id || !campaign_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('favorites')
      .insert({ user_id, campaign_id })
      .select()
      .single();

    if (error) {
      console.error('Favorite creation error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/favorites - 즐겨찾기 제거
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const campaignId = searchParams.get('campaign_id');

    if (!userId || !campaignId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('campaign_id', campaignId);

    if (error) {
      console.error('Favorite deletion error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
