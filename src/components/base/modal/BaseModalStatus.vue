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
import BaseIcon from "@/components/base/BaseIcon.vue";
import BasePulseIcon from "@/components/base/BasePulseIcon.vue";

export default {
  name: "BaseModalStatus",

  components: {
    BaseIcon,
    BasePulseIcon,
  },

  props: {
    status: {
      type: String,
      default: "pending",

      validator(x: string) {
        return ["pending", "sucess", "warning", "INVALID", "CLOSED", "FAILURE"].includes(
          x
        );
      },
    },

    color: {
      type: String,
      required: true,
    },

    iconName: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
    label() {
      let label = "";

      switch (this.status) {
        case "pending": {
          label = "Checking...";
          break;
        }

        case "sucess": {
          label = "Verified";
          break;
        }

        case "INVALID":
        case "CLOSED": {
          label = "Issue";
          break;
        }

        case "FAILURE": {
          label = "Warning";
          break;
        }
        default: {
          break;
        }
      }

      return label;
    },
  },

  watch: {},

  methods: {
    // <-- HELPERS -->
    capitalizeFirst(word: string) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
  },
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
