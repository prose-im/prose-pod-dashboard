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
  @close="onClose"
  @confirm="$emit('proceed')"
  @load="onLoad"
  :visible="visibility"
  title="Network configuration checker"
)
  .a-configuration-checker
    advanced-network-check-block(
      :status="dnsBlockStatus"
      label="dns"
      subtitle="DNS records"
      description="Checks that all DNS records are properly configured."
      :results="dnsCheckResults"
    )

    advanced-network-check-block(
      :status="portBlockStatus"
      label="tcp"
      subtitle="Ports reachability"
      description="Ensures that all required ports are opened and reachable."
      :results="portCheckResults"
    )

    advanced-network-check-block(
      :status="ipBlockStatus"
      label="ip"
      subtitle="IP connectivity"
      description="Checks that your server has connection over all IP protocols."
      :results="ipCheckResults"
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import {
  AnyNetworkCheckStatus,
  DnsRecordStatus,
  PortReachabilityStatus,
  IpConnectivityStatus,
  CheckResultData
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

    dnsBlockStatus() {
      return highestValue(
        Array.from(this.dnsCheckResults.values()).map(res => res.status),
        Object.values(DnsRecordStatus)
      );
    },
    portBlockStatus() {
      return highestValue(
        Array.from(this.portCheckResults.values()).map(res => res.status),
        Object.values(PortReachabilityStatus)
      );
    },
    ipBlockStatus() {
      return highestValue(
        Array.from(this.ipCheckResults.values()).map(res => res.status),
        Object.values(IpConnectivityStatus)
      );
    },

    dnsCheckResults(): Map<string, CheckResultData<DnsRecordStatus>> {
      return store.$settingsNetwork.getDnsCheckResults();
    },
    portCheckResults(): Map<string, CheckResultData<PortReachabilityStatus>> {
      return store.$settingsNetwork.getPortCheckResults();
    },
    ipCheckResults(): Map<string, CheckResultData<IpConnectivityStatus>> {
      return store.$settingsNetwork.getIpCheckResults();
    }
  },

  methods: {
    // --> EVENT LISTENERS <--
    onLoad() {
      store.$settingsNetwork.startNetworkChecks();
    },
    onClose() {
      store.$settingsNetwork.stopNetworkChecks();
      this.$emit("close");
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
