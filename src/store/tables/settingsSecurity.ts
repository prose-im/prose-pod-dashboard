/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";

// PROJECT: STORE
import store from "@/store";

// PROJECT: API
import APIServerConfig, {
  DEFAULT_SERVER_CONFIG,
  TlsProfile
} from "@/api/providers/serverConfig";

/* *************************************************************************
 * INTERFACES
 * ************************************************************************* */

export interface SecurityAndEncryptionUiState {
  accountSecurity: AccountSecurityUiState;
  networkEncryption: NetworkEncryptionUiState;
}

export interface AccountSecurityUiState {
  require2FA: boolean;
}

export interface NetworkEncryptionUiState {
  tlsProfile: TlsProfile;
}

/* *************************************************************************
 * CONSTANTS
 * ************************************************************************* */

/**
 * @deprecated The Pod Dashboard shouldn’t depend on default values
 *   as they can change in the Pod API at any time without prior notice.
 *   It should use `undefined` and UI placeholders instead.
 */
const DEFAULT_SECURITY_AND_ENCRYPTION_UI_STATE: SecurityAndEncryptionUiState = {
  accountSecurity: {
    require2FA: DEFAULT_SERVER_CONFIG.mfa_required
  },

  networkEncryption: {
    tlsProfile: DEFAULT_SERVER_CONFIG.tls_profile
  }
};

/* *************************************************************************
 * TABLE
 * ************************************************************************* */

const $settingsSecurity = defineStore("settingsSecurity", {
  state: (): { value: SecurityAndEncryptionUiState } => {
    return { value: DEFAULT_SECURITY_AND_ENCRYPTION_UI_STATE };
  },

  getters: {
    getSettings: function () {
      return (): SecurityAndEncryptionUiState => {
        return this.value;
      };
    }
  },

  actions: {
    async loadConfig(): Promise<void> {
      try {
        // Load globalConfig configuration
        await store.$globalConfig.loadGlobalConfig();

        const response = store.$globalConfig.getServerConfig();

        this.$patch(() => {
          this.value = {
            accountSecurity: {
              require2FA: response.mfa_required
            },

            networkEncryption: {
              tlsProfile: response.tls_profile
            }
          };
        });
      } catch (error) {
        console.error(
          "Error when loading the global configuration:",
          JSON.stringify(error, null, 2)
        );
      }
    },

    async updateTlsProfile(newTlsProfile: TlsProfile) {
      try {
        const value = await APIServerConfig.setTlsProfile(newTlsProfile);

        this.$patch(() => {
          this.value.networkEncryption.tlsProfile = value;
        });
      } catch (error) {
        console.error(
          "Error when setting 'TLS profile':",
          JSON.stringify(error, null, 2)
        );
      }
    },

    async resetTlsProfile() {
      try {
        const defaultValue = await APIServerConfig.resetTlsProfile();

        this.$patch(() => {
          this.value.networkEncryption.tlsProfile = defaultValue;
        });
      } catch (error) {
        console.error(
          "Error when resetting 'TLS profile':",
          JSON.stringify(error, null, 2)
        );
      }
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $settingsSecurity;
