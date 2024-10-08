<!--
 * This file is part of prose-app-web
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->
<template lang="pug">
.c-modal
  modal-background
    modal-container(
      title="Add a custom emoji"
      buttonColor="purple"
      buttonLabel="Add Custom Emoji"
    )
</template>
 
 <!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->
 
 <script lang="ts">
import ModalBackground from './ModalBackground.vue';
import ModalContainer from './ModalContainer.vue';

export default {
  name: "Modal",

  components:{
    ModalBackground,
    ModalContainer
  },

  props: {
    title:{
      type:String,
      required:false
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
$c: ".c-modal";

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
 