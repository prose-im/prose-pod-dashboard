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

    template(
      v-for="(step, index) in steps"
    )

      .a-dns-setup__step
        span
          | {{ numberEmoji(index) }} &nbsp;Add those records to&nbsp;
        span.a-dns-setup--semibold
          | {{ step.purpose }}:

      .a-dns-setup__table
        advanced-network-dns-table-row(
          :header="true"
          :class="`a-dns-setup__table--${stepTableClass(step)}--row`"
        )
          template(
            v-for="column in stepTableColumns(step)"
          )
            p {{ column }}

        advanced-network-dns-table-row(
          v-for="record in step.records"
          :class="`a-dns-setup__table--${stepTableClass(step)}--row`"
          :stringRepr="`${record.string_repr}`"
        )
          template(
            v-for="value in recordTableValues(record)"
          )
            p {{ value }}
</template>

<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import { AnyDnsRecord, DnsSetupStep } from "@/api/providers/networkConfig";
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
    }
  },

  watch: {},

  methods: {
    // --> EVENT LISTENERS <--
    onLoad() {
      store.$settingsNetwork.loadDnsInstructions(true);
    },

    numberEmoji(n: number): string {
      return NUMBER_EMOJIS[n] ?? n.toString();
    },
    stepTableColumns(step: DnsSetupStep): string[] {
      if (stepRecordsType(step.records, ["A", "AAAA"])) {
        return ["Hostname", "Type", "TTL", "Value"];
      } else if (stepRecordsType(step.records, ["SRV"])) {
        return ["Hostname", "Type", "TTL", "Prio.", "Weight", "Port", "Target"];
      } else {
        console.error("DNS setup step records are mixed:", step);
        // NOTE: This should never happen, but if it does return an empty array.
        return [];
      }
    },
    stepTableClass(step: DnsSetupStep): "ip" | "srv" | null {
      if (stepRecordsType(step.records, ["A", "AAAA"])) {
        return "ip";
      } else if (stepRecordsType(step.records, ["SRV"])) {
        return "srv";
      } else {
        console.error("DNS setup step records are mixed:", step);
        // NOTE: This should never happen, but if it does return `null`.
        return null;
      }
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

function stepRecordsType<RecordType extends AnyDnsRecord>(
  records: AnyDnsRecord[],
  types: string[]
): records is RecordType[] {
  return records.every(record => types.includes(record.type));
}
// function dnsRecordType<RecordType extends AnyDnsRecord>(
//   record: AnyDnsRecord,
//   types: string[]
// ): record is RecordType {
//   return types.includes(record.type);
// }
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

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
