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
    @change="onChange"
    ref="formField"
    :type="type"
    size="mid-large"
    align="left"
    :placeholder="placeholder"
    v-bind="$attrs"
    :autofocus="autofocus"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import FormField from "../form/FormField.vue";

export default {
  name: "BaseModalInputBlock",

  props: {
    modelValue: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    placeholder: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "text",
    },

    autofocus: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue", "change"],

  computed: {
    fieldValue: {
      get() {
        return this.modelValue;
      },

      set(value: string) {
        this.$emit("update:modelValue", value);
      },
    },
  },

  watch: {
    autofocus: {
      handler(value) {
        console.log("new autofocus", value);
        // Update value in the state
        this.focusFieldFromParent();
      },
    },
  },

  methods: {
    // --> EVENT LISTENERS <--
    onChange(value: string | number): void {
      this.$emit("change", value);
    },

    // --> EXTERNALS <--
    focusFieldFromParent(): void {
      // call the focus method on the component
      (this.$refs.formField as InstanceType<typeof FormField>).focusFieldFromParent();
    },
  },
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
