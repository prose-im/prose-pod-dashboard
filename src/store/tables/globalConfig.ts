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
        domain: "",

        // Server Config
        message_archive_enabled: true,
        message_archive_retention: "infinite",
        file_upload_allowed: true,
        file_storage_encryption_scheme: "AES-256",
        file_storage_retention: "infinite",

        // advanced Config
        mfa_required: true,
        tls_profile: "modern",
        federation_enabled: true,
        federation_whitelist_enabled: false,
        federation_friendly_servers: [],
        settings_backup_interval: "P1D",
        user_data_backup_interval: "P1W"
      }
    };
  },

  getters: {
    getGlobalConfig: function () {
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
