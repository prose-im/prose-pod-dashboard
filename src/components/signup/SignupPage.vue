<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-signup-page
  .c-signup-page__content
    h3
      | 👋 Welcome to Prose!

    p.c-signup-page__subtitle
      | Let's get your server set up. It will take less than 5 minutes.

    signup-form(
      v-if="currentStep === 1"
      label="First, what's your organization domain name?"
    )

    signup-form(
      v-if="currentStep === 2"
      label="Now, give a name to your server! You will be able to customize all the rest later."
    )

    signup-form(
      v-if="currentStep === 3"
      label="Finish by creating your administrator account. You'll be able to invite team members later."
    )
</template>

<!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->

<script lang="ts">
import SignupForm from "./SignupForm.vue";

export default {
  name: "SignupPage",

  components: {
    SignupForm
  },

  props: {},

  data() {
    return {
      // --> STATE <--
      currentStep: 1
    };
  },

  computed: {
    activeCategory: {
      get() {
        if (!this.currentStep) {
          const route = this.$route;
          let activeCategory = "";

          switch (route.path) {
            case "/team/members": {
              activeCategory = "Members & Invites";
              break;
            }

            case "/server/configuration": {
              activeCategory = "Configuration";
              break;
            }

            case "/customization/workspace": {
              activeCategory = "Workspace";
              break;
            }

            case "/customization/emojis": {
              activeCategory = "Emojis & Reactions";
              break;
            }

            case "/advanced/security": {
              activeCategory = "Security & Encryption";
              break;
            }

            case "/advanced/network": {
              activeCategory = "Network Setup";
              break;
            }

            case "/advanced/backup": {
              activeCategory = "Backup & Reset";
              break;
            }

            default: {
              break;
            }
          }

          return activeCategory;
        } else {
          return this.currentStep;
        }
      },

      set(value: string) {
        this.currentStep = value;
      }
    }
  }
};
</script>

<!-- **********************************************************************
       STYLE
       ********************************************************************** -->

<style lang="scss">
$c: ".c-signup-page";

#{$c} {
  margin-block-start: 120px;
  text-align: center;
  flex: 1 1 auto;

  #{$c}__content {
    max-width: 560px;
    margin: 0 auto;
  }

  h3 {
    font-size: ($font-size-page + 8px);
    font-weight: $font-weight-medium;
    margin-block: 0 17px;
  }

  #{$c}__subtitle {
    font-size: ($font-size-page + 3px);
    font-weight: $font-weight-light;
    margin-block: 0 108px;
    color: $color-base-grey-normal;
  }

  @media (max-width: 768px) {
    width: fit-content;
  }
}
</style>
