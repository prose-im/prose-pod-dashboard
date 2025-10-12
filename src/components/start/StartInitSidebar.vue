<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-start-init-sidebar
  base-icon(
    class="c-start-init-sidebar__logo"
    name="logo"
    size="21px"
    width="85px"
    rectangular
  )

  .c-start-init-sidebar__frames
    .c-start-init-sidebar__frame(
      v-for="(item, index) in items"
    )
      .c-start-init-sidebar__icon-frame
        base-icon(
          :name="item.icon"
          :fill="index === step - 1 ? '#000000' : '#49546299'"
          size="19px"
        )

      .c-start-init-sidebar__text
        p.c-start-init-sidebar__title
          | {{ item.value }}

        p.c-start-init-sidebar__description
          | {{ item.description }}

    .c-start-init-sidebar__icon-frame(
      class="c-start-init-sidebar__success"
    )
      base-icon(
        class="c-start-init-sidebar__success-icon"
        name="checkmark.circle.empty"
        fill="#05C02B"
        size="18px"
      )

    .c-start-init-sidebar__highlighter(
      :class=`[
        "c-start-init-sidebar__highlighter--" + step
      ]`
    )

    .c-start-init-sidebar__separator(
      :style=`{
        height: separatorHeight
      }`
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "StartInitSidebar",

  props: {
    items: {
      type: Array,
      required: true
    },

    step: {
      type: Number,
      default: null
    }
  },

  computed: {
    separatorHeight() {
      const numberItems = this.items.length;

      return numberItems > 1
        ? `${(this.items.length + 1) * 50}px`
        : `${this.items.length * 50}px`;
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-start-init-sidebar";

// VARIABLES
$frame-height: 64px;
$frame-spacing: 11px;

#{$c} {
  max-width: 320px;
  padding-inline: 22px;
  flex: 1 1 auto;
  border-right: 1px solid $color-border-secondary;
  background-color: $color-white;

  #{$c}__logo {
    margin-block: 40px 56px;
    margin-inline-start: 12px;
  }

  #{$c}__frames {
    position: relative;
  }

  #{$c}__frame {
    height: $frame-height;
    padding: $frame-spacing;
    display: flex;
    margin-block-end: $frame-spacing;
    box-sizing: border-box;
    z-index: 10;
    position: relative;
  }

  #{$c}__icon-frame {
    position: relative;
    z-index: 10;
    background-color: $color-background-primary;
    border: 1px solid $color-border-primary;
    border-radius: 8px;
    height: 42px;
    width: 42px;
    margin-inline-end: 18px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #{$c}__title {
    display: flex;
    font-size: $font-size-page;
    font-weight: $font-weight-medium;
    margin-block: 0 6px;
  }

  #{$c}__description {
    display: flex;
    font-size: ($font-size-page - 1px);
    font-weight: $font-weight-light;
    margin: 0;
    color: $color-text-secondary;
    white-space: nowrap;
    overflow: hidden;
  }

  #{$c}__success {
    margin-block-start: (2 * $frame-spacing);
    margin-inline-start: $frame-spacing;
  }

  #{$c}__highlighter {
    position: absolute;
    background-color: $color-base-purple-ultra-light;
    border: 1px solid $color-border-secondary;
    border-radius: 9px;
    height: 64px;
    width: 100%;
    max-width: 350px;
    margin-inline-start: 10px;
    left: -$frame-spacing;
    z-index: 5;
    transition: top 200ms ease-in-out;
    box-shadow: inset 0 1.5px 0 0 rgba($color-white, 0.9);

    &--null,
    &--1 {
      top: 0;
    }

    &--2 {
      top: ($frame-height + $frame-spacing);
    }

    &--3 {
      top: (2 * ($frame-height + $frame-spacing));
    }

    &--4 {
      display: none;
    }
  }

  #{$c}__separator {
    position: absolute;
    border: 1px solid $color-border-secondary;
    height: 200px;
    top: 50px;
    margin-inline-start: 30px;
  }

  // --> MEDIA QUERIES <--

  @media (max-width: 768px) {
    width: fit-content;
  }
}
</style>
