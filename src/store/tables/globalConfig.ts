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

// PROJECT: API
import APIServerConfig, {
  DEFAULT_SERVER_CONFIG,
  ServerConfig
} from "@/api/providers/serverConfig";
import APIMisc, { PodComponentsVersions } from "@/api/providers/misc";
import APIAdministration from "@/api/providers/administration";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface GlobalConfig {
  serverConfig: ServerConfig;
  podVersion: PodComponentsVersions | null;
}

/* *************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  informationLoaded: false
};

/* *************************************************************************
 * TABLE
 * ************************************************************************* */

const $globalConfig = defineStore("globalConfig", {
  state: (): GlobalConfig => {
    return {
      serverConfig: DEFAULT_SERVER_CONFIG,
      podVersion: null
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
    },

    getPodVersion: function () {
      return () => {
        return this.podVersion;
      };
    }
  },

  actions: {
    async loadGlobalConfig(reload = false): Promise<void> {
      // Load information? (or reload)
      if (LOCAL_STATES.informationLoaded === false || reload === true) {
        // Update stored configuration
        // Notice: this is a cross-store operation, for convenience.
        const podVersion = await APIMisc.getPodVersion();

        this.podVersion = podVersion;

        try {
          this.serverConfig = await APIServerConfig.getServerConfig();
        } catch (error: any) {
          if (error.status === 401) {
            console.log("Server config cannot be loaded: Not authenticated.");
          } else {
            console.error("Error loading Server config:", error);
          }
        }
      }

      // Mark as loaded
      LOCAL_STATES.informationLoaded = true;
    },

    async performFactoryReset(): Promise<void> {
      const confirmation =
        await APIAdministration.getFactoryResetConfirmation();

      await APIAdministration.factoryReset(confirmation);
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $globalConfig;
