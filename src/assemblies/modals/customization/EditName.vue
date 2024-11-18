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
  buttonColor="purple"
  buttonLabel="Change name"
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
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import BaseModal from "@/components/base/modal/BaseModal.vue";
import BaseModalInputBlock from "@/components/base/modal/BaseModalInputBlock.vue";
import FormField from "@/components/form/FormField.vue";
import store from "@/store";

export default {
  name: "AddCustomEmoji",

  components: {
    BaseAvatar,
    BaseButton,
    BaseIcon,
    BaseModal,
    BaseModalInputBlock,
    FormField,
  },

  props: {},

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--
      newName: "",
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--

    onProceed() {
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
