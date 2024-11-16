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
  title="Network configuration checker"
  buttonLabel="Add custom Emoji"
)
  .a-configuration-checker
    base-modal-network-check-block(
      :status="dnsStatus"
      label="dns"
      subtitle="DNS records"
      description="Checks that all DNS records are properly configured."
      :checkList="checkList"
    )

    base-modal-network-check-block(
      status="failed"
      label="tcp"
      subtitle="Ports reachability"
      description="Ensures that all required ports are opened and reachable."
      :checkList="checkList"
    )

    base-modal-network-check-block(
      status="warning"
      label="ip"
      subtitle="IP connectivity"
      description="Checks that your server has connection over all IP protocols."
      :checkList="checkList"
    )
    
    p {{ states }}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseModal from "@/components/base/modal/BaseModal.vue";
import BaseModalNetworkCheckBlock from "@/components/advanced/network/BaseModalNetworkCheckBlock.vue";
import store from "@/store";

export default {
  name: "ConfigurationChecker",

  components: {
    BaseModal,
    BaseModalNetworkCheckBlock,
  },

  props: {},

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--
      checkList: [
        {
          checkpoint: "IPv4 record for xmpp.crisp.chat",
          status: "sucess",
        },

        {
          checkpoint: "IPv6 record for xmpp.crisp.chat",
          status: "sucess",
        },

        {
          checkpoint: "SRV record for client-to-server connections",
          status: "pending",
        },

        {
          checkpoint: "Server-to-server port at TCP 5269",
          status: "warning",
        },

        {
          checkpoint: "SRV record for client-to-server connections",
          status: "failed",
        },
      ],
    };
  },

  computed: {
    states() {
      return store.$settingsNetwork.getStates();
    },

    dnsStatus() {
      if (this.states.dnsCheckLoading) {
        return "pending";
      } else if (this.states.dnsCheckLoaded) {
        return "sucess";
      } else {
        return "failed";
      }
    },
  },

  watch: {},

  beforeUpdate() {
    store.$settingsNetwork.checkDnsRecords();
    store.$settingsNetwork.checkPortReachability();
    store.$settingsNetwork.checkIPConnectivity();
  },

  methods: {
    // --> HELPERS <--
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-configuration-checker";

#{$c} {
  margin-inline: 48px;
  font-family: $font-family-default;
}
</style>
