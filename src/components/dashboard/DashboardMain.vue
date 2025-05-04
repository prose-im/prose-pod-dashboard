<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-dashboard-main
  .c-dashboard-main__content
    breadcrumb-heading(
      class="c-dashboard-main__breadcrumb"
    )

    base-section-background(
      class="c-dashboard-main__background"
    )
      slot
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BreadcrumbHeading from "@/components/breadcrumb/BreadcrumbHeading.vue";

export default {
  name: "DashboardMain",

  components: {
    BreadcrumbHeading
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-dashboard-main";

#{$c} {
  background-color: $color-background-primary;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  #{$c}__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-inline: 100px;
    max-width: 1040px;
    width: 100%;
  }

  #{$c}__breadcrumb,
  #{$c}__background {
    margin-inline: 12px;
  }
}
</style>
