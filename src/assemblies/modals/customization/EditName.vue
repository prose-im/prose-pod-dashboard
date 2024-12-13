<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
base-modal(
  @close="onClose"
  @confirm="onProceed"
  :visible="visibility"
  position="center"
  title="Change your workspace name"
  button-color="purple"
  button-label="Change name"
)
  .a-edit-name
    base-modal-input-block(
      v-model="newName"
      :label="label"
      placeholder="ex: Big Project"
      type="text"
      autofocus
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// STORE
import store from "@/store";

export default {
  name: "EditName",

  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close"],

  data() {
    return {
      // --> STATE <--
      newName: ""
    };
  },

  computed: {
    label() {
      const name = store.$customizationWorkspace.getWorkspaceName();

      return `New name for ${name}`;
    }
  },

  watch: {},

  methods: {
    // --> HELPERS <--

    onProceed() {
      if (!this.newName) {
        BaseAlert.error("Please enter a name for your workspace");
        return;
      }

      store.$customizationWorkspace.updateWorkspaceName(this.newName);

      this.newName = "";
      this.$emit("close");
    },

    onClose() {
      this.newName = "";
      this.$emit("close");
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-edit-name";

#{$c} {
  margin-inline: 48px;
  margin-block-end: 30px;
}
</style>
