<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
div(
  :class=`[
    "c-base-mfa-badge",
    {
      "c-base-mfa-badge--enabled": enabled,
      "c-base-mfa-badge--disabled": !enabled
    }
  ]`
)
  base-icon(
    :name="iconName"
    :size="iconSize"
    class="c-base-mfa-badge__icon"
  )

  p(
    class="c-base-mfa-badge--light"
  )
    template(
      v-if="enabled"
    )
      | Enabled

    template(
      v-else
    )
      | Not enabled
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseMfaBadge",

  props: {
    size: {
      type: String,
      default: "short"
    },

    enabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    iconName() {
      return this.enabled
        ? "lock.fill"
        : "lock.open.trianglebadge.exclamationmark";
    },

    iconSize() {
      return this.enabled ? "14px" : "20px";
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-mfa-badge";

#{$c} {
  display: flex;
  align-items: center;
  font-size: ($font-size-baseline - 1px);
  font-weight: $font-weight-light;

  #{$c}__icon {
    fill: currentColor;
  }

  // --> BOOLEANS <--

  &--enabled {
    color: $color-base-green-normal;

    #{$c}__icon {
      margin-right: 4px;
    }
  }

  &--disabled {
    color: $color-base-grey-normal;

    #{$c}__icon {
      margin-right: 1px;
    }
  }
}
</style>
