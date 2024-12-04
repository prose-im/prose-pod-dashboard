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
    :type="type"
    size="mid-large"
    align="left"
    :placeholder="placeholder"
    v-bind="$attrs"
    @change="onChange"
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

  components: {
    FormField,
  },

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
  },

  emits: ["update:modelValue", "change"],

  data() {
    return {
      // --> STATE <--
    };
  },

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

  watch: {},

  methods: {
    // --> EVENT LISTENERS <--
    onChange(value: string | number): void {
      this.$emit("change", value);
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
  font-family: $font-family-default;

  h4 {
    color: $color-text-secondary;
    margin-top: 0;
    margin-bottom: 11px;
    margin-left: 8px;
    font-weight: $font-weight-medium;
  }

  margin-bottom: 18px;
}
</style>
