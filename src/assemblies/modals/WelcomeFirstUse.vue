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
    @close="$emit('close')"
    @load="onLoad"
    :visible="visibility"
    button-label="Add custom Emoji"
    button-icon="checkmark.circle.empty"
    position="center"
    size="large"
  )
    .a-welcome-first-use
      h3.a-welcome-first-use
        | Welcome to your Prose pod

      span.a-welcome-first-use--semibold
        | Please finish the next steps to start using your Pod:

      ul
        li
          | Know if the DNS records have been configured once
        li
          | Invite some members to your pod

  </template>

<!-- **********************************************************************
        SCRIPT
        ********************************************************************** -->

<script lang="ts">
// PROJECT: API
import { AnyDnsRecord, DnsSetupStep } from "@/api/providers/networkConfig";

// PROJECT: COMPONENTS
import AdvancedNetworkDnsTableRow from "@/components/advanced/network/AdvancedNetworkDnsTableRow.vue";

// PROJECT: STORE
import store from "@/store";

// CONSTANTS
const NUMBER_EMOJIS = [
  "1️⃣",
  "2️⃣",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣",
  "🔟"
];

export default {
  name: "WelcomeFirstUse",

  components: {
    AdvancedNetworkDnsTableRow
  },

  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close"],

  data() {
    return {
      // --> STATE <--

      reload: true
    };
  },

  computed: {
    domain() {
      const domain = store.$globalConfig.getDomain();

      return typeof domain === "string" ? domain : "Unavailable";
    },

    steps() {
      return store.$settingsNetwork.getDnsInstructions();
    }
  },

  methods: {
    // --> EVENT LISTENERS <--

    onLoad() {
      store.$settingsNetwork.loadDnsInstructions(true);
    },

    // --> HELPERS <--

    stepRecordsType<RecordType extends AnyDnsRecord>(
      records: AnyDnsRecord[],
      types: string[]
    ): records is RecordType[] {
      return records.every(record => types.includes(record.type));
    },

    numberEmoji(n: number): string {
      return NUMBER_EMOJIS[n] ?? n.toString();
    },

    stepTableColumns(step: DnsSetupStep): string[] {
      if (this.stepRecordsType(step.records, ["A", "AAAA"])) {
        return ["Hostname", "Type", "TTL", "Value"];
      }

      if (this.stepRecordsType(step.records, ["SRV"])) {
        return ["Hostname", "Type", "TTL", "Prio.", "Weight", "Port", "Target"];
      }

      return [];
    },

    stepTableClass(step: DnsSetupStep): "ip" | "srv" | null {
      if (this.stepRecordsType(step.records, ["A", "AAAA"])) {
        return "ip";
      }

      if (this.stepRecordsType(step.records, ["SRV"])) {
        return "srv";
      }

      return null;
    },

    recordTableValues(record: AnyDnsRecord): string[] {
      switch (record.type) {
        case "A":
        case "AAAA": {
          return [
            record.hostname,
            record.type,
            record.ttl.toString(),
            record.value
          ];
        }

        case "SRV": {
          return [
            record.hostname,
            record.type,
            record.ttl.toString(),
            record.priority.toString(),
            record.weight.toString(),
            record.port.toString(),
            record.target
          ];
        }
      }
    }
  }
};
</script>

<!-- **********************************************************************
       STYLE
       ********************************************************************** -->

<style lang="scss">
$c: ".a-welcome-first-use";

#{$c} {
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

    &--ip--row {
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

    &--srv--row {
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

  // --> WEIGHTS <--

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

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
