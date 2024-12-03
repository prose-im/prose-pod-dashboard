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
  position="center"
  title="Change your workspace name"
  button-color="purple"
  button-label="Change name"
  @close="onClose"
  @confirm="onProceed"
)
  .a-edit-name
    base-modal-input-block(
      v-model="newName"
      label="New name"
      placeholder="ex: iCorp"
      type="text"
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseModal from "@/components/base/modal/BaseModal.vue";
import BaseModalInputBlock from "@/components/base/modal/BaseModalInputBlock.vue";

// STORE
import store from "@/store";

export default {
  name: "EditName",

  components: {
    BaseModal,
    BaseModalInputBlock,
  },

  props: {},

  emits: ["close"],

  data() {
    return {
      // --> STATE <--
      newName: "",
    };
  },

  computed: {},

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
    },
  },
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
  font-family: $font-family-default;
}
</style>
