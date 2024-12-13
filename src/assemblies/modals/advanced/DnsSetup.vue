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
  @load="onLoad"
  :visible="visibility"
  title="DNS setup instructions"
  button-label="Add custom Emoji"
)
  .a-dns-setup
    base-modal-input-block(
      v-model="domain"
      :disabled="true"
      label="Domain name"
      placeholder="prose.org"
      type="text"
    )

    base-modal-information(
      text="Once configured, the domain name of your server cannot be changed. If you need to change it, create a new server and import data from this server."
    )

    h3
      | DNS Records

    .a-dns-setup__step
      span
        | 1️⃣ &nbsp;Add those records to
      span.a-dns-setup--semibold
        | specify your server IP address:

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

    .a-dns-setup__step
      span
        | 2️⃣ &nbsp;Add the records that let
      span.a-dns-setup--semibold
        | clients connect to your server:

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
        v-if="stepTwo"
        v-for="record in stepTwo"
        class="a-dns-setup__table--two--row"
      )
        p {{ record["hostname"] }}
        p {{ record["type"] }}
        p {{ record["ttl"] }}
        p {{ record["priority"] }}
        p {{ record["weight"] }}
        p {{ record["port"] }}
        p {{ record["target"] }}

    .a-dns-setup__step
      span
        | 3️⃣ &nbsp;Add the records that let
      span.a-dns-setup--semibold
        | servers connect to your server:
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
        v-if="stepThree"
        v-for="record in stepThree"
        class="a-dns-setup__table--two--row"
      )
        p {{ record["hostname"] }}
        p {{ record["type"] }}
        p {{ record["ttl"] }}
        p {{ record["priority"] }}
        p {{ record["weight"] }}
        p {{ record["port"] }}
        p {{ record["target"] }}

    span.a-dns-setup--bold
      | 👉 Need help?
    span
      | You can read the
    span.a-dns-setup--link
      | DNS setup guide here.
</template>

<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import AdvancedNetworkDnsTableRow from "@/components/advanced/network/AdvancedNetworkDnsTableRow.vue";

// PROJECT: STORE
import store from "@/store";

export default {
  name: "DnsSetup",

  components: {
    AdvancedNetworkDnsTableRow
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
      reload: true
    };
  },

  computed: {
    domain() {
      const dom = store.$globalConfig.getDomain();
      return typeof dom === "string" ? dom : "Unavailable";
    },

    steps() {
      return store.$settingsNetwork.getDnsInstructions();
    },

    stepTwo() {
      if (this.steps.length > 0) {
        const step = this.steps.filter(step =>
          step["purpose"].includes("clients")
        );
        return step[0]["records"];
      } else {
        return "";
      }
    },

    stepThree() {
      if (this.steps.length > 0) {
        const step = this.steps.filter(step =>
          step["purpose"].includes("servers")
        );
        return step[0]["records"];
      } else {
        return "";
      }
    }
  },

  watch: {},

  methods: {
    // --> EVENT LISTENERS <--
    onLoad() {
      store.$settingsNetwork.loadDnsInstructions(true);
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-dns-setup";

#{$c} {
  margin-inline: 48px;
  font-weight: $font-weight-light;

  #{$c}__step {
    margin-top: 0;
    margin-bottom: 16px;
    margin-left: 10.5px;
  }

  #{$c}__table {
    border: 1px solid $color-border-primary;
    margin-bottom: 27px;
    font-weight: $font-weight-light;

    &--one--row {
      p:first-child {
        min-width: 74px;
        max-width: (74px + 35px);
        width: fit-content;
        flex: 1 1 0;
        font-weight: $font-weight-medium;
        margin-right: 6.5%;
      }

      p:nth-child(2) {
        min-width: 30px;
      }

      p:nth-child(3) {
        margin-left: 4%;
      }

      p:nth-child(4) {
        margin-left: 5%;
        flex: 1 1 0;
      }
    }

    &--two--row {
      p:first-child {
        min-width: 74px;
        max-width: (74px + 35px);
        width: fit-content;
        flex: 1 1 0;
        font-weight: $font-weight-medium;
      }

      p:nth-child(2) {
        min-width: 24px;
        margin-left: 7%;
      }

      p:nth-child(3) {
        min-width: 27px;
        margin-left: 6.5%;
      }

      p:nth-child(4) {
        min-width: 23px;
        margin-left: 4%;
      }

      p:nth-child(5) {
        min-width: 35px;
        margin-left: 3%;
      }

      p:nth-child(6) {
        min-width: 24px;
        margin-left: 5%;
      }

      p:nth-child(7) {
        margin-left: 4.5%;
        min-width: 74px;
        max-width: (74px + 30px);
        flex: 1 1 0;
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

  //<!-- WEIGHTS -->

  &--semibold {
    font-weight: $font-weight-mid;
  }

  &--bold {
    font-weight: $font-weight-medium;
  }

  &--link {
    color: $color-base-blue-normal;
    font-weight: $font-weight-regular;
    cursor: pointer;
  }
}
</style>
