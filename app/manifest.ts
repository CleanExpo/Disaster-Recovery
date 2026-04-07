import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Disaster Recovery Australia',
    short_name: 'DR Australia',
    description: 'Lodge and track disaster recovery claims — 24/7 IICRC-certified restoration services across Australia',
    start_url: '/claim/start',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1E3A5F',
    orientation: 'portrait',
    scope: '/',
    lang: 'en-AU',
    categories: ['utilities', 'lifestyle'],
    icons: [
      {
        src: '/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Lodge a Claim',
        short_name: 'Claim',
        description: 'Start your disaster recovery claim',
        url: '/claim/start',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }],
      },
      {
        name: 'Emergency Services',
        short_name: 'Emergency',
        description: '24/7 online emergency response',
        url: '/emergency',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }],
      },
      {
        name: 'Contact Us',
        short_name: 'Contact',
        description: 'Get in touch with our team',
        url: '/contact',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }],
      },
    ],
  }
}
