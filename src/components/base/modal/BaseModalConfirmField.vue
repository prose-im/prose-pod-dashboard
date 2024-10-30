<!--
* This file is part of prose-app-web
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-base-modal-confirm-field
  form-checkbox(
    v-model="checked"
    @change="updateValue"
  )

  p(
    :class=`[
      "c-base-modal-confirm-field--" + color
    ]`
  )
    | {{ text }}
  
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import FormCheckbox from '@/components/form/FormCheckbox.vue';

export default {
  name: "BaseModalWarning",

  components: {
    FormCheckbox
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },

    text: {
      type: String,
      required: true
    },

    color: {
      type: String,
      default:"black",

      validator(x: string) {
        return ["black", "red"].includes(x);
      }
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      // --> STATE <--
      checked: false
    };
  },

  computed: {},

  watch: {
    modelValue: {
      immediate: true,

      handler(value) {
        this.checked = value;
      }
    }
  },

  created() {},

  methods: {
    // --> HELPERS <--
    updateValue(enabled: boolean): void {
      this.$emit("update:modelValue", enabled);
    },
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-modal-confirm-field";

#{$c} {  
  display: flex;
  align-items: center;
  font-weight: $font-weight-medium;
  margin-left: 9px;
  margin-bottom: 8px;
  font-family: $font-family-default;
  font-size: ($font-size-baseline - 1px);

  p{
    margin-block: 0;
    margin-inline-start: 11px;
  }

  &--icon{
    margin-right: 13px;
  }

  //<!-- COLORS -->

  &--red{
    color: $color-base-red-normal;
  }
}

</style>
        