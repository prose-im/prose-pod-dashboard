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
    .a-dns-setup
      base-modal-network-check-block(
        status="pending"
        label="dns"
        subtitle="DNS records"
        description="Checks that all DNS records are properly configured."
        :checkList="checkList"
      )
      
</template>
    
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseModal from '@/components/base/modal/BaseModal.vue';
import BaseModalNetworkCheckBlock from '@/components/advanced/network/BaseModalNetworkCheckBlock.vue';

export default {
  name: "DnsSetup",

  components: {
    BaseModal,
    BaseModalNetworkCheckBlock
  },

  props: {

  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--
      checkList : [
        {
          checkpoint: "IPv4 record for xmpp.crisp.chat",
          status:"sucess"
        },

        {
          checkpoint: "IPv6 record for xmpp.crisp.chat",
          status:"sucess"
        },

        {
          checkpoint: "SRV record for client-to-server connections",
          status:"pending"
        },

        {
          checkpoint: "Server-to-server port at TCP 5269",
          status:"warning"
        },

        {
          checkpoint: "SRV record for client-to-server connections",
          status:"failed"
        }
      ]
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--
  },
};
</script>
  
<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-dns-setup";

#{$c} {
  margin-inline: 48px;
  font-family: $font-family-default;
}
</style>
        