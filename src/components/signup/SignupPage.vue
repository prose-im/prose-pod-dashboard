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
    .c-signup-page__upper(
      v-if="currentStep !== 4"
    )
      h3
        | 👋 Welcome to Prose!

      p.c-signup-page__subtitle
        | Let's get your server set up. It will take less than 5 minutes.

      transition(
        enter-active-class="u-animate u-animate--slide-in u-animate--fast u-animate-delayed"
        leave-active-class="u-animate u-animate--slide-out-left u-animate--superfast"
      )
        signup-form(
          v-if="currentStep === 1"
          v-model="organization.domain"
          @changeStep="updateStep('domain')"
          placeholder=" Ex: hello.com"
        )
          span
            | First, what's your 
          span.c-signup-page__bold 
            | organization domain name
          span
            | ?
            
      transition(
        enter-active-class="u-animate u-animate--slide-in u-animate--fast u-animate-delayed"
        leave-active-class="u-animate u-animate--slide-out-left u-animate--superfast"
      )
        signup-form(
          v-if="currentStep === 2"
          v-model="organization.server"
          @changeStep="updateStep('server')"
          placeholder=" Ex: MyCompanyName"
        )
          span 
            | Now, give a 
          span.c-signup-page__bold
            | name to your server
          span
            | ! You will be able to customize all the rest later.
           
      transition(
        enter-active-class="u-animate u-animate--slide-in u-animate--fast u-animate-delayed"
        leave-active-class="u-animate u-animate--slide-out-left u-animate--superfast"
      )
        signup-form(
          v-if="currentStep === 3"
          v-model="organization.adminUsername"
          @changeStep="updateStep('admin')"
          @updateSecondInput="onUpdateSecondInput"
          :secondary-input="organization.adminPassword"
          button-label="Create my account and Finish now"
          form-type="double"
          placeholder="Email"
          secondary-placeholder="Password"
          type="email"
          secondary-type="password"
        )
          span
            | Finish by creating your 
          span.c-signup-page__bold
            | administrator account
          span
            | . You'll be able to invite team members later."

      p {{ organization }}
        
        
    signup-tips(
      v-if="currentStep === 1"
      :tips="tipDomain"
    )

    signup-tips(
      v-if="currentStep === 2"
      :tips="tipServer"
    )

    signup-tips(
      v-if="currentStep === 3"
      :tips="tipAdmin"
    )

    .c-signup-page__success(
      v-if="currentStep === 4"
    )
      h3
        | Congratulations! 
      br
      p
        | Your server has been setup
      br
      p
        | You will be redirected to the login page

</template>

<!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->

<script lang="ts">
import BaseAlert from "../base/BaseAlert.vue";
import SignupForm from "./SignupForm.vue";
import SignupTips from "./SignupTips.vue";

export default {
  name: "SignupPage",

  components: {
    SignupForm,
    SignupTips
  },

  props: {},

  emits: ["updateStep"],

  data() {
    return {
      // --> STATE <--
      currentStep: 1,

      organization: {
        domain: "",
        server: "",
        adminUsername: "",
        adminPassword: ""
      },

      tipDomain: {
        1: [
          ["If your team members emails are ", false],
          ["name@company.com", true],
          [", then enter ", false],
          ["company.com here", true],
          [".", false],
          ["br"],
          ["Prose can co-exist with your email and website ", false],
          ["on the same domain", true]
        ],
        2: [
          ["You will be able to setup required ", false],
          ["DNS records ", true],
          ["once signed up.", false],
          ["br"],
          ["      We will provide records to setup in your DNS manager.", false]
        ]
      },

      tipServer: {
        1: [
          ["Your server name will be used on ", false],
          ["Prose apps ", true],
          ["to identify your workspace.", false],
          ["br"],
          ["It is recommended to use your ", false],
          ["organization name", true],
          [".", false]
        ],
        2: [
          ["You will be able to setup required ", false],
          ["DNS records ", true],
          ["once signed up.", false],
          ["br"],
          ["      We will provide records to setup in your DNS manager.", false]
        ]
      },

      tipAdmin: {
        1: [
          ["This account will be ", false],
          ["the first Prose account", true],
          [", usable for administration and Prose apps.", false],
          ["br"],
          [
            "You will be able to customize your identity or modify your password then.",
            false
          ]
        ],
        2: [
          ["You will be able to ", false],
          ["invite more administrators ", true],
          ["or other team members once signed up.", false]
        ]
      }
    };
  },

  computed: {},

  watch: {
    currentStep: {
      handler() {
        this.$emit("updateStep", this.currentStep);
      },

      immediate: true
    }
  },

  methods: {
    /// HELPERS
    updateStep(stepName: string) {
      if (this.currentStep < 4) {
        switch (stepName) {
          case "domain": {
            if (this.organization.domain) {
              this.currentStep += 1;
            } else {
              BaseAlert.error("Please enter a domain name");
            }
            break;
          }
          case "server": {
            if (this.organization.server) {
              this.currentStep += 1;
            } else {
              BaseAlert.error("Please enter a name for your server");
            }
            break;
          }
          case "admin": {
            if (
              this.organization.adminUsername &&
              this.organization.adminPassword
            ) {
              this.currentStep += 1;
            } else {
              BaseAlert.error("Please enter a valid email and password");
            }
            break;
          }
          default:
            break;
        }
      }
    },

    /// EVENT LISTENERS
    onUpdateSecondInput(value: string) {
      this.organization.adminPassword = value;
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
  display: flex;
  margin-block-start: 120px;
  text-align: center;
  flex: 1 1 auto;
  overflow: hidden;

  #{$c}__content {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: space-between;
  }

  #{$c}__upper {
    max-width: 560px;
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

  //--> STYLES <--
  #{$c}__bold {
    font-weight: $font-weight-medium;
  }

  @media (max-width: 768px) {
    width: fit-content;
  }
}
</style>
