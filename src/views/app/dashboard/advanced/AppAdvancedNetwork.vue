<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.v-app-advanced-network
  base-subsection(
    v-model="config"
    @update="onFederationUpdate"
    ref="federationSubsection"
    title="Server Federation" 
    :items="federationItems"
    :restore-option="true"
    :restore-action="onGlobalRestore"
    :restore-description="restoreDescription"
  )

  base-subsection(
    title="Network Setup Tools"
    :items="toolsItems"
  )

<!-- Modals -->

dns-setup(
  v-if="isDnsInstructionsModalVisible"
  @close="toggleDnsInstructionsModalVisible"
  @proceed=""
  :visibility="dnsInstructionsModalVisibility"
)

configuration-checker(
  v-if="isNetworkCheckModalVisible"
  @close="toggleNetworkCheckModalVisible"
  @proceed=""
  :visibility="networkCheckModalVisibility"
)

server-whitelist(
  v-if="isServerWhitelistModalVisible"
  @close="toggleServerWhitelistModalVisible"
  @showSuccess="onShowSuccess"
  :server-list="whitelist"
  :visibility="serverWhitelistModalVisibility"
)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import ConfigurationChecker from "@/assemblies/modals/advanced/ConfigurationChecker.vue";
import DnsSetup from "@/assemblies/modals/advanced/DnsSetup.vue";
import ServerWhitelist from "@/assemblies/modals/advanced/ServerWhitelist.vue";
import BaseSubsection from "@/components/base/BaseSubsection.vue";

// STORE
import store from "@/store";

export default {
  name: "AppAdvancedNetwork",

  components: {
    ConfigurationChecker,
    DnsSetup,
    ServerWhitelist
  },

  data() {
    return {
      // --> STATE <--

      isDnsInstructionsModalVisible: false,
      dnsInstructionsModalVisibility: false,

      isServerWhitelistModalVisible: false,
      serverWhitelistModalVisibility: false,

      isNetworkCheckModalVisible: false,
      networkCheckModalVisibility: false,

      whitelistTags: [] as string[],

      restoreDescription: [
        "Authorizations for other servers to connect with this server",
        "Your server whitelist"
      ],

      federationItems: [
        {
          subtitle: "Allow other servers to connect with this server",
          restoreSubtitle: true,
          restoreAction: this.onRestoreFederationEnabled,
          description:
            "Allowing other servers to connect will enable federation. This lets users from other Prose workspaces connect with users in this workspace. For more safety, whitelist friendly servers.",
          type: "toggle"
        },
        {
          subtitle: "Friendly servers whitelist",
          restoreSubtitle: true,
          restoreAction: this.onRestoreFederationWhitelist,
          description:
            "If a whitelist is defined, then other servers will not be allowed to connect to this server, except whitelisted ones. It is recommended to whitelist servers you typically work with, ie. other teams.",
          firstTag: "Allowed",
          tags: [],
          type: "button",
          action: this.onShowServerWhitelist,
          typeProps: {
            label: "Edit servers..."
          }
        }
      ],

      toolsItems: [
        {
          subtitle: "DNS setup instructions",
          description:
            "The accent color is the dominant color that all Prose apps connected to this server will use for UI elements such as active buttons and contextual menus.",
          type: "button",
          action: this.onShowDnsInstructions,
          typeProps: {
            label: "Show DNS instructions...",
            size: "mid-medium"
          }
        },

        {
          subtitle: "Network configuration checker",
          subtitleLeftIcon: "exclamationmark.triangle.fill",
          description:
            "Experiencing issues? Check your server network configuration for possible misconfigurations. This tool checks for your DNS setup, open ports, IPv4/IPv6 and possibly filtered network traffic.",
          color: "redBackground",
          action: this.toggleNetworkCheckModalVisible,
          firstTag: "Issues",
          tags: ["DNS TXT record missing", "IPv6 not working"],
          type: "button",
          typeProps: {
            label: "Start network check...",
            size: "mid-medium"
          }
        }
      ]
    };
  },

  computed: {
    config() {
      return store.$settingsNetwork.getFederationConfig;
    },

    whitelist() {
      return store.$settingsNetwork.getServerWhitelist;
    }
  },

  watch: {
    isDnsInstructionsModalVisible(newValue) {
      setTimeout(() => (this.dnsInstructionsModalVisibility = newValue), 10);
    },

    isNetworkCheckModalVisible(newValue) {
      setTimeout(() => (this.networkCheckModalVisibility = newValue), 10);
    },

    isServerWhitelistModalVisible(newValue) {
      setTimeout(() => (this.serverWhitelistModalVisibility = newValue), 10);
    },

    whitelist(newValue) {
      this.federationItems[1]["tags"] = newValue;
    }
  },

  mounted() {
    return store.$settingsNetwork.loadFederationConfiguration();
  },

  methods: {
    // --> HELPERS <--
    toggleDnsInstructionsModalVisible() {
      this.isDnsInstructionsModalVisible = !this.isDnsInstructionsModalVisible;
    },

    toggleNetworkCheckModalVisible() {
      this.isNetworkCheckModalVisible = !this.isNetworkCheckModalVisible;
    },

    toggleServerWhitelistModalVisible() {
      this.isServerWhitelistModalVisible = !this.isServerWhitelistModalVisible;
    },

    // --> EVENT LISTENERS <--
    onShowDnsInstructions() {
      this.toggleDnsInstructionsModalVisible();
    },

    onShowServerWhitelist() {
      this.toggleServerWhitelistModalVisible();
    },

    onFederationUpdate(newValue: boolean) {
      store.$settingsNetwork.updateFederationEnabled(newValue);
    },

    onRestoreFederationEnabled() {
      store.$settingsNetwork.restoreFederationEnabled();
    },

    onRestoreFederationWhitelist() {
      store.$settingsNetwork.restoreFederationWhitelist();
    },

    onGlobalRestore() {
      this.onRestoreFederationEnabled();
      this.onRestoreFederationWhitelist();
    },

    onShowSuccess() {
      console.log("show success");
      (
        this.$refs.federationSubsection as InstanceType<typeof BaseSubsection>
      ).makeNotificationVisible();
    }
  }
};
</script>
