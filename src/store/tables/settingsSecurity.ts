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
import APIAdvancedSecurity from "@/api/providers/advancedSecurity";

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
        tls_profile: "",
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
      })
    },

    async updateTlsProfile(newTlsProfile: string) {
      await APIAdvancedSecurity.updateTlsProfile(newTlsProfile);

      this.encryption.tls_profile = newTlsProfile;
    },

    async resetTlsProfile() {
      const response = await APIAdvancedSecurity.resetTlsProfile();

      this.$patch(() => {
        this.encryption.tls_profile = response.tls_profile;
      });
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $settingsSecurity;
