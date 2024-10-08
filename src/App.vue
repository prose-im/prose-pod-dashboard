<script lang="ts">
// PROJECT: COMPONENTS
import DashboardMain from "./components/dashboard/DashboardMain.vue";
import Modal from "./components/modals/Modal.vue";
import SidebarMain from "./components/sidebar/SidebarMain.vue";


export default {

  components: {
    DashboardMain,
    SidebarMain,
    Modal
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
    sidebar-main
    dashboard-main

    //- modal 
    <!-- modal -->

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
 overflow: clip;
 display: flex;
 position: absolute;
 inset: 0;

 // --> BOOLEANS <--

 &--translucent {
   background-color: transparent;
 }
}
</style>
