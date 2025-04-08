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
  IpConnectivityStatus,
  PortReachabilityStatus,
  DnsRecordStatus,
  CheckResultData
} from "@/api/providers/networkConfig";
import APIServerConfig from "@/api/providers/serverConfig";
import store from "@/store/index";
import { Hostname } from "@/api/providers/global";

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

      networkCheckResults: {
        dns: new Map<string, CheckResultData<DnsRecordStatus>>(),
        ports: new Map<string, CheckResultData<PortReachabilityStatus>>(),
        ip: new Map<string, CheckResultData<IpConnectivityStatus>>()
      },

      runningNetworkChecks: null as {
        promise: Promise<void>;
        abortController: AbortController;
      } | null,

      states: {
        dnsSteps: {
          instructionsLoading: false,
          instructionsLoaded: false,
          instructionsFailed: false
        }
      }
    };
  },

  getters: {
    /* SERVER FEDERATION */

    getFederationConfig(): object {
      return this.federation;
    },

    getServerWhitelist(): Hostname[] {
      return this.federation.whitelist;
    },

    /* DNS INSTRUCTIONS */

    getDnsInstructions: function () {
      return () => {
        return this.dnsInstructions;
      };
    },

    /* NETWORK CHECKS */

    isRunningNetworkChecks(): boolean {
      return this.runningNetworkChecks !== null;
    },

    getDnsCheckResults: function () {
      return () => this.networkCheckResults.dns;
    },
    getPortCheckResults: function () {
      return () => this.networkCheckResults.ports;
    },
    getIpCheckResults: function () {
      return () => this.networkCheckResults.ip;
    },

    getConfigCheckStates: function () {
      return () => this.states.dnsSteps;
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

    /* SERVER FEDERATION */

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

    /* DNS SETUP */

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

    /* NETWORK CHECKS */

    async checkNetworkConfigurationOnce() {
      console.log("Checking network configuration once…");
      const results = await APINetworkConfig.checkAllOnce();
      for (const { event, id, data } of results) {
        // console.log("Got one shot network check result:", { event, id, data });
        switch (event) {
          case "dns-record-check-result":
            this.networkCheckResults.dns.set(id, data);
            break;
          case "ip-connectivity-check-result":
            this.networkCheckResults.ip.set(id, data);
            break;
          case "port-reachability-check-result":
            this.networkCheckResults.ports.set(id, data);
            break;
        }
      }
      console.log("Done checking network configuration once.");
    },

    startNetworkChecks() {
      if (this.runningNetworkChecks !== null) {
        // TODO: Reset timeout.
        return;
      }

      console.log("Starting network checks…");
      const abortController = new AbortController();
      this.runningNetworkChecks = {
        promise: APINetworkConfig.checkAll(
          ({ event, id, data }) => {
            // console.log("Got network check result:", { event, id, data });
            switch (event) {
              case "dns-record-check-result":
                return this.networkCheckResults.dns.set(id, data);
              case "ip-connectivity-check-result":
                return this.networkCheckResults.ip.set(id, data);
              case "port-reachability-check-result":
                return this.networkCheckResults.ports.set(id, data);
            }
          },
          () => {
            console.log("Stopped network checks.");
            this.runningNetworkChecks = null;
          },
          abortController.signal
        ),
        abortController
      };
    },
    stopNetworkChecks() {
      console.log("Stopping network checks…");
      this.runningNetworkChecks?.abortController.abort();
      this.runningNetworkChecks = null;
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $settingsNetwork;
