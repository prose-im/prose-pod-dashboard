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
      title="Account Security"
      :items="accountItems"
      @update="onSecurityUpdate"
    )

    base-subsection(
      v-model="config.encryption"
      title="Network Encryption"
      :items="networkItems"
      :restore-option="true"
      @update="onEncryptionUpdate"
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
  Version = "version",
  Strength = "strength"
}

export default {
  name: "AppAdvancedSecurity",

  props: {},

  emits: [],

  data() {
    return {
      // --> STATE <--

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
          subtitle: "Minimum SSL/TLS version",
          description:
            "Accepting older versions of SSL/TLS let older user devices and servers connect to your server, but is also considered less secure. It is recommended to configure the minimum version to TLS 1.2.",
          restoreSubtitle: true,
          type: "select",
          disabled: true,
          typeProps: {
            options: [
              {
                label: "TLS 1.2",
                value: "1.2"
              },
              {
                label: "TLS 1.0+",
                value: "1.0+"
              }
            ],
            size: "medium"
          }
        },
        {
          subtitle: "Minimum cipher suite (encryption strength)",
          description:
            "Accepting lower-security encryption ciphers let older user devices and servers connect to your server, but is also much less secure. A minimum cipher suite of High strength is recommended.",
          type: "select",
          disabled: true,
          typeProps: {
            options: [
              {
                label: "High strength",
                value: "HIGH_STRENGTH"
              },
              {
                label: "Low strength",
                value: "LOW_STRENGTH"
              }
            ],
            size: "medium"
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

  watch: {},

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

    onEncryptionUpdate(newValue: boolean | string, changedKey: EncryptionKey) {
      // console.log('newValue', newValue, changedKey)
      if (
        this.config.encryption[changedKey] &&
        this.config.encryption[changedKey] !== newValue
      ) {
        switch (changedKey) {
          case "version": {
            // store.$serverConfiguration.toggleFileUploadEnabled();
            break;
          }

          case "strength": {
            // store.$serverConfiguration.changeFileEncryption(newValue);
            break;
          }

          default: {
            break;
          }
        }
      }
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-app-advanced-security";
</style>
