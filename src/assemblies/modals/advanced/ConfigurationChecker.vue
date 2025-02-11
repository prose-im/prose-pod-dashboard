<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
base-modal(
  @close="$emit('close')"
  @confirm="$emit('proceed')"
  @load="onLoad"
  :visible="visibility"
  title="Network configuration checker"
)
  .a-configuration-checker
    advanced-network-check-block(
      :status="dnsStatus"
      label="dns"
      subtitle="DNS records"
      description="Checks that all DNS records are properly configured."
      :checklist="dnsCheckList"
    )

    advanced-network-check-block(
      :status="portStatus"
      label="tcp"
      subtitle="Ports reachability"
      description="Ensures that all required ports are opened and reachable."
      :checklist="portCheckList"
    )

    advanced-network-check-block(
      :status="ipStatus"
      label="ip"
      subtitle="IP connectivity"
      description="Checks that your server has connection over all IP protocols."
      :checklist="ipCheckList"
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import AdvancedNetworkCheckBlock from "@/components/advanced/network/AdvancedNetworkCheckBlock.vue";

// STORE
import store from "@/store";

// ENUM
enum Block {
  Dns = "dns",
  Ip = "ip",
  Port = "port"
}

export enum CheckStatus {
  QUEUED = "QUEUED",
  CHECKING = "CHECKING",
  VALID = "VALID",
  SUCCESS = "SUCCESS",
  OPEN = "OPEN",
  PARTIALLY_VALID = "PARTIALLY_VALID",
  INVALID = "INVALID",
  FAILURE = "FAILURE",
  CLOSED = "CLOSED"
}

// INTERFACE
interface CheckRow {
  description: string;
  status: CheckStatus;
}

// TYPES
type CheckList = CheckRow[];

export default {
  name: "ConfigurationChecker",

  components: {
    AdvancedNetworkCheckBlock
  },

  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
    states() {
      return store.$settingsNetwork.getConfigCheckStates();
    },

    dnsStatus() {
      return this.getGlobalStatus(Block.Dns, this.dnsCheckList);
    },

    portStatus() {
      return this.getGlobalStatus(Block.Port, this.portCheckList);
    },

    ipStatus() {
      return this.getGlobalStatus(Block.Ip, this.ipCheckList);
    },

    dnsCheckList() {
      return store.$settingsNetwork.getDnsCheck() || [];
    },

    portCheckList() {
      return store.$settingsNetwork.getPortCheck() || [];
    },

    ipCheckList() {
      return store.$settingsNetwork.getIpCheck() || [];
    }
  },

  watch: {},

  methods: {
    // --> HELPERS <--
    getGlobalStatus(block: Block, checkList: CheckList) {
      console.log("checklist", checkList);
      let checkListStatus = null as null | CheckStatus;

      if (this.states[`${block}Loading`]) {
        // Block check is still running ({dns/ ip/ port}Loading === true)
        checkListStatus = CheckStatus.CHECKING;
      } else if (this.states[`${block}Loaded`]) {
        // Block check is done => check if all the checks in the block are OK
        for (let i = 0; i < checkList.length; i++) {
          if (
            checkList[i].status !== "SUCCESS" ||
            checkList[i].status !== "OPEN" ||
            checkList[i].status !== "VALID"
          ) {
            checkListStatus = checkList[i].status;
            break;
          } else {
            checkListStatus = CheckStatus.SUCCESS;
          }
        }
      } else {
        // Block check failed
        checkListStatus = CheckStatus.INVALID;
      }

      return checkListStatus;
    },

    // --> EVENT LISTENERS <--
    onLoad() {
      store.$settingsNetwork.checkAllRecords();
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-configuration-checker";

#{$c} {
  margin-inline: 48px;
}
</style>
