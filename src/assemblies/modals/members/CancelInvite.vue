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
  title="Delete member"
  button-color="red"
  title-color="red"
  button-label="Delete member"
)
  .a-cancel-invite
    span
      | Are you sure you want to&nbsp;

    span(
      :class=`[
        "a-cancel-invite--bolder"
      ]`
    )
      | cancel 

    span
      | the invitation to:

    br

    span(
      :class=`[
        "a-cancel-invite--red",
        "a-cancel-invite--bolder"
      ]`
    )
      | {{ invite.jid }}

    span
      | ?
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: STORE
import store from "@/store";

// PROJECT: COMMONS
import { ErrorFromResponse } from "@/commons/errors";

export default {
  name: "CancelInvite",

  props: {
    invite: {
      type: Object,
      default: () => ({})
    },

    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close", "proceed"],

  methods: {
    // --> EVENT LISTENERS <--

    onClose() {
      // Close modal
      this.$emit("close");
    },

    async onProceed() {
      try {
        await store.$teamMembers.cancelInvitation(this.invite.id);

        // Close modal
        this.$emit("close");

        BaseAlert.success(
          "Succesfully removed",
          `The invitation to ${this.invite.jid} has been cancelled`
        );
      } catch (error) {
        const typedError = error as ErrorFromResponse;

        BaseAlert.error("Something went wrong", typedError);
      }
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-cancel-invite";

#{$c} {
  text-align: center;
  font-size: ($font-size-baseline + 2px);
  line-height: 30px;
  font-weight: $font-weight-light;

  h4 {
    color: $color-text-secondary;
    margin-top: 0;
    margin-bottom: 11px;
    margin-left: 8px;
    font-weight: $font-weight-regular;
  }

  // --> STYLES <--

  &--red {
    color: $color-base-red-normal;
  }

  &--bolder {
    font-weight: $font-weight-medium;
  }
}
</style>
