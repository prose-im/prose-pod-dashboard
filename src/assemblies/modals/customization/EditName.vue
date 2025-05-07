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
  :disabled="!newName"
  position="center"
  title="Change your workspace name"
  button-color="purple"
  button-label="Change name"
)
  vee-form.a-edit-name(
    v-slot="{ errors, meta }"
    ref="veeFormInstance"
  )
    base-modal-input-block(
      v-model="newName"
      :display-error="errors?.workspaceName && meta.touched"
      :label="label"
      :rules="{required: true, max: 100}"
      error-message="This field is required"
      name="workspaceName"
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

// PROJECT: VEE-VALIDATE
import { Form as VeeForm } from "vee-validate";

// PROJECT: STORE
import store from "@/store";

export default {
  name: "EditName",

  components: {
    VeeForm
  },

  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close", "showSuccess"],

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

  methods: {
    // --> EVENT LISTENERS <--

    async onProceed() {
      console.log(
        "errors",
        (this.$refs.veeFormInstance as InstanceType<typeof VeeForm>).errors
      );
      if (
        (this.$refs.veeFormInstance as InstanceType<typeof VeeForm>).meta.valid
      ) {
        if (!this.newName) {
          BaseAlert.error(
            "No workspace name",
            "Please enter a name for your workspace"
          );

          return;
        }

        await store.$customizationWorkspace.updateWorkspaceName(this.newName);

        // Reinitialize variables + close modal
        this.newName = "";

        this.$emit("close");

        // Make success notitification visible
        this.$emit("showSuccess");
      }
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
  margin-block-end: 30px;
}
</style>
