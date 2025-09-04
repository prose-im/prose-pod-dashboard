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
  networkEncryption: NetworkEncryptionUiState;
  pushNotification: PushNotificationnUiState;
}

export interface NetworkEncryptionUiState {
  tlsProfile: TlsProfile;
}

export interface PushNotificationnUiState {
  withBody: boolean;
  withSender: boolean;
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
  networkEncryption: {
    tlsProfile: DEFAULT_SERVER_CONFIG.tls_profile
  },

  pushNotification: {
    withBody: DEFAULT_SERVER_CONFIG.push_notification_with_body,
    withSender: DEFAULT_SERVER_CONFIG.push_notification_with_sender
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
            networkEncryption: {
              tlsProfile: response.tls_profile
            },

            pushNotification: {
              withBody: response.push_notification_with_body,
              withSender: response.push_notification_with_sender
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
      const value = await APIServerConfig.setTlsProfile(newTlsProfile);

      this.$patch(() => {
        this.value.networkEncryption.tlsProfile = value;
      });
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
    },

    async updatePushNotificationWithBody(newValue: boolean) {
      const value = await APIServerConfig.setPushNotificationWithBody(newValue);

      this.$patch(() => {
        this.value.pushNotification.withBody = value;
      });
    },

    async updatePushNotificationWithSender(newValue: boolean) {
      const value = await APIServerConfig.setPushNotificationWithSender(
        newValue
      );

      this.$patch(() => {
        this.value.pushNotification.withSender = value;
      });
    },

    async restorePushNotificationConfig(): Promise<void> {
      try {
        const defaultValue =
          await APIServerConfig.resetPushNotificationsConfig();

        this.$patch(() => {
          this.value.pushNotification.withBody =
            defaultValue.push_notification_with_body;
          this.value.pushNotification.withSender =
            defaultValue.push_notification_with_sender;
        });
      } catch (error) {
        console.error(
          "Error when resetting the 'Push Notification' configuration:",
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
