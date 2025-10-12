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
      v-hotkey="hotkeys"
    )
      base-modal-background(
        @close-modal="onClose"
        :position="position"
      )
        base-modal-container(
          @close-modal="onClose"
          @confirm-action="onConfirm"
          @reload="onReload"
          :button-color="buttonColor"
          :button-label="buttonLabel"
          :button-icon="buttonIcon"
          :container-visible="loaded"
          :disabled="disabled"
          :flex-body="flexContainer"
          :loading="loading"
          :position="position"
          :reload="reload"
          :reload-text="reloadText"
          :size="size"
          :title="title"
          :title-color="titleColor"
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
      required: true
    },

    buttonColor: {
      type: String,
      default: "grey",

      validator(x: string) {
        return ["grey", "purple", "red", "black"].includes(x);
      }
    },

    buttonLabel: {
      type: String,
      default: ""
    },

    buttonIcon: {
      type: String,
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    },

    flexContainer: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },

    position: {
      type: String,
      default: "left",

      validator(x: string) {
        return ["center", "left"].includes(x);
      }
    },

    reload: {
      type: Boolean,
      default: false
    },

    reloadText: {
      type: String,
      default: ""
    },

    size: {
      type: String,
      default: "medium",

      validator(x: string) {
        return ["medium", "large"].includes(x);
      }
    },

    titleColor: {
      type: String,
      default: "black",

      validator(x: string) {
        return ["black", "red"].includes(x);
      }
    },

    autoVisible: {
      type: Boolean,
      default: false
    },

    visible: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close", "confirm", "load", "reload"],

  data() {
    return {
      // --> STATE <--

      loaded: false
    };
  },

  computed: {
    hotkeys(): { [name: string]: () => void } {
      return {
        escape: this.onClose
      };
    }
  },

  watch: {
    visible(newVisibility, oldVisibility) {
      this.triggerVisibleChange(newVisibility, oldVisibility);
    }
  },

  mounted() {
    if (this.autoVisible === true) {
      this.triggerVisibleChange();
    }
  },

  methods: {
    // --> EVENT LISTENERS <--

    onClose(event: Event | null) {
      this.loaded = false;

      setTimeout(() => this.$emit("close", event), 50);
    },

    onConfirm(event: Event) {
      this.$emit("confirm", event);
    },

    onReload() {
      this.$emit("reload");
    },

    // --> HELPERS <--

    triggerVisibleChange(newVisibility = true, oldVisibility = false) {
      setTimeout(() => (this.loaded = newVisibility), 10);

      // If the visibility has changed and is true, the modal can load its \
      //   contents
      if (newVisibility === true && newVisibility !== oldVisibility) {
        this.$emit("load");
      }
    }
  }
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
