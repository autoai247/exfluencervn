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
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background grid pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            opacity: 0.3,
          }}
        />

        {/* Glow effects */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 140,
              height: 140,
              borderRadius: 35,
              background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 100%)',
              marginBottom: 40,
              boxShadow: '0 20px 50px rgba(34, 211, 238, 0.3)',
            }}
          >
            <span style={{ fontSize: 70 }}>🚀</span>
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: 90,
              fontWeight: 900,
              background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 25,
              letterSpacing: '-3px',
            }}
          >
            Exfluencer VN
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 38,
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              marginBottom: 50,
            }}
          >
            베트남 인플루언서 마케팅 플랫폼
          </div>

          {/* Feature badges */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 25,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(34, 211, 238, 0.15)',
                border: '2px solid rgba(34, 211, 238, 0.4)',
                borderRadius: 50,
                padding: '15px 30px',
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#22d3ee',
                }}
              >
                🎯 맞춤 매칭
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(168, 85, 247, 0.15)',
                border: '2px solid rgba(168, 85, 247, 0.4)',
                borderRadius: 50,
                padding: '15px 30px',
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#a855f7',
                }}
              >
                💎 프리미엄
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(34, 211, 238, 0.15)',
                border: '2px solid rgba(34, 211, 238, 0.4)',
                borderRadius: 50,
                padding: '15px 30px',
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#22d3ee',
                }}
              >
                ⚡ 빠른 지급
              </span>
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.8)',
              marginTop: 50,
            }}
          >
            인플루언서와 광고주를 연결합니다 ✨
          </div>
        </div>

        {/* Footer decoration */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 15,
          }}
        >
          <div style={{ fontSize: 24, opacity: 0.5 }}>📱</div>
          <div style={{ fontSize: 24, opacity: 0.5 }}>💬</div>
          <div style={{ fontSize: 24, opacity: 0.5 }}>📊</div>
          <div style={{ fontSize: 24, opacity: 0.5 }}>🎁</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
