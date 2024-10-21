<script lang="ts">
// PROJECT: COMPONENTS
import DashboardMain from "./components/dashboard/DashboardMain.vue";


export default {

  components: {
    DashboardMain,
  },
}
</script>

<template lang="pug">
  #app(
    @contextmenu.prevent
    @dragover.prevent
    @drop.prevent.stop
    class="s-app"
  )
    router-view

</template>
<!-- **********************************************************************
  STYLE
  ********************************************************************** -->

<style lang="scss">
$c: ".s-app";

#{$c} {
 background-color: white;
 color: black;
 user-select: none;
 margin: 0;
 padding: 0;
 height: 100vh;
 display: flex;
 inset: 0;
 overflow: clip;

 // --> BOOLEANS <--

 &--translucent {
   background-color: transparent;
 }
}
</style>
    <!-- sidebar-main
    dashboard-main -->