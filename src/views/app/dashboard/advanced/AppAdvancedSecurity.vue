<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.v-app-advanced-security
  base-subsection(
    v-model="config.security"
    @update="onSecurityUpdate"
    title="Account Security"
    :items="accountItems"
  )

  base-subsection(
    v-model="config.encryption"
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
import store from "@/store";

// ENUMERATIONS
enum SecurityKey {
  TwoFactor = "twoFactor"
}

enum EncryptionKey {
  TLS_Profile = "tls_profile"
}

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
                value: "modern"
              },
              {
                label: "Intermediate",
                value: "intermediate"
              },
              {
                label: "Old (Most Compatible)",
                value: "old"
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
    onSecurityUpdate(newValue: boolean | string, changedKey: SecurityKey) {
      // console.log('newValue', newValue, changedKey)
      if (
        this.config.security[changedKey] &&
        this.config.security[changedKey] !== newValue
      ) {
        switch (changedKey) {
          case "twoFactor": {
            // store.$serverConfiguration.toggleMessageArchiveEnabled();
            break;
          }

          default: {
            break;
          }
        }
      }
    },

    onEncryptionUpdate(newValue: string, changedKey: EncryptionKey) {
      // console.log('newValue', newValue, changedKey)
      if (
        this.config.encryption[changedKey] &&
        this.config.encryption[changedKey] !== newValue
      ) {
        switch (changedKey) {
          case "tls_profile": {
            store.$settingsSecurity.updateTlsProfile(newValue);
            break;
          }

          default: {
            break;
          }
        }
      }
    },

    onRestoreTlsProfile() {
      console.log("resetting");
      store.$settingsSecurity.resetTlsProfile();
    },

    onGlobalRestore() {
      this.onRestoreTlsProfile();
    }
  }
};
</script>
