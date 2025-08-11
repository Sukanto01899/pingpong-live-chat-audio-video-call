import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir:'../server/dist'
  },
  // server: {
  //   proxy:{
  //     '/api': 'https://pingpong-live-chat-audio-video-call.onrender.com'
  //   }
  // }
})
