<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-signup-sidebar
  base-icon(
    class="c-signup-sidebar__logo"
    name="logo"
    size="21px"
    width="85px"
    :rectangular="true"
  )

  .c-signup-sidebar__frames
    .c-signup-sidebar__frame(
      v-for="(item, index) in items"
      :class=`[
        {
          "c-signup-sidebar__frame--active" : index === currentStep - 1
        }
      ]`
    )
      .c-signup-sidebar__icon-frame
        base-icon(                 
          :name="item.icon"
          fill="#05c02b"
          size="12px"
        )

      .c-signup-sidebar__text
        p.c-signup-sidebar__title
          | {{ item.value }}

        p.c-signup-sidebar__description
          | {{ item.description }}

    .c-signup-sidebar__icon-frame
      base-icon(                 
        class="c-signup-sidebar__sucess"
        name="checkmark.circle.fill"
        size="12px"
      )

    .c-signup-sidebar__separator
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "SignupSidebar",

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      // --> STATE <--
      currentStep: 1
    };
  },

  computed: {}
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-signup-sidebar";

#{$c} {
  max-width: 320px;
  padding-inline: 22px;
  flex: 1 1 auto;
  border-right: 1px solid $color-border-secondary;

  #{$c}__logo {
    margin-block: 40px 69px;
    margin-inline-start: 12px;
  }

  #{$c}__frame {
    padding: 11px;
    display: flex;
    margin-block-end: 10px;
    z-index: 10;
    position: relative;

    &--active {
      background-color: $color-base-purple-ultra-light;
      border: 1px solid $color-border-secondary;
      border-radius: 9px;
    }
  }

  #{$c}__icon-frame {
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
  }

  #{$c}__separator {
    position: absolute;
    border: 1px solid $color-border-secondary;
    height: 200px;
    top: 170px;
    margin-inline-start: 30px;
  }

  @media (max-width: 768px) {
    width: fit-content;
  }
}
</style>
