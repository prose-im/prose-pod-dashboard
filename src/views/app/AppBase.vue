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

// PROJECT: API
import APIInit from "@/api/providers/init";
import APIServerConfig from "@/api/providers/serverConfig";

export default {
  name: "AppBase",

  components: {
    AppSidebar,
    DashboardMain
  },

  mounted() {
    (async () => {
      if (!(await APIInit.isPodConfigInitialized())) {
        const podDomain = (await APIServerConfig.getServerConfig()).domain;
        await APIInit.initPodConfig({
          address: { hostname: podDomain },
          dashboard_url: window.location.origin
        });
      }
    })();
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

  //TODO: check with V
  #{$c}__sidebar {
    flex: 0 0 auto;
    max-width: 22%;
  }

  #{$c}__content {
    overflow: hidden;
    flex: 1 1 0;
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
