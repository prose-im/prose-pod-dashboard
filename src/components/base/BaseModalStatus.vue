<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
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
import { CheckStatus } from "@/assemblies/modals/advanced/ConfigurationChecker.vue";

export default {
  name: "BaseModalStatus",

  props: {
    status: {
      type: String,
      default: "CHECKING",

      validator(x: string) {
        return Object.values(CheckStatus).includes(x as CheckStatus);
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

      switch (this.status as CheckStatus) {
        case CheckStatus.CHECKING: {
          label = "Checking...";
          break;
        }

        case CheckStatus.SUCCESS:
        case CheckStatus.VALID:
        case CheckStatus.OPEN: {
          label = "Verified";
          break;
        }

        case CheckStatus.FAILURE:
        case CheckStatus.INVALID:
        case CheckStatus.CLOSED: {
          label = "Issue";
          break;
        }

        case CheckStatus.PARTIALLY_VALID: {
          label = "Warning";
          break;
        }

        default: {
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
