<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
      TEMPLATE
      ********************************************************************** -->

<template lang="pug">
  .c-base-section-background
    slot
</template>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-section-background";

// VARIABLES
$background-border-radius: 8px;

#{$c} {
  flex: 1;
  display: flex;
  background-color: white;
  border-width: 1px 1px 0 1px;
  border-color: $color-border-secondary;
  border-style: solid;
  border-top-left-radius: $background-border-radius;
  border-top-right-radius: $background-border-radius;
  box-shadow: 0 4px 4px 0 rgba($color-base-purple-light, 0.08);

  #{$c}__icon {
    margin-left: 11px;
    margin-right: 12px;
  }
}
</style>
