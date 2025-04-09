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

// const INFORMATION_AVAILABILITY_DEFAULT = Availability.Available;

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
        const serverConfig = await APIServerConfig.getServerConfig();
        const podVersion = await APIMisc.getPodVersion();

        // Update stored config
        // Notice: this is a cross-store operation, for convenience.
        this.serverConfig = serverConfig;
        this.podVersion = podVersion;
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
