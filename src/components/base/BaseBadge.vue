<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->

<template lang="pug">
div(
  :class=`[
    "c-base-badge",
    "c-base-badge--" + size,
    {
      "c-base-badge--admin": admin === "ADMIN",
    }
  ]`
)
  | {{ label }}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import { MemberRole, RolesDisplayStrings } from "@/api/providers/members";

export default {
  name: "BaseBadge",

  props: {
    admin: {
      type: String,
      default: MemberRole.Member
    },

    size: {
      type: String,
      default: "short"
    }
  },

  computed: {
    label() {
      return this.admin === MemberRole.Admin
        ? RolesDisplayStrings[MemberRole.Admin]
        : RolesDisplayStrings[MemberRole.Member];
    }
  }
};
</script>

<!-- **********************************************************************
  STYLE
  ********************************************************************** -->

<style lang="scss">
$c: ".c-base-badge";

// VARIABLES
$badge-padding-block: 3.5px;
$badge-padding-inline: 7px;

#{$c} {
  width: fit-content;
  height: fit-content;
  padding-block: $badge-padding-block;
  padding-inline: $badge-padding-inline;
  background-color: $color-base-blue-ultra-dark;
  color: $color-white;
  font-weight: $font-weight-mid;
  font-size: ($font-size-baseline - 4px);
  line-height: ($font-size-baseline - 3px);
  border-radius: 5px;

  // --> SIZES <--
  &--long {
    text-align: center;
    min-width: 36px;
    font-size: ($font-size-baseline - 2.5px);
    line-height: $font-size-baseline;
    padding-inline: ($badge-padding-inline + 2px);
  }

  // --> BOOLEANS <--
  &--admin {
    background-color: $color-base-blue-normal;
  }
}
</style>
