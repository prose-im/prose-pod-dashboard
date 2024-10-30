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
    leave-active-class="u-animate u-animate--fade-out u-animate--fast"
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
          :titleColor="titleColor"
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

    titleColor: {
      type: String,
      default:"black",

      validator(x: string) {
        return ["black", "red"].includes(x);
      }
    },

    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // --> STATE <--
      loaded: false
    };
  },

  computed: {

  },

  watch: {
    visible(value){
      setTimeout(() => this.loaded = value, 40 )
    }
  },

  emits: ["close", "confirm"],

  methods: {
    onClose(event: Event){
      this.loaded = false
      setTimeout(() => this.$emit("close", event), 50 )
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

#{$c} {
  position: fixed;
  inset: 0;
  z-index: $index-foreground-primary;
}
</style>
 