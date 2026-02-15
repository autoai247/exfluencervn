import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';


export const dynamic = 'force-dynamic';
/**
 * POST /api/upload
 * 파일 업로드
 *
 * Form Data:
 * - file: File (이미지/문서 파일)
 * - bucket: string ('campaign-images' | 'certificates' | 'content-submissions' | 'profile-avatars')
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    // 인증 확인
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string;

    // Validation
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!bucket) {
      return NextResponse.json(
        { error: 'Bucket name is required' },
        { status: 400 }
      );
    }

    // 허용된 버킷 목록
    const allowedBuckets = [
      'campaign-images',
      'certificates',
      'content-submissions',
      'profile-avatars'
    ];

    if (!allowedBuckets.includes(bucket)) {
      return NextResponse.json(
        { error: 'Invalid bucket name' },
        { status: 400 }
      );
    }

    // 파일 크기 제한 (예: 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // 파일 타입 확인
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'application/pdf'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF, PDF' },
        { status: 400 }
      );
    }

    // Supabase Storage 업로드
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return NextResponse.json({
      url: publicUrl,
      fileName,
      size: file.size,
      type: file.type
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
