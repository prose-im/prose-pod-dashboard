<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2024–2025, Prose Foundation
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
      :checklist="dnsCheckResults"
    )

    advanced-network-check-block(
      :status="portStatus"
      label="tcp"
      subtitle="Ports reachability"
      description="Ensures that all required ports are opened and reachable."
      :checklist="portCheckResults"
    )

    advanced-network-check-block(
      :status="ipStatus"
      label="ip"
      subtitle="IP connectivity"
      description="Checks that your server has connection over all IP protocols."
      :checklist="ipCheckResults"
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import {
  AnyNetworkCheckStatus,
  DnsRecordCheckResult,
  DnsRecordStatus,
  PortReachabilityCheckResult,
  PortReachabilityStatus,
  IpConnectivityCheckResult,
  IpConnectivityStatus
} from "@/api/providers/networkConfig";
import AdvancedNetworkCheckBlock from "@/components/advanced/network/AdvancedNetworkCheckBlock.vue";

// STORE
import store from "@/store";

// TYPES
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
      return this.getBlockStatusDns(this.dnsCheckResults);
    },
    portStatus() {
      return this.getBlockStatusPorts(this.portCheckResults);
    },
    ipStatus() {
      return this.getBlockStatusIp(this.ipCheckResults);
    },

    dnsCheckResults() {
      return store.$settingsNetwork.getDnsCheckResults() || [];
    },
    portCheckResults() {
      return store.$settingsNetwork.getPortCheck() || [];
    },
    ipCheckResults() {
      return store.$settingsNetwork.getIpCheck() || [];
    }
  },

  watch: {},

  methods: {
    // --> HELPERS <--
    /** Get the overall status of a section (e.g. `INVALID` for DNS if one DNS check hasn’t passed yet). */
    // getBlockStatus(checkResults: DnsRecordCheckResult[]): DnsRecordStatus {
    //   return (
    //     checkResults
    //       .map(res => res.data.status)
    //       // Find the highest value (based on enum index).
    //       .reduce((highest, current) => {
    //         const currentIndex =
    //           Object.values(DnsRecordStatus).indexOf(current);
    //         const highestIndex =
    //           Object.values(DnsRecordStatus).indexOf(highest);
    //         return currentIndex > highestIndex ? current : highest;
    //       }, DnsRecordStatus.Queued)
    //   );
    // },
    getBlockStatusDns(checkResults: DnsRecordCheckResult[]): DnsRecordStatus {
      return highestValue(
        checkResults.map(res => res.data.status),
        Object.values(DnsRecordStatus)
      );
    },
    getBlockStatusPorts(
      checkResults: PortReachabilityCheckResult[]
    ): PortReachabilityStatus {
      return highestValue(
        checkResults.map(res => res.data.status),
        Object.values(PortReachabilityStatus)
      );
    },
    getBlockStatusIp(
      checkResults: IpConnectivityCheckResult[]
    ): IpConnectivityStatus {
      return highestValue(
        checkResults.map(res => res.data.status),
        Object.values(IpConnectivityStatus)
      );
    },

    // --> EVENT LISTENERS <--
    onLoad() {
      store.$settingsNetwork.checkAllRecords();
    }
  }
};

function highestValue<Status extends AnyNetworkCheckStatus>(
  values: Status[],
  allValues: Status[]
): Status {
  return (
    values
      // Find the highest value (based on enum index).
      .reduce((highest, current) => {
        const currentIndex = allValues.indexOf(current);
        const highestIndex = allValues.indexOf(highest);
        return currentIndex > highestIndex ? current : highest;
      }, allValues[0])
  );
}
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
