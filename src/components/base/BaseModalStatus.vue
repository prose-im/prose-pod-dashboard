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
import { PropType } from "vue";

export default {
  name: "BaseModalStatus",

  props: {
    status: {
      type: String as PropType<AnyNetworkCheckStatus>,
      required: true
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
      switch (this.status as AnyNetworkCheckStatus) {
        case DnsRecordStatus.Queued:
        case IpConnectivityStatus.Queued:
        case PortReachabilityStatus.Queued: {
          return "Queued";
        }

        case DnsRecordStatus.Checking:
        case IpConnectivityStatus.Checking:
        case PortReachabilityStatus.Checking: {
          return "Checking…";
        }

        case DnsRecordStatus.Valid:
        case PortReachabilityStatus.Open:
        case IpConnectivityStatus.Success: {
          return "OK";
        }

        case DnsRecordStatus.Invalid:
        case PortReachabilityStatus.Closed: {
          return "Issue";
        }

        case DnsRecordStatus.PartiallyValid:
        case IpConnectivityStatus.Failure: {
          return "Warning";
        }
      }

      return null;
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
