<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.v-app-advanced-security
  base-subsection(
    v-model="config.networkEncryption"
    @update="onEncryptionUpdate"
    :items="networkItems"
    :restore-option="true"
    :restore-action="onEncryptionRestore"
    :restore-description="restoreNetworkDescription"
    ref="networkEncryptionSubsection"
    title="Network Encryption"
  )

  base-subsection(
    v-model="config.pushNotification"
    @update="onPushUpdate"
    :items="pushItems"
    :restore-option="true"
    :restore-action="onPushRestore"
    :restore-description="restorePushDescription"
    ref="pushNotificationSubsection"
    title="Push Notifications Privacy"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: API
import { TlsProfile } from "@/api/providers/serverConfig";
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseSubsection from "@/components/base/BaseSubsection.vue";

// PROJECT: STORES
import store from "@/store";
import {
  NetworkEncryptionUiState,
  PushNotificationnUiState
} from "@/store/tables/settingsSecurity";

export default {
  name: "AppAdvancedSecurity",

  data() {
    return {
      // --> DATA <--

      restoreNetworkDescription: [
        "Minimum SSL/TLS version and cipher suite (encryption strength)"
      ],

      restorePushDescription: [
        "Include message sender in push notifications",
        "Include message body in push notifications"
      ],

      networkItems: [
        {
          subtitle:
            "Minimum SSL/TLS version and cipher suite (encryption strength)",
          description:
            "Accepting older versions of SSL/TLS let older user devices and servers connect to your server, but is also considered much less secure. It is recommended to configure the minimum version to Intermediate",

          restoreSubtitle: true,
          restoreAction: this.onRestoreTlsProfile,
          type: "select",

          typeProps: {
            minWidth: "170px",

            options: [
              {
                label: "Modern (Most Secure)",
                value: TlsProfile.Modern
              },

              {
                label: "Intermediate",
                value: TlsProfile.Intermediate
              },

              {
                label: "Old (Most Compatible)",
                value: TlsProfile.Old
              }
            ]
          }
        }
      ],

      pushItems: [
        {
          subtitle: "Include message sender in push notifications",
          description:
            "Including message sender in push notifications might reveal data coming from your server on third-party platforms such as APNS (iOS) and FCM (Android).",
          type: "toggle"
        },

        {
          subtitle: "Include message body in push notifications",
          description:
            "Including message body in push notifications will share the content of sent and received messages to third-party platforms such as APNS (iOS) and FCM (Android). Disable if you need total privacy for all your team members, at the expense of user experience.",
          type: "toggle"
        }
      ]
    };
  },

  computed: {
    config() {
      return store.$settingsSecurity.getSettings();
    }
  },

  mounted() {
    store.$settingsSecurity.loadConfig();
  },

  methods: {
    // --> HELPERS <--

    showSuccess() {
      (
        this.$refs.networkEncryptionSubsection as InstanceType<
          typeof BaseSubsection
        >
      ).makeSucessBannerVisible();
    },

    // --> EVENT LISTENERS <--

    async onEncryptionUpdate(
      newValue: NetworkEncryptionUiState[keyof NetworkEncryptionUiState],
      changedKey: keyof NetworkEncryptionUiState
    ) {
      if (this.config.networkEncryption[changedKey] !== newValue) {
        switch (changedKey) {
          case "tlsProfile": {
            try {
              await store.$settingsSecurity.updateTlsProfile(
                newValue as TlsProfile
              );

              this.showSuccess();
            } catch {
              BaseAlert.error("Something went wrong", "Please try again later");
            }

            break;
          }
        }
      }
    },

    async onPushUpdate(
      newValue: PushNotificationnUiState[keyof PushNotificationnUiState],
      changedKey: keyof PushNotificationnUiState
    ) {
      if (this.config.pushNotification[changedKey] !== newValue) {
        switch (changedKey) {
          case "withBody": {
            try {
              await store.$settingsSecurity.updatePushNotificationWithBody(
                newValue as boolean
              );

              this.showSuccess();
            } catch {
              BaseAlert.error("Something went wrong", "Please try again later");
            }

            break;
          }

          case "withSender": {
            try {
              await store.$settingsSecurity.updatePushNotificationWithSender(
                newValue as boolean
              );

              this.showSuccess();
            } catch {
              BaseAlert.error("Something went wrong", "Please try again later");
            }

            break;
          }
        }
      }
    },

    async onPushRestore() {
      try {
        await store.$settingsSecurity.restorePushNotificationConfig();
      } catch {
        BaseAlert.error("Something went wrong", "Please try again later");
      }
    },

    async onEncryptionRestore() {
      try {
        await this.onRestoreTlsProfile();
      } catch {
        BaseAlert.error("Something went wrong", "Please try again later");
      }
    },

    async onRestoreTlsProfile() {
      try {
        await store.$settingsSecurity.resetTlsProfile();
      } catch {
        BaseAlert.error("Something went wrong", "Please try again later");
      }
    }
  }
};
</script>
