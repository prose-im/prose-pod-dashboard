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

      form.c-init-form__field-block(
        @submit.prevent="onSubmit"
        :class=`[
          {
            "c-init-form__field-block--flex" : formType === 'single',
            "c-init-form__field-block--block" : formType !== 'single'
          }
        ]`
      )
        form-field(
          v-model="input"
          ref="firstFormField"
          class="c-init-form__field"
          autofocus
          align="left"
          :placeholder="placeholder"
          size="ultra-large"
          :type="type"
          @keyup.enter="onKeyupFirstInput"
        )

        form-field(
          v-if="secondaryType"
          v-model="secondInput"
          ref="secondFormField"
          align="left"
          class="c-init-form__field"
          :placeholder="secondaryPlaceholder"
          size="ultra-large"
          :type="secondaryType"
          @keyup.enter="onKeyupSecondInput"
        )

        form-field(
          v-if="tertiaryType"
          v-model="thirdInput"
          ref="thirdFormField"
          align="left"
          class="c-init-form__field"
          :placeholder="tertiaryPlaceholder"
          size="ultra-large"
          :type="tertiaryType"
          @keyup.enter="onSubmit"
        )

        base-button(
          @click="onSubmit"
          class="c-init-form__button"
          tint="purple"
          size="ultra-large"
          padding="32.5px 24.5px"
        )
          .c-init-form__button--content
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
import FormField from "@/components/form/FormField.vue";
import InitTips from "@/components/init/InitTips.vue";

export default {
  name: "InitPage",

  components: {
    InitTips
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
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },

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
