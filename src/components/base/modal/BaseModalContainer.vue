<!--
 * This file is part of prose-app-web
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->

<template lang="pug">
transition(
  enter-active-class="u-animate u-animate--fade-in-out-expand-horizontal u-animate--slow "
  leave-active-class="u-animate u-animate--fade-out u-animate--slow"
)
  .c-base-modal-container(
    v-if="containerVisible"
  )
    .c-base-modal-container__title
      | {{ title }}

    .c-base-modal-container__body(
      :class=`[
        {
          "c-base-modal-container--flex": flexBody
        }
      ]`
    )
      slot
    
    .c-base-modal-container__footer
      base-button(
        size="mid-large"
        tint="grey"
        @click="onClose"
      )
        | {{ buttonColor === 'grey' ? 'Close' : 'Cancel' }}

      base-button(
        v-if="buttonColor !== 'grey'"
        class="c-base-modal-container__footer--extra-button"
        size="mid-large"
        :tint="buttonColor"
        @click="onConfirm"
      )
        | {{ buttonLabel }}

</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import BaseButton from '../BaseButton.vue';

export default {
  name: "BaseModalContainer",

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

    flexBody: {
      type: Boolean,
      default: false
    },

    containerVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
  },

  watch: {
  },

  emits: ["closeModal", "confirmAction"],

  methods: {
    onClose(event: Event){
      this.$emit("closeModal", event);
    },

    onConfirm(event: Event){
      this.$emit("confirmAction", event);
    },
   }  
};
</script>

<!-- **********************************************************************
  STYLE
  ********************************************************************** -->

<style lang="scss">
$c: ".c-base-modal-container";

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
    min-height: 75%;
    padding-top: 35.5px;
    padding-bottom: 18.5px;
    margin-inline: auto;
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

  &--flex {
    display: flex;
    flex-direction: column;
  }

}
</style>
    <!-- padding-top: 63px;

 -->
