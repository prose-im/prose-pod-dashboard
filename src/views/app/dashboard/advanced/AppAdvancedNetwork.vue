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
    title="Server Federation" 
    :items="federationItems"
    :restore-option="true"
  )

  base-subsection(
    title="Network Setup Tools"
    :items="toolsItems"
  )

<!-- Modals -->

dns-setup(
  v-if="isDnsInstructionsModalVisible"
  :visibility="dnsInstructionsModalVisibility"
  @close="toggleDnsInstructionsModalVisible"
  @proceed=""
)

configuration-checker(
  v-if="isNetworkCheckModalVisible"
  :visibility="networkCheckModalVisibility"
  @close="toggleNetworkCheckModalVisible"
  @proceed=""
)

server-whitelist(
  v-if="isServerWhitelistModalVisible"
  :visibility="serverWhitelistModalVisibility"
  @close="toggleServerWhitelistModalVisible"
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
          description:
            "If a whitelist is defined, then other servers will not be allowed to connect to this server, except whitelisted ones. It is recommended to whitelist servers you typically work with, ie. other teams.",
          tags: [], //["Allowed", "prose.org", "clever-cloud.com", "bb.agency"],
          type: "button",
          action: this.onShowServerWhitelist,
          typeProps: {
            label: "Edit servers...",
            size: "medium"
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
            size: "medium"
          }
        },

        {
          subtitle: "Network configuration checker",
          subtitleLeftIcon: "exclamationmark.triangle.fill",
          description:
            "Experiencing issues? Check your server network configuration for possible misconfigurations. This tool checks for your DNS setup, open ports, IPv4/IPv6 and possibly filtered network traffic.",
          color: "redBackground",
          action: this.toggleNetworkCheckModalVisible,
          tags: ["Issues", "DNS TXT record missing", "IPv6 not working"],
          type: "button",
          typeProps: {
            label: "Start network check...",
            size: "medium"
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
      console.log("restoring federation enabled");
      store.$settingsNetwork.restoreFederationEnabled();
    }
  }
};
</script>
