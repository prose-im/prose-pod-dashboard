<!--
* This file is part of prose-app-web
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
  title="DNS setup instructions"
  buttonLabel="Add custom Emoji"
)
  .a-dns-setup
    base-modal-input-block(
      label="Domain name"
      placeholder="prose.org"
    )

    base-modal-information(
      text="Once configured, the domain name of your server cannot be changed. If you need to change it, create a new server and import data from this server."
    )

    h3
      | DNS Records
    
    p.a-dns-setup__step
      | 1️⃣ &nbsp;Add those records to specify your server IP address:

    .a-dns-setup__table
      advanced-network-dns-table-row(
        :header="true"
        class="a-dns-setup__table--one--row"
      )
        p Hostname
        p Type
        p TTL
        p Value

      advanced-network-dns-table-row(
        class="a-dns-setup__table--one--row"
      )
        p xmpp.crisp.chat
        p A
        p 600
        p 90.105.205.180

      advanced-network-dns-table-row(
        class="a-dns-setup__table--one--row"
      )
        p xmpp.crisp.chat
        p AAAA
        p 600
        p 2a01:cb05:899c:c200::1

    p.a-dns-setup__step
      | 2️⃣ &nbsp;Add the records that let clients connect to your server:

    .a-dns-setup__table
      advanced-network-dns-table-row(
        :header="true"
        class="a-dns-setup__table--two--row"
      )
        p Hostname
        p Type
        p TTL
        p Prio.
        p Weight
        p Port
        p Target

      advanced-network-dns-table-row(
        class="a-dns-setup__table--two--row"
      )
        p crisp.chat
        p SRV
        p 3600
        p 0
        p 5
        p 5222
        p xmpp.crisp.chat.

    p.a-dns-setup__step
      | 3️⃣ &nbsp;Add the records that let servers connect to your server:
    .a-dns-setup__table
      advanced-network-dns-table-row(
        :header="true"
        class="a-dns-setup__table--two--row"
      )
        p Hostname
        p Type
        p TTL
        p Prio.
        p Weight
        p Port
        p Target

      advanced-network-dns-table-row(
        class="a-dns-setup__table--two--row"
      )
        p crisp.chat
        p SRV
        p 3600
        p 0
        p 5
        p 5269
        p xmpp.crisp.chat.

    p
      | 👉 Need help?  You can read the DNS setup guide here.

</template>
  
<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseModal from '@/components/base/modal/BaseModal.vue';
import BaseModalInformation from '@/components/base/modal/BaseModalInformation.vue';
import BaseModalInputBlock from '@/components/base/modal/BaseModalInputBlock.vue';
import AdvancedNetworkDnsTableRow from '@/components/advanced/network/AdvancedNetworkDnsTableRow.vue';

export default {
  name: "DnsSetup",

  components: {
    AdvancedNetworkDnsTableRow,
    BaseModal,
    BaseModalInformation,
    BaseModalInputBlock,
  },

  props: {

  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--
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

  #{$c}__step{
    margin-top: 0;
    margin-bottom: 16px;
    margin-left: 10.5px;
  }

  #{$c}__table{
    border: 1px solid $color-border-primary;
    margin-bottom: 27px;

    &--one--row{
      p:first-child{
        min-width: 15%;
        margin-left: 0;
      }

      p:nth-child(2){
        min-width: 6%;
        margin-left: 6.5%;
      }

      p:nth-child(3){
        margin-left: 4%;
      }

      p:nth-child(4){
        margin-left: 5%;
      }

    }

    &--two--row{
      p:first-child{
        min-width: 9%;
        margin-left: 0;
      }

      p:nth-child(2){
        min-width: 4.5%;
        margin-left: 7%;
      }

      p:nth-child(3){
        min-width: 5%;
        margin-left: 6.5%;
      }

      p:nth-child(4){
        min-width: 4%;
        margin-left: 4%;
      }

      p:nth-child(5){
        min-width: 7%;
        margin-left: 3%;
      }      
      
      p:nth-child(6){
        min-width: 4.5%;
        margin-left: 5%;
      }

      p:nth-child(7){
        margin-left: 4.5%;
      }
    }
  }

  h3 {
    font-weight: $font-weight-bolder;
    font-size: ($font-size-baseline + 4px);
    padding-left: 10px;
    padding-bottom: 14px;
    border-bottom: 1px solid $color-border-secondary;
    margin-bottom: 19px;
  }
}

</style>
        