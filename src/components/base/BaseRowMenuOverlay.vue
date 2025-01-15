<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
teleport(
  to="#app"
)
  div(
    :class=`[
      "c-base-row-menu",
      "c-base-row-menu--" + direction,
      "c-base-row-menu--" + align
    ]`
    :style="overlayStyle"
  )
    span.c-base-row-menu__dropdown
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
              "c-base-row-menu__option--selected": (value === option.value),
              "c-base-row-menu__option--hovered": (hoveredIndex === index),
              "c-base-row-menu__option--disabled": option.disabled
            }
          ]`
        )
          span.c-base-row-menu__value.u-ellipsis
            | {{ option.value }}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->
<script lang="ts">
// ENUMERATIONS
enum PositionRule {
  // Start position rule.
  Start = "start",
  // End position rule.
  End = "end"
}

export default {
  name: "BaseRowMenuOverlay",

  props: {
    options: {
      type: Array,
      required: true
    },

    align: {
      type: String,
      required: true,

      validator(x: string): boolean {
        return ["left", "center", "right"].includes(x);
      }
    },

    direction: {
      type: String,
      required: true,

      validator(x: string): boolean {
        return ["top", "bottom"].includes(x);
      }
    },

    anchor: {
      type: Array<number>,
      required: true,

      validator(x: Array<number>): boolean {
        return x.length === 2;
      }
    },

    origin: {
      type: Array<number>,
      required: true,

      validator(x: Array<number>): boolean {
        return x.length === 2;
      }
    }
  },

  computed: {
    overlayStyle(): { [property: string]: string } {
      // Compute all rules
      const [horizontalRule, horizontalOffset] = this.computeHorizontalRule(),
        [verticalRule, verticalOffset] = this.computeVerticalRule();

      return {
        // Horizontal position
        [horizontalRule === PositionRule.End
          ? "insetInlineEnd"
          : "insetInlineStart"]: `${horizontalOffset}px`,

        // Vertical position
        [verticalRule === PositionRule.End
          ? "insetBlockEnd"
          : "insetBlockStart"]: `${verticalOffset}px`
      };
    }
  },

  methods: {
    // --> HELPERS <--

    computeHorizontalRule(): [PositionRule, number] {
      switch (this.align) {
        case "left": {
          return [PositionRule.Start, this.anchor[0]];
        }

        case "right": {
          return [
            PositionRule.End,
            document.documentElement.clientWidth -
              this.anchor[0] -
              this.origin[0]
          ];
        }

        case "center": {
          return [PositionRule.Start, this.anchor[0] + this.origin[0] / 2];
        }

        default: {
          return [PositionRule.Start, 0];
        }
      }
    },

    computeVerticalRule(): [PositionRule, number] {
      switch (this.direction) {
        case "top": {
          return [
            PositionRule.End,
            document.documentElement.clientHeight - this.anchor[1]
          ];
        }

        case "bottom": {
          return [PositionRule.Start, this.anchor[1] + this.origin[1]];
        }

        default: {
          return [PositionRule.Start, 0];
        }
      }
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-row-menu";

// VARIABLES
$tooltip-spacing-block: 6px;
$tooltip-spacing-inline: -3px;

#{$c} {
  font-weight: initial;
  line-height: 18px;
  user-select: none;
  cursor: default;
  width: max-content;
  display: block;
  position: fixed;
  z-index: $index-foreground-secondary;

  #{$c}__value {
    background-color: rgba($color-white, 0.9);
    backdrop-filter: blur(3px);
    font-size: ($font-size-baseline - 2.5px);
    user-select: none;
    text-align: center;
    letter-spacing: 0.1px;
    padding: 5px 10px;
    display: inline-block;
    box-shadow: 0 2px 6px 0 rgba($color-border-secondary, 0.06);

    &,
    a {
      color: $color-text-primary;
    }

    a {
      text-decoration: underline;
    }
  }

  // --> DIRECTIONS <--

  &--top {
    padding-block-end: $tooltip-spacing-block;
  }

  &--bottom {
    padding-block-start: $tooltip-spacing-block;
  }

  // --> ALIGNS <--

  &--left {
    margin-inline-start: $tooltip-spacing-inline;
    text-align: left;
  }

  &--center {
    text-align: center;
    transform: translateX(-50%);
  }

  &--right {
    margin-inline-end: $tooltip-spacing-inline;
    text-align: right;
  }
}
</style>
