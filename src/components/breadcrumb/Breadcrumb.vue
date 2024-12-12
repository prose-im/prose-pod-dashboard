<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
      TEMPLATE
      ********************************************************************** -->

<template lang="pug">
.c-breadcrumb
  nav.c-breadcrumb__nav
    ul.c-breadcrumb__list
      li(
        class=`[
          "c-breadcrumb__list-element"
        ]`
        v-for="(crumb, index) in breadcrumbs" 
        :key="index"
      )
        span(
        ) 
          | {{ crumb }} 

        base-icon(
          v-if="index !== breadcrumbs.length -1"
          class="c-breadcrumb__icon"
          name="chevron.right"
          size="11px"
          width="6.35px"
          fill="#949eb1"
        )

    base-tooltip(
      tooltip="Coming soon"
      align="center"
      direction="bottom"
    )
      base-icon(
        name="questionmark.circle"
        size="16px"
        fill="#949eb1"
      )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseIcon from "@/components/base/BaseIcon.vue";
import BaseTooltip from "@/components/base/BaseTooltip.vue";

export default {
  name: "Breadcrumb",

  components: {
    BaseIcon,
    BaseTooltip,
  },

  props: {
    disclosureListClass: {
      type: String,
      default: null,
    },
  },

  emits: [],

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
    breadcrumbs() {
      let breadcrumbs: string[] = [];

      const route = this.$route || "/team/members";
      const matchedRoutes = route.path.split("/");
      matchedRoutes.shift();

      matchedRoutes.forEach((label, index) => {
        if (index === 0) {
          switch (label) {
            case "team": {
              breadcrumbs.push("Team Members");
              break;
            }
            case "server": {
              breadcrumbs.push("Server Features");
              break;
            }
            case "advanced": {
              breadcrumbs.push("Advanced Settings");
              break;
            }
            default: {
              breadcrumbs.push(this.capitalizeFirst(label));
              break;
            }
          }
        } else {
          switch (label) {
            case "members": {
              breadcrumbs.push("Members & Invites");
              break;
            }
            case "emojis": {
              breadcrumbs.push("Emojis & Reactions");
              break;
            }
            case "security": {
              breadcrumbs.push("Security & Encryption");
              break;
            }
            case "network": {
              breadcrumbs.push("Network Setup");
              break;
            }
            case "backup": {
              breadcrumbs.push("Backup & Reset");
              break;
            }
            default: {
              breadcrumbs.push(this.capitalizeFirst(label));
              break;
            }
          }
        }
      });

      return breadcrumbs;
    },
  },

  watch: {},

  methods: {
    // --> HELPERS <--
    capitalizeFirst(word: string) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-breadcrumb";

#{$c} {
  #{$c}__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 20px;
    margin-top: 10px;
    margin-bottom: 26.5px;
    text-decoration: none;

    ul {
      display: flex;
      list-style: none;
      font-family: $font-family-default;
      font-size: $font-size-page + 7px;
      margin-block: 0px;
      padding-inline: 0px;

      li {
        color: $color-base-grey-normal;
        font-weight: $font-weight-light;

        &:last-child {
          color: $color-black;
          font-weight: $font-weight-bolder;
        }
      }
    }
  }

  #{$c}__icon {
    margin-left: 11px;
    margin-right: 12px;
  }
}
</style>
