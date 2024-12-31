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
  transition(
    enter-active-class="u-animate u-animate--fade-in u-animate--fast"
    leave-active-class="u-animate u-animate--fade-out u-animate--fast"
  )
    .c-base-modal
      base-modal-background(
        @closeModal="onClose"
        :position="position"
      )
        base-modal-container(
          @closeModal="onClose"
          @confirmAction="onConfirm"
          :container-visible="loaded"
          :position="position"
          :title="title"
          :title-color="titleColor"
          :button-color="buttonColor"
          :button-label="buttonLabel"
          :flex-body="flexContainer"
          :disabled="disabled"
          :loading="loading"
        )
          slot
</template>

<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseModal",

  props: {
    title: {
      type: String,
      required: true,
    },

    buttonColor: {
      type: String,
      default: "grey",

      validator(x: string) {
        return ["grey", "purple", "red"].includes(x);
      },
    },

    buttonLabel: {
      type: String,
      default: "",
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    flexContainer: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    position: {
      type: String,
      default: "left",

      validator(x: string) {
        return ["center", "left"].includes(x);
      },
    },

    titleColor: {
      type: String,
      default: "black",

      validator(x: string) {
        return ["black", "red"].includes(x);
      },
    },

    visible: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["close", "confirm", "load"],

  data() {
    return {
      // --> STATE <--

      loaded: false,
    };
  },

  watch: {
    visible(newVisibility, oldVisibility) {
      //console.log("new visibility");
      setTimeout(() => (this.loaded = newVisibility), 10);

      // If the visibility has changed and is true,
      // the baseModal can load its contents
      if (newVisibility === true && newVisibility !== oldVisibility) {
        this.$emit("load");
      }
    },
  },

  methods: {
    onClose(event: Event) {
      this.loaded = false;
      setTimeout(() => this.$emit("close", event), 50);
    },

    onConfirm(event: Event) {
      this.$emit("confirm", event);
    },
  },
};
</script>

<!-- **********************************************************************
   STYLE
   ********************************************************************** -->

<style lang="scss">
$c: ".c-base-modal";

#{$c} {
  position: fixed;
  inset: 0;
  z-index: $index-foreground-secondary;
}
</style>
