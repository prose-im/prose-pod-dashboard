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
    @change="onChange"
    :class=`[
      "c-base-upload-button__input",
      {
        "c-base-upload-button__input--disabled": disabled
      }
    ]`
    :accept="accept"
    type="file"
    :disabled="disabled"
    ref="fileInput"
    :style=`{
      width: width
    }`
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseUploadButton",

  props: {
    accept: {
      type: String,
      required: true
    },

    label: {
      type: String,
      required: true
    },

    disabled: {
      type: Boolean,
      default: false
    },

    width: {
      type: String,
      default: "120px"
    }
  },

  emits: ["filePicked"],

  methods: {
    onPickFile() {
      (this.$refs.fileInput as HTMLInputElement).click();
    },

    onChange(event: Event) {
      this.$emit("filePicked", event);
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-upload-button";

#{$c} {
  width: min-content;
  position: relative;

  #{$c}__input {
    position: absolute;
    cursor: pointer;
    opacity: 0;
    left: 0%;
    height: 100%;

    &--disabled {
      cursor: not-allowed;
    }
  }
}
</style>
