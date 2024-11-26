<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
div(
  :class=`[
    "c-base-avatar"
  ]`
  :style=`{
    backgroundImage: backgroundImage,
    height: size,
    width: size,
    borderRadius: borderRadius
  }`
)
</template>

<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseAvatar",

  props: {
    size: {
      type: String,
      default: "34px",
    },

    avatarDataUrl: {
      type: String,
      default: "",
    },

    borderRadius: {
      type: String,
      default: "5px",
    },

    type: {
      type: String,
      default: "person",

      validator(x: string) {
        return ["person", "image"].includes(x);
      },
    },
  },

  computed: {
    backgroundImage(): string | void {
      let imageUrl = "";

      if (this.avatarDataUrl) {
        imageUrl = `url(${this.avatarDataUrl})`;
      } else {
        switch (this.type) {
          case "person":
            imageUrl = `url(/images/components/base/BasePlaceholderImage/illustration-contact-empty.webp)`;
            break;
          case "image":
            imageUrl = `url(/images/components/base/BaseServerLogo/logo-prose-org.png)`;
            break;
          default:
            break;
        }
      }

      return imageUrl;
    },
  },

  watch: {},

  methods: {},
};
</script>

<!-- **********************************************************************
      STYLE
      ********************************************************************** -->

<style lang="scss">
$c: ".c-base-avatar";

#{$c} {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
