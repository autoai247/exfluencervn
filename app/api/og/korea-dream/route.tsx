import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
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
          background: 'linear-gradient(135deg, #FF0844 0%, #FFB199 50%, #FFED46 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background decorations */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 40%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.4) 0%, transparent 40%)',
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
          }}
        >
          {/* Korean flag emoji and title */}
          <div
            style={{
              fontSize: 80,
              marginBottom: 20,
            }}
          >
            🇰🇷
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: 'white',
              textShadow: '0 8px 16px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.5)',
              marginBottom: 20,
              letterSpacing: '-2px',
            }}
          >
            KOREA DREAM
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: 'white',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              marginBottom: 30,
            }}
          >
            한국 뷰티 체험 여행 응모권
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 30,
              marginBottom: 30,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 28,
                fontWeight: 600,
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              ✈️ 왕복 항공
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 28,
                fontWeight: 600,
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              🏨 4박5일
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 28,
                fontWeight: 600,
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              💄 뷰티 시술
            </div>
          </div>

          {/* Price badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 50,
              padding: '20px 50px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            <span
              style={{
                fontSize: 48,
                fontWeight: 900,
                background: 'linear-gradient(135deg, #FF0844 0%, #FFB199 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              50,000,000 VND
            </span>
          </div>

          {/* CTA */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'white',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              marginTop: 30,
            }}
          >
            지금 응모하고 한국에서 만나요! 🎁
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
            gap: 10,
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
