<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
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
import AppSidebar from "@/assemblies/app/AppSidebar.vue";
import DashboardMain from "@/components/dashboard/DashboardMain.vue";

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
    max-width: 300px;
  }

  #{$c}__content {
    overflow: hidden;
    flex: 1 1 0;
  }
}
</style>
