<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->
<template lang="pug">
.c-advanced-network-check-block
  .c-advanced-network-check-block__top
    .c-advanced-network-check-block__top--left
      .c-advanced-network-check-block__label
        | {{ label.toUpperCase() }}

      .c-advanced-network-check-block__header
        h4(
          :class=`[
            "c-advanced-network-check-block__subtitle",
            {
              "c-advanced-network-check-block--blue": status === 'pending',
              "c-advanced-network-check-block--green": status === 'SUCCESS' || status === 'VALID' || status === 'OPEN',
              "c-advanced-network-check-block--orange": status === 'FAILURE' || status === 'PARTIALLY_VALID',
              "c-advanced-network-check-block--red": status === 'INVALID' || status === 'CLOSED',

            }
          ]`
        )
          | {{ subtitle }}

        p
          | {{ description }}

    base-modal-status(
      :status="status"
      :color="globalIconColor"
      :icon-name="globalIconName"
    )

  .c-advanced-network-check-block__details
    base-loader-network-check-row(
      v-if="status === 'pending'"
      v-for="row in [0, 1]"
    )

    .c-advanced-network-check-block__details--row(
      v-else
      v-for="row in checklist"
      :class=`[
        "c-advanced-network-check-block--" + colorCode(row.status, true)
      ]`
    )
      .c-advanced-network-check-block__left(
        class="c-advanced-network-check-block--flex"
      )
        base-icon(
          :name="getIconName(row.status)"
          class="c-advanced-network-check-block__icon"
          :fill="colorCode(row.status)"
          size="14.5px"
        )

        p
          | {{ row['description'] }}

      p
        | {{ getStatusDisplay(row.status) }}
</template>

<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
import {
  AnyNetworkCheckStatus,
  DnsRecordStatus,
  IpConnectivityStatus,
  PortReachabilityStatus
} from "@/api/providers/networkConfig";
import { PropType } from "vue";

export default {
  name: "AdvancedNetworkCheckBlock",

  props: {
    status: {
      type: String as PropType<AnyNetworkCheckStatus>,
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

    label: {
      type: String,
      required: true
    },

    subtitle: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    checklist: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
    globalIconColor() {
      return this.colorCode(this.status);
    },

    globalIconName() {
      // console.log('icon name', this.getIconName(this.status))
      return this.getIconName(this.status);
    }
  },

  watch: {},

  methods: {
    // <-- HELPERS -->
    colorCode(status: AnyNetworkCheckStatus, isString = false) {
      switch (status) {
        case DnsRecordStatus.Queued:
        case IpConnectivityStatus.Queued:
        case PortReachabilityStatus.Queued: {
          return "";
        }

        case DnsRecordStatus.Checking:
        case PortReachabilityStatus.Checking:
        case IpConnectivityStatus.Checking: {
          return isString ? "blue" : "#2490f0";
        }

        case DnsRecordStatus.Valid:
        case PortReachabilityStatus.Open:
        case IpConnectivityStatus.Success: {
          return isString ? "green" : "#05c02b";
        }

        case DnsRecordStatus.Invalid:
        case PortReachabilityStatus.Closed:
        case IpConnectivityStatus.Failure: {
          return isString ? "red" : "#dd2f2f";
        }

        case DnsRecordStatus.PartiallyValid: {
          return isString ? "orange" : "#fc8227";
        }
      }

      return "";
    },

    getIconName(status: AnyNetworkCheckStatus) {
      switch (status) {
        case DnsRecordStatus.Queued:
        case IpConnectivityStatus.Queued:
        case PortReachabilityStatus.Queued: {
          return "";
        }

        case DnsRecordStatus.Checking:
        case PortReachabilityStatus.Checking:
        case IpConnectivityStatus.Checking: {
          return "archive";
        }

        case DnsRecordStatus.Valid:
        case PortReachabilityStatus.Open:
        case IpConnectivityStatus.Success: {
          return "checkmark.circle.fill";
        }

        case DnsRecordStatus.Invalid:
        case PortReachabilityStatus.Closed:
        case IpConnectivityStatus.Failure: {
          return "exclamationmark.triangle.fill";
        }

        case DnsRecordStatus.PartiallyValid: {
          return "exclamationmark.circle.fill";
        }
      }

      return "";
    },

    getStatusDisplay(status: AnyNetworkCheckStatus) {
      switch (status) {
        case DnsRecordStatus.Queued:
        case PortReachabilityStatus.Queued:
        case IpConnectivityStatus.Queued: {
          return "";
        }

        case DnsRecordStatus.Checking:
        case PortReachabilityStatus.Checking:
        case IpConnectivityStatus.Checking: {
          return "Pending";
        }

        case DnsRecordStatus.Valid: {
          return "Record is valid";
        }
        case DnsRecordStatus.Invalid: {
          return "Record is not valid";
        }
        case DnsRecordStatus.PartiallyValid: {
          return "Record is partially valid";
        }

        case PortReachabilityStatus.Open: {
          return "Port is open";
        }
        case PortReachabilityStatus.Closed: {
          return "Port is closed";
        }

        case IpConnectivityStatus.Success: {
          return "Connectivity is OK";
        }
        case IpConnectivityStatus.Failure: {
          return "No address available";
        }
      }

      return "";
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-advanced-network-check-block";

#{$c} {
  margin-block-end: 36px;

  p {
    margin: 0;
  }

  #{$c}__subtitle {
    font-weight: $font-weight-medium;
    font-size: ($font-size-baseline + 2px);
    margin-left: 0;
    margin-block-start: 0;
    margin-block-end: 7px;
  }

  #{$c}__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-end: 17px;

    &--left {
      display: flex;
      align-items: center;
      position: relative;
    }
  }

  #{$c}__label {
    position: absolute;
    color: $color-text-secondary;
    font-size: ($font-size-baseline - 2px);
    padding-block: 3.5px;
    padding-inline: 7.5px;
    border: 1px solid $color-text-secondary;
    border-radius: 4px;
    margin-right: 19px;
    height: fit-content;
  }

  #{$c}__header {
    margin-inline-start: 58px;

    p {
      color: $color-text-secondary;
      font-size: $font-size-baseline;
      font-weight: $font-weight-light;
    }
  }

  #{$c}__details {
    border-radius: 2px;
    border: 1px solid $color-border-primary;
    padding-block-start: 11px;
    padding-block-end: 5px;
    padding-inline-start: 20.5px;
    padding-inline-end: 28.5px;
    margin-left: 58px;

    &--row {
      font-size: ($font-size-baseline - 2px);
      font-weight: $font-weight-light;
      display: flex;
      justify-content: space-between;
      margin-block-end: 9px;
    }
  }

  #{$c}__icon {
    margin-right: 9px;
  }

  &--flex {
    display: flex;
    align-items: center;
  }

  //<!-- COLORS -->
  &--blue {
    color: $color-base-blue-normal;

    #{$c}__left {
      color: $color-text-secondary;
      font-size: $font-size-baseline;
    }
  }

  &--green {
    color: $color-base-green-normal;

    #{$c}__left {
      color: $color-black;
      font-size: $font-size-baseline;
      font-weight: $font-weight-medium;
    }
  }

  &--red {
    color: $color-base-red-normal;

    #{$c}__left {
      color: $color-base-red-normal;
      font-size: $font-size-baseline;
      font-weight: $font-weight-medium;
    }

    p {
      font-weight: $font-weight-medium;
    }
  }

  &--orange {
    color: $color-base-orange-normal;

    #{$c}__left {
      color: $color-text-secondary;
      font-size: $font-size-baseline;
    }
  }
}
</style>
