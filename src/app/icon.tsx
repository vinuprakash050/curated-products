import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 128,
  height: 128,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Icon() {
  // Load the logo
  const logoUrl = new URL('../../logo.png', import.meta.url)
  const logoArrayBuffer = await fetch(logoUrl).then((res) => res.arrayBuffer())
  
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '24px',
            overflow: 'hidden',
            background: 'white',
          }}
        >
          <img
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            src={logoArrayBuffer}
            alt="Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '8px',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
