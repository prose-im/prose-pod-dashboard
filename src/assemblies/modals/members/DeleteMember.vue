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
  :visible="visibility"
  position="center"
  title="Delete member"
  button-color="red"
  title-color="red"
  button-label="Delete member"
  @close="onClose"
  @confirm="onProceed"
)
  .a-delete-member
    span
      | Are you sure you want to&nbsp;

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

export default {
  name: "DeleteMember",

  props: {
    jid: {
      type: String,
      default: null
    },

    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {},

  watch: {},

  methods: {
    // --> HELPERS <--

    // --> EVENT LISTENERS <--

    onClose() {
      // Close modal
      this.$emit("close");
    },

    async onProceed() {
      try {
        await store.$teamMembers.deleteMemberById(this.jid);

        store.$teamMembers.deleteMemberLocally(this.jid);

        // Close modal
        this.$emit("close");

        BaseAlert.success(
          "Succesfully removed",
          `${this.jid} has been removed from the team`
        );
      } catch (e: any) {
        if (e.response.data.message.includes("self-remove")) {
          BaseAlert.error(
            "You cannot remove yourself from the team",
            "Please ask an admin to remove you"
          );
        } else {
          BaseAlert.error("Something went wrong", e.response.data.message);
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
  margin-inline: 48px;
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

  // STYLES
  &--red {
    color: $color-base-red-normal;
  }

  &--bolder {
    font-weight: $font-weight-medium;
  }
}
</style>
