<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->

<template lang="pug">
.c-base-modal-background(
  :class=`[
    "c-base-modal-background--" + position
  ]`
  @click.self="onClickAway"
)
  slot
 
</template>
   
 <!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->
 
 <script lang="ts">

 export default {
   name: "BaseModalBackground",
 
   components:{
   },

   props: {
    position: {
      type: String,
      default:'left',

      validator(x: string) {
        return ["center", "left"].includes(x);
      }
    },
   },
 
   data() {
     return {
       // --> STATE <--
 
     };
   },
 
   watch: {
 
   },

  emits: ["closeModal"],
 
   methods: {
    onClickAway(event: Event){
      this.$emit("closeModal", event);
    }
   }  
 };
 </script>
 
 <!-- **********************************************************************
   STYLE
   ********************************************************************** -->
 
 <style lang="scss">
 $c: ".c-base-modal-background";
 
 // VARIABLES
 
 #{$c} {
  background-color: rgba($color-base-grey-normal, 0.4);
  height: 100%;
  display: flex;
  justify-content: flex-end;
  backdrop-filter: blur(1.5px);

  &--center {
    justify-content: center;
    align-items: center;
  }
 }
 </style>
 