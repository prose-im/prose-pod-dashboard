<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2025, Prose Foundation
-->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
base-modal(
  @close="onClose"
  @load="onLoad"
  @reload="onLoad"
  :reload="true"
  :visible="visibility"
  reloadText="Check network status again"
  title="Network configuration checker"
)
  .a-configuration-checker
    advanced-network-check-block(
      :status="dnsBlockStatus"
      :results="dnsCheckResults"
      label="dns"
      subtitle="DNS records"
      description="Checks that all DNS records are properly configured."
    )

    advanced-network-check-block(
      :status="portBlockStatus"
      :results="portCheckResults"
      label="tcp"
      subtitle="Ports reachability"
      description="Ensures that all required ports are opened and reachable."
    )

    advanced-network-check-block(
      :status="ipBlockStatus"
      :results="ipCheckResults"
      label="ip"
      subtitle="IP connectivity"
      description="Checks that your server has connection over all IP protocols."
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import AdvancedNetworkCheckBlock from "@/components/advanced/network/AdvancedNetworkCheckBlock.vue";

// PROJECT: API
import {
  AnyNetworkCheckStatus,
  DnsRecordStatus,
  PortReachabilityStatus,
  IpConnectivityStatus,
  CheckResultData
} from "@/api/providers/networkConfig";

// PROJECT: STORE
import store from "@/store";

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

  emits: ["close"],

  computed: {
    states() {
      return store.$settingsNetwork.getConfigCheckStates();
    },

    dnsBlockStatus() {
      return this.highestValue(
        Array.from(this.dnsCheckResults.values()).map(
          response => response.status
        ),

        Object.values(DnsRecordStatus)
      );
    },

    portBlockStatus() {
      return this.highestValue(
        Array.from(this.portCheckResults.values()).map(
          response => response.status
        ),

        Object.values(PortReachabilityStatus)
      );
    },

    ipBlockStatus() {
      return this.highestValue(
        Array.from(this.ipCheckResults.values()).map(
          response => response.status
        ),

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
    },

    // --> HELPERS <--

    highestValue<Status extends AnyNetworkCheckStatus>(
      values: Status[],
      allValues: Status[]
    ): Status {
      return (
        values
          // Find the highest value (based on enumeration index)
          .reduce((highest, current) => {
            const currentIndex = allValues.indexOf(current),
              highestIndex = allValues.indexOf(highest);

            return currentIndex > highestIndex ? current : highest;
          }, allValues[0])
      );
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
