<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-base-navigation-footer
  .c-base-navigation-footer__content
    base-button(
      @click="$emit('navFooterUpdate', 'back')"
      :disabled="page === 1"
      size="mid-medium"
      tint="white"
      square
    )
      base-icon(
        :stroke="arrowColor"
        name="arrow.left"
        size="10px"
        width="11px"
      )

    p
      | {{ from || 'x' }} to {{ to || 'y' }} out of {{ total }} total {{ listing }}

    base-button(
      @click="$emit('navFooterUpdate', 'forth')"
      :disabled="!notLastPage"
      size="mid-medium"
      tint="white"
      square
    )
      base-icon(
        :stroke="arrowColor"
        name="arrow.right"
        size="10px"
        width="11px"
      )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: API
import { PAGE_SIZE } from "@/api/providers/members";

export default {
  name: "BaseNavigationFooter",

  props: {
    listing: {
      type: String,
      default: ""
    },

    page: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    }
  },

  emits: ["navFooterUpdate"],

  computed: {
    from() {
      return 1 + PAGE_SIZE * (this.page - 1);
    },

    to() {
      return this.notLastPage ? this.page * PAGE_SIZE : this.total;
    },

    notLastPage() {
      return this.page * PAGE_SIZE < this.total;
    },

    arrowColor() {
      if (this.page !== 1 && this.notLastPage) {
        return "#000000";
      }

      return "#495462";
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-navigation-footer";

#{$c} {
  padding-block: 9.5px 8.5px;
  border-top: 1px solid $color-border-secondary;

  #{$c}__content {
    color: $color-text-tertiary;
    font-size: ($font-size-baseline - 1px);
    display: flex;
    align-items: center;
    width: fit-content;
    margin: 0 auto;

    p {
      margin-inline: 39.5px;
    }
  }
}
</style>
