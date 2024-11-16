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

import APIAdvancedNetwork from "@/api/providers/advancedNetwork";
import store from "..";

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
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  dnsRecordCheckLoading: false,
  dnsRecordCheckLoaded: false,
  dnsRecordCheckFailed: false,

  portCheckLoading: false,
  portCheckLoaded: false,
  portCheckFailed: false,

  ipCheckLoading: false,
  ipCheckLoaded: false,
  ipCheckFailed: false,

};

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $settingsNetwork = defineStore("settingsNetwork", {
  state: () => {
    return {
      federation:{
        externalConnectAllowed: true,
        whitelist: []
      },

      setupTools: {
        dnsInstructions: {},
        configChecker: {}
      },

      states: {
        dnsCheckLoading: false,
        dnsCheckLoaded: false,
        dnsRecordCheckFailed: false,

        portCheckLoading: false,
        portCheckLoaded: false,
        portCheckFailed: false,

        ipCheckLoading: false,
        ipCheckLoaded: false,
        ipCheckFailed: false,
      }

    };
  },

  getters: { 
    getFederationConfig():object {
      return this.federation;
    },

    getDnsInstructions: function(): object {
      return () => {
        return this.setupTools.dnsInstructions;
      }
    },

    getStates: function(): object {
      return () => {
        return this.states;
      }
    },
  },

  actions: {
    events(): ReturnType<typeof mitt> {
      // Return event bus
      return EventBus;
    },

    async loadFederationConfiguration() {
      await store.$globalConfig.loadGlobalConfig();

      const response = await store.$globalConfig.getGlobalConfig();

      this.$patch(() => {
        this.federation.externalConnectAllowed = response.federation_enabled; 
      })
    },

    async loadDnsInstructions() {
      this.setupTools.dnsInstructions = (await APIAdvancedNetwork.getDnsRecords()).steps
      console.log('instructions');
    },

    async checkDnsRecords() {
      if(!this.states.dnsCheckLoading){
        this.states.dnsCheckLoaded = false
        this.states.dnsCheckLoading = true;

        try{
          const response = await APIAdvancedNetwork.getDnsRecordsCheck();

          console.log('dns', response);
          this.states.dnsCheckLoaded = true;
          this.states.dnsCheckLoading = false;
        } catch (e) {
          console.log('error dns', e);

          this.states.dnsCheckLoading = false;
          this.states.dnsRecordCheckFailed = true;
        }

      } 
    },

    async checkPortReachability() {
      if(!this.states.portCheckLoading){
        this.states.portCheckLoaded= false
        this.states.portCheckLoading = true;
        
        try{
          const response = await APIAdvancedNetwork.getPortsCheck();

          console.log('ports', response);
          this.states.portCheckLoaded = true;
          this.states.portCheckLoading = false;
        } catch (e) {
          console.log('error ports', e);

          this.states.portCheckLoading = false;
          this.states.portCheckFailed = true;
        }
      }
    },

    async checkIPConnectivity() {
      if(!this.states.ipCheckLoading){
        this.states.ipCheckLoaded= false
        this.states.ipCheckLoading = true;

        try{
          const response = await APIAdvancedNetwork.getIPConnectivityCheck();
          
          console.log('ip', response);
          this.states.ipCheckLoaded= false
          this.states.ipCheckLoading = true;
        } catch (e) {
          console.log('error ip', e);

          this.states.ipCheckLoading = false;
          this.states.ipCheckFailed= true;
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
