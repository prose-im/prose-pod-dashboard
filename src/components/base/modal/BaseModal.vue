<!--
 * This file is part of prose-app-web
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->
<template lang="pug">
teleport(
  to="#app"
)
  transition(
    enter-active-class="u-animate u-animate--fade-in u-animate--fast"
    leave-active-class="u-animate u-animate--fade-out u-animate--fast u-animate--delayed "
  )
    .c-base-modal(
      v-if="visible"
    )
      base-modal-background(
        @closeModal="onClose"
      )
        base-modal-container(
          :containerVisible="loaded"
          :title="title"
          :buttonColor="buttonColor"
          :buttonLabel="buttonLabel"
          :flexBody="flexContainer"
          @closeModal="onClose"
          @confirmAction="onConfirm"
        )
          slot
</template>
 
 <!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->
 
 <script lang="ts">
import BaseModalBackground from './BaseModalBackground.vue';
import BaseModalContainer from './BaseModalContainer.vue';

export default {
  name: "Modal",

  components:{
    BaseModalBackground,
    BaseModalContainer
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
      required:true
    },

    flexContainer: {
      type: Boolean,
      default: false
    },

    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // --> STATE <--
      loaded: true
    };
  },

  computed: {

  },

  watch: {
    visible(value){
      setTimeout(() => this.loaded = value, 40 )
      console.log('loaded', value)
    }
  },

  emits: ["close", "confirm"],

  methods: {
    onClose(event: Event){
      this.loaded = false
      setTimeout(() => this.$emit("close", event), 400 )
    },

    onConfirm(event: Event){
      this.$emit("confirm", event);
    },
  }  
 };
 </script>
 
 <!-- **********************************************************************
   STYLE
   ********************************************************************** -->
 
<style lang="scss">
$c: ".c-base-modal";

// VARIABLES
$badge-padding-block: 3.5px;
$badge-padding-inline: 7px;

#{$c} {
  position: absolute;
  z-index: 100;
  inset: 0;
  height: 100%;
}
</style>
 