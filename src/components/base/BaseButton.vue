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
    "c-base-button",
    "c-base-button--" + size,
    "c-base-button--" + tint,
    {
      "c-base-button--reverse": reverse,
      "c-base-button--disabled": disabled,
      "c-base-button--loading": loading
    }
  ]`
)
  button(
    @click="onInnerClick"
    :type="type"
    :style=`{
      minWidth: minWidth,
      paddingInline: padding
    }`
    :class=`[
      "c-base-button__inner",
      {
        [buttonClass]: buttonClass,
        "c-base-button__inner--square":square
      }
    ]`
  )
    template(
      v-if="$slots.custom"
    )
      slot(
        name="custom"
      )

    template(
      v-else
    )
      base-icon(
        v-if="icon"
        :name="icon"
        :size="iconSize"
        class="c-base-button__icon"
      )

      div(
        :class=`[
          "c-base-button__label",
          {
            "c-base-button__label--medium": !bolder,
            "c-base-button__label--bold": bolder,
            "c-base-button__label--square":square
          }
        ]`
      )
        slot
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// CONSTANTS
const AVAILABLE_SIZES: { [size: string]: { icon: string } } = {
  medium: {
    icon: "13px"
  },

  "mid-medium": {
    icon: "14px"
  },

  large: {
    icon: "16px"
  },

  "mid-large": {
    icon: "17px"
  },

  "ultra-large": {
    icon: "18px"
  }
};

export default {
  name: "BaseButton",

  props: {
    type: {
      type: String,
      default: "button",

      validator(x: string) {
        return ["button", "submit"].includes(x);
      }
    },

    tint: {
      type: String,
      default: "grey",

      validator(x: string) {
        return ["purple", "grey", "white", "red", "black"].includes(x);
      }
    },

    size: {
      type: String,
      default: "medium",

      validator(x: string) {
        const sizes = Object.keys(AVAILABLE_SIZES);

        sizes.push("custom");

        return sizes.includes(x);
      }
    },

    minWidth: {
      type: String,
      default: null
    },

    icon: {
      type: String,
      default: null
    },

    padding: {
      type: String,
      default: null
    },

    bolder: {
      type: Boolean,
      default: false
    },

    square: {
      type: Boolean,
      default: false
    },

    reverse: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },

    buttonClass: {
      type: String,
      default: null
    }
  },

  emits: ["click"],

  computed: {
    iconSize(): string | null {
      if (this.icon) {
        const sizeProperties = AVAILABLE_SIZES[this.size];

        // Return icon size for button size?
        if (sizeProperties) {
          return sizeProperties.icon;
        }

        // Return fallback size
        return "15px";
      }

      // No icon set (therefore no icon size)
      return null;
    }
  },

  methods: {
    // --> EVENT LISTENERS <--

    onInnerClick(event: Event): void {
      // Re-emit click event
      this.$emit("click", event);
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-button";

// VARIABLES
$size-medium-padding-sides: 19px;
$size-mid-medium-padding-sides: 24px;
$size-large-padding-sides: 26.5px;
$size-mid-large-padding-sides: 36px;
$size-ultra-large-padding-sides: 45.5px;

#{$c} {
  display: inline-block;

  #{$c}__inner {
    font-weight: $font-weight-mid;
    border: 1px solid rgba($color-black, 0.25);
    outline: 2px solid transparent;
    text-align: center;
    user-select: none;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: $size-base-button-border-radius;
    transition: all 100ms linear;
    transition-property: transform, box-shadow, background-color, border-color;

    &:active {
      transform: translateY(1px);
    }

    &:focus-visible {
      outline-color: rgba($color-base-purple-normal, 0.3);
      outline-offset: 1px;
    }

    #{$c}__icon {
      margin-inline-end: 10px;
      flex: 0 0 auto;
    }

    #{$c}__label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-bottom: 1px;
      flex: 1;

      &--medium {
        font-weight: $font-weight-medium;
      }

      &--bold {
        font-weight: $font-weight-bolder;
      }

      &--square {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  // --> TINTS <--

  &--purple,
  &--red {
    #{$c}__inner {
      box-shadow: 0 2px 3px 0 rgba($color-base-purple-normal, 0.04),
        inset 0 1px 0 0 rgba($color-white, 0.15);

      #{$c}__icon {
        fill: $color-white;
      }

      #{$c}__label {
        color: $color-white;
      }

      &:active {
        box-shadow: 0 1px 1px 0 rgba($color-base-purple-normal, 0.1);
      }
    }
  }

  &--purple {
    #{$c}__inner {
      background-color: $color-base-purple-normal;

      &:hover {
        background-color: lighten($color-base-purple-normal, 6%);
      }

      &:active {
        background-color: lighten($color-base-purple-normal, 2%);
      }
    }
  }

  &--white {
    #{$c}__inner {
      background-color: $color-white;
      border-color: $color-border-secondary;
      box-shadow: 0 0px 0px 0 $color-border-secondary;

      #{$c}__icon {
        fill: $color-black;
      }

      #{$c}__label {
        color: $color-black;
      }

      &:hover,
      &:active {
        border-color: rgba($color-black, 0.2);
      }
    }
  }

  &--grey {
    #{$c}__inner {
      background-color: $color-base-purple-ultra-light;
      border-color: $color-border-secondary;
      box-shadow: 0 0px 0px 0 rgba($color-black, 0.01);

      #{$c}__icon {
        fill: $color-black;
      }

      #{$c}__label {
        color: $color-black;
      }

      &:hover,
      &:active {
        border-color: rgba($color-black, 0.2);
      }
    }
  }

  &--red {
    #{$c}__inner {
      background-color: $color-base-red-normal;

      &:hover {
        background-color: lighten($color-base-red-normal, 6%);
      }

      &:active {
        background-color: lighten($color-base-red-normal, 2%);
      }
    }
  }

  &--black {
    #{$c}__inner {
      background-color: $color-black;
      color: $color-text-reverse;

      &:hover {
        background-color: lighten($color-black, 18%);
      }

      &:active {
        background-color: lighten($color-black, 10%);
      }
    }
  }

  // --> SIZES <--

  &--medium {
    #{$c}__inner {
      border-radius: ($size-base-button-border-radius - 2px);
      font-size: ($font-size-baseline - 4px);
      line-height: 25px;
      padding-inline-start: $size-medium-padding-sides;
      padding-inline-end: $size-medium-padding-sides;

      &--square {
        padding-inline: 0px;
        min-height: 25px;
        min-width: 25px;
      }
    }
  }

  &--mid-medium {
    #{$c}__inner {
      font-size: ($font-size-baseline - 4px);
      line-height: 32px;
      padding-inline-start: $size-mid-medium-padding-sides;
      padding-inline-end: $size-mid-medium-padding-sides;

      &--square {
        padding-inline: 0px;
        min-height: 32px;
        min-width: 32px;
      }
    }
  }

  &--large {
    #{$c}__inner {
      font-size: ($font-size-baseline - 1.5px);
      line-height: 42px;
      padding-inline-start: $size-large-padding-sides;
      padding-inline-end: $size-large-padding-sides;
      &--square {
        width: 44px;
        height: 44px;
        padding-inline: 0px;
      }
    }
  }

  &--mid-large {
    #{$c}__inner {
      font-weight: $font-weight-mid;
      font-size: ($font-size-baseline + 0px);
      line-height: 48px;
      padding-inline-start: $size-mid-large-padding-sides;
      padding-inline-end: $size-mid-large-padding-sides;
    }
  }

  &--ultra-large {
    #{$c}__inner {
      font-weight: $font-weight-mid;
      border-radius: ($size-base-button-border-radius + 3px);
      font-size: ($font-size-baseline + 1.5px);
      line-height: 58px;
      padding-inline-start: $size-ultra-large-padding-sides;
      padding-inline-end: $size-ultra-large-padding-sides;
    }
  }

  // --> BOOLEANS <--

  &--reverse {
    &#{$c}--purple {
      #{$c}__inner {
        background-color: $color-white;
        border-color: $color-base-purple-normal;

        #{$c}__icon {
          fill: $color-base-purple-normal;
        }

        #{$c}__label {
          color: $color-base-purple-normal;
          &--square {
            padding-inline: 0px;
          }
        }
      }
    }

    &#{$c}--light {
      #{$c}__inner {
        background-color: rgba($color-black, 0.15);

        #{$c}__icon {
          fill: $color-black;
        }

        #{$c}__label {
          color: $color-black;
        }

        &:hover {
          background-color: rgba($color-black, 0.11);
        }

        &:active {
          background-color: rgba($color-black, 0.125);
        }
      }
    }

    &#{$c}--red {
      #{$c}__inner {
        background-color: $color-white;
        border-color: $color-base-red-normal;

        #{$c}__icon {
          fill: $color-base-red-normal;
        }

        #{$c}__label {
          color: $color-base-red-normal;
        }
      }
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;

    #{$c}__inner {
      background-color: darken($color-base-grey-ultra-light, 4%);
    }

    &#{$c}--purple {
      #{$c}__inner {
        color: $color-base-purple-ultra-light;
        background-color: rgba($color-base-purple-normal, 50%);
      }
    }

    &#{$c}--red {
      #{$c}__inner {
        background-color: rgba($color-base-red-normal, 50%);
      }
    }

    &#{$c}--loading {
      cursor: wait;
    }

    #{$c}__inner {
      pointer-events: none;
    }
  }
}
</style>
