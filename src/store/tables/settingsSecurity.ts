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
import store from "@/store/index";

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $settingsSecurity = defineStore("settingsSecurity", {
  state: () => {
    return {
      security: {
        twoFactor: true
      },

      encryption: {
        version: "",
        strength: ""
      }
    };
  },

  getters: {
    getSettings: function () {
      return () => {
        return {
          security: this.security,
          encryption: this.encryption
        };
      };
    }
  },

  actions: {
    async loadConfig(): Promise<void> {
      await store.$globalConfig.loadGlobalConfig();

      const response = store.$globalConfig.getGlobalConfig();

      // Load globalConfig configuration
      this.security.twoFactor = response.mfa_required;
      this.encryption.strength = response.minimum_cipher_suite;
      this.encryption.version = response.minimum_tls_version;
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $settingsSecurity;
