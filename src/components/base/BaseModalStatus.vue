<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     *************************************************************** -->
<template lang="pug">
  .c-base-modal-status
    base-pulse-icon(
      v-if="status === 'pending'"
      class="c-base-modal-status__icon"
    )

    base-icon(
      v-else
      :name="iconName"
      :fill="color"
      class="c-base-modal-status__icon"
    )

    p(
      :style=`{
        color: color,
      }`
    )
      | {{ label }}
</template>

<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
import {
  DnsRecordStatus,
  IpConnectivityStatus,
  PortReachabilityStatus,
  AnyNetworkCheckStatus
} from "@/api/providers/networkConfig";

export default {
  name: "BaseModalStatus",

  props: {
    status: {
      type: String,
      default: "CHECKING",

      validator(x: string) {
        // NOTE: Not great but temporary before a refactor.
        return (
          Object.values(DnsRecordStatus).includes(x as DnsRecordStatus) ||
          Object.values(IpConnectivityStatus).includes(
            x as IpConnectivityStatus
          ) ||
          Object.values(PortReachabilityStatus).includes(
            x as PortReachabilityStatus
          )
        );
      }
    },

    color: {
      type: String,
      required: true
    },

    iconName: {
      type: String,
      required: true
    }
  },

  computed: {
    label() {
      let label = "";

      switch (this.status as AnyNetworkCheckStatus) {
        case DnsRecordStatus.Queued:
        case IpConnectivityStatus.Queued:
        case PortReachabilityStatus.Queued: {
          label = "";
          break;
        }

        case DnsRecordStatus.Checking:
        case IpConnectivityStatus.Checking:
        case PortReachabilityStatus.Checking: {
          label = "Checking...";
          break;
        }

        case DnsRecordStatus.Valid:
        case PortReachabilityStatus.Open:
        case IpConnectivityStatus.Success: {
          label = "Verified";
          break;
        }

        case DnsRecordStatus.Invalid:
        case PortReachabilityStatus.Closed:
        case IpConnectivityStatus.Failure: {
          label = "Issue";
          break;
        }

        case DnsRecordStatus.PartiallyValid: {
          label = "Warning";
          break;
        }
      }

      return label;
    }
  },

  methods: {
    // <-- HELPERS -->
    capitalizeFirst(word: string) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
};
</script>

<!-- **********************************************************************
   STYLE
   ********************************************************************** -->

<style lang="scss">
$c: ".c-base-modal-status";

#{$c} {
  display: flex;
  align-items: center;

  #{$c}__icon {
    margin-inline-end: 5px;
  }
}
</style>
