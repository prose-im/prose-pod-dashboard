<!--
* This file is part of prose-app-web
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
  #app(
    @contextmenu.prevent
    @dragover.prevent
    @drop.prevent.stop
    class="s-app"
  )
    base-alert

    router-view

</template>
    
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "./components/base/BaseAlert.vue";
import DashboardMain from "./components/dashboard/DashboardMain.vue";

export default {

  components: {
    BaseAlert,
    DashboardMain,
  },
}
</script>

<!-- **********************************************************************
  STYLE
  ********************************************************************** -->

<style lang="scss">
$c: ".s-app";

#{$c} {
 background-color: $color-white;
 color: $color-black;
 user-select: none;
 margin: 0;
 padding: 0;
 display: flex;
 overflow: clip;
 position: absolute;
 inset: 0;

 // --> BOOLEANS <--

 &--translucent {
   background-color: transparent;
 }
}
</style>