/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import mitt from "mitt";
import { defineStore } from "pinia";

import APIAdvancedNetwork, {
  CheckData,
  DnsStep
} from "@/api/providers/advancedNetwork";
import store from "@/store/index";

/**************************************************************************
 * ENUMERATIONS
 * ************************************************************************* */

enum SessionAppearance {
  // Light appearance.
  Light = "light",
  // Dark appearance.
  Dark = "dark"
}

/**************************************************************************
 * INSTANCES
 * ************************************************************************* */

const EventBus = mitt();

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $settingsNetwork = defineStore("settingsNetwork", {
  state: () => {
    return {
      federation: {
        externalConnectAllowed: true,
        whitelist: []
      },

      dnsInstructions: [] as DnsStep[],

      checks: {
        dns: [] as CheckData[],
        ports: [] as CheckData[],
        ip: [] as CheckData[]
      },

      states: {
        configChecks: {
          dnsLoading: false,
          dnsLoaded: false,
          dnsFailed: false,

          portLoading: false,
          portLoaded: false,
          portFailed: false,

          ipLoading: false,
          ipLoaded: false,
          ipFailed: false
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
    getFederationConfig(): object {
      return this.federation;
    },

    getDnsInstructions: function () {
      return () => {
        return this.dnsInstructions;
      };
    },

    getDnsCheck: function () {
      return () => {
        return this.checks.dns;
      };
    },

    getPortCheck: function () {
      return () => {
        return this.checks.ports;
      };
    },

    getIpCheck: function () {
      return () => {
        return this.checks.ip;
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

      const response = store.$globalConfig.getGlobalConfig();

      this.$patch(() => {
        this.federation.externalConnectAllowed = response.federation_enabled;
      });
    },

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

          this.dnsInstructions = (
            await APIAdvancedNetwork.getDnsRecords()
          ).steps;
          console.log("instructions", this.dnsInstructions);

          this.states.dnsSteps.instructionsLoading = false;
          this.states.dnsSteps.instructionsLoaded = true;
        } catch (e: any) {
          this.states.dnsSteps.instructionsFailed = true;

          console.error("recordError", e.response);
        }
      }
    },

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
        this.checks.dns = [];

        try {
          const response = await APIAdvancedNetwork.getDnsRecordsCheck();

          response.forEach(element => {
            this.checks.dns.push(element.data);
          });

          console.log("dns", this.checks.dns);

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
        this.checks.ports = [];

        try {
          const response = await APIAdvancedNetwork.getPortsCheck();


          response.forEach(element => {
            this.checks.ports.push(element.data);
          });

          console.log("ports", this.checks.ports);

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
        this.checks.ip = [];

        try {
          const response = await APIAdvancedNetwork.getIPConnectivityCheck();

          response.forEach(element => {
            this.checks.ip.push(element.data);
          });

          console.log("ip", this.checks.ip);
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

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export { SessionAppearance };
export default $settingsNetwork;
