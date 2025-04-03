/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";

// PROJECT: UTILITIES
import APIServerConfig, {
  DEFAULT_SERVER_CONFIG,
  ServerConfig
} from "@/api/providers/serverConfig";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface GlobalConfig {
  serverConfig: ServerConfig;
}

/* *************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  informationLoaded: false
};

// const INFORMATION_AVAILABILITY_DEFAULT = Availability.Available;

/* *************************************************************************
 * TABLE
 * ************************************************************************* */

const $globalConfig = defineStore("globalConfig", {
  state: (): GlobalConfig => {
    return {
      serverConfig: DEFAULT_SERVER_CONFIG
    };
  },

  getters: {
    getServerConfig: function () {
      return () => {
        return this.serverConfig;
      };
    },

    getDomain: function () {
      return () => {
        return this.serverConfig.domain;
      };
    }
  },

  actions: {
    async loadGlobalConfig(reload = false): Promise<void> {
      // Load information? (or reload)
      if (LOCAL_STATES.informationLoaded === false || reload === true) {
        // Load globalConfig configuration
        const serverConfig = await APIServerConfig.getServerConfig();

        // Update stored config
        // Notice: this is a cross-store operation, for convenience.
        this.serverConfig = serverConfig;
      }

      // Mark as loaded
      LOCAL_STATES.informationLoaded = true;
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $globalConfig;
