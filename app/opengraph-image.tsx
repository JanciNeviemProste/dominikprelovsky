import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Dominik Prelovský — fitness coach, online koučing, Trnava';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#161616',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div
            style={{
              width: 12,
              height: 64,
              background: '#f73131',
            }}
          />
          <span style={{ fontSize: 28, opacity: 0.7, letterSpacing: 4 }}>FITNESS COACH</span>
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, color: 'white' }}>
          DOMINIK
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, color: '#f73131' }}>
          PRELOVSKÝ
        </div>
        <div style={{ marginTop: 32, fontSize: 32, opacity: 0.85 }}>
          Online koučing · Trnava · Men’s Physique
        </div>
      </div>
    ),
    { ...size },
  );
}
