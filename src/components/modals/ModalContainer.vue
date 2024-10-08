<!--
 * This file is part of prose-app-web
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->

<template lang="pug">
.c-modal-container
  .c-modal-container__title
    | {{ title }}

  .c-modal-container__body
    slot
  
  .c-modal-container__footer
    base-button(
      size="mid-large"
      tint="grey"
    )
      | {{ buttonColor === 'grey' ? 'Close' : 'Cancel' }}

    base-button(
      v-if="buttonColor !== 'grey'"
      class="c-modal-container__footer--extra-button"
      size="mid-large"
      :tint="buttonColor"
    )
      | {{ buttonLabel }}

</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import BaseButton from '../base/BaseButton.vue';

export default {
  name: "ModalContainer",

  components:{
    BaseButton
  },

  props: {
    title:{
      type:String,
      required:true
    },

    buttonColor:{
      type: String,
      default:"grey",

      validator(x: string) {
        return ["grey", "purple", "red"].includes(x);
      }
    },

    buttonLabel:{
      type:  String,
      default: ""
    },
  },

  data() {
    return {
      // --> STATE <--

    };
  },

  watch: {

  },

  methods: {
  }  
};
</script>

<!-- **********************************************************************
  STYLE
  ********************************************************************** -->

<style lang="scss">
$c: ".c-modal-container";

#{$c} {
  height: 100%;
  width: 43%;
  background-color: $color-white;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;

  #{$c}__title{
    font-weight: $font-weight-bolder;
    font-family: $font-family-default;
    font-size: ($font-size-page + 6px);
    height: 9.5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 48px;
    padding-bottom: 27.5px;
  }

  #{$c}__body{
    min-height: 78%;
    border-block: 1px solid $color-border-primary;
  }

  #{$c}__footer{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 48px;
    height: 10%;

    &--extra-button{
      margin-left: 12px;
    }
  }

}
</style>
    <!-- padding-top: 63px;

 -->
