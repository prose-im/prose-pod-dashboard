<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.c-base-upload-button
  base-button(
    tint="white"
    :disabled="disabled"
  )
    | {{ label }}

  input(
    type="file"
    :class=`[
      "c-base-upload-button__input",
      {
        "c-base-upload-button__input--disabled": disabled
      }
    ]`
    :disabled="disabled"
    ref="fileInput"
    @change="onChange"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseButton from "@/components/base/BaseButton.vue";

export default {
  name: "BaseUploadButton",

  components: {
    BaseButton,
  },

  props: {
    label: {
      type: String,
      required: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["filePicked"],

  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },

    onChange(event) {
      this.$emit("filePicked", event);
    },
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-upload-button";

#{$c} {
  #{$c}__input {
    position: absolute;
    cursor: pointer;
    width: 120px;
    left: 18%;
    opacity: 0;

    &--disabled {
      cursor: not-allowed;
    }
  }
}
</style>
