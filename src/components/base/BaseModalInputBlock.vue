<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-base-modal-input-block
  h4
    | {{ label }}

  form-field(
    v-model="fieldValue"
    v-bind="$attrs"
    @change="onChange"
    :autofocus="autofocus"
    :disabled="disabled"
    :display-error="displayError"
    :error-message="errorMessage"
    :name="name"
    :placeholder="placeholder"
    :type="type"
    :rules="rules"
    ref="formField" 
    align="left"
    size="mid-large"
  )


</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import FormField from "@/components/form/FormField.vue";

export default {
  name: "BaseModalInputBlock",

  props: {
    modelValue: {
      type: String,
      required: true
    },

    autofocus: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    displayError: {
      type: Boolean,
      default: false
    },

    errorMessage: {
      type: String,
      default: "Invalid input"
    },

    label: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    placeholder: {
      type: String,
      default: ""
    },

    rules: {
      type: Object,
      default: () => ({})
    },

    type: {
      type: String,
      default: "text"
    }
  },

  emits: ["update:modelValue", "change"],

  computed: {
    fieldValue: {
      get() {
        return this.modelValue;
      },

      set(value: string) {
        this.$emit("update:modelValue", value);
      }
    }
  },

  watch: {
    autofocus: {
      handler() {
        // Update value in the state
        this.focusFieldFromParent();
      }
    }
  },

  methods: {
    // --> EVENT LISTENERS <--

    onChange(value: string | number): void {
      this.$emit("change", value);
    },

    // --> EXTERNALS <--

    focusFieldFromParent(): void {
      // Call the focus method on the component
      (
        this.$refs.formField as InstanceType<typeof FormField>
      ).focusFieldFromParent();
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-modal-input-block";

#{$c} {
  margin-bottom: 18px;

  h4 {
    color: $color-text-secondary;
    margin-top: 0;
    margin-bottom: 11px;
    margin-left: 8px;
    font-weight: $font-weight-medium;
  }
}
</style>
