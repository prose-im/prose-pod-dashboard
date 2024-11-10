<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.v-app-base
  app-sidebar(
    class="v-app-base__sidebar"
  )

  dashboard-main
    .v-app-base__content
      router-view

</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: ASSEMBLIES
import AppSidebar from '@/assemblies/app/AppSidebar.vue';
import DashboardMain from '@/components/dashboard/DashboardMain.vue';

export default {
  name: "AppBase",

  components: { 
    AppSidebar, 
    DashboardMain
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-app-base";

#{$c} {
  height: 100%;
  width: 100%;
  display: flex;

  #{$c}__sidebar {
    flex: 0 0 auto;
  }

  #{$c}__content {
    flex: 1;
  }
}

body {
  margin: 0;
  height: 100%;
  max-width: 100vw;
  overflow: clip;
}

html {
  height: 100%;
}
</style>
