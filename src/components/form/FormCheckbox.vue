<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
div(
  :class=`[
    "c-form-checkbox",
    "c-form-checkbox--" + size,
    {
      "c-form-checkbox--disabled": disabled,
      "c-form-checkbox--loading": loading
    }
  ]`
)
  input(
    @change="onInputChange"
    :name="name"
    :checked="modelValue"
    class="c-form-checkbox__input"
    type="checkbox"
  )

  label.c-form-checkbox__label(
    v-if="$slots.default"
    @click="onLabelClick"
    :class=`[
      "c-form-checkbox--" + bold,
      "c-form-checkbox--" + labelColor,
      {
        "u-medium": hasLabelEmphasis,
        "u-regular": !hasLabelEmphasis
      }
    ]`
  )
    slot
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "FormCheckbox",

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: "medium",

      validator(x: string) {
        return ["small", "mid", "medium"].includes(x);
      }
    },

    name: {
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

    bold: {
      type: String,
      default: "normal",

      validator(x: string) {
        return ["normal", "semibold"].includes(x);
      }
    },

    labelColor: {
      type: String,
      default: "black",

      validator(x: string) {
        return ["black", "red"].includes(x);
      }
    }
  },

  emits: ["update:modelValue", "change"],

  computed: {
    hasLabelEmphasis(): boolean {
      return (this.size === "medium") || (this.size === "mid") ? true : false;
    }
  },

  methods: {
    // --> HELPERS <--

    updateValue(checked: boolean): void {
      this.$emit("update:modelValue", checked);
      this.$emit("change", checked);
    },

    // --> EVENT LISTENERS <--

    onInputChange(event: Event): void {
      // Update model value
      if (event.target) {
        this.updateValue((event.target as HTMLInputElement).checked);
      }
    },

    onLabelClick(): void {
      // Toggle model value
      this.updateValue(!this.modelValue);
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-form-checkbox";

#{$c} {
  text-align: left;
  display: flex;
  align-items: center;

  #{$c}__input {
    border: 0 none;
    outline: 0 none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    position: relative;
    appearance: none;

    &:before {
      content: "";
      background-color: $color-white;
      border: 1.5px solid $color-border-primary;
      outline: 2px solid transparent;
      position: absolute;
      inset: 0;
      box-sizing: border-box;
      border-radius: 6px;
      transition: border 150ms linear;
    }

    &:after {
      content: "";
      background-image: url("/images/components/form/FormCheckbox/check.svg");
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 54%;
      aspect-ratio: 13/9;
      visibility: hidden;
      position: relative;
    }

    &:hover {
      &:checked {
        &:before {
          border-color: darken($color-base-purple-normal, 8%);
          background: darken($color-base-purple-normal, 8%);
        }
      }

      &:not(:checked) {
        &:before {
          border-color: rgba($color-base-purple-normal, 0.75);
          border-width: 2px;
        }
      }
    }

    &:active {
      &:checked {
        &:before {
          border-color: darken($color-base-purple-normal, 14%);
          background: darken($color-base-purple-normal, 14%);
        }
      }

      &:not(:checked) {
        &:before {
          border-color: darken($color-base-purple-normal, 8%);
        }
      }
    }

    &:focus-visible {
      &:before {
        outline-color: rgba($color-base-purple-normal, 0.3);
        outline-offset: 1px;
      }
    }

    &:checked {
      &:before {
        border-color: $color-base-purple-normal;
        background: $color-base-purple-normal;
        transition: none;
      }

      &:after {
        visibility: visible;
      }
    }
  }

  #{$c}__label {
    flex: 1;

    &:hover {
      cursor: pointer;
    }
  }

  // --> SIZES <--

  &--small {
    #{$c}__input {
      width: $size-form-checkbox-small-size;
      height: $size-form-checkbox-small-size;
    }

    #{$c}__label {
      font-size: ($font-size-baseline - 1px);
      padding-inline-start: 6px;
    }
  }

  &--mid {
    #{$c}__input {
      width: $size-form-checkbox-medium-size;
      height: $size-form-checkbox-medium-size;
    }

    #{$c}__label {
      font-size: ($font-size-baseline - 1px);
      padding-inline-start: 10px;
    }
  }

  &--medium {
    #{$c}__input {
      width: $size-form-checkbox-medium-size;
      height: $size-form-checkbox-medium-size;
    }

    #{$c}__label {
      font-size: ($font-size-baseline + 2px);
      padding-inline-start: 10px;
    }
  }

  // --> BOOLEANS <--

  &--disabled {
    cursor: not-allowed;

    &#{$c}--loading {
      cursor: wait;
    }

    #{$c}__input,
    #{$c}__label {
      pointer-events: none;
    }

    #{$c}__input {
      &:before {
        opacity: 0.6;
      }
    }

    #{$c}__label {
      color: $color-text-secondary;
    }
  }

  // --> WEIGHTS <--

  &--semibold {
    font-weight: $font-weight-medium;
  }

  // --> COLORS <--
  &--black {
    color: $color-text-primary;
  }

  &--red {
    color: $color-base-red-normal;
  }
}
</style>
