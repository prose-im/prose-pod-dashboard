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
    :avatar-data-url="logo"
    class="c-base-identity-badge__icon"
    type="image"
    border-radius="22px"
    size="44px"
  )

  .c-base-identity-badge__server
    .c-base-identity-badge__server-title.u-ellipsis
      p(
        :class=`[
          "c-base-identity-badge__server-name",
          "c-base-identity-badge--semibold"
        ]`
      )
        | {{ name }}

      base-space

      .c-base-identity-badge__server-title-right(
        v-if="domain"
      )
        p(
          :class=`[
            "c-base-identity-badge__server-separator",
            "c-base-identity-badge--light"
          ]`
        ) |

        base-space

        p(
          :class=`[
            "c-base-identity-badge__server-description",
            "c-base-identity-badge--light"
          ]`
        )
          | {{ domain }}

    .c-base-identity-badge__details.u-ellipsis(
      v-if="apiVersion"
    )
      span Pod
      base-space
      span.c-base-identity-badge--light
        | {{ apiVersion }}

      template(
        v-if="serverVersion"
      )
        base-space
        span +
        base-space

        span Server
        base-space
        span.c-base-identity-badge--light
          | {{ serverVersion }}
</template>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<script>
import store from "@/store";

export default {
  name: "BaseIdentityBadge",

  data() {
    return {
      // --> STATE <--
    };
  },

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

    apiVersion() {
      const podVersion = store.$globalConfig.getPodVersion();
      if (podVersion && podVersion.api.tag === "local") {
        // Show more detailed information if the API isn’t running a released version.
        return podVersion.api.commit_short ?? podVersion.api.version;
      } else {
        return podVersion && podVersion.api.tag;
      }
    },

    serverVersion() {
      // TODO: Implement once [Add a route which returns Prosody's version · Issue #143 · prose-im/prose-pod-api](https://github.com/prose-im/prose-pod-api/issues/143) is fixed.
      return null;
    }
  },

  mounted() {
    store.$customizationWorkspace.loadWorkspaceConfig();
    store.$globalConfig.loadGlobalConfig();
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
  align-items: center;
  padding-inline-start: 6px;
  padding-inline-end: 31px;
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

    &-name {
      font-size: $font-size-baseline + 1px;
    }

    &-separator {
      color: $color-base-grey-light;
      font-size: $font-size-baseline - 1px;
    }

    &-description {
      color: $color-text-secondary;
      font-size: $font-size-baseline - 2px;
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
