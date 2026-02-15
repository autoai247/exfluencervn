import { ImageResponse } from 'next/og';

export const dynamic = 'force-dynamic';

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
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6347 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }}
        />

        {/* Sparkles decoration */}
        <div
          style={{
            position: 'absolute',
            top: 100,
            left: 150,
            fontSize: 60,
          }}
        >
          ✨
        </div>
        <div
          style={{
            position: 'absolute',
            top: 480,
            right: 120,
            fontSize: 50,
          }}
        >
          ✨
        </div>
        <div
          style={{
            position: 'absolute',
            top: 150,
            right: 200,
            fontSize: 40,
          }}
        >
          💎
        </div>

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
          {/* Icon */}
          <div
            style={{
              fontSize: 100,
              marginBottom: 30,
            }}
          >
            🛍️
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: 'white',
              textShadow: '0 8px 16px rgba(0, 0, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.6)',
              marginBottom: 20,
              letterSpacing: '-2px',
            }}
          >
            포인트 상점
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: 'white',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              marginBottom: 40,
            }}
          >
            포인트로 교환하는 특별 혜택
          </div>

          {/* Features grid */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 40,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 20,
                padding: '25px 35px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>🎁</div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#FF6347',
                }}
              >
                특가 상품
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 20,
                padding: '25px 35px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>🎫</div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#FFA500',
                }}
              >
                응모권
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 20,
                padding: '25px 35px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>💰</div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#FFD700',
                }}
              >
                현금 전환
              </div>
            </div>
          </div>

          {/* Urgency badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 0, 0, 0.9)',
              borderRadius: 50,
              padding: '15px 40px',
              boxShadow: '0 8px 24px rgba(255, 0, 0, 0.4)',
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: 'white',
              }}
            >
              🔥 오늘만 특별 할인!
            </span>
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
