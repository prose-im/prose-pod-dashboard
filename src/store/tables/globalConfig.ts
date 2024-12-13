/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";

// PROJECT: UTILITIES
import APIGlobal, { ServerConfigResponse } from "@/api/providers/global";

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface GlobalConfig {
  properties: ServerConfigResponse;
}

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  informationLoaded: false
};

// const INFORMATION_AVAILABILITY_DEFAULT = Availability.Available;

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $globalConfig = defineStore("globalConfig", {
  state: (): GlobalConfig => {
    return {
      properties: {
        domain: "crisp.chat",

        // Server Config
        message_archive_enabled: true,
        message_archive_retention: "infinite",
        file_upload_allowed: true,
        file_storage_encryption_scheme: "AES-256",
        file_storage_retention: "infinite",

        // advanced Config
        mfa_required: true,
        minimum_tls_version: "1.2",
        minimum_cipher_suite: "HIGH_STRENGTH",
        federation_enabled: true,
        settings_backup_interval: "P1D",
        user_data_backup_interval: "P1W"
      }
    };
  },

  getters: {
    getGlobalConfig: function (): ServerConfigResponse {
      return () => {
        return this.properties;
      };
    },

    getDomain: function () {
      return () => {
        return this.properties.domain;
      };
    }
  },

  actions: {
    async loadGlobalConfig(reload = false): Promise<void> {
      // Load information? (or reload)
      if (LOCAL_STATES.informationLoaded === false || reload === true) {
        // Load globalConfig configuration
        const globalConfig = await APIGlobal.getWholeServerConfig();

        // Update stored config
        // Notice: this is a cross-store operation, for convenience.
        this.properties = globalConfig;
      }

      // Mark as loaded
      LOCAL_STATES.informationLoaded = true;
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $globalConfig;
