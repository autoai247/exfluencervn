import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get dynamic parameters
  const title = searchParams.get('title') || '신규 캠페인';
  const company = searchParams.get('company') || '브랜드명';
  const budget = searchParams.get('budget') || '500,000';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 75% 75%, rgba(96, 165, 250, 0.3) 0%, transparent 50%)',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            textAlign: 'center',
            zIndex: 1,
            maxWidth: '1000px',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(34, 211, 238, 0.9)',
              borderRadius: 50,
              padding: '12px 30px',
              marginBottom: 30,
              boxShadow: '0 4px 12px rgba(34, 211, 238, 0.4)',
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: 'white',
              }}
            >
              💼 새로운 캠페인
            </span>
          </div>

          {/* Company name */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              marginBottom: 20,
            }}
          >
            {company}
          </div>

          {/* Campaign title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: 'white',
              textShadow: '0 8px 16px rgba(0, 0, 0, 0.4), 0 0 60px rgba(96, 165, 250, 0.6)',
              marginBottom: 50,
              letterSpacing: '-1px',
              lineHeight: 1.2,
              maxWidth: '900px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {title}
          </div>

          {/* Budget card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 25,
              padding: '35px 70px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: '#64748b',
                marginBottom: 10,
              }}
            >
              💰 예상 수익
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {Number(budget).toLocaleString()} VND
            </div>
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 35,
              marginTop: 45,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 26,
                fontWeight: 600,
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              ✅ 인증된 광고주
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 26,
                fontWeight: 600,
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              ⚡ 빠른 지급
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 26,
                fontWeight: 600,
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              🎯 맞춤 매칭
            </div>
          </div>
        </div>

        {/* Brand */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 60,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: 'white',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            Exfluencer VN
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
