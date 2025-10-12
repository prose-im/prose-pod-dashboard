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
    "c-form-field",
    "c-form-field--" + type,
    "c-form-field--" + size,
    "c-form-field--" + align,
    "c-form-field--" + direction,
    {
      "c-form-field--focused": isFocused,
      "c-form-field--disabled": disabled,
      "c-form-field--loading": loading
    }
  ]`
)
  textarea(
    v-if="type === 'textarea'"
    @keypress.stop
    @keydown.stop="onFieldKeyDown"
    @keyup.stop="onFieldKeyUp"
    @input="onFieldInput"
    @focus="onFieldFocus"
    @blur="onFieldBlur"
    @contextmenu.stop
    :name="name"
    :value="value"
    :rows="rows"
    :placeholder="placeholder"
    :disabled="disabled"
    :autocomplete="autocomplete"
    :class=`[
      "c-form-field__inner",
      "c-form-field__inner--textarea",
      {
        [fieldClass]: fieldClass
      }
    ]`
    ref="field"
  )

  field(
    v-else
    v-model="value"
    :name="name"
    :rules="rules"
    v-slot="{ field }"
  )
    .c-form-field__core
      input(
        v-bind="field"
        @keypress.stop
        @keydown.stop="onFieldKeyDown"
        @keyup.stop="onFieldKeyUp"
        @input="onFieldInput"
        @focus="onFieldFocus"
        @blur="onFieldBlur"
        @contextmenu.stop
        :type="type"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :placeholder="placeholder"
        :class=`[
          "c-form-field__inner",
          "c-form-field__inner--input",
          {
            [fieldClass]: fieldClass
          }
        ]`
        ref="field"
      )

      form-input-error-message(
        v-if="displayError"
        class="c-form-field__error"
      )
        span
          | {{ errorMessage }}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// NPM
import { codes as keyCodes } from "keycode";
import { defineRule, Field } from "vee-validate";
import { alpha_spaces, email, max, min, required } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("alpha_spaces", alpha_spaces);
defineRule("max", max);
defineRule("min", min);

export default {
  name: "FormField",

  components: {
    Field
  },

  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },

    type: {
      type: String,
      default: "text",

      validator(x: string) {
        return [
          "text",
          "password",
          "number",
          "email",
          "url",
          "textarea"
        ].includes(x);
      }
    },

    size: {
      type: String,
      default: "large",

      validator(x: string) {
        return [
          "medium",
          "mid-medium",
          "large",
          "mid-large",
          "ultra-large"
        ].includes(x);
      }
    },

    align: {
      type: String,
      default: "center",

      validator(x: string) {
        return ["left", "center", "right"].includes(x);
      }
    },

    direction: {
      type: String,
      default: "bottom",

      validator(x: string): boolean {
        return ["top", "bottom"].includes(x);
      }
    },

    displayError: {
      type: Boolean,
      default: false
    },

    errorMessage: {
      type: String,
      default: "Invalid input"
    },

    name: {
      type: String,
      default: "null"
    },

    placeholder: {
      type: String,
      default: null
    },

    rows: {
      type: Number,
      default: 4
    },

    autocomplete: {
      type: String,
      default: null
    },

    submittable: {
      type: Boolean,
      default: false
    },

    autofocus: {
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

    fieldClass: {
      type: String,
      default: null
    },

    rules: {
      type: Object,
      default: () => ({})
    }
  },

  emits: [
    "update:modelValue",
    "keyup",
    "keystroke",
    "focus",
    "change",
    "submit"
  ],

  data() {
    return {
      // --> STATE <--

      isFocused: false,

      value: ""
    };
  },

  watch: {
    modelValue: {
      immediate: true,

      handler(value) {
        // Update value in the state
        this.updateStateValue(value);
      }
    }
  },

  mounted() {
    // Apply auto-focus?
    // Notice: delay focus, otherwise the focus might not work in certain \
    //   circumstances.
    if (this.autofocus === true) {
      setTimeout(() => {
        this.focusField();
      });
    }
  },

  methods: {
    // --> EXTERNALS <--

    focusFieldFromParent(): void {
      // Alias focus field method
      this.focusField();
    },

    unfocusFieldFromParent(): void {
      // Alias focus field method
      this.unfocusField();
    },

    // --> HELPERS <--

    focusField(): void {
      // Attempt to focus? (not already focused)
      if (this.isFocused !== true) {
        const fieldElement = (this.$refs.field as HTMLElement) || null;

        if (fieldElement !== null) {
          fieldElement.focus();
        }
      }
    },

    unfocusField(): void {
      // Attempt to focus? (not already focused)
      if (this.isFocused === true) {
        const fieldElement = (this.$refs.field as HTMLElement) || null;

        if (fieldElement !== null) {
          fieldElement.blur();
        }
      }
    },

    updateStateValue(value: string): void {
      this.value = value;
    },

    updateModelValue(value: string | number): void {
      this.$emit("update:modelValue", value);
      this.$emit("change", value);
    },

    // --> EVENT LISTENERS <--

    onFieldKeyDown(event: KeyboardEvent): void {
      const keyCode = event.keyCode;

      switch (keyCode) {
        // Enter
        case keyCodes.enter: {
          // Handle 'Enter' key press? (if not new line and submittable field)
          if (event.shiftKey !== true && this.submittable === true) {
            event.preventDefault();

            // Trigger field submit event
            this.$emit("submit");
          }

          break;
        }
      }
    },

    onFieldKeyUp(event: KeyboardEvent): void {
      const inputElement = event.target as HTMLInputElement | void;

      // Handle key event
      const keyCode = event.keyCode;

      switch (keyCode) {
        // Escape
        case keyCodes.esc: {
          // De-focus from input
          inputElement?.blur();

          break;
        }
      }

      // Propagate key events
      this.$emit("keyup", event);
      this.$emit("keystroke", inputElement?.value || "");
    },

    onFieldInput(): void {
      let inputValue: string | number =
        (this.$refs.field as HTMLInputElement).value || "";

      // Convert raw input value to number?
      if (inputValue && this.type === "number") {
        inputValue = Number(inputValue);
      }

      // Update model value and send change event
      this.updateModelValue(inputValue);
    },

    onFieldFocus(): void {
      this.isFocused = true;

      // Propagate focus event
      this.$emit("focus", true);
    },

    onFieldBlur(): void {
      this.isFocused = false;

      // Propagate focus event
      this.$emit("focus", false);
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-form-field";

#{$c} {
  position: relative;

  #{$c}__core {
    flex: 1 1 auto;
  }

  #{$c}__error {
    margin-inline-start: 10px;
    margin-block-start: 6px;
  }

  #{$c}__inner {
    background-color: $color-white;
    border: 1px solid rgba($color-black, 0.1);
    outline: 0 solid rgba($color-base-purple-normal, 0);
    color: $color-text-primary;
    font-family: inherit;
    width: 100%;
    padding-block: $size-form-field-padding-block;
    transition-property: box-shadow, border-color, outline-color, outline-width;
    transition-duration: 150ms;
    transition-timing-function: linear;
    border-radius: $size-form-field-border-radius;
    box-sizing: border-box;
    box-shadow: inset 0 1px 2px 0 rgba($color-black, 0.04);

    &--textarea {
      height: 100%;
      margin: 0;
      resize: none;
      display: block;
    }

    &::placeholder {
      color: $color-text-secondary;
      font-weight: $font-weight-extra-light;
      opacity: 1;
    }

    &:hover {
      border-color: rgba($color-base-purple-normal, 0.5);
    }

    &:focus {
      border-color: $color-base-purple-normal;
      box-shadow: 0 3px 4px 0 rgba($color-background-primary, 0.1),
        inset 0 1px 2px 0 rgba($color-black, 0.04);
    }
  }

  // --> TYPES <--

  &--input {
    display: inline-block;
  }

  &--textarea {
    display: block;
  }

  // --> SIZES <--

  &--medium {
    #{$c}__inner {
      font-size: ($font-size-baseline - 3px);
      letter-spacing: 0.05px;
      padding-inline-start: $size-form-field-medium-padding-sides;
      padding-inline-end: $size-form-field-medium-padding-sides;

      &--input {
        line-height: $size-form-field-medium-input-line-height;
      }

      &--textarea {
        line-height: 16px;
        padding-block: 7px;
      }
    }
  }

  &--mid-medium {
    #{$c}__inner {
      font-size: ($font-size-baseline - 1px);
      letter-spacing: 0.075px;
      padding-inline-start: $size-form-field-mid-medium-padding-sides;
      padding-inline-end: $size-form-field-mid-medium-padding-sides;

      &--input {
        line-height: $size-form-field-mid-medium-input-line-height;
      }

      &--textarea {
        line-height: 18px;
        padding-block: 9px;
      }
    }
  }

  &--large {
    #{$c}__inner {
      font-size: $font-size-baseline;
      letter-spacing: 0.1px;
      padding-inline-start: $size-form-field-large-padding-sides;
      padding-inline-end: $size-form-field-large-padding-sides;

      &--input {
        line-height: $size-form-field-large-input-line-height;
      }

      &--textarea {
        line-height: 20px;
        padding-block: 11px;
      }
    }
  }

  &--mid-large {
    #{$c}__inner {
      font-size: ($font-size-baseline + 2px);
      letter-spacing: 0.125px;
      padding-inline-start: $size-form-field-mid-large-padding-sides;
      padding-inline-end: $size-form-field-mid-large-padding-sides;

      &--input {
        line-height: $size-form-field-mid-large-input-line-height;
      }

      &--textarea {
        line-height: 21px;
        padding-block: 12px;
      }
    }
  }

  &--ultra-large {
    #{$c}__inner {
      font-size: ($font-size-baseline + 3px);
      letter-spacing: 0.15px;
      padding-inline-start: $size-form-field-ultra-large-padding-sides;
      padding-inline-end: $size-form-field-ultra-large-padding-sides;

      &--input {
        line-height: $size-form-field-ultra-large-input-line-height;
      }

      &--textarea {
        line-height: 22px;
        padding-block: 13px;
      }
    }
  }

  // --> ALIGNS <--

  &--left {
    #{$c}__inner {
      text-align: left;
    }
  }

  &--center {
    #{$c}__inner {
      text-align: center;
    }
  }

  &--right {
    #{$c}__inner {
      text-align: right;
    }
  }

  // --> BOOLEANS <--

  &--disabled {
    cursor: not-allowed;

    &#{$c}--loading {
      cursor: wait;
    }

    #{$c}__inner {
      background-color: rgba($color-base-grey-light, 0.6);
      color: $color-text-secondary;
      pointer-events: none;

      &::placeholder {
        color: $color-text-tertiary;
      }
    }
  }

  &--focused {
    #{$c}__inner {
      outline-color: rgba($color-base-purple-normal, 0.2);
      outline-width: $size-form-field-outline-width;
    }
  }
}
</style>
