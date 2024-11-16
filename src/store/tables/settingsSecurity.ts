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
import mitt from "mitt";

// PROJECT: UTILITIES
import APIAdvancedSecurity  from "@/api/providers/advancedSecurity";
import store from "..";

/**************************************************************************
 * INSTANCES
 * ************************************************************************* */

const EventBus = mitt();

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  configLoaded: false
};

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
    events(): ReturnType<typeof mitt> {
      // Return event bus
      return EventBus;
    },

    async loadConfig(): Promise<void> {
      await store.$globalConfig.loadGlobalConfig();

      const response = await store.$globalConfig.getGlobalConfig();
        
      // Load globalConfig configuration
      this.security.twoFactor = response.mfa_required;
      this.encryption.strength = response.minimum_cipher_suite;
      this.encryption.version = response.minimum_tls_version;
      
    },

    setCallSoundOutputSource(value: string): void {
      this.setGeneric(this.calls.sound, "outputSource", value);
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $settingsSecurity;
