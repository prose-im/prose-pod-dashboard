<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-init-sidebar
  base-icon(
    class="c-init-sidebar__logo"
    name="logo"
    size="21px"
    width="85px"
    :rectangular="true"
  )

  .c-init-sidebar__frames
    .c-init-sidebar__frame(
      v-for="(item, index) in items"
    )
      .c-init-sidebar__icon-frame
        base-icon(
          :name="item.icon"
          :fill="index === step - 1 ? '#000000' : '#49546299'"
          size="20px"
        )

      .c-init-sidebar__text
        p.c-init-sidebar__title
          | {{ item.value }}

        p.c-init-sidebar__description
          | {{ item.description }}

    .c-init-sidebar__icon-frame(
      class="c-init-sidebar__success"
    )
      base-icon(
        class="c-init-sidebar__success-icon"
        name="checkmark.circle.empty"
        size="20px"
        :fill="step === 4 ? '#05C02B' : '#49546299'"
      )

    .c-init-sidebar__highlighter(
      :class=`[
          "c-init-sidebar__highlighter--" + step
      ]`
    )

    .c-init-sidebar__separator(
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
  name: "InitSidebar",

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

  data() {
    return {
      // --> STATE <--
    };
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
$c: ".c-init-sidebar";

#{$c} {
  max-width: 320px;
  padding-inline: 22px;
  flex: 1 1 auto;
  border-right: 1px solid $color-border-secondary;
  background-color: $color-white;

  #{$c}__logo {
    margin-block: 40px 69px;
    margin-inline-start: 12px;
  }

  #{$c}__frames {
    position: relative;
  }

  #{$c}__frame {
    padding: 11px;
    display: flex;
    margin-block-end: 10px;
    z-index: 10;
    position: relative;
  }

  #{$c}__icon-frame {
    position: relative;
    z-index: 10;
    padding: 11px;
    background-color: $color-background-primary;
    border: 1px solid $color-border-primary;
    border-radius: 8px;
    height: 42px;
    width: 42px;
    box-sizing: border-box;
    text-align: center;
    margin-inline-end: 18px;
  }

  #{$c}__title {
    display: flex;
    font-size: $font-size-page;
    font-weight: $font-weight-mid;
    margin-block: 0 7px;
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
    margin-inline-start: 11px;
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
    top: 0px;
    left: -11px;
    z-index: 5;
    transition: top 200ms ease-in-out;

    &--2 {
      top: (75px);
    }

    &--3 {
      top: (150px);
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

  @media (max-width: 768px) {
    width: fit-content;
  }
}
</style>
