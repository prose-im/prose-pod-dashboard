<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-init-page
  .c-init-page__content(
    v-if="currentStep !== 4"
  )
    h3
      | 👋 Welcome to Prose!

    p.c-init-page__subtitle
      | Let's get your server set up. It will take less than 5 minutes.

    init-form(
      v-if="currentStep === 1"
      v-model="organization.domain"
      @changeStep="updateStep('domain')"
      :form-visible="currentStep === 1"
      placeholder=" Ex: hello.com"
      :tips="tipDomain"
    )
      span
        | First, what's your
      span.c-init-page__bold
        | organization domain name
      span
        | ?

    init-form(
      v-if="currentStep === 2"
      v-model="organization.server"
      @changeStep="updateStep('server')"
      :form-visible="currentStep === 2"
      placeholder=" Ex: MyCompanyName"
      :tips="tipServer"
    )
      span
        | Now, give a
      span.c-init-page__bold
        | name to your server
      span
        | ! You will be able to customize all the rest later.

    init-form(
      v-if="currentStep === 3"
      v-model="organization.adminUsername"
      @changeStep="updateStep('admin')"
      @updateSecondInput="onUpdateSecondInput"
      :secondary-input="organization.adminPassword"
      button-label="Create my account and Finish now"
      form-type="double"
      :form-visible="currentStep === 3"
      placeholder="E-mail"
      secondary-placeholder="Password"
      :tips="tipAdmin"
      type="email"
      secondary-type="password"
    )
      span
        | Finish by creating your
      span.c-init-page__bold
        | administrator account
      span
        | . You'll be able to invite team members later."

      p {{ organization }}

  .c-init-page__success(
    v-if="currentStep === 4"
  )
    init-success

</template>

<!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->

<script lang="ts">
import BaseAlert from "@/components/base/BaseAlert.vue";
import InitForm from "@/components/init/InitForm.vue";
import InitTips from "@/components/init/InitTips.vue";
import InitSuccess from "@/components/init/InitSuccess.vue";

export default {
  name: "InitPage",

  components: {
    InitForm,
    InitTips,
    InitSuccess
  },

  props: {},

  emits: ["updateStep"],

  data() {
    return {
      // --> STATE <--
      currentStep: null as number | null,

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
        if (!this.currentStep) {
          setTimeout(() => (this.currentStep = 1), 10);
        }

        this.$emit("updateStep", this.currentStep);
      },

      immediate: true
    }
  },

  methods: {
    /// HELPERS
    updateStep(stepName: string) {
      if (this.currentStep) {
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
$c: ".c-init-page";

#{$c} {
  display: flex;
  margin-block-start: 120px;
  text-align: center;
  flex: 1 1 auto;
  overflow: hidden;

  #{$c}__content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
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

  #{$c}__success {
    margin-inline: auto;
    margin-block-start: 150px;
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
<!-- li
span
  | If your team members emails are
span.c-init-page__bold
  | name@company.com
span
  | , then enter
span.c-init-page__bold
  | company.com here
span
  | .
br
span
  | Prose can co-exist with your email and website
span.c-init-page__bold
  | on the same domain
span
  | .

li
span
  | You will be able to setup required
span.c-init-page__bold
  | DNS records
span
  | once signed up.
br
span
  | We will provide records to setup in your DNS manager. -->
