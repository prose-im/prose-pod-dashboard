<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-signup-form
  transition(
    enter-active-class="u-animate u-animate--slide-in u-animate--fast u-animate-delayed"
    leave-active-class="u-animate u-animate--slide-out-left u-animate--superfast"
  )
    .c-signup-form__upper(
      v-if="loaded"
    )
      .c-signup-form__label
        slot

      form.c-signup-form__field-block(
        @submit.prevent="onSubmit"
        :class=`[
          {
            "c-signup-form__field-block--block" : formType === 'double',
            "c-signup-form__field-block--flex" : formType !== 'double'
          }
        ]`
      )
        form-field(
          v-model="input"
          ref="firstFormField"
          class="c-signup-form__field"
          autofocus
          align="left"
          :placeholder="placeholder"
          size="ultra-large"
          :type="type"
          @keyup.enter="onKeyupFirstInput"
        )

        form-field(
          v-if="formType === 'double'"
          v-model="secondInput"
          ref="secondFormField"
          align="left"
          class="c-signup-form__field"
          :placeholder="secondaryPlaceholder"
          size="ultra-large"
          :type="secondaryType"
          @keyup.enter="onSubmit"
        )

        base-button(
          @click="onSubmit"
          class="c-signup-form__button"
          tint="purple"
          size="ultra-large"
          padding="32.5px 24.5px"
        )
          .c-signup-form__button--content
            | {{ buttonLabel }} 

            base-icon(
              class="c-signup-form__icon"
              name="arrow.right"
              stroke="#ffffff"
              size="15px"
            )

  signup-tips(
    v-if="formVisible"
    :tips="tips"
  )
</template>

<!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->

<script lang="ts">
import FormField from "@/components/form/FormField.vue";
import SignupTips from "@/components/signup/SignupTips.vue";

export default {
  name: "SignupPage",

  components: {
    SignupTips
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

    modelValue: {
      type: String,
      default: ""
    },

    secondaryInput: {
      type: String,
      default: ""
    },

    placeholder: {
      type: String,
      default: ""
    },

    secondaryPlaceholder: {
      type: String,
      default: ""
    },

    tips: {
      type: Object,
      required: true
    },

    type: {
      type: String,
      default: "text"
    },

    secondaryType: {
      type: String,
      default: ""
    }
  },

  emits: ["update:modelValue", "updateSecondInput", "changeStep"],

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
    }
  },

  watch: {
    formVisible: {
      handler(newVisibility, oldVisibility) {
        console.log("received");
        setTimeout(() => (this.loaded = newVisibility), 10);
      },

      immediate: true
    }
  },

  methods: {
    onSubmit() {
      console.log("emitting");
      this.firstInputValidated = false;
      this.$emit("changeStep");
    },

    onKeyupFirstInput() {
      if (this.formType === "double" && this.input) {
        (
          this.$refs.firstFormField as InstanceType<typeof FormField>
        ).unfocusFieldFromParent();
        (
          this.$refs.secondFormField as InstanceType<typeof FormField>
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
$c: ".c-signup-form";

#{$c} {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1 1 auto;
  text-align: center;
  justify-content: space-between;

  #{$c}__upper {
    max-width: 560px;
  }

  #{$c}__label {
    font-size: ($font-size-page + 3px);
    margin-block: 0 35px;
    font-weight: $font-weight-light;
  }

  #{$c}__field-block {
    &--flex {
      display: flex;
    }

    &--block {
      display: block;

      #{$c}__button {
        margin-block-start: 20px;
        width: 100%;

        &--content {
          margin-inline-start: 32.5px;
        }
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
