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
    :items="federationItems"
    :restore-option="true"
    :restore-action="onGlobalFederationRestore"
    :restore-description="restoreDescription"
    ref="federationSubsection"
    title="Server Federation"
  )

  base-subsection(
    :items="toolsItems"
    title="Network Setup Tools"
  )

<!-- MODALS -->

dns-setup(
  v-if="activeModal === 'dnsInstructions'"
  @close="toggleDnsInstructionsModalVisible"
  :visibility="dnsInstructionsModalVisibility"
)

configuration-checker(
  v-if="activeModal === 'networkCheck'"
  @close="toggleNetworkCheckModalVisible"
  :visibility="networkCheckModalVisibility"
)

server-whitelist(
  v-if="activeModal === 'serverWhitelist'"
  @close="toggleServerWhitelistModalVisible"
  @show-success="onShowSuccess"
  :server-list="whitelist"
  :visibility="serverWhitelistModalVisibility"
)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// ENUMERATIONS
enum Modals {
  // Dns Instructions Modal
  DnsInstructions = "dnsInstructions",
  // Network Checker Modal
  NetworkCheck = "networkCheck",
  //Edit whitelist servers Modal
  ServerWhitelist = "serverWhitelist",
}

// PROJECT: API
import {
  AnyNetworkCheckStatus,
  DnsRecordStatus,
  PortReachabilityStatus,
} from "@/api/providers/networkConfig";

// PROJECT: ASSEMBLIES
import ConfigurationChecker from "@/assemblies/modals/advanced/ConfigurationChecker.vue";
import DnsSetup from "@/assemblies/modals/advanced/DnsSetup.vue";
import ServerWhitelist from "@/assemblies/modals/advanced/ServerWhitelist.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: COMPONENTS
import BaseSubsection from "@/components/base/BaseSubsection.vue";

// PROJECT: STORE
import store from "@/store";

export default {
  name: "AppAdvancedNetwork",

  components: {
    ConfigurationChecker,
    DnsSetup,
    ServerWhitelist,
  },

  data() {
    return {
      // --> STATE <--

      activeModal: null as Modals | null,

      dnsInstructionsModalVisibility: false,
      serverWhitelistModalVisibility: false,
      networkCheckModalVisibility: false,

      whitelistTags: [] as string[],

      // --> DATA <--

      restoreDescription: [
        "Authorizations for other servers to connect with this server",
        "Your server whitelist",
      ],

      federationItems: [
        {
          subtitle: "Allow other servers to connect with this server",
          restoreSubtitle: true,
          restoreAction: this.onRestoreFederationEnabled,
          description:
            "Allowing other servers to connect will enable federation. This lets users from other Prose workspaces connect with users in this workspace. For more safety, whitelist friendly servers.",
          type: "toggle",
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
            label: "Edit servers...",
          },
        },
      ],
    };
  },

  computed: {
    config() {
      return store.$settingsNetwork.getFederationConfig;
    },

    whitelist() {
      return store.$settingsNetwork.getServerWhitelist;
    },

    networkCheckIssues() {
      const results = store.$settingsNetwork.networkCheckResults;

      let issues: string[] = [];

      for (const [key, value] of results.dns.entries()) {
        if (this.isIssue(value.status)) {
          issues.push(this.checkIdToIssue("dns", key) ?? key);
        }
      }

      for (const [key, value] of results.ports.entries()) {
        if (this.isIssue(value.status)) {
          issues.push(this.checkIdToIssue("ports", key) ?? key);
        }
      }

      for (const [key, value] of results.ip.entries()) {
        if (this.isIssue(value.status)) {
          issues.push(this.checkIdToIssue("ip", key) ?? key);
        }
      }

      return issues;
    },

    toolsItems() {
      return [
        {
          subtitle: "DNS setup instructions",
          description:
            "The accent color is the dominant color that all Prose apps connected to this server will use for UI elements such as active buttons and contextual menus.",
          type: "button",
          action: this.onShowDnsInstructions,

          typeProps: {
            label: "Show DNS instructions...",
            size: "mid-medium",
          },
        },

        {
          subtitle: "Network configuration checker",
          description:
            "Experiencing issues? Check your server network configuration for possible misconfigurations. This tool checks for your DNS setup, open ports, IPv4/IPv6 and possibly filtered network traffic.",
          color: "greyBackground",
          action: this.toggleNetworkCheckModalVisible,
          firstTag: "Issues",
          tags: this.networkCheckIssues,
          type: "button",

          typeProps: {
            label: "Start network check...",
            size: "mid-medium",
          },
        },
      ];
    },
  },

  watch: {
    activeModal(newActiveModal) {
      this.serverWhitelistModalVisibility = false;
      this.dnsInstructionsModalVisibility = false;
      this.networkCheckModalVisibility = false;

      if (newActiveModal === "dnsInstructions") {
        setTimeout(() => (this.dnsInstructionsModalVisibility = true), 10);
      } else if (newActiveModal === "networkCheck") {
        setTimeout(() => (this.networkCheckModalVisibility = true), 10);
      } else if (newActiveModal === "serverWhitelist") {
        setTimeout(() => (this.serverWhitelistModalVisibility = true), 10);
      }
    },

    whitelist(newValue) {
      this.federationItems[1]["tags"] = newValue;
    },
  },

  mounted() {
    const onboardingStatus = store.$account.getOnboardingStatus();

    if (
      this.$route.query.action === "onboard" &&
      !onboardingStatus.all_dns_checks_passed_once
    ) {
      this.activeModal = Modals.DnsInstructions;
    }

    return Promise.all([
      store.$settingsNetwork.loadFederationConfiguration(),
      store.$settingsNetwork.checkNetworkConfigurationOnce(),
    ]);
  },

  methods: {
    // --> HELPERS <--

    toggleDnsInstructionsModalVisible() {
      if (this.activeModal === "dnsInstructions") {
        this.activeModal = null;
      } else {
        this.activeModal = Modals.DnsInstructions;
      }
    },

    toggleNetworkCheckModalVisible() {
      if (this.activeModal === "networkCheck") {
        this.activeModal = null;
      } else {
        this.activeModal = Modals.NetworkCheck;
      }
    },

    toggleServerWhitelistModalVisible() {
      if (this.activeModal === "serverWhitelist") {
        this.activeModal = null;
      } else {
        this.activeModal = Modals.ServerWhitelist;
      }
    },

    isIssue(status: AnyNetworkCheckStatus) {
      switch (status) {
        case DnsRecordStatus.Invalid:
        case PortReachabilityStatus.Closed: {
          return true;
        }

        default: {
          return false;
        }
      }
    },

    checkIdToIssue(type: "dns" | "ip" | "ports", checkId: string): string | null {
      switch (`${type}/${checkId}`) {
        case "dns/IPv4": {
          return "A record missing";
        }

        case "dns/IPv6": {
          return "AAAA record missing";
        }

        case "dns/SRV-c2s": {
          return "SRV record missing (c2s)";
        }

        case "dns/SRV-s2s": {
          return "SRV record missing (s2s)";
        }

        case "ports/TCP-c2s": {
          return "c2s port closed";
        }

        case "ports/TCP-s2s": {
          return "s2s port closed";
        }

        case "ports/TCP-HTTPS": {
          return "HTTPS port closed";
        }

        case "ip/IPv4-c2s": {
          return "IPv4 not working (c2s)";
        }

        case "ip/IPv6-c2s": {
          return "IPv6 not working (c2s)";
        }

        case "ip/IPv4-s2s": {
          return "IPv4 not working (s2s)";
        }

        case "ip/IPv6-s2s": {
          return "IPv6 not working (s2s)";
        }

        default: {
          return null;
        }
      }
    },

    // --> EVENT LISTENERS <--

    onShowDnsInstructions() {
      this.toggleDnsInstructionsModalVisible();
    },

    onShowServerWhitelist() {
      this.toggleServerWhitelistModalVisible();
    },

    async onFederationUpdate(newValue: boolean) {
      try {
        await store.$settingsNetwork.updateFederationEnabled(newValue);

        this.onShowSuccess();
      } catch (e) {
        BaseAlert.error("Something went wrong", "Please try again later");
      }
    },

    onRestoreFederationEnabled() {
      store.$settingsNetwork.restoreFederationEnabled();
    },

    onRestoreFederationWhitelist() {
      store.$settingsNetwork.restoreFederationWhitelist();
    },

    onGlobalFederationRestore() {
      this.onRestoreFederationEnabled();
      this.onRestoreFederationWhitelist();
    },

    onShowSuccess() {
      (this.$refs.federationSubsection as InstanceType<
        typeof BaseSubsection
      >).makeSucessBannerVisible();
    },
  },
};
</script>
