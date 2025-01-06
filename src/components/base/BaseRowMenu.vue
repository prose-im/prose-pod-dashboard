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
    "c-base-row-menu",
    "c-base-row-menu--" + align,
    {
      "c-base-row-menu--visible": isVisible,
    }
  ]`
)
  .c-base-row-menu__dropdown
    ul.c-base-row-menu__options(
      ref="options"
    )
      li(
        v-for="(option, index) in options"
        @mouseenter="onOptionMouseEnter(index)"
        @mouseleave="onOptionMouseLeave(index)"
        @click="onDropDownClick"
        :class=`[
          "c-base-row-menu__option",
          {
            "c-base-row-menu__option--hovered": (hoveredIndex === index),
            "c-base-row-menu__option--disabled": option.disabled
          }
        ]`
      )
        .c-base-row-menu__link(
          :class=`[
            "c-base-row-menu__link--" + option.color
          ]`
          @click="onOptionClick(option)"
        )
          span.c-base-row-menu__value.u-ellipsis
            | {{ option?.value }}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseRowMenuOverlay from "@/components/base/BaseRowMenuOverlay.vue";

// CONSTANTS
export default {
  name: "BaseRowMenu",

  components: {
    BaseRowMenuOverlay
  },

  props: {
    options: {
      type: Array,
      required: true
    },

    align: {
      type: String,
      default: "center",

      validator(x: string): boolean {
        return ["left", "center", "right"].includes(x);
      }
    },

    direction: {
      type: String,
      default: "top",

      validator(x: string): boolean {
        return ["top", "bottom"].includes(x);
      }
    }
  },

  emits: ["menuAction"],

  data() {
    return {
      // --> STATE <--
      hoveredIndex: -1,

      isVisible: true,

      overlayAnchor: [0, 0],
      overlayOrigin: [0, 0]
    };
  },

  methods: {
    // --> HELPERS <--

    onOptionMouseEnter(index: number): void {
      if (this.hoveredIndex !== index) {
        this.hoveredIndex = index;
      }
    },

    onOptionMouseLeave(): void {
      this.hoveredIndex = -1;
    },

    onOptionClick(event: HTMLButtonElement): void {
      this.$emit("menuAction", event.value);
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-row-menu";

#{$c} {
  display: inline-block;
  position: relative;

  #{$c}__dropdown {
    background-color: $color-white;
  }

  #{$c}__field,
  #{$c}__options,
  #{$c}__option {
    margin: 0px;

    #{$c}__icon {
      margin-inline-end: 9px;
      flex: 0 0 auto;
    }

    #{$c}__value {
      flex: 1;
    }
  }

  #{$c}__input {
    display: none;
  }

  #{$c}__dropdown {
    overflow: hidden;

    #{$c}__link {
      border-radius: 7px;
    }
  }

  #{$c}__options {
    border: 1px solid darken($color-base-grey-ultra-light, 3%);
    max-height: 240px;
    padding-block: $size-form-select-options-padding-block;
    padding-inline: 0;
    overflow-x: hidden;
    overflow-y: auto;

    #{$c}__option {
      display: block;

      #{$c}__link {
        background-color: transparent;
        display: flex;
        align-items: center;
        transition: none;
        text-decoration: none;

        #{$c}__value {
          color: $color-text-secondary;
          box-shadow: none;
        }
      }

      &--hovered {
        #{$c}__link {
          //background-color: $color-base-purple-ultra-light;

          #{$c}__value {
            cursor: pointer;
            color: $color-text-primary;
            background-color: $color-base-purple-ultra-light;
          }

          // <!-- COLORS  -->
          &--red {
            #{$c}__value {
              color: $color-base-red-normal;
              background-color: rgba($color-base-red-normal, 0.05);
            }
          }
        }
      }

      &--disabled {
        cursor: not-allowed;

        #{$c}__link {
          pointer-events: none;

          #{$c}__value {
            color: $color-text-tertiary;
          }
        }

        &#{$c}__option--hovered {
          #{$c}__link {
            background-color: darken($color-background-primary, 1%);
          }
        }
      }
    }
  }

  // --> ALIGNS <--

  &--left {
    #{$c}__field #{$c}__inner,
    #{$c}__search input,
    #{$c}__options #{$c}__option #{$c}__link {
      text-align: left;
    }
  }

  &--center {
    #{$c}__field #{$c}__inner,
    #{$c}__search input,
    #{$c}__options #{$c}__option #{$c}__link {
      text-align: center;
    }
  }

  // --> POSITIONS <--

  &--top {
    #{$c}__field {
      z-index: 2;
    }

    #{$c}__dropdown {
      border-block-end: 0 none;
      inset-block-end: 100%;
      z-index: 1;
      border-start-start-radius: $size-form-select-border-radius;
      border-start-end-radius: $size-form-select-border-radius;
    }

    &#{$c}--visible {
      #{$c}__field {
        border-start-start-radius: 0;
        border-start-end-radius: 0;
      }
    }
  }

  &--bottom {
    #{$c}__field {
      z-index: 1;
    }

    #{$c}__dropdown {
      border-block-start: 0 none;
      inset-block-start: 100%;
      z-index: 2;
      border-end-start-radius: $size-form-select-border-radius;
      border-end-end-radius: $size-form-select-border-radius;
    }

    &#{$c}--visible {
      #{$c}__field {
        border-end-start-radius: 0;
        border-end-end-radius: 0;
      }
    }
  }

  // --> BOOLEANS <--
  &--disabled {
    cursor: not-allowed;

    #{$c}__field,
    #{$c}__dropdown {
      pointer-events: none;
    }

    #{$c}__field {
      background-color: rgba($color-base-grey-light, 0.6);

      #{$c}__icon {
        opacity: 0.6;
      }

      #{$c}__value {
        color: $color-text-primary;
      }
    }
  }
}
</style>
