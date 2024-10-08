<!--
 * This file is part of prose-app-web
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->

 <template lang="pug">
  .c-modal-background
    slot
 
 </template>
   
 <!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->
 
 <script lang="ts">

 export default {
   name: "ModalBackground",
 
   components:{
   },

   props: {
     
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
 $c: ".c-modal-background";
 
 // VARIABLES
 
 #{$c} {
  background-color: rgba($color-base-grey-normal, 0.4);
  height: 100%;
  display: flex;
  justify-content: flex-end;
  backdrop-filter: blur(1.5px);
 }
 </style>
 