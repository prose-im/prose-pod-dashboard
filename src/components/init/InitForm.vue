<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.c-init-form
  transition(
    enter-active-class="u-animate u-animate--slide-in u-animate--fast u-animate-delayed"
    leave-active-class="u-animate u-animate--slide-out-left u-animate--superfast"
  )
    .c-init-form__upper(
      v-if="loaded"
    )
      .c-init-form__label
        slot
        
      vee-form.c-init-form__field-block(
        v-slot="{ errors, meta }"
        @submit.prevent="onSubmit"
        :class=`[
          {
            "c-init-form__field-block--flex": (formType === 'single'),
            "c-init-form__field-block--block": (formType !== 'single')
          }
        ]`
        ref="veeFormInstance"
      )
        form-field(
          v-model="input"
          @keyup.enter="onKeyupFirstInput"
          :disabled="loading"
          :display-error="errors?.first && meta.touched"
          :error-message="errorMessages[0]"
          name="first"
          :placeholder="placeholder"
          :rules="rules[0]"
          :type="type"
          ref="firstFormField"
          autofocus
          align="left"
          size="ultra-large"
          class="c-init-form__field"
        )

        form-field(
          v-if="secondaryType"
          v-model="secondInput"
          @keyup.enter="onKeyupSecondInput"
          :disabled="loading"
          :display-error="errors?.second && meta.touched"
          :error-message="errorMessages[1]"
          name="second"
          :placeholder="secondaryPlaceholder"
          :rules="rules[1]"
          :type="secondaryType"
          ref="secondFormField"
          align="left"
          size="ultra-large"
          class="c-init-form__field"
        )

        form-field(
          v-if="tertiaryType"
          v-model="thirdInput"
          @keyup.enter="onSubmit"
          :disabled="loading"
          :display-error="errors?.third && meta.touched"
          :error-message="errorMessages[2]"
          name="third"
          :placeholder="tertiaryPlaceholder"
          :rules="rules[2]"
          :type="tertiaryType"
          ref="thirdFormField"
          align="left"
          size="ultra-large"
          class="c-init-form__field"
        )

        base-button(
          @click="onSubmit"
          :disabled="loading"
          :loading="loading"
          class="c-init-form__button"
          tint="purple"
          size="ultra-large"
          padding="32.5px 24.5px"
        )
          .c-init-form__button--content
            span.c-init-form__button--text
              | {{ buttonLabel }}

            base-icon(
              class="c-init-form__icon"
              name="arrow.right"
              stroke="#ffffff"
              size="15px"
            )

  init-tips(
    v-if="formVisible"
    :tips="tips"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import FormField from "@/components/form/FormField.vue";
import InitTips from "@/components/init/InitTips.vue";

// PROJECT: VEE-VALIDATE
import { Form as VeeForm } from "vee-validate";

export default {
  name: "InitPage",

  components: {
    InitTips,
    VeeForm
  },

  props: {
    buttonLabel: {
      type: String,
      default: "Continue"
    },

    formType: {
      type: String,
      default: "single"
    },

    formVisible: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },

    rules: {
      type: Array,
      default: () => []
    },

    errorMessages: {
      type: Array,
      default: () => []
    },

    // First input

    modelValue: {
      type: String,
      default: ""
    },

    placeholder: {
      type: String,
      default: ""
    },

    type: {
      type: String,
      default: "text"
    },

    // Second input

    secondaryInput: {
      type: String,
      default: ""
    },

    secondaryPlaceholder: {
      type: String,
      default: ""
    },

    secondaryType: {
      type: String,
      default: ""
    },

    // Third input

    tertiaryInput: {
      type: String,
      default: ""
    },

    tertiaryPlaceholder: {
      type: String,
      default: ""
    },

    tertiaryType: {
      type: String,
      default: ""
    },

    tips: {
      type: Object,
      required: true
    }
  },

  emits: [
    "update:modelValue",
    "updateSecondInput",
    "updateThirdInput",
    "changeStep"
  ],

  data() {
    return {
      // --> STATE <--

      firstInputValidated: false,

      loaded: false
    };
  },

  computed: {
    input: {
      get() {
        return this.modelValue;
      },

      set(value: string) {
        this.$emit("update:modelValue", value);
      }
    },

    secondInput: {
      get() {
        return this.secondaryInput;
      },

      set(value: string) {
        this.$emit("updateSecondInput", value);
      }
    },

    thirdInput: {
      get() {
        return this.tertiaryInput;
      },

      set(value: string) {
        this.$emit("updateThirdInput", value);
      }
    }
  },

  watch: {
    formVisible: {
      handler(newVisibility) {
        setTimeout(() => (this.loaded = newVisibility), 10);
      },

      immediate: true
    }
  },

  methods: {
    onSubmit() {
      this.firstInputValidated = false;

      this.$emit("changeStep");
    },

    onKeyupFirstInput() {
      // Focus on second input if there's more than 2 inputs
      if (this.formType !== "single" && this.input) {
        (
          this.$refs.firstFormField as InstanceType<typeof FormField>
        ).unfocusFieldFromParent();

        (
          this.$refs.secondFormField as InstanceType<typeof FormField>
        ).focusFieldFromParent();
      }
    },

    onKeyupSecondInput() {
      // Focus on third input if there's 3 inputs
      if (this.formType !== "single" && this.input) {
        (
          this.$refs.secondFormField as InstanceType<typeof FormField>
        ).unfocusFieldFromParent();

        (
          this.$refs.thirdFormField as InstanceType<typeof FormField>
        ).focusFieldFromParent();
      }
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-init-form";

#{$c} {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1 1 auto;
  text-align: center;
  justify-content: space-between;
  margin-inline: 10px;

  #{$c}__upper {
    margin-inline: 10px;

    #{$c}__label {
      font-size: ($font-size-page + 2.5px);
      margin-block: 0 35px;
      font-weight: $font-weight-light;
      line-height: 24px;
    }
  }

  #{$c}__field-block {
    max-width: 560px;
    margin-inline: auto;

    &--flex {
      display: flex;
    }

    &--block {
      display: block;

      #{$c}__button {
        margin-block-start: 20px;
        width: 100%;

        &--content {
          text-align: center;
        }

        &--text {
          width: 100%;
        }
      }

      #{$c}__field {
        margin-inline-end: 0;
      }
    }
  }

  #{$c}__field {
    display: flex;
    flex: 1 1 auto;
    margin-inline-end: 20px;
    margin-block-end: 12px;
  }

  #{$c}__button {
    &--content {
      font-size: ($font-size-page + 1px);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  #{$c}__icon {
    margin-inline-start: 20px;
  }
}
</style>
