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
    breadcrumb(
      class="c-dashboard-main__breadcrumb"
    )

    base-section-background
      slot

</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseSectionBackground from "@/components/base/BaseSectionBackground.vue";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue";

export default {
  name: "DashboardMain",

  components: {
    BaseSectionBackground,
    Breadcrumb
  },

  props: {},

  emits: [],

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  #{$c}__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-inline: 100px;
    max-width: 918px;
    width: 100%;
  }
}
</style>
