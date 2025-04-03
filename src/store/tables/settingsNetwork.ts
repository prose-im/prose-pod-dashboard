/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import mitt from "mitt";
import { defineStore } from "pinia";

import APINetworkConfig, {
  DnsSetupStep,
  IpConnectivityCheckResult,
  DnsRecordCheckResult,
  PortReachabilityCheckResult
} from "@/api/providers/networkConfig";
import APIServerConfig from "@/api/providers/serverConfig";
import store from "@/store/index";
import { Hostname } from "@/api/providers/global";

/* *************************************************************************
 * ENUMERATIONS
 * ************************************************************************* */

enum SessionAppearance {
  // Light appearance.
  Light = "light",
  // Dark appearance.
  Dark = "dark"
}

/* *************************************************************************
 * INSTANCES
 * ************************************************************************* */

const EventBus = mitt();

/* *************************************************************************
 * TABLE
 * ************************************************************************* */

const $settingsNetwork = defineStore("settingsNetwork", {
  state: () => {
    return {
      federation: {
        federationEnabled: true,
        whitelist: [] as Hostname[]
      },

      dnsInstructions: [] as DnsSetupStep[],

      checkResults: {
        dns: [] as DnsRecordCheckResult[],
        ip: [] as IpConnectivityCheckResult[],
        ports: [] as PortReachabilityCheckResult[]
      },

      states: {
        configChecks: {
          dnsLoading: false,
          dnsLoaded: false,
          dnsFailed: false,

          ipLoading: false,
          ipLoaded: false,
          ipFailed: false,

          portLoading: false,
          portLoaded: false,
          portFailed: false
        },

        dnsSteps: {
          instructionsLoading: false,
          instructionsLoaded: false,
          instructionsFailed: false
        }
      }
    };
  },

  getters: {
    //** SERVER FEDERATION */

    getFederationConfig(): object {
      return this.federation;
    },

    getServerWhitelist(): object {
      return this.federation.whitelist;
    },

    //** DNS INSTRUCTIONS*/

    getDnsInstructions: function () {
      return () => {
        return this.dnsInstructions;
      };
    },

    //** CONFIG CHECKS*/

    getDnsCheckResults: function () {
      return () => {
        return this.checkResults.dns;
      };
    },

    getPortCheck: function () {
      return () => {
        return this.checkResults.ports;
      };
    },

    getIpCheck: function () {
      return () => {
        return this.checkResults.ip;
      };
    },

    getConfigCheckStates: function () {
      return () => {
        return this.states.configChecks;
      };
    }
  },

  actions: {
    events(): ReturnType<typeof mitt> {
      // Return event bus
      return EventBus;
    },

    async loadFederationConfiguration() {
      await store.$globalConfig.loadGlobalConfig();

      const response = store.$globalConfig.getServerConfig();

      this.$patch(() => {
        this.federation.whitelist = [...response.federation_friendly_servers];
        this.federation.federationEnabled = response.federation_enabled;
      });
    },

    /** SERVER FEDERATION */

    async updateFederationEnabled(newState: boolean) {
      await APIServerConfig.setFederationEnabled(newState);

      this.$patch(() => {
        this.federation.federationEnabled = newState;
      });
    },

    async restoreFederationEnabled() {
      const defaultValue = await APIServerConfig.resetFederationEnabled();

      this.$patch(() => {
        this.federation.federationEnabled = defaultValue;
      });
    },

    async updateServerWhitelist(newWhitelist: Hostname[]) {
      const response = await APIServerConfig.setFederationFriendlyServers(
        newWhitelist
      );

      this.$patch(() => {
        this.federation.whitelist = response;
      });
    },

    async restoreFederationWhitelist() {
      const defaultValue =
        await APIServerConfig.resetFederationFriendlyServers();

      this.$patch(() => {
        this.federation.whitelist = defaultValue;
      });
    },

    /** DNS **/

    async loadDnsInstructions(reload = false) {
      if (
        (!this.states.dnsSteps.instructionsLoading &&
          !this.states.dnsSteps.instructionsLoaded) ||
        reload
      ) {
        try {
          this.states.dnsSteps.instructionsLoading = true;
          this.states.dnsSteps.instructionsLoaded = false;
          this.states.dnsSteps.instructionsFailed = false;

          this.dnsInstructions = (await APINetworkConfig.getDnsRecords()).steps;
          console.log("instructions", this.dnsInstructions);

          this.states.dnsSteps.instructionsLoading = false;
          this.states.dnsSteps.instructionsLoaded = true;
        } catch (e: any) {
          this.states.dnsSteps.instructionsFailed = true;

          console.error("recordError", e.response);
        }
      }
    },

    /** RECORD CHECK **/

    checkAllRecords() {
      this.checkDnsRecords();
      this.checkPortReachability();
      this.checkIPConnectivity();
    },

    async checkDnsRecords() {
      if (!this.states.configChecks.dnsLoading) {
        console.log("calling api");
        // initialize request progress
        this.states.configChecks.dnsLoaded = false;
        this.states.configChecks.dnsLoading = true;
        this.states.configChecks.dnsFailed = false;
        this.checkResults.dns = [];

        try {
          const response = await APINetworkConfig.checkDnsRecords();

          response.forEach(element => {
            this.checkResults.dns.push(element);
          });

          console.log("dns", this.checkResults.dns);

          // update request progress
          this.states.configChecks.dnsLoaded = true;
          this.states.configChecks.dnsLoading = false;
        } catch (e: any) {
          console.error("error dns", e.message);

          // update request progress
          this.states.configChecks.dnsLoading = false;
          this.states.configChecks.dnsFailed = true;
        }
      }
    },

    async checkPortReachability() {
      if (!this.states.configChecks.portLoading) {
        // initialize request progress
        this.states.configChecks.portLoaded = false;
        this.states.configChecks.portLoading = true;
        this.states.configChecks.portFailed = false;
        this.checkResults.ports = [];

        try {
          const response = await APINetworkConfig.checkPortsReachability();

          response.forEach(element => {
            this.checkResults.ports.push(element);
          });

          console.log("ports", this.checkResults.ports);

          // update request progress
          this.states.configChecks.portLoaded = true;
          this.states.configChecks.portLoading = false;
        } catch (e: any) {
          console.error("error ports", e.message);

          // update request progress
          this.states.configChecks.portLoading = false;
          this.states.configChecks.portFailed = true;
        }
      }
    },

    async checkIPConnectivity() {
      if (!this.states.configChecks.ipLoading) {
        // initialize request progress
        this.states.configChecks.ipLoaded = false;
        this.states.configChecks.ipLoading = true;
        this.states.configChecks.ipFailed = false;
        this.checkResults.ip = [];

        try {
          const response = await APINetworkConfig.checkIpConnectivity();

          response.forEach(element => {
            this.checkResults.ip.push(element);
          });

          console.log("ip", this.checkResults.ip);
          this.states.configChecks.ipLoaded = true;
          this.states.configChecks.ipLoading = false;
        } catch (e: any) {
          console.error("error ip", e.message);

          this.states.configChecks.ipLoading = false;
          this.states.configChecks.ipFailed = true;
        }
      }
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export { SessionAppearance };
export default $settingsNetwork;
