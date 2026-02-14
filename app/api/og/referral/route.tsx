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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 70% 60%, rgba(240, 147, 251, 0.3) 0%, transparent 50%)',
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
          {/* Icon */}
          <div
            style={{
              fontSize: 100,
              marginBottom: 30,
            }}
          >
            👥
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: 'white',
              textShadow: '0 8px 16px rgba(0, 0, 0, 0.4), 0 0 60px rgba(240, 147, 251, 0.6)',
              marginBottom: 20,
              letterSpacing: '-2px',
            }}
          >
            친구 초대
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: 'white',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              marginBottom: 50,
            }}
          >
            함께하면 더 큰 혜택!
          </div>

          {/* Rewards box */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 30,
              padding: '40px 60px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 60,
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                30,000 SP
              </div>
              <div style={{ fontSize: 40 }}>+</div>
              <div
                style={{
                  fontSize: 60,
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                5 응모권
              </div>
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: '#666',
              }}
            >
              친구 1명당
            </div>
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 30,
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
              ⚡ 무제한 초대
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
              🎁 즉시 지급
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
              🏆 보너스 혜택
            </div>
          </div>
        </div>

        {/* Urgency badge */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 215, 0, 0.95)',
            borderRadius: 50,
            padding: '15px 35px',
            boxShadow: '0 8px 24px rgba(255, 215, 0, 0.4)',
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: '#333',
            }}
          >
            🎉 한정 이벤트
          </span>
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
