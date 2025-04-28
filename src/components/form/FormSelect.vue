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
    "c-form-select",
    "c-form-select--" + size,
    "c-form-select--" + align,
    "c-form-select--" + position,
    {
      "c-form-select--visible": visible && !disabled,
      "c-form-select--disabled": disabled,
      "c-form-select--loading": loading
    }
  ]`
)
  .c-form-select__field(
    :style="{ minWidth }"
    @click="onFieldClick"
  )
    .c-form-select__inner.c-form-select__inner--menu
      .c-form-select__color-preview(
        v-if="colorPreview"
        :style=`{
          backgroundColor:colorPreview,
        }`
      )

      span(
        :class=`[
          "c-form-select__value",
          "u-ellipsis",
          "c-form-select__value--menu",
          {
            "c-form-select__value--empty": !value,
          }
        ]`
      )
        | {{ valueLabel || placeholder || "" }}

      base-icon(
        :size="arrowSize"
        name="chevron.up"
        class="c-form-select__arrow"
      )

  div(
    v-if="visible && !disabled"
    v-click-away="onDropdownClickAway"
    :style="{ minWidth }"
    :class=`[
      "c-form-select__dropdown",
      "c-form-select__dropdown--menu",
      {
        "c-form-select__dropdown--color": colorPreview
      }
    ]`

  )
    ul.c-form-select__options(
      ref="options"
      :class=`[
      ]`
    )
      li(
        v-for="(option, index) in options"
        @mouseenter="onOptionMouseEnter(index)"
        @mouseleave="onOptionMouseLeave"
        :class=`[
          "c-form-select__option",
          {
            "c-form-select__option--selected": (value === option.value),
            "c-form-select__option--hovered": (hoveredIndex === index),
            "c-form-select__option--disabled": option.disabled
          }
        ]`
      )
        a.c-form-select__option--link(
          @click="onOptionClick(option)"
        )
          .c-form-select__color-preview(
            v-if="option.colorPreview"
            :style=`{
              backgroundColor: option.colorPreview,
            }`
          )

          span.c-form-select__option-label.u-ellipsis(
            :class=`[
              {
                "c-form-select__value" : !option.colorPreview
              }
            ]`
          )
            | {{ option.label }}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
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
  name: "FormSelect",

  props: {
    modelValue: {
      type: String || Boolean,
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

    colorPreview: {
      type: String,
      default: null
    },

    minWidth: {
      type: String,
      default: "140px"
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
      default: "center",

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
    }
  },

  emits: ["update:modelValue", "change"],

  data() {
    return {
      // --> STATE <--

      value: "",
      searchQuery: "",

      hoveredIndex: -1,

      visible: false
    };
  },

  computed: {
    hasOptions(): boolean {
      return this.options.length > 0;
    },

    valueLabel(): string | undefined {
      const option = this.options.find(option => {
        return this.value === option.value;
      });

      // Fallback on raw value
      return option?.label;
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

    selectOption(option: Option): void {
      this.$emit("update:modelValue", option.value);

      // Hide dropdown selector
      this.hideDropdown();
    },

    hideDropdown(): void {
      this.visible = false;
    },

    scrollToOptionIndex(index: number): void {
      const optionsElement = (this.$refs.options as HTMLElement) || null;

      if (optionsElement !== null) {
        const optionElement = optionsElement.children[index] || null;

        if (optionElement !== null) {
          optionElement.scrollIntoView({
            behavior: "auto",
            block: "nearest"
          });
        }
      }
    },

    eventOverrides(event: Event): void {
      event.stopPropagation();
      event.preventDefault();
    },

    // --> EVENT LISTENERS <--

    onHotkeyEnter(event: Event): void {
      this.eventOverrides(event);

      if (this.hasOptions === true && this.hoveredIndex >= 0) {
        const selectedOption = this.options[this.hoveredIndex] || null;

        if (selectedOption !== null) {
          this.selectOption(selectedOption);
        }
      }
    },

    onHotkeyEscape(event: Event): void {
      this.eventOverrides(event);

      // Stepped escape handling (1st hit resets search, 2nd hit closes)
      if (this.searchQuery) {
        // Reset search query
        this.searchQuery = "";
      } else {
        // Hide dropdown selector
        this.hideDropdown();
      }
    },

    onHotkeyDown(event: Event): void {
      this.eventOverrides(event);

      if (this.hasOptions === true) {
        const nextHoveredIndex = this.hoveredIndex + 1;

        if (nextHoveredIndex < this.options.length) {
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
          this.hoveredIndex = this.options.length - 1;
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

    onSearchInputKeyDown(event: KeyboardEvent): void {
      const keyName = null;

      if (keyName !== null) {
        // Re-trigger hotkey handler function? (if any)
        const handlerFn = this.hotkeys[keyName] || null;

        if (handlerFn !== null) {
          handlerFn(event);
        }
      }
    },

    onOptionMouseEnter(index: number): void {
      if (this.hoveredIndex !== index) {
        this.hoveredIndex = index;
      }
    },

    onOptionMouseLeave(): void {
      this.hoveredIndex = -1;
    },

    onOptionClick(option: Option): void {
      this.selectOption(option);
    },

    onInputChange(event: Event): void {
      // Update model value?
      if (event.target) {
        const selectValue: string = (event.target as HTMLInputElement).value;

        // Update model value and send change event
        this.$emit("update:modelValue", selectValue);
        this.$emit("change", selectValue);
      }
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-form-select";

// VARIABLES
$sizes: (
  "medium": (
    "font-size": $font-size-baseline - 2.5px,
    "value-font-size": $font-size-baseline - 2.5px,
    "line-height": $size-form-select-medium-line-height,
    "padding-start": $size-form-select-medium-padding-start,
    "padding-end": $size-form-select-medium-padding-end,
    "option-retract": 2px
  ),
  "mid-medium": (
    "font-size": $font-size-baseline - 1.5px,
    "value-font-size": $font-size-baseline - 2px,
    "line-height": $size-form-select-mid-medium-line-height,
    "padding-start": $size-form-select-medium-padding-start,
    "padding-end": $size-form-select-medium-padding-end,
    "option-retract": 4px
  ),
  "large": (
    "font-size": $font-size-baseline,
    "value-font-size": $font-size-baseline - 1px,
    "line-height": $size-form-select-large-line-height,
    "padding-start": $size-form-select-medium-padding-start,
    "padding-end": $size-form-select-medium-padding-end,
    "option-retract": 6px
  ),
  "mid-large": (
    "font-size": $font-size-baseline + 1.5px,
    "value-font-size": $font-size-baseline,
    "line-height": $size-form-select-mid-large-line-height,
    "padding-start": $size-form-select-medium-padding-start,
    "padding-end": $size-form-select-medium-padding-end,
    "option-retract": 8px
  ),
  "ultra-large": (
    "font-size": $font-size-baseline + 2.5px,
    "value-font-size": $font-size-baseline + 1px,
    "line-height": $size-form-select-ultra-large-line-height,
    "padding-start": $size-form-select-medium-padding-start,
    "padding-end": $size-form-select-medium-padding-end,
    "option-retract": 10px
  )
);

#{$c} {
  position: relative;

  #{$c}__field,
  #{$c}__dropdown {
    background-color: $color-white;
    border: $size-form-select-border-width solid rgba($color-black, 0.1);
    box-shadow: 0 2px 3px 0 rgba(var(--color-shadow-primary), 0.01);
    width: max-content;
  }

  #{$c}__field,
  #{$c}__options,
  #{$c}__option {
    margin: 0px;

    #{$c}__color-preview {
      height: 11px;
      width: 11px;
      margin-inline-end: 9px;
      border-radius: 3px;
      flex: 0 0 auto;
    }

    #{$c}__value {
      padding-bottom: 1px;
      flex: 1;
    }
  }

  #{$c}__input {
    display: none;
  }

  #{$c}__field {
    width: calc(100% - (2 * $size-form-select-border-width));
    padding-block: $size-form-select-padding-block;
    transition: border-color 150ms linear;
    border-radius: $size-form-select-border-radius;
    cursor: pointer;
    position: relative;
    z-index: 1;

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
    }

    #{$c}__arrow {
      fill: $color-text-tertiary;
      margin-inline-start: 12.5px;
      flex: 0 0 auto;
    }

    width: max-content;
  }

  #{$c}__dropdown {
    overflow: hidden;
    z-index: 2;

    &--menu {
      position: absolute;
      inset-inline: 0;
    }

    a {
      border-radius: 0px;
    }
  }

  #{$c}__options {
    max-height: 240px;
    padding-block: 6px;
    padding-inline: 0;
    overflow-x: hidden;
    overflow-y: auto;

    #{$c}__option {
      display: flex;
      justify-content: center;

      a {
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: none;

        #{$c}__value {
          color: $color-text-primary;
        }
      }

      &--link {
        width: 100%;
        cursor: pointer;
      }

      &--hovered {
        a {
          background-color: $color-base-grey-ultra-light;

          &,
          &:active {
            #{$c}__value {
              color: $color-black;
            }
          }

          &:active {
            background-color: darken($color-base-grey-ultra-light, 1%);
          }
        }
      }

      &--selected {
        a {
          background-color: darken($color-background-primary, 3%);
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

      #{$c}__field #{$c}__inner#{$c}__inner--menu,
      #{$c}__options #{$c}__option a {
        padding-inline-start: map-get($size, "padding-start");
        padding-inline-end: map-get($size, "padding-end");
      }

      #{$c}__field {
        #{$c}__value {
          line-height: map-get($size, "line-height");
          font-size: map-get($size, "value-font-size");
        }
      }

      #{$c}__options {
        #{$c}__option {
          line-height: (
            map-get($size, "line-height") - map-get($size, "option-retract")
          );
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

    #{$c}__options {
      #{$c}__option {
        #{$c}__option-label {
          flex: 1;
        }
      }
    }
  }

  &--center {
    #{$c}__field #{$c}__inner,
    #{$c}__search input,
    #{$c}__options #{$c}__option a {
      text-align: center;
    }

    #{$c}__options #{$c}__option a {
      padding-inline: 0;
    }
  }

  // --> POSITIONS <--

  &--top {
    #{$c}__dropdown {
      border-block-end: 0 none;
      inset-block-end: 100%;
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
    #{$c}__dropdown {
      border-block-start: 0 none;
      inset-block-start: 100%;
      border-end-start-radius: $size-form-select-border-radius;
      border-end-end-radius: $size-form-select-border-radius;
    }

    &#{$c}--visible {
      #{$c}__field {
        border-end-start-radius: 0;
        border-end-end-radius: 0;
      }

      #{$c}__dropdown {
        width: initial;
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
      background-color: darken($color-base-grey-ultra-light, 1%);

      #{$c}__value {
        opacity: 0.4;
      }
    }
  }
}
</style>
