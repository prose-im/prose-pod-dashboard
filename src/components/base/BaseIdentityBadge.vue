<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-base-identity-badge
  base-avatar(
    :avatar-content-type="logo?.type"
    :avatar-data-base64="logo?.base64"
    :placeholder-data="placeholderName"
    class="c-base-identity-badge__icon"
    type="image"
    border-radius="50%"
    size="40px"
  )

  .c-base-identity-badge__server
    .c-base-identity-badge__server-title.u-ellipsis(
      v-if="name"
    )
      span(
        :class=`[
          "c-base-identity-badge__server-name",
          "c-base-identity-badge--semibold"
        ]`
      )
        | {{ name }}

      .c-base-identity-badge__server-domain(
        v-if="domain"
      )
        span.c-base-identity-badge__server-separator

        span(
          :class=`[
            "c-base-identity-badge__server-description",
            "c-base-identity-badge--light"
          ]`
        )
          | {{ domain }}

    .c-base-identity-badge__details.u-ellipsis(
      v-if="apiVersion"
    )
      span
        | Pod

      base-space

      span.c-base-identity-badge--light
        | {{ apiVersion }}

      template(
        v-if="serverVersion"
      )
        base-space

        span
          | +

        base-space

        span
          | Server

        base-space

        span.c-base-identity-badge--light
          | {{ serverVersion }}
</template>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<script>
// PROJECT: STORE
import store from "@/store";

export default {
  name: "BaseIdentityBadge",

  computed: {
    logo() {
      return store.$customizationWorkspace.getWorkspaceLogo();
    },

    name() {
      return store.$customizationWorkspace.getWorkspaceName();
    },

    domain() {
      return store.$globalConfig.getDomain();
    },

    placeholderName() {
      return this.name ? this.name : this.domain;
    },

    apiVersion() {
      // Show more detailed information if the API isn’t running a released \
      //   version?
      if (this.podVersionData?.api?.tag === "local") {
        return (
          this.podVersionData.api.commit_short ??
          this.podVersionData.api.version
        );
      }

      return this.podVersionData?.api?.tag || null;
    },

    podVersionData() {
      return store.$globalConfig.getPodVersion();
    },

    serverVersion() {
      return this.podVersionData?.server?.tag || null;
    }
  },

  async mounted() {
    await Promise.all([
      store.$customizationWorkspace.loadWorkspaceConfig(),
      store.$globalConfig.loadGlobalConfig()
    ]);
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-identity-badge";

#{$c} {
  display: flex;
  background-color: $color-white;
  align-items: center;
  min-width: 180px;
  max-width: 320px;
  padding-inline-start: 6px;
  padding-inline-end: 14px;
  padding-block: 6px;
  margin-top: 28px;
  margin-left: -6.5px;
  border-radius: 30px;
  border: solid 1px $color-border-secondary;
  box-shadow: 0 4px 4px 0 rgba($color-black, 0.01);

  #{$c}__icon {
    flex: 0 0 auto;
  }

  #{$c}__server {
    height: fit-content;
    margin-left: 12px;
    overflow: hidden;

    &-title {
      display: flex;
      align-items: center;

      &-right {
        display: flex;
        align-items: center;
      }
    }

    &-domain {
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      align-items: center;
    }

    &-name {
      font-size: $font-size-baseline + 1px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &-separator {
      background-color: $color-base-grey-light;
      width: 1px;
      height: ($font-size-baseline - 1px);
      margin-inline: 5px;
      margin-block-end: -1.5px;
      flex: 0 0 auto;
    }

    &-description {
      color: $color-text-secondary;
      font-size: ($font-size-baseline - 2px);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      margin: 0px;
    }

    span {
      font-size: $font-size-baseline - 1.5px;
    }
  }

  // --> WEIGHTS <--

  &--extra-light {
    font-weight: $font-weight-extra-light;
  }

  &--light {
    font-weight: $font-weight-light;
  }

  &--semibold {
    font-weight: $font-weight-medium;
  }

  // --> MEDIA QUERIES <--

  @media (max-width: 768px) {
    max-width: 140px;
  }

  @media (min-width: 768px) and (max-width: 922px) {
    max-width: 210px;
    box-sizing: border-box;
  }
}
</style>
