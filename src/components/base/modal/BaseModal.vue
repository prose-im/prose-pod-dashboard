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
    .c-base-modal(
      v-if="visible"
    )
      base-modal-background(
        :position="position"
        @closeModal="onClose"
      )
        base-modal-container(
          :containerVisible="loaded"
          :position="position"
          :title="title"
          :titleColor="titleColor"
          :buttonColor="buttonColor"
          :buttonLabel="buttonLabel"
          :flexBody="flexContainer"
          :disabled="disabled"
          @closeModal="onClose"
          @confirmAction="onConfirm"
        )
          slot

          
</template>

<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
import BaseModalBackground from "@/components/base/modal/BaseModalBackground.vue";
import BaseModalContainer from "@/components/base/modal/BaseModalContainer.vue";

export default {
  name: "BaseModal",

  components: {
    BaseModalBackground,
    BaseModalContainer,
  },

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
      required: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    flexContainer: {
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

  computed: {},

  watch: {
    visible(newVisibility, oldVisibility) {
      setTimeout(() => (this.loaded = newVisibility), 10);

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
