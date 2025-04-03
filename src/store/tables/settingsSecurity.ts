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
import store from "@/store/index";
import APIServerConfig, { TlsProfile } from "@/api/providers/serverConfig";

/* *************************************************************************
 * TABLE
 * ************************************************************************* */

const $settingsSecurity = defineStore("settingsSecurity", {
  state: () => {
    return {
      security: {
        twoFactor: true
      },

      encryption: {
        tls_profile: ""
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
      // Load globalConfig configuration
      await store.$globalConfig.loadGlobalConfig();

      const response = store.$globalConfig.getGlobalConfig();

      this.$patch(() => {
        this.security.twoFactor = response.mfa_required;
        this.encryption.tls_profile = response.tls_profile;
      });
    },

    async updateTlsProfile(newTlsProfile: TlsProfile) {
      await APIServerConfig.setTlsProfile(newTlsProfile);

      this.encryption.tls_profile = newTlsProfile;
    },

    async resetTlsProfile() {
      const defaultValue = await APIServerConfig.resetTlsProfile();

      this.$patch(() => {
        this.encryption.tls_profile = defaultValue;
      });
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $settingsSecurity;
