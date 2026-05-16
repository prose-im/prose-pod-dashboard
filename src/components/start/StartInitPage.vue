<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.c-start-init-page
  .c-start-init-page__content(
    v-if="currentStep === 1 || currentStep === 2"
  )
    h1
      | 👋

      base-space(
        :repeat="2"
      )

      | Welcome to Prose!

    p.c-start-init-page__subtitle
      | Let's get your server set up. It will take less than 5 minutes.

    start-init-form(
      v-if="currentStep === 1"
      v-model="organization.server"
      @change-step="updateStep('server')"
      :errorMessages="['Field required']"
      :form-visible="currentStep === 1"
      :loading="loading"
      :rules="[{required: true}]"
      :tips="tipServer"
      placeholder=" Ex: MyCompanyName"
    )
      span
        | Now, give a

      base-space

      span.c-start-init-page__bold
        | name to your server

      span
        | !

      base-space

      span
        | You will be able to customize all the rest later.

    start-init-form(
      v-else-if="currentStep === 2"
      v-model="organization.adminUsername"
      @change-step="updateStep('admin')"
      @update-second-input="onUpdateSecondInput"
      @update-third-input="onUpdateThirdInput"
      :secondary-input="organization.adminPassword"
      :tertiary-input="organization.adminNickname"
      :errorMessages="stepThreeErrors"
      :form-visible="currentStep === 2"
      :loading="loading"
      :rules="stepThreeRules"
      :tips="tipAdmin"
      form-type="triple"
      placeholder="Username (eg. john.doe)"
      type="text"
      secondary-placeholder="Password"
      secondary-type="password"
      tertiary-placeholder="Full name (eg. John Doe)"
      tertiary-type="text"
      button-label="Create my account and Finish now"
    )
      span
        | Finish by creating your

      base-space

      span.c-start-init-page__bold
        | administrator account

      span
        | .

      base-space

      span
        | You'll be able to invite team members later.

  .c-start-init-page__success(
    v-else-if="currentStep === 3"
  )
    start-init-success
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import StartInitForm from "@/components/start/StartInitForm.vue";
import StartInitTips from "@/components/start/StartInitTips.vue";
import StartInitSuccess from "@/components/start/StartInitSuccess.vue";

// PROJECT: API
import APIInit from "@/api/providers/init";

// PROJECT: STORE
import Store from "@/store";

export default {
  name: "StartInitPage",

  components: {
    BaseIcon,
    StartInitForm,
    StartInitTips,
    StartInitSuccess
  },

  emits: ["updateStep"],

  data() {
    return {
      // --> STATE <--

      currentStep: 1 as number | null,

      loading: false,

      organization: {
        server: "",
        adminUsername: "",
        adminPassword: "",
        adminNickname: ""
      },

      // --> DATA <--
      stepThreeErrors: ["Field required", "Field required", "Field required"],
      stepThreeRules: [
        { xmpp_username: true, required: true },
        { min: 8, required: true },
        { required: true }
      ],

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
          ["We will provide records to setup in your DNS manager.", false]
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

  watch: {
    currentStep: {
      async handler() {
        await this.initializeCurrentStep();

        this.$emit("updateStep", this.currentStep);
      },

      immediate: true,
      once: true
    }
  },

  methods: {
    // --> HELPERS <--

    async initializeCurrentStep() {
      let currentStep = 1;

      if (await APIInit.isWorkspaceInitialized()) {
        currentStep += 1;

        if (await APIInit.isFirstAccountCreated()) {
          currentStep += 1;
        }
      }

      this.currentStep = currentStep;
    },

    async updateStep(stepName: string) {
      if (this.currentStep && this.loading !== true) {
        // Mark as loading
        this.loading = true;

        if (this.currentStep < 4) {
          switch (stepName) {
            case "server": {
              if (this.organization.server) {
                try {
                  // Initialize workspace
                  await APIInit.initWorkspace(this.organization.server);
                } catch (error) {
                  return BaseAlert.error(
                    "Could not initialize workspace",
                    error || "Unknown reason"
                  );
                }

                this.currentStep += 1;
              } else {
                BaseAlert.error(
                  "Please enter a name for your server",
                  "You may enter a name like: My Company"
                );
              }

              break;
            }

            case "admin": {
              if (
                this.organization.adminUsername &&
                this.organization.adminPassword &&
                this.organization.adminNickname
              ) {
                try {
                  const admin = await APIInit.createFirstAccount({
                    username: this.organization.adminUsername,
                    password: this.organization.adminPassword,
                    nickname: this.organization.adminNickname
                  });

                  await Store.$account.login(
                    admin.jid,
                    this.organization.adminPassword
                  );
                } catch (error) {
                  return BaseAlert.error(
                    "Could not create first account",
                    error || "Unknown reason"
                  );
                }

                this.currentStep += 1;
              } else {
                BaseAlert.error(
                  "Please fill all fields",
                  "Enter your username and password"
                );
              }

              break;
            }
          }
        }

        // Not loading anymore
        this.loading = false;

        this.$emit("updateStep", this.currentStep);
      }
    },

    // --> EVENT LISTENERS <--

    onUpdateSecondInput(value: string) {
      this.organization.adminPassword = value;
    },

    onUpdateThirdInput(value: string) {
      this.organization.adminNickname = value;
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-start-init-page";

#{$c} {
  display: flex;
  text-align: center;
  flex: 1 1 auto;
  overflow-y: scroll;

  #{$c}__content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    margin-block-start: 120px;
  }

  h1 {
    font-size: ($font-size-page + 8px);
    font-weight: $font-weight-bolder;
    margin-block: 0 15px;
  }

  #{$c}__subtitle {
    font-size: ($font-size-page + 2px);
    line-height: ($font-size-page + 10px);
    font-weight: $font-weight-light;
    margin-block: 0 108px;
    color: $color-base-grey-normal;
  }

  #{$c}__success {
    margin-inline: auto;
    margin-block-start: 150px;
  }

  #{$c}__bold {
    font-weight: $font-weight-medium;
  }

  // --> MEDIA QUERIES <--

  @media (max-width: 768px) {
    width: fit-content;
  }
}
</style>
