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
  :visible="visibility"
  title="Network configuration checker"
  buttonLabel="Add custom Emoji"
  @close="$emit('close')"
  @confirm="$emit('proceed')"
  @load="onLoad"
)
  .a-configuration-checker
    base-modal-network-check-block(
      :status="dnsStatus"
      label="dns"
      subtitle="DNS records"
      description="Checks that all DNS records are properly configured."
      :checkList="dnsCheckList"
    )

    base-modal-network-check-block(
      :status="portStatus"
      label="tcp"
      subtitle="Ports reachability"
      description="Ensures that all required ports are opened and reachable."
      :checkList="portCheckList"
    )

    base-modal-network-check-block(
      :status="ipStatus"
      label="ip"
      subtitle="IP connectivity"
      description="Checks that your server has connection over all IP protocols."
      :checkList="ipCheckList"
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

  props: {
    visibility: {
      type: Boolean,
      default: false,
    },
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
      return this.getStatus("dns", this.dnsCheckList);
    },

    portStatus() {
      return this.getStatus("port", this.portCheckList);
    },

    ipStatus() {
      return this.getStatus("ip", this.ipCheckList);
    },

    dnsCheckList() {
      return store.$settingsNetwork.getDnsCheck() || [];
    },

    portCheckList() {
      return store.$settingsNetwork.getPortCheck() || [];
    },

    ipCheckList() {
      return store.$settingsNetwork.getIpCheck() || [];
    },
  },

  watch: {},

  methods: {
    // --> HELPERS <--
    getStatus(block: string, checkList) {
      if (this.states[`${block}Loading`]) {
        return "pending";
      } else if (this.states[`${block}Loaded`]) {
        let checkListStatus = "";

        for (let i = 0; i < checkList.length; i++) {
          if (checkList[i].status !== "sucess") {
            checkListStatus = checkList[i].status;
            break;
          } else {
            checkListStatus = "sucess";
          }
        }
        return checkListStatus;
      } else {
        return "INVALID";
      }
    },

    onLoad() {
      store.$settingsNetwork.checkAllRecords();
    },
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
