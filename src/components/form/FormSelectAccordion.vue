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
    "c-form-select-accordion",
    "c-form-select-accordion--" + size,
    "c-form-select-accordion--" + align,
    {
      "c-form-select-accordion--visible": visible && !disabled,
      "c-form-select-accordion--disabled": disabled,
      "c-form-select-accordion--loading": loading
    }
  ]`
)
  .c-form-select-accordion__field(
    @click="onFieldClick"
  )
    .c-form-select-accordion__inner(

    )
      component(
        v-if="icon && value"
        v-bind="icon.properties(value)"
        :is="icon.component"
        class="c-form-select-accordion__icon"
      )

      span(
        :class=`[
          "c-form-select-accordion__value",
          "u-ellipsis",
          {
            "c-form-select-accordion__value--empty": !value,
          }
        ]`
      )
        | {{ placeholder || "" }}

      base-icon(
        :size="arrowSize"
        name="chevron.up"
        class="c-form-select-accordion__arrow"
      )

  div(
    v-if="visible && !disabled"
    :class=`[
      "c-form-select-accordion__dropdown",
    ]`

  )
    ul.c-form-select-accordion__options(
      ref="options"
    )
      li(
        v-for="(option, index) in filteredOptions"
        @mouseenter="onOptionMouseEnter(index)"
        @mouseleave="onOptionMouseLeave(index)"
        @click="onDropDownClick"
        :class=`[
          "c-form-select-accordion__option",
          {
            "u-medium": (value === option.value),
            "c-form-select-accordion__option--selected": (value === option.value),
            "c-form-select-accordion__option--hovered": (hoveredIndex === index),
            "c-form-select-accordion__option--disabled": option.disabled
          }
        ]`
      )
        router-link(
          :to="option.link"
          class="c-form-select-accordion__link"
          @click="onOptionClick(option)"
        )
          base-icon(
            v-if="option.icon"
            :name="option.icon"
            fill= '#000000'
            size="11px"
            class="c-form-select-accordion__link--icon"
          )
          span.c-form-select-accordion__value.u-ellipsis
            | {{ option.value }}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// NPM
import { PropType } from "vue";
//- import { names as keyNames } from "keycode";

//COMPONENTS
import BaseIcon from '@/components/base/BaseIcon.vue'

// INTERFACES
export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

// CONSTANTS
const AVAILABLE_SIZES: { [size: string]: { arrow: string } } = {
  medium: {
    arrow: "6px"
  },

  "mid-medium": {
    arrow: "8px"
  },

  large: {
    arrow: "9px"
  },

  "mid-large": {
    arrow: "9px"
  },

  "ultra-large": {
    arrow: "10px"
  }
};

export interface Icon {
  component: object;
  properties: (value: string) => object;
}

export default {
  name: "FormSelectAccordion",

  components: {
    BaseIcon
  },
  props: {
    modelValue: {
      type: String,
      default: null
    },

    options: {
      type: Array<Option>,
      required: true,

      validator(x: Array<Option>): boolean {
        return x.length > 0;
      }
    },

    name: {
      type: String,
      default: null
    },

    icon: {
      type: Object as PropType<Icon>,
      default: null
    },

    size: {
      type: String,
      default: "large",

      validator(x: string) {
        return Object.keys(AVAILABLE_SIZES).includes(x);
      }
    },

    align: {
      type: String,
      default: "left",

      validator(x: string) {
        return ["left", "center"].includes(x);
      }
    },

    position: {
      type: String,
      default: "top",

      validator(x: string) {
        return ["top", "bottom"].includes(x);
      }
    },

    placeholder: {
      type: String,
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      // --> STATE <--
      value: "",
      searchQuery: "",

      hoveredIndex: -1,

      visible: true
    };
  },

  computed: {
    filteredOptions(): Array<Option> {
      // No search query, return identity.
      return this.options;
    },

    hasOptions(): boolean {
      return this.filteredOptions.length > 0;
    },

    arrowSize(): string {
      const sizeProperties = AVAILABLE_SIZES[this.size];

      // Return arrow size for select size?
      if (sizeProperties) {
        return sizeProperties.arrow;
      }

      // Return fallback size
      return "10px";
    },

    hotkeys(): { [name: string]: (event: Event) => void } {
      return {
        enter: this.onHotkeyEnter,
        esc: this.onHotkeyEscape,
        down: this.onHotkeyDown,
        up: this.onHotkeyUp
      };
    }
  },

  watch: {
    modelValue: {
      immediate: true,

      handler(value) {
        this.value = value;
      }
    },

    visible: {
      handler(value) {
        // Now invisible? Reset values (as needed)
        if (value === false) {
          if (this.hoveredIndex >= 0) {
            this.hoveredIndex = -1;
          }
        }
      }
    }
  },

  methods: {
    // --> HELPERS <--

    hideDropdown(): void {
      this.visible = false;
    },

    scrollToOptionIndex(index: number): void {
      const optionsElement = (this.$refs.options as HTMLElement) || null;
    },

    eventOverrides(event: Event): void {
      event.stopPropagation();
      event.preventDefault();
    },

    // --> EVENT LISTENERS <--

    onHotkeyEnter(event: Event): void {
      this.eventOverrides(event);

      if (this.hasOptions === true && this.hoveredIndex >= 0) {
        const selectedOption = this.filteredOptions[this.hoveredIndex] || null;
      }
    },

    onHotkeyEscape(event: Event): void {
      this.eventOverrides(event);
        // Hide dropdown selector
        this.hideDropdown();

    },

    onHotkeyDown(event: Event): void {
      this.eventOverrides(event);

      if (this.hasOptions === true) {
        const nextHoveredIndex = this.hoveredIndex + 1;

        if (nextHoveredIndex < this.filteredOptions.length) {
          this.hoveredIndex = nextHoveredIndex;
        } else {
          this.hoveredIndex = 0;
        }

        this.scrollToOptionIndex(this.hoveredIndex);
      }
    },

    onHotkeyUp(event: Event): void {
      this.eventOverrides(event);

      if (this.hasOptions === true) {
        const previousHoveredIndex = this.hoveredIndex - 1;

        if (previousHoveredIndex >= 0) {
          this.hoveredIndex = previousHoveredIndex;
        } else {
          this.hoveredIndex = this.filteredOptions.length - 1;
        }

        this.scrollToOptionIndex(this.hoveredIndex);
      }
    },

    onFieldClick(): void {
      // Toggle dropdown visibility
      this.visible = !this.visible;
    },

    onDropdownClickAway(): void {
      // Hide dropdown
      this.hideDropdown();
    },

    onOptionMouseEnter(index: number): void {
      if (this.hoveredIndex !== index) {
        this.hoveredIndex = index;
      }
    },

    onOptionMouseLeave(): void {
      this.hoveredIndex = -1;
    },

    onOptionClick(event: Event): void {
      this.$emit("update:modelValue", event?.value);
    },

  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-form-select-accordion";

// VARIABLES
$sizes: (
  "medium": (
    "font-size": $font-size-baseline - 2.5px,
    "line-height": $size-form-select-medium-line-height,
    "padding-start": $size-form-select-medium-padding-start,
    "padding-end": $size-form-select-medium-padding-end,
    "option-retract": 2px,
  ),
  "mid-medium": (
    "font-size": $font-size-baseline - 1.5px,
    "line-height": $size-form-select-mid-medium-line-height,
    "padding-start": $size-form-select-medium-padding-start,
    "padding-end": $size-form-select-medium-padding-end,
    "option-retract": 4px,
  ),
  "large": (
    "font-size": $font-size-baseline,
    "line-height": $size-form-select-large-line-height,
    "padding-start": $size-form-select-medium-padding-start,
    "padding-end": $size-form-select-medium-padding-end,
    "option-retract": 6px,
  ),
  "mid-large": (
    "font-size": $font-size-baseline + 1.5px,
    "line-height": $size-form-select-mid-large-line-height,
    "padding-start": $size-form-select-medium-padding-start,
    "padding-end": $size-form-select-medium-padding-end,
    "option-retract": 8px,
  ),
  "ultra-large": (
    "font-size": $font-size-baseline + 2.5px,
    "line-height": $size-form-select-ultra-large-line-height,
    "padding-start": $size-form-select-medium-padding-start,
    "padding-end": $size-form-select-medium-padding-end,
    "option-retract": 10px,
  ),
);

#{$c} {
  position: relative;

  #{$c}__field,
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

  #{$c}__field {
    width: calc(100% - (2 * $size-form-select-border-width));
    padding-block: $size-form-select-padding-block;
    transition: border-color 150ms linear;
    border-radius: $size-form-select-border-radius;
    cursor: pointer;
    position: relative;

    &:hover {
      border-color: rgba($color-black, 0.15);
    }

    &:active {
      border-color: rgba($color-black, 0.2);
    }

    #{$c}__inner {
      display: flex;
      align-items: center;
    }

    #{$c}__value {
      color: $color-text-primary;
      font-weight: $font-weight-medium;
      font-size: ($font-size-baseline + 1px);
    }

    #{$c}__arrow {
      fill: $color-text-tertiary;
      margin-inline-start: 12.5px;
      flex: 0 0 auto;
    }
  }

  #{$c}__dropdown {
    overflow: hidden;

    a {
      border-radius: 7px;
    }
  }

  #{$c}__link {
    padding-left: 14px;

    &--icon {
      fill: $color-base-grey-normal;
      margin-right: 7px;
    }
  }

  #{$c}__options {
    max-height: 240px;
    padding-block: $size-form-select-options-padding-block;
    padding-inline: 0;
    overflow-x: hidden;
    overflow-y: auto;

    #{$c}__option {
      display: block;

      a {
        background-color: transparent;
        display: flex;
        align-items: center;
        transition: none;
        text-decoration: none;

        #{$c}__value {
          color: $color-text-secondary;
        }
      }

      &--hovered {
        a {
          background-color: $color-base-grey-ultra-light;

          &,
          &:active {
            #{$c}__value {
              color: $color-text-primary;
            }
          }
        }
      }

      &--selected {
        a {
          background-color: darken($color-background-primary, 3%);

          #{$c}__value {
            color: $color-text-primary;
          }
        }

        &#{$c}__option--hovered {
          a {
            background-color: $color-base-grey-ultra-light;

            &,
            &:active {
              #{$c}__value {
                color: $color-text-primary;
              }
            }

            &:active {
              background-color: $color-base-grey-ultra-light;
            }
          }
        }
      }

      &--disabled {
        cursor: not-allowed;

        a {
          pointer-events: none;

          #{$c}__value {
            color: $color-text-tertiary;
          }
        }

        &#{$c}__option--hovered {
          a {
            background-color: darken($color-background-primary, 1%);
          }
        }
      }
    }
  }

  // --> SIZES <--

  @each $name, $size in $sizes {
    &--#{$name} {
      #{$c}__field,
      #{$c}__options {
        font-size: map-get($size, "font-size");
      }

      #{$c}__field {
        #{$c}__value {
          line-height: map-get($size, "line-height");
        }
      }

      #{$c}__options {
        #{$c}__option {
          line-height: (map-get($size, "line-height") - map-get($size, "option-retract"));
        }
      }
    }
  }

  // --> ALIGNS <--

  &--left {
    #{$c}__field #{$c}__inner,
    #{$c}__search input,
    #{$c}__options #{$c}__option a {
      text-align: left;
    }
  }

  &--center {
    #{$c}__field #{$c}__inner,
    #{$c}__search input,
    #{$c}__options #{$c}__option a {
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

  &--visible {
    #{$c}__field,
    #{$c}__dropdown {
      &,
      &:hover,
      &:active {
        border-color: rgba($color-black, 0.125);
      }
    }

    #{$c}__field {
      #{$c}__arrow {
        transform: scaleY(-1);
      }
    }
  }

  &--disabled {
    cursor: not-allowed;

    &#{$c}--loading {
      cursor: wait;
    }

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

  // --> MEDIA QUERIES <--

  @media (max-width: 922px) {
    max-width: 210px;
  }
}
</style>
