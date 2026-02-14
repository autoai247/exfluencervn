import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/auth/signup
 * 회원가입 API
 *
 * 요청 Body:
 * {
 *   email: string;
 *   password: string;
 *   userType: 'client' | 'artist' | 'venue';
 *   name: string;
 *   nameVi?: string;
 *   phone?: string;
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, userType, name, nameVi, phone } = body;

    // Validation
    if (!email || !password || !userType || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 회원가입
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          user_type: userType,
        },
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 프로필은 트리거로 자동 생성되지만, 추가 정보 업데이트
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name_vi: nameVi,
          phone,
        })
        .eq('id', authData.user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        // 프로필 업데이트 실패해도 회원가입은 성공으로 간주
      }
    }

    return NextResponse.json({
      user: authData.user,
      message: 'Signup successful. Please check your email for verification.',
    });

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
