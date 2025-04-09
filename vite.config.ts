import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Family Recipes',
        short_name: 'Recipes',
        start_url: '/FamilyRecipes/',
        display: 'standalone',
        background_color: '#FFF8E1',
        theme_color: '#FFA726',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: 'screenshot-wide.png',  
            sizes: '1245x552',  
            type: 'image/png',
            form_factor: 'wide',  // For desktop (wide screen)
          },
          {
            src: 'screenshot-mobile.png',  
            sizes: '478x774',  
            type: 'image/png',
          },
        ]
      },
      base: '/FamilyRecipes/', // optional but reinforces path for GitHub Pages
    }),
  ],
  base: mode === 'production' ? '/FamilyRecipes/' : '/',
}))
