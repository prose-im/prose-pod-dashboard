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
  :disabled="sendingRequest"
  :loading="sendingRequest"
  position="center"
  title="Delete member"
  button-color="red"
  title-color="red"
  button-label="Delete member"
  auto-visible
)
  .a-delete-member
    span
      | Are you sure you want to

    base-space

    span(
      :class=`[
        "a-delete-member--bolder"
      ]`
    )
      | delete

    span
      | :

    br

    span(
      :class=`[
        "a-delete-member--red",
        "a-delete-member--bolder"
      ]`
    )
      | {{ jid }}

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
  name: "DeleteMember",

  props: {
    jid: {
      type: String,
      default: null
    }
  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--

      sendingRequest: false
    };
  },

  methods: {
    // --> EVENT LISTENERS <--

    onClose() {
      // Close modal
      this.$emit("close");
    },

    async onProceed() {
      try {
        // Update loading status
        this.sendingRequest = true;

        await store.$teamMembers.deleteMemberById(this.jid);

        store.$teamMembers.deleteMemberLocally(this.jid);

        // Close modal
        this.$emit("close");

        BaseAlert.success(
          "Succesfully removed",
          `${this.jid} has been removed from the team`
        );
      } catch (error) {
        const typedError = error as ErrorFromResponse;

        // Update loading status
        this.sendingRequest = false;

        if (typedError.response.data.error === "cannot_remove_self") {
          BaseAlert.error(
            "You cannot remove yourself from the team",
            "Please ask an admin to remove you"
          );
        } else {
          BaseAlert.error(
            "Something went wrong",
            typedError.response?.data?.message || "Unknown error"
          );
        }
      }
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-delete-member";

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
