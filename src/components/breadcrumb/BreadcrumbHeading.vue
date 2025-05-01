<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
      TEMPLATE
      ********************************************************************** -->

<template lang="pug">
.c-breadcrumb-heading
  nav.c-breadcrumb-heading__nav
    ul.c-breadcrumb-heading__list
      li(
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class=`[
          "c-breadcrumb-heading__list-element"
        ]`
      )
        p
          | {{ crumb }}

        base-icon(
          v-if="index !== (breadcrumbs.length - 1)"
          name="chevron.right"
          size="11px"
          width="6.35px"
          fill="#949eb1"
          class="c-breadcrumb-heading__icon"
        )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BreadcrumbHeading",

  props: {
    disclosureListClass: {
      type: String,
      default: null
    }
  },

  computed: {
    breadcrumbs() {
      let breadcrumbs: string[] = [];

      const route = this.$route || "/team/members",
        matchedRoutes = route.path.split("/");

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
    }
  },

  methods: {
    // --> HELPERS <--

    capitalizeFirst(word: string) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-breadcrumb-heading";

#{$c} {
  #{$c}__nav {
    padding-inline: 20px;
    margin-top: 10px;
    margin-bottom: 26.5px;
    line-height: 28px;
    text-decoration: none;

    ul {
      display: flex;
      list-style: none;
      font-size: $font-size-page + 7px;
      margin-block: 0px;
      padding-inline: 0px;

      li {
        color: $color-base-grey-normal;
        font-weight: $font-weight-light;
        display: flex;
        align-items: center;

        &:last-child {
          color: $color-black;
          font-weight: $font-weight-bolder;
        }

        p {
          margin-block: 0;
        }
      }
    }
  }

  #{$c}__icon {
    margin-inline: 12px;
    margin-bottom: -5px;
    flex: 1 0 auto;
  }
}
</style>
