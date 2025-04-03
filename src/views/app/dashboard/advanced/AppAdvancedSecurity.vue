<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.v-app-advanced-security
  base-subsection(
    v-model="config.accountSecurity"
    @update="onSecurityUpdate"
    title="Account Security"
    :items="accountItems"
  )

  base-subsection(
    v-model="config.networkEncryption"
    @update="onEncryptionUpdate"
    title="Network Encryption"
    :items="networkItems"
    :restore-option="true"
    :restore-action="onGlobalRestore"
    :restore-description="restoreDescription"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// STORE
import { TlsProfile } from "@/api/providers/serverConfig";
import store from "@/store";
import {
  NetworkEncryptionUiState,
  AccountSecurityUiState
} from "@/store/tables/settingsSecurity";

export default {
  name: "AppAdvancedSecurity",

  data() {
    return {
      // --> STATE <--

      restoreDescription: [
        "Minimum SSL/TLS version and cipher suite (encryption strength)"
      ],

      accountItems: [
        {
          subtitle: "Require Two Factor on all accounts",
          description:
            "All accounts member of this workspace must have Two Factor authentication enabled. Users will not be able to disable 2FA, although they can change their 2FA token anytime.",
          type: "toggle",
          disabled: true
        }
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
    // --> EVENT LISTENERS <--
    onSecurityUpdate(
      newValue: AccountSecurityUiState[keyof AccountSecurityUiState],
      changedKey: keyof AccountSecurityUiState
    ) {
      // console.log("onSecurityUpdate", "newValue", newValue, changedKey);
      if (this.config.accountSecurity[changedKey] !== newValue) {
        switch (changedKey) {
          case "require2FA": {
            // store.$serverConfiguration.todo();
            break;
          }
        }
      }
    },

    onEncryptionUpdate(
      newValue: NetworkEncryptionUiState[keyof NetworkEncryptionUiState],
      changedKey: keyof NetworkEncryptionUiState
    ) {
      // console.log("onEncryptionUpdate", "newValue", newValue, changedKey);
      if (this.config.networkEncryption[changedKey] !== newValue) {
        switch (changedKey) {
          case "tlsProfile": {
            store.$settingsSecurity.updateTlsProfile(newValue as TlsProfile);
            break;
          }
        }
      }
    },

    onRestoreTlsProfile() {
      // console.log("onRestoreTlsProfile", "resetting");
      store.$settingsSecurity.resetTlsProfile();
    },

    onGlobalRestore() {
      this.onRestoreTlsProfile();
    }
  }
};
</script>
