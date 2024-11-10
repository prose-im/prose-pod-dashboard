/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

import fs from "fs";
import path from "path";
import merge from "lodash.merge";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import commonConfig from "./config/common";
import developmentConfig from "./config/development";
import productionConfig from "./config/production";

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface Configuration {
  environment: string;

  api: {
    version: string;

    endpoint: {
      local: string;
      remote: string;
    };
  };
}

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const ASSETS_ICONS_PATH = path.join(__dirname, "src/assets/icons/");

/**************************************************************************
 * CONFIGURATION
 * ************************************************************************* */

const CONFIG: Configuration = (function () {
  // Initialize empty configuration
  const config = {
    environment: ""
  };

  // Merge common configuration
  merge(config, commonConfig);

  // Merge per-environment configuration
  switch (process.env.NODE_ENV) {
    case "production": {
      merge(config, productionConfig);

      break;
    }

    default: {
      merge(config, developmentConfig);
    }
  }

  // Merge local configuration? (if any)
  try {
    const localConfig = JSON.parse(
      fs.readFileSync("./config/local.json", "utf8")
    );

    merge(config, localConfig);
  } catch (_) {
    // Ignore errors (local configuration not found)
  }

  return config;
})();

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default defineConfig({
  logLevel: "info",

  server: {
    host: "localhost",
    port: 3030,
    strictPort: true,

    proxy: {
      [`${CONFIG.api.endpoint.local}/`]: {
        target: CONFIG.api.endpoint.remote,

        rewrite: targetUrl => {
          const localUrl = CONFIG.api.endpoint.local;

          if (targetUrl.startsWith(`${localUrl}/`) === true) {
            return targetUrl.replace(localUrl, "");
          }

          return targetUrl;
        }
      }
    }
  },

  preview: {
    host: "localhost",
    port: 3040,
    strictPort: true
  },

  resolve: {
    alias: [{ find: "@/", replacement: path.join(__dirname, "src/") }]
  },

  plugins: [
    vue(),

    createSvgIconsPlugin({
      iconDirs: [ASSETS_ICONS_PATH],
      symbolId: "icon-[name]",
      inject: "body-last",
      customDomId: "__svg__icons__"
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

    postcss: {}
  },

  define: {
    __CONFIG__: CONFIG
  }
});
