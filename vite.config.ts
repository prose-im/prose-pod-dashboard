import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const ASSETS_ICONS_PATH = path.join(__dirname, "src/assets/icons/");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@/", replacement: path.join(__dirname, "src/") },
    ]
  },

  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [ASSETS_ICONS_PATH],
      symbolId: "icon-[name]",
      inject: "body-last",
      customDomId: "__svg__icons__",
      // svgoOptions: false
    })
  ],

  css: {
    devSourcemap: false,

    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/stylesheets/variables/all.scss";
        `
      }
    },

    postcss: {
    }
  },
  
})
